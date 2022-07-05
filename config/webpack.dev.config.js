const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  // Entry point

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve("public"),
    },
    entry: path.resolve("client/index.js"),
    // Output dist
    output: {
      path: path.resolve("build"),
      publicPath: "/",
      filename: "bundle.js",
      devtoolModuleFilenameTemplate: (info) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    devtool: "source-map",
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
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "sass-loader",
          ],
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
    ],
  };
};
