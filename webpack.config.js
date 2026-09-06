const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: ["./src/js/index.js", "./src/css/style.css"],
    paytable: ["./src/js/paytable.js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  performance: {
    hints: false,
  },
  devServer: {
    headers: {
      "Cache-Control": "no-store",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      filename: "paytable.html",
      template: "./src/paytable.html",
      chunks: ["paytable"],
    }),
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/paytable.pdf", to: "assets/paytable.pdf" },
        {
          from: "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
          to: "pdfjs/pdf.worker.min.mjs",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
