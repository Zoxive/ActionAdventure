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
        typescript_temp: "./build",
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

gulp.task("build:web_client", ["build:web_client:typescript"], function(cb)
{
    del.sync([paths.web_client.output]);

    var entry = [paths.web_client.typescript_temp + "/" + paths.web_client.entry];

    console.log(entry);

    webpack(
    {
        entry: entry,
        output:
        {
            path: paths.web_client.output,
            filename: "app.js"
        }
    },function(err, status)
    {
        if (err) throw new gutil.PluginError("web_client.webpack", err);
        gutil.log("[webpack]", status.toString({ colors: true }));

        del.sync([__dirname + paths.web_client.typescript_temp]);

        cb();
    });
});

gulp.task("build:web_client:typescript", function(cb)
{
    del.sync([paths.web_client.typescript_temp]);

    gulp.src(paths.web_client.source)
        .pipe(tsc(typescriptSettings))
        .js
        .pipe(gulp.dest(paths.web_client.typescript_temp))
        .on("finish", function()
            {
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
