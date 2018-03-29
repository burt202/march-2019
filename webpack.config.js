const webpack = require("webpack")
const path = require("path")
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/index.js",
  ],
  output: {
    publicPath: "",
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {test: /\.(png|jpg|gif)$/, use: [{loader: "url-loader", options: {limit: 8192}}]},
      {test: /\.css$/, use: [{loader: "style-loader"}, {loader: "css-loader"}]},
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: "src/favicon.ico", to: "favicon.ico"},
      {from: "CNAME", to: "CNAME", toType: "file"},
    ]),
    new NunjucksWebpackPlugin({
      templates: [
        {
          from: "./src/index.html",
          to: "index.html",
          context: {
            lastModified: Date.now(),
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
