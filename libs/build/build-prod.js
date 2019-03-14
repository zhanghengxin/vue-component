/**
 * Created by gaoguoqing on 2018/12/10.
 *
 */
const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

process.env.NODE_ENV = 'production'

module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map',
    entry: {
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bwUi.js',
        publicPath: '/dist/',
        library: 'bwUi',
        libraryTarget: 'umd'
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: false
        })
    ]
})