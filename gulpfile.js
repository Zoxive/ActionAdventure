var gulp = require("gulp");
var gutil = require("gulp-util");
var tsc = require("gulp-typescript");
var del = require("del");
var webpack = require("webpack");

var paths =
{
    server:
    {
        source: ["source/server/**/*.ts"],
        output: "./bin"
    },
    web_client:
    {
        entry: "index.js",
        source:
        [
            "source/web_client/**/*.ts",
            "source/web_client/**/*.tsx"
        ],
        output: "./wwwroot/app"
    }
};

var typescriptSettings =
{
    module: 'commonjs',
    target: 'ES5',
    sourceMap: true,
    jsx: "react",
    noImplicitAny: true,
    typescript: require('typescript')
};

gulp.task("build", ["build:server", "build:web_client"], function()
{
   //
});

gulp.task("build:web_client", [], function(cb)
{
    del.sync([paths.web_client.output]);

    var entry = [paths.web_client.source + "/" + paths.web_client.entry];

    webpack(
    {
        entry: entry,
        output:
        {
            path: paths.web_client.output,
            filename: "app.js",
            sourceMapFilename: "[file].map"
        },
        module:
        {
          loaders:
          [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.tsx$/, loader: 'ts-loader' }
          ]
        },
        devtool: "source-map"
    },function(err, status)
    {
        if (err) throw new gutil.PluginError("web_client.webpack", err);
        gutil.log("[webpack]", status.toString({ colors: true }));

        del.sync([__dirname + paths.web_client.typescript_temp]);

        cb();
    });
});

gulp.task('build:server', [], function()
{
    del.sync([paths.server.output]);

    gulp.src(paths.server.source)
        .pipe(tsc(typescriptSettings))
        .js
        .pipe(gulp.dest(paths.server.output));
});
