const path = require("path");
const webpack = require("webpack");
const ShebangPlugin = require("webpack-shebang-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: "./src/cli.mjs",
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV),
    }),
    new ShebangPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behaviour
        },
      },
    ],
  },
  resolve: {
    alias: {
      "vscode-uri/lib/umd": path.resolve(
        __dirname,
        "node_modules/vscode-uri/lib/umd/index.js",
      ),
    },
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "cli.cjs",
    library: {
      type: "commonjs",
    },
  },
};
