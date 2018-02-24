const path = require("path")
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  entry: [
    "./src/index.js",
  ],
  output: {
    publicPath: "/",
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader",
      }),
    }],
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
    new ExtractTextPlugin("bundle.css"),
    new OptimizeCssAssetsPlugin(),
  ],

}
