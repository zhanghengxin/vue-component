'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config/index')
const vueLoaderConfig = require('./vue-loader.conf')
const MarkdownItContainer = require('markdown-it-container')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

//增加hljs classs
function wrapCustomClass (render) {
    return function (...args) {
        return render(...args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }
}

const markdownOpt = {
    preprocess: (MarkdownIt, source) => {
        MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="table">'
        }
        MarkdownIt.renderer.rules.fence = wrapCustomClass(MarkdownIt.renderer.rules.fence)
        const code_inline = MarkdownIt.renderer.rules.code_inline
        MarkdownIt.renderer.rules.code_inline = function (...args) {
            args[0][args[1]].attrJoin('class', 'code-show')
            return code_inline(...args)
        }
        return source
    },
    use: [
        [MarkdownItContainer, 'code', {
            validate: params => params.trim().match(/^code\s*(.*)$/),
            render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    return `<code-show>
                        <div slot="highlight">`
                }
                return '</div></code-show>'
            }
        }]
    ]
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test'), resolve('libs')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: markdownOpt
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
