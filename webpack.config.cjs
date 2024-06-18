const path = require("path");
const webpack = require("webpack");
const ShebangPlugin = require("webpack-shebang-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: "./src/cli.ts",
  devtool: "inline-source-map",
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV),
    }),
    new ShebangPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                sourceMap: true,
              },
            },
          },
        ],
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behaviour
        },
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".ts": [".js", ".ts"],
      ".cts": [".cjs", ".cts"],
      ".mts": [".mjs", ".mts"],
    },
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
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
};
