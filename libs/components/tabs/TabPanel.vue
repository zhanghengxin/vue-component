<template>
    <div v-if="show" :class="tabPanel" :style="contentStyle">
        <slot> </slot>
    </div>
</template>

<script>
import { TABPANEL, TABPANELCSS } from './common'

const prefixCls = TABPANEL
export default {
    name: prefixCls,
    data () {
        return {
            show: true,
            currentName: this.name
        }
    },
    computed: {
        tabPanel () {
            return TABPANELCSS
        },
        contentStyle () {
            return {
                visibility: this.TabsInstance.activeKey !== this.currentName ? 'hidden' : 'visible'
            }
        }
    },
    inject: ['TabsInstance'],
    props: {
        name: {
            type: String
        },
        label: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        },
        closable: {
            type: Boolean,
            default: null
        },
        // Tabs 嵌套时，用 tab 区分层级，指向对应的 Tabs 的 name
        tab: {
            type: String
        },
        // 在 TabPane 使用 v-if 时，并不会按照预先的顺序渲染，这时可设置 index，并从小到大排序
        // 数值需大于 0
        index: {
            type: Number
        }
    },
    watch: {
        name (val) {
            this.currentName = val
            this.updateNav()
        },
        label () {
            this.updateNav()
        },
        disabled () {
            this.updateNav()
        },
        icon () {
            this.updateNav()
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav()
        }
    },
    mounted () {
        this.updateNav()
    },
    destroyed () {
        this.updateNav()
    }
}
</script>

<style scoped>

</style>
