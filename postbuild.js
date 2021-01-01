const shell = require("shelljs");

// 拷贝 admin
shell.rm("-rf", "packages/server/static/client");
shell.mkdir("-p", "packages/server/static/client");
shell.cp("-R", "packages/client/build/.", "packages/server/static/client");
