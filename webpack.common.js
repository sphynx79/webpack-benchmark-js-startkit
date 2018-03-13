const {
    resolve
} = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: resolve(__dirname, "src"),
    entry: ["./pack/application.js"],
    output: {
        path: resolve(__dirname, "dist/"),
        filename: "./js/[name]-bundle.js",
        chunkFilename: ".js/[name]-chunk.js"
    },
    resolve: {
        extensions: [".js"],
        alias: {
            components: resolve(__dirname, "src/components")
        }
        // modules: [ resolve(__dirname, 'node_modules/') ]
    },
    module: {
        noParse: [
            /benchmark\.js$/,
        ],
        rules: [{
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    interpolate: true
                }
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: "../fonts/",
                    outputPath: "fonts/",
                    limit: 10 * 1024
                }
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: "../images/",
                    outputPath: "images/"
                }
            },
            {
                test: /\.js$/,
                include: resolve(__dirname, "src/"),
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: [
                                            "chrome >= 62",
                                            "ie >= 11",
                                            "firefox >= 56",
                                            "android >= 4.4"
                                        ]
                                    },
                                    modules: false,
                                    exclude: ["transform-regenerator"]
                                }
                            ]
                        ],
                        // plugins: ['module:mopt', 'module:fast-async',
                        plugins: [
                            "module:mopt"
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new webpack.ProvidePlugin({
            m: "mithril" //Global access
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function(module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
