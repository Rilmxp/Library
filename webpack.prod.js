const path = require("path");
const common = require("./webpack.common"); // import whole file
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true, // erases contents of dist before creating output files.
    // assetModuleFilename: "[name][ext]", // img.png instead of [hash][ext]
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Extract css into files
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
  optimization: {
    //"..." extends other existing minimizers so they don't get overwritten
    minimizer: [
      "...",
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        title: "Library",
        filename: "index.html",
        template: "src/template.hbs", // gets the template form path
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    // new HtmlWebpackPlugin({
    //   title: "Library",
    //   filename: "index.html",
    //   template: "src/index.html", // gets the template form path
    // }),
  ],

  //   devtool: "source-map",
  //   devServer: {
  //     static: {
  //       directory: path.resolve(__dirname, "dist"),
  //     },
  //     port: 3000,
  //     open: true,
  //     hot: true,
  //     compress: true,
  //     historyApiFallback: true,
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(sa|sc|c)ss$/,
  //         use: [
  //           {
  //             loader: "style-loader", // inject styles into DOM
  //           },
  //           {
  //             loader: "css-loader", // converts css to js but do not apply styles.
  //           },
  //           {
  //             loader: "postcss-loader",
  //             options: {
  //               postcssOptions: {
  //                 plugins: () => [require("autoprefixer")],
  //               },
  //             },
  //           },
  //           {
  //             loader: "sass-loader", // turns sass into css
  //           },
  //         ],
  //       },
  //       {
  //         test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
  //         type: "asset/resource",
  //       },
  //       {
  //         test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //         type: "asset/resource",
  //       },
  //     ],
  //   },
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       title: "Library",
  //       filename: "index.html",
  //       template: "src/index.html", // gets the template form path
  //     }),
  //   ],
});
