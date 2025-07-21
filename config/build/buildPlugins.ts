import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { BuildOptions } from "./types/config"
import * as fs from 'fs'
import * as path from 'path'

export function buildPlugins({
    paths,
    isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    // Read package.json to get version
    const packageJson = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
    );
    const version = packageJson.version;
    const majorVersion = version.split('.')[0];

    const plugins = [

        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        new webpack.DefinePlugin({
            __IS__DEV: JSON.stringify(isDev),
            __APP_VERSION__: JSON.stringify(version),
            __APP_MAJOR_VERSION__: JSON.stringify(majorVersion),
        }),
        new ReactRefreshWebpackPlugin(),

    ]

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new BundleAnalyzerPlugin(
            { openAnalyzer: false } // чтобы не загружался каждый раз анализ бандла (размер)
        ))
    }

    return plugins
}
