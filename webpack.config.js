const path = require("path");
const glob = require("glob");
const { BannerPlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const packageInfo = require("./package.json");

const PORT = process.env.PORT || 3000;
const NODE_ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};
const PATH = {
  NODE_MODULES: path.join(__dirname, "node_modules"),
  PUBLIC: path.join(__dirname, "public"),
  DIST: path.join(__dirname, "dist"),
  SRC: path.join(__dirname, "src"),
};

const commonConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: "./src/app.tsx",
  },
  output: {
    path: PATH.DIST,
    filename: "[name].js",
    library: "bundle",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new BannerPlugin({
      banner: `Repository: ${packageInfo.name} | Version: ${packageInfo.version} | Author: ${packageInfo.author} | License: ${packageInfo.license}`,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(PATH.PUBLIC, "**", "*"),
          to: path.join(PATH.DIST),
          transformPath(targetPath, absolutePath) {
            return path.relative(PATH.PUBLIC, absolutePath);
          },
        },
      ],
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
    }),
    new PurgeCssPlugin({
      paths: glob.sync(path.join(PATH.SRC, "**", "*"), { nodir: true }),
    }),
  ],
  devServer: {
    contentBase: PATH.DIST,
    historyApiFallback: true,
    compress: true,
    open: true,
    port: PORT,
  },
};

const prodConfig = {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};

const runBeforeWebpack = () => {
  switch (process.env.NODE_ENV) {
    case NODE_ENV.DEVELOPMENT:
      return commonConfig;
    case NODE_ENV.PRODUCTION:
      return Object.assign({}, commonConfig, prodConfig);
    default:
      throw new Error(
        `process.env.NODE_ENV does NOT match with "${NODE_ENV.DEVELOPMENT}" or "${NODE_ENV.PRODUCTION}".`
      );
  }
};

module.exports = runBeforeWebpack;
