# ===== build ===== #
FROM node:lts-alpine as build

WORKDIR /app

# 拷贝依赖文件
COPY lerna.json ./
COPY package.json ./
COPY package-lock.json ./
COPY packages/client/package.json ./packages/client/
COPY packages/client/package-lock.json ./packages/client/
COPY packages/server/package.json ./packages/server/
COPY packages/server/package-lock.json ./packages/server/

# 安装依赖
RUN npm ci && npm run bootstrap

# 拷贝并编译代码
COPY ./ ./
RUN npm run build

# ===== runtime ===== #
FROM node:lts-alpine as runtime

# 设置环境变量
ENV NODE_ENV production

# 设置工作目录
WORKDIR /app

# 复制文件
COPY --from=build /app/packages/server/dist/ ./dist/
COPY --from=build /app/packages/server/static/ ./static/
COPY --from=build /app/packages/server/node_modules/ ./node_modules/
COPY --from=build /app/packages/server/package-lock.json ./
COPY --from=build /app/packages/server/package.json ./

# 精简依赖
RUN npm prune --production

# 暴露端口
EXPOSE 80

CMD [ "node", "dist/main.js" ]
