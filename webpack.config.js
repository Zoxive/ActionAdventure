var webpack = require('webpack')
var paths = require("./paths");

module.exports =
{
  entry: paths.web_client.entry,
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
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: "source-map",
  plugins:
  [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  node:
  {
    fs: "empty"
  }
}
