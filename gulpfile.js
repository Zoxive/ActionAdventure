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
    /*
    web_cient:
    {
        source: ["source/web_client/"],
    }
    */
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

gulp.task('build:server', [], function(cb)
{
    del.sync([paths.server.output]);

    gulp.src(paths.server.source)
        .pipe(tsc(typescriptSettings))
        .js
        .pipe(gulp.dest(paths.server.output))
        .on("finish", cb);
});
