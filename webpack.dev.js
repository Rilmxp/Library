const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge"); // needed for merging webpack config files.

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
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
            loader: "style-loader", // inject styles into DOM
          },

          {
            loader: "css-loader", // converts css to js but do not apply styles.
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
            loader: "sass-loader", // turns sass into css
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Library",
      filename: "index.html",
      template: "src/template.hbs", // gets the template form path
    }),
  ],
});
