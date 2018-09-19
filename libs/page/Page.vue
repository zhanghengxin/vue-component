<template>
    <div :class="simpleWrapCls" :style="styles" v-if="simple">
        <div
                :class="prevClasses"
                @click="prev">
            <a>
                <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
            </a>
        </div>
        <div :class="[prefixCls + '-simple-pager']" :title="currentPage + '/' + allPages">
            <input
                    type="text"
                    :value="currentPage"
                    autocomplete="off"
                    spellcheck="false"
                    @keydown="keyDown"
                    @keyup="keyUp"
                    @change="keyUp">
            <span>/</span>
            {{ allPages }}
        </div>
        <div
                :class="nextClasses"
                @click="next">
            <a>
                <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
            </a>
        </div>
    </div>
</template>
<script>
import { oneOf } from '../utils/common'

const prefixCls = 'b-page'

export default {
    name: 'b-page',
    props: {
        current: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizeOpts: {
            type: Array,
            default () {
                return [10, 20, 30, 40]
            }
        },
        placement: {
            validator (value) {
                return oneOf(value, ['top', 'bottom'])
            },
            default: 'bottom'
        },
        size: {
            validator (value) {
                return oneOf(value, ['small'])
            }
        },
        simple: {
            type: Boolean,
            default: false
        },
        showTotal: {
            type: Boolean,
            default: false
        },
        showElevator: {
            type: Boolean,
            default: false
        },
        showSizer: {
            type: Boolean,
            default: false
        },
        className: {
            type: String
        },
        styles: {
            type: Object
        },
        prevText: {
            type: String,
            default: ''
        },
        nextText: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            currentPage: this.current,
            currentPageSize: this.pageSize
        }
    },
    computed: {
        allPages () {
            const allPage = Math.ceil(this.total / this.currentPageSize)
            return (allPage === 0) ? 1 : allPage
        },
        simpleWrapCls () {
            return [
                `${prefixCls}`,
                `${prefixCls}-simple`,
                {
                    [`${this.className}`]: !!this.className
                }
            ]
        },
        prevClasses () {
            return [
                `${prefixCls}-prev`,
                {
                    [`${prefixCls}-disabled`]: this.currentPage === 1,
                    [`${prefixCls}-custom-text`]: this.prevText !== ''
                }
            ]
        },
        nextClasses () {
            return [
                `${prefixCls}-next`,
                {
                    [`${prefixCls}-disabled`]: this.currentPage === this.allPages,
                    [`${prefixCls}-custom-text`]: this.nextText !== ''
                }
            ]
        }
    },
    methods: {
        changePage (page) {
            if (this.currentPage !== page) {
                this.currentPage = page
                this.$emit('update:current', page)
                this.$emit('on-change', page)
            }
        },
        prev () {
            const current = this.currentPage
            if (current <= 1) {
                return false
            }
            this.changePage(current - 1)
        },
        next () {
            const current = this.currentPage
            if (current >= this.allPages) {
                return false
            }
            this.changePage(current + 1)
        },
        fastPrev () {
            const page = this.currentPage - 5
            if (page > 0) {
                this.changePage(page)
            } else {
                this.changePage(1)
            }
        },
        fastNext () {
            const page = this.currentPage + 5
            if (page > this.allPages) {
                this.changePage(this.allPages)
            } else {
                this.changePage(page)
            }
        },
        onSize (pageSize) {
            this.currentPageSize = pageSize
            this.$emit('on-page-size-change', pageSize)
            this.changePage(1)
        },
        onPage (page) {
            this.changePage(page)
        },
        keyDown (e) {
            const key = e.keyCode
            const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39
            if (!condition) {
                e.preventDefault()
            }
        },
        keyUp (e) {
            const key = e.keyCode
            const val = parseInt(e.target.value)
            if (key === 38) {
                this.prev()
            } else if (key === 40) {
                this.next()
            } else if (key === 13) {
                let page = 1

                if (val > this.allPages) {
                    page = this.allPages
                } else if (val <= 0 || !val) {
                    page = 1
                } else {
                    page = val
                }
                e.target.value = page
                this.changePage(page)
            }
        }
    }
}
</script>
