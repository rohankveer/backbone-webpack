var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
      filename: "public/bundle.js",
      sourceMapFilename: "public/bundle.map"
  },
  devServer: {
    inline:true,
    port: 8080
  },
  module: {
      loaders: [
        {
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
        }
      ]
  },
  plugins: [
      new ExtractTextPlugin({ filename: "./public/style.css",allChunks: true })
    ]
};