<template>
    <div :class="simpleWrapCls" v-if="simple">
        <div
            :class="prevCls"
            @click="prev">
            <a :class="[prefixCls + '-arrow']">
                <Icon type="zuo"></Icon>
            </a>
        </div>
        <div :class="[prefixCls + '-simple-pager']" :title="currentPage + '/' + pageCount">
            <input
                type="text"
                :value="currentPage"
                @keydown="keyDown"
                @keyup="keyUp"
                @change="keyUp">
            <span>/</span>
            {{ pageCount }}
        </div>
        <div
            :class="nextCls"
            @click="next">
            <a :class="[prefixCls + '-arrow']">
                <Icon type="you"></Icon>
            </a>
        </div>
    </div>
    <ul :class="wrapCls" v-else>
        <span :class="[prefixCls + '-total']" v-if="showTotal">
            <slot name='total'>共计 {{ total }} 条</slot>
        </span>
        <li
            :class="prevCls"
            @click="prev">
            <a :class="[prefixCls + '-arrow']">
                <template v-if="prevText">{{prevText}}</template>
                <Icon v-else type="zuo"></Icon>
            </a>
        </li>
        <li title="1" :class="firstPageCls" @click="changePage(1)">
            <a :class="[prefixCls + '-item-content']">1</a>
        </li>
        <li
            v-if="currentPage > 5"
            @click="fastPrev"
            title="向前5页"
            :class="[prefixCls + '-item-jump-prev']">
            <a :class="[prefixCls + '-arrow']">
                <Icon type="gengduo"></Icon>
            </a>
        </li>
        <li
            :title="currentPage - 3"
            v-if="currentPage === 5"
            :class="[prefixCls + '-item']"
            @click="changePage(currentPage - 3)">
            <a :class="[prefixCls + '-item-content']">{{ currentPage - 3 }}</a>
        </li>
        <li
            :title="currentPage - 2"
            v-if="currentPage - 2 > 1"
            :class="[prefixCls + '-item']"
            @click="changePage(currentPage - 2)">
            <a :class="[prefixCls + '-item-content']">{{ currentPage - 2 }}</a>
        </li>
        <li
            :title="currentPage - 1"
            v-if="currentPage - 1 > 1"
            :class="[prefixCls + '-item']"
            @click="changePage(currentPage - 1)">
            <a :class="[prefixCls + '-item-content']">{{ currentPage - 1 }}</a>
        </li>
        <li
            :title="currentPage"
            v-if="currentPage != 1 && currentPage != pageCount"
            :class="[prefixCls + '-item',prefixCls + '-item-active']">
            <a :class="[prefixCls + '-item-content']">{{ currentPage }}</a>
        </li>
        <li
            :title="currentPage + 1"
            v-if="currentPage + 1 < pageCount"
            :class="[prefixCls + '-item']"
            @click="changePage(currentPage + 1)">
            <a :class="[prefixCls + '-item-content']">{{ currentPage + 1 }}</a>
        </li>
        <li
            :title="currentPage + 2"
            v-if="currentPage + 2 < pageCount"
            :class="[prefixCls + '-item']"
            @click="changePage(currentPage + 2)">
            <a :class="[prefixCls + '-item-content']">{{ currentPage + 2 }}</a>
        </li>
        <li
            :title="currentPage + 3"
            v-if="pageCount - currentPage === 4"
            :class="[prefixCls + '-item']"
            @click="changePage(currentPage + 3)">
            <a :class="[prefixCls + '-item-content']">{{ currentPage + 3 }}</a>
        </li>
        <li
            v-if="pageCount - currentPage >= 5"
            @click="fastNext"
            title="向后5页"
            :class="[prefixCls + '-item-jump-next']">
            <a :class="[prefixCls + '-arrow']">
                <Icon type="gengduo"></Icon>
            </a>
        </li>
        <li
            :title="pageCount"
            v-if="pageCount > 1"
            :class="lastPageCls"
            @click="changePage(pageCount)">
            <a :class="[prefixCls + '-item-content']">{{ pageCount }}</a>
        </li>
        <li
            :class="nextCls"
            @click="next">
            <a :class="[prefixCls + '-arrow']">
                <template v-if="nextText">{{nextText}}</template>
                <Icon v-else type="you"></Icon>
            </a>
        </li>
        <select-drop
            v-if="showSizer"
            v-model="currentSize"
            @on-change="sizeChange"
            width="95"
            :transfer='transfer'
            :placement='placement'
            :options="options">
        </select-drop>
        <div v-if="showElevator" :class="elevatorCls">
            前往
            <input
                type="text"
                autocomplete="off"
                spellcheck="false"
                :value="currentPage"
                @keydown="keyDown"
                @keyup="keyUp"
                @change="keyUp"
            >
            页
        </div>
    </ul>
</template>
<script>
import Icon from '../icon'
import { prefix } from '../../utils/common'
import SelectDrop from '../select'

const prefixCls = prefix + 'page'

export default {
    name: prefixCls,
    components: {Icon, SelectDrop},
    data () {
        return {
            prefixCls: prefixCls,
            currentPage: Number(this.page),
            currentSize: Number(this.size)
        }
    },
    watch: {
        page () {
            this.currentPage = Number(this.page)
        }
    },
    props: {
        page: {
            type: [Number, String],
            default: 1
        },
        size: {
            type: [Number, String],
            default: 10
        },
        total: {
            type: [Number, String],
            default: 0
        },
        showElevator: {
            type: Boolean,
            default: false
        },
        showTotal: {
            type: Boolean,
            default: false
        },
        simple: {
            type: Boolean,
            default: false
        },
        className: {
            type: String
        },
        prevText: {
            type: String
        },
        nextText: {
            type: String
        },
        mini: {
            type: Boolean,
            default: false
        },
        transfer: {
            type: Boolean,
            default: false
        },
        showSizer: {
            type: Boolean,
            default: false
        },
        sizeOptions: {
            type: Array,
            default () {
                return [10, 20, 50, 100]
            }
        },
        placement: {
            type: String,
            default: 'bottom-start'
        }
    },
    computed: {
        pageCount () {
            const totalPage = Math.ceil(this.total / this.currentSize)
            return (totalPage === 0) ? 1 : totalPage
        },
        options () {
            return this.sizeOptions.map(function (item) {
                return {
                    label: `${item}条/每页`,
                    value: item
                }
            })
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
        wrapCls () {
            return [
                `${prefixCls}`,
                `${prefixCls}-normal`,
                {
                    [`${this.className}`]: !!this.className,
                    [`${prefixCls}-mini`]: !!this.mini
                }
            ]
        },
        prevCls () {
            return [
                `${prefixCls}-prev`,
                {
                    [`${prefixCls}-disabled`]: this.currentPage === 1
                }
            ]
        },
        nextCls () {
            return [
                `${prefixCls}-next`,
                {
                    [`${prefixCls}-disabled`]: this.currentPage === this.pageCount
                }
            ]
        },
        firstPageCls () {
            return [
                `${prefixCls}-item`,
                {
                    [`${prefixCls}-item-active`]: this.currentPage === 1
                }
            ]
        },
        lastPageCls () {
            return [
                `${prefixCls}-item`,
                {
                    [`${prefixCls}-item-active`]: this.currentPage === this.pageCount
                }
            ]
        },
        elevatorCls () {
            return [
                `${prefixCls}-elevator`
            ]
        }
    },
    methods: {
        changePage (page) {
            if (this.currentPage !== page) {
                this.currentPage = page
                this.$emit('on-page-change', page)
            }
        },
        sizeChange (data) {
            this.currentPage = 1
            this.$emit('on-size-change', data)
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
            if (current >= this.pageCount) {
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
            if (page > this.pageCount) {
                this.changePage(this.pageCount)
            } else {
                this.changePage(page)
            }
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
                if (val > this.pageCount) {
                    page = this.pageCount
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
