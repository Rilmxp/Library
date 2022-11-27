const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: {
    // bundle: path.resolve(__dirname, "src/js/index.js"),
    bundle: "./src/js/index.js",
    DOMcreation: {
      dependOn: "bundle",
      import: "./src/js/DOMcreation.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true, // erases contents of dist before creating output files.
    assetModuleFilename: "[name][ext]", // img.png instead of [hash][ext]
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Library",
      filename: "index.html",
      template: "src/index.html",
    }),
    new Dotenv(),
  ],
  optimization: {
    //for when you have >1 entrypoint on single HTML
    runtimeChunk: "single",
  },
};
