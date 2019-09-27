const path = require("path");
const { BannerPlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const packageInfo = require("./package.json");

const PORT = process.env.PORT || 3000;
const NODE_ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
};
const PATH = {
  NODE_MODULES: path.join(__dirname, "node_modules"),
  PUBLIC: path.join(__dirname, "public"),
  DIST: path.join(__dirname, "dist")
};

const commonConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: "./src/app.tsx"
  },
  output: {
    path: PATH.DIST,
    filename: "[name].js",
    library: "bundle",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new BannerPlugin({
      banner: `Repository: ${packageInfo.name} | Version: ${packageInfo.version} | Author: ${packageInfo.author} | License: ${packageInfo.license}`
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(PATH.PUBLIC, "**", "*"),
        to: path.join(PATH.DIST),
        transformPath(targetPath, absolutePath) {
          return path.relative(PATH.PUBLIC, absolutePath);
        }
      }
    ])
  ],
  devServer: {
    contentBase: PATH.DIST,
    historyApiFallback: true,
    compress: true,
    open: true,
    port: PORT
  }
};

const prodConfig = {};

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
