import webpack from "webpack"
import { buildDevServer } from "./buildDevServer"
import { buildLoaders } from "./buildLoaders"
import { buildPlugins } from "./buildPlugins"
import { buildResolvers } from "./buildResolvers"
import { BuildOptions } from "./types/config"

export function buildWebpackConfig(
    options: BuildOptions
): webpack.Configuration {
    const { paths, mode, isDev } = options

    return {
        mode,
        entry: paths.entry, // стартовая точка приложения
        output: {
            // указываем куда делать сборку
            filename: "[name].[contenthash].js", // contenthash решает проблему с кэширыванием в браузере создавая уникальные значения после main
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            /* ---------- конфигурация лоадеров - все что выходит за рамки js (including typescript) --------- */
            rules: buildLoaders(options),
        },
        // to do imports without {component}
        resolve: buildResolvers(options),
        devtool: isDev ? "inline-source-map" : false, // позволяет при сборке отследить в каком файле ошибка
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}
