/**
 * vue-cli3的全局配置文件 详情见https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
 * Created by gaoguoqing on 2019/1/28.
 *
 */
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

function wrapCustomClass (render) {
    return function (...args) {
        return render(...args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }
}

module.exports = {
    publicPath: isProduction ? './' : '/',
    devServer: {
        overlay: { //Show eslink error information on Browser
            warnings: true,
            errors: true
        },
        open: true
    },
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true,
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
                    [
                        require('markdown-it-container'), 'code', {
                        validate: params => params.trim().match(/^code\s*(.*)$/),
                        render: function (tokens, idx) {
                            if (tokens[idx].nesting === 1) {
                                return `<code-show>
                                    <div slot="highlight">`
                            }
                            return '</div></code-show>'
                        }
                    }
                    ]
                ]
            })
        config
            .entry('index')
            .add('babel-polyfill')
    },
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', '.css'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                '&': resolve('libs')
            }
        }
    }
}

