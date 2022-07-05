const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    // Entry point
    devServer: {
      historyApiFallback: true,
    },
    entry: path.resolve("client/index.js"),
    // Output dist
    output: {
      path: path.resolve("build"),
      publicPath: "/static/",
      filename: "bundle-[hash:8].js",
    },
    // Loaders setup
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: { name: "[path][name]-[hash:8].[ext]" },
            },
          ],
        },
        {
          test: /\.(css|scss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    // Plugins...
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve("public/index.html"),
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css",
      }),
    ],
  };
};
