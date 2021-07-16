const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");

const PAGES_DIR = path.resolve(__dirname, "..", "src" + "/views/pages/");
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|scss)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/images",
              useRelativePath: true,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/fonts",
              publicPath: "../assets/fonts",
            },
          },
        ],
      },
      {
        test: /\.(mp4|mp3|txt|xml|pdf|json)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/data",
              publicPath: "../assets/data",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    nodeEnv: "production",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors", // part of the bundle name and
          // can be used in chunks array of HtmlWebpackPlugin
          test: /[\\/](node_modules|vendors)[\\/]/,
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: ["*", ".js", ".css", ".scss", ".pug", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/views/index.pug",
      title: "My site",
    }),
    ...PAGES?.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./pages/${page.replace(/\.pug/, ".html")}`,
          // inject: false,
        })
    ),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/styles.min.css",
    }),
  ],
};
