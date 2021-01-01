require("dotenv/config");

module.exports = {
  babel: {
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          displayName: process.env.NODE_ENV === "development",
        },
      ],
    ],
  },
  devServer: {
    proxy: {
      "/graphql": {
        target: process.env.SERVER_URL,
        changeOrigin: true,
      },
    },
  },
};
