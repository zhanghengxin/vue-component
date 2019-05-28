<template>
    <div class="header">
        <div class="logo" @click="handleClick">
            <img src="../assets/logo.png">
            <span>百望 UI</span>
        </div>
        <b-select
            v-model="value"
            style="width:200px;margin: 20px 162px;"
            :options='options'
            :filterabled='filterabled'
            :filterFn='filterFn'
            @on-change='changePath'
            placeholder="搜索..."
            notFoundText='没有相关内容'
            nameKey='title'
            codeKey='path'
        >
        </b-select>
        <b-button
            class="color-change"
            type="primary"
            @on-click="changeColor">
            一键换肤
        </b-button>
        <b-button
            class="color-change"
            type="success"
            @on-click="inlineCode">
            在线运行
        </b-button>
    </div>
</template>

<script>
import menuList from '../utils/menu.json'

export default {
    data () {
        return {
            value: '',
            filterabled: true
        }
    },
    computed: {
        options: function () {
            let routes = []
            let options = []
            Object.keys(menuList).forEach((item) => {
                routes = routes.concat(menuList[item])
            })
            this.optionsInit(routes, options)
            return options
        }
    },
    methods: {
        changeColor () {
            if (document.documentElement.getAttribute('data-theme') === 'theme1') {
                window.document.documentElement.setAttribute('data-theme', '')
            } else {
                window.document.documentElement.setAttribute('data-theme', 'theme1')
            }
        },
        filterFn (query, item) {
            return (item.label + item.value).indexOf(query) > -1
        },
        changePath (val) {
            document.documentElement.scrollTop = 0
            if (val) {
                this.$router.push(val)
            }
            this.$nextTick(_ => {
                this.value = ''
            })
        },
        handleClick () {
            this.$router.push('/')
        },
        inlineCode () {
            this.$router.push('/run')
        },
        optionsInit (f, options) {
            f.map(item => {
                if (item.items) {
                    this.optionsInit(item.items, options)
                } else if (item.title) {
                    options.push(item)
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .header {
        width: 100%;
        height: 70px;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
        .b-select-main {
            border: 0;
        }
        .b-select-focused {
            box-shadow: none !important;
        }
        .icon {
            display: none !important;
        }
        background: white;
    }

    .header .logo {
        float: left;
        margin-left: 60px;
        cursor: pointer;
    }

    .header .logo img {
        margin-top: 10px;
        width: 50px;
        height: 50px;
    }

    .color-change {
        margin: 10px 10px 0 0;
        float: right;
    }
</style>
