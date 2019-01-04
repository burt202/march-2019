const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const R = require("ramda")

const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: "bundle.css",
  }),
  new OptimizeCssAssetsPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production"),
    },
  }),
]

const prodRules = [{
  test: /\.css$/,
  use: [
    {loader: MiniCssExtractPlugin.loader},
    {loader: "css-loader"},
  ],
}]

module.exports = function(webpackConfig) {
  // we dont need some of the dev plugins and rules so lets
  // remove them here and add the prod ones defined above

  const plugins = R.concat(
    prodPlugins,
    R.slice(0, webpackConfig.plugins.length - 1, webpackConfig.plugins)
  ) // remove HMR

  const rules = R.concat(
    R.slice(0, webpackConfig.module.rules.length - 1, webpackConfig.module.rules),
    prodRules
  ) // remove css rule

  const entry = webpackConfig.entry.slice(-1)

  const result = R.merge(webpackConfig, {plugins, entry, mode: "production"})
  result.module.rules = rules

  return result
}
