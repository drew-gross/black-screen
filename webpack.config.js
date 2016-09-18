let webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

let config = {
    entry: "./src/main/Main.ts",
    output: {
        filename: "./compiled/bundle.js",
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
