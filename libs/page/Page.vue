<template>
    <div :class="simpleWrapCls" v-if="simple">
        <div
                :class="prevCls"
                @click="prev">
            <a :class="[prefixCls + '-arrow']">
                <b-icon type="zuola"></b-icon>
            </a>
        </div>
        <div :class="[prefixCls + '-simple-pager']" :title="currentPage + '/' + pageCount">
            <input
                    type="text"
                    :value="currentPage"
                    autocomplete="off"
                    spellcheck="false"
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
                <b-icon type="youla"></b-icon>
            </a>
        </div>
    </div>
</template>
<script>
import { oneOf } from '../utils/common'
import Icon from '../icon'

const prefixCls = 'b-page'

export default {
    name: 'b-page',
    components: {Icon},
    props: {
        page: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        },
        placement: {
            validator (value) {
                return oneOf(value, ['top', 'bottom'])
            },
            default: 'bottom'
        },
        simple: {
            type: Boolean,
            default: true
        },
        className: {
            type: String
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            currentPage: this.page,
            currentSize: this.size
        }
    },
    computed: {
        pageCount () {
            const allPage = Math.ceil(this.total / this.currentSize)
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
        }
    },
    methods: {
        changePage (page) {
            if (this.currentPage !== page) {
                this.currentPage = page
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
            if (current >= this.pageCount) {
                return false
            }
            this.changePage(current + 1)
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
<style lang="scss">
    .b-page {

    }

    .b-page-simple-pager {
        display: inline-block;
        margin-right: 8px;
        vertical-align: middle;
        input {
            width: 48px;
            height: 22px;
            margin: 0 8px;
            padding: 5px 8px;
            text-align: center;
            box-sizing: border-box;
            outline: 0;
            border: 1px solid $Border;
            border-radius: 4px;
            transition: border-color .2s ease-in-out;
        }
        span {
            padding: 0 8px 0 2px;
        }
    }

    .b-page-prev, .b-page-next {
        display: inline-block;
        border: 0;
        height: 24px;
        line-height: normal;
        font-size: 18px;
        /*.b-page-arrow {*/
            /*color: #666;*/
            /*font-size: 14px;*/
        /*}*/
    }

    .b-page-disabled {
        cursor: not-allowed;

        .b-page-arrow {
            color: $Disabled;
        }
    }
</style>
