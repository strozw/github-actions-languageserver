import path from "node:path";
import webpack from "webpack";
import ShebangPlugin from "webpack-shebang-plugin";

const __dirname = import.meta.dirname;

/**
 * @type {(env: { WEBPACK_BUNDLE: boolean, WEBPACK_BUILD: boolean }, options: { mode: 'development' | 'production', env: Record<string, unknown> }) => Promise<import('webpack').Configuration>}
 */
const config = async (_env, { mode }) => {
  return {
    entry: "./src/cli.mjs",
    devtool: mode === "production" ? false : "inline-source-map",
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
};

export default config;
