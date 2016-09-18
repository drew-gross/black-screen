let path = require("path")
let webpackTargetElectronRenderer = require("webpack-target-electron-renderer");

let config = {
    entry: {
        main: "./src/main/Main.ts",
        bundle: "./src/views/Main.tsx",
    },
    output: {
        path: path.join(__dirname, "compiled"),
        filename: "[name].bundle.js",
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
