<template>
    <div id="app">
        <router-view name="run"/>
        <main-header></main-header>
        <div v-if="docShow" class="content clearfix" ref="content">
            <menu-nav class="nav"></menu-nav>
            <div class="nav-right" v-if="anchors.length">
                <b-anchor affix show-ink>
                    <b-anchor-link
                        :key="index"
                        v-for="(item, index) in anchors"
                        :href="'#title' + index"
                        :title="item.innerText">
                    </b-anchor-link>
                </b-anchor>
            </div>
            <router-view class="doc"/>
        </div>
    </div>
</template>

<script>
import mainHeader from './components/Header'
import menuNav from './components/Nav'

export default {
    name: 'App',
    components: {
        mainHeader,
        menuNav
    },
    data () {
        return {
            anchors: [],
            docShow: true
        }
    },
    mounted () {
        if (this.$route.path === '/run') {
            this.docShow = false
        } else {
            this.docShow = true
        }
    },
    watch: {
        '$route.path' (value) {
            if (value === '/run') {
                this.docShow = false
            } else {
                this.docShow = true
            }
            this.$nextTick(() => {
                // 兼容 IE11 浏览器，将 NodeList 类似数组转成数组
                let h3s = Array.prototype.slice.call(this.$refs.content.querySelectorAll('h3'))
                this.anchors = h3s
                h3s.forEach((el, index) => {
                    el.id = `title${index}`
                })
            })
        }
    }
}
</script>

<style lang="scss">
    #app {
        margin: 0 auto;
    }

    .content {
        width: 1400px;
        padding: 0;
        margin: 70px auto 0px;
        box-shadow: rgba(223, 225, 230, 0.5) 0px 4px 30px 0px;
        height: auto;
        position: relative;
    }

    .nav {
        float: left;
        width: 200px;
        border-right: 1px solid #eaeefb;
        margin-right: -1px;
    }

    .nav-right {
        position: absolute;
        top: 0;
        left: 1400px;
    }

    .doc {
        min-width: 1000px;
        max-width: 1050px;
        float: left;
        border-left: 1px solid #eaeefb;
        padding: 20px;
    }
</style>
