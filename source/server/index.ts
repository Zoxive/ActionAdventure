/// <reference path="../../typings/tsd.d.ts" />
import express = require("express");
import webpack = require("webpack");

var app = express();

app.use(express.static("wwwroot"));

app.listen(3000);

//var compiler = webpack.

/*
var compiler = webpack(
{
  ouput:
  {
    path: "/"
  }
});
*/

/*
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var compiler = webpack({
    // configuration
    output: { path: '/' }
});

app.use(webpackDevMiddleware(compiler, {
    // options
}));
*/

console.log("Started http server on localhost:3000");
