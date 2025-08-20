const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
    // Optional: nicer asset paths in dist
    assetModuleFilename: "assets/[name][ext][query]",
  },

  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",

  devServer: {
    static: path.resolve(__dirname, "./dist"), // HtmlWebpackPlugin serves in memory; this is fine for extra static files
    compress: true,
    port: 8080,
    open: true,
    hot: true,          // ✅ enable HMR
    liveReload: false,  // ✅ avoid double reloads when HMR is on
    watchFiles: [
      "src/**/*",       // ✅ watch all source files
      "src/index.html", // ✅ ensure template changes trigger rebuild
    ],
  },

  target: ["web", "es5"],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon.ico",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "main.css", // optional but nice
    }),
  ],
};
