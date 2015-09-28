var gulp = require("gulp");
var gutil = require("gulp-util");
var tsc = require("gulp-typescript");
var del = require("del");
var webpack = require("webpack");
var paths = require("./paths");
var webpackConfig = require("./webpack.config");

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

    webpack(webpackConfig,function(err, status)
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
