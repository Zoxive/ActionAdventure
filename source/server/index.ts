/// <reference path="../../typings/tsd.d.ts" />
import express = require("express");

var webpack = require("webpack");
var webpackConfig = require("../webpack.config");
var webpackDevMiddleware = require("webpack-dev-middleware");

var app = express();

app.listen(3000);

var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler,
{
  publicPath: "/app/",
  // public path to bind the middleware to
  // use the same as in webpack

  headers: { "X-Custom-Header": "yes" },
  // custom headers

  stats: {
      colors: true
  }
}));

app.use(express.static("wwwroot"));

console.log("Started http server on localhost:3000");
