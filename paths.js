var path = require("path");

var paths =
{
    server:
    {
        source: [path.resolve("source/server/**/*.ts")],
        output: path.resolve("./bin")
    },
    web_client:
    {
        entry: path.resolve("./source/web_client", "index.tsx"),
        source: path.resolve("./source/web_client"),
        output: path.resolve("./wwwroot/app")
    }
};

module.exports = paths;
