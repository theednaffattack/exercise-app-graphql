const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Exercise = require("./server/models/Exercise");

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;
  return {
    entry: "./client/src/index.js",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index_bundle.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\\.svg$/,
          use: {
            loader: "svg-sprite-loader"
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./client/src/index.html"
      })
      // new webpack.DefinePlugin({
      //   "process.env.GITHUB_CLIENT_ID": JSON.stringify(env.GITHUB_CLIENT_ID)
      // }),
      // new webpack.DefinePlugin({
      //   "process.env.GITHUB_CALLBACK_PORT": JSON.stringify(
      //     env.GITHUB_CALLBACK_PORT
      //   )
      // })
    ]
  };
};
