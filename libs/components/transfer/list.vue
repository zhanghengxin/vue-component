<template>
    <div :class="wrapperCls">
        <div :class="headerCls">
            <Checkbox
                :value="checkedAll"
                :disabled="checkedAllDisabled"
                @on-change="toggleSelectAll">
            </Checkbox>
            <span
                :class="prefixCls + '-header-title'"
                @click="toggleSelectAll(!checkedAll)">
                {{ title }}
            </span>
            <span
                :class="prefixCls + '-header-count'">
                {{ count }}
            </span>
        </div>
        <div :class="bodyCls">
            <div v-if="filterable" :class="prefixCls + '-body-search-wrapper'">
                <Search
                    :query="query"
                    @on-query-clear="handleQueryClear"
                    @on-query-change="handleQueryChange"
                    :placeholder="filterPlaceholder">
                </Search>
            </div>
            <ul :class="prefixCls + '-content'">
                <li
                    :key="index"
                    v-for="(item, index) in filterData"
                    :class="itemCls(item)"
                    @click.prevent="select(item)">
                    <Checkbox
                        :value="isCheck(item)"
                        :disabled="item.disabled">
                    </Checkbox>
                    <span v-html="showLabel(item)"></span>
                </li>
                <li :class="prefixCls + '-content-not-found'">{{ notFoundText }}</li>
            </ul>
        </div>
        <div v-if="showFooter" :class="footerCls">
            <slot/>
        </div>
    </div>
</template>

<script>
import Checkbox from '../checkbox/Checkbox'
import Search from './search'
import { prefix } from '../../utils/common'

const prefixCls = `${prefix}transfer-list`
export default {
    name: prefixCls,
    components: {Search, Checkbox},
    props: {
        data: Array,
        renderFormat: Function,
        checkedKeys: Array,
        listStyle: Object,
        title: [String, Number],
        filterable: Boolean,
        filterPlaceholder: String,
        filterMethod: Function,
        notFoundText: String,
        validKeysCount: Number

    },
    data () {
        return {
            prefixCls,
            showItems: [],
            query: '',
            showFooter: true
        }
    },
    watch: {
        data () {
            this.updateFilteredData()
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-with-footer`]: this.showFooter
                }
            ]
        },
        headerCls () {
            return `${prefixCls}-header`
        },
        bodyCls () {
            return [
                `${prefixCls}-body`,
                {
                    [`${prefixCls}-body-with-search`]: this.filterable,
                    [`${prefixCls}-body-with-footer`]: this.showFooter
                }
            ]
        },
        footerCls () {
            return `${prefixCls}-footer`
        },
        count () {
            let count = this.validKeysCount > 0 ? `${this.validKeysCount}/` : ''
            return `${count}${this.data.length}`
        },
        checkedAll () {
            return this.filterData.filter(item => !item.disabled).length === this.validKeysCount && this.validKeysCount !== 0
        },
        checkedAllDisabled () {
            return this.filterData.filter(item => !item.disabled).length <= 0
        },
        filterData () {
            return this.showItems.filter(item => this.filterMethod(item, this.query))
        }
    },
    methods: {
        itemCls (item) {
            return [
                `${prefixCls}-content-item`,
                {
                    [`${prefixCls}-content-item-disabled`]: item.disabled
                }
            ]
        },
        updateFilteredData () {
            this.showItems = this.data
        },
        handleQueryClear () {
            this.query = ''
        },
        handleQueryChange (val) {
            this.query = val
        },
        showLabel (item) {
            return this.renderFormat(item)
        },
        isCheck (item) {
            return this.checkedKeys.some(key => key === item.key)
        },
        select (item) {
            if (item.disabled) return
            let index = this.checkedKeys.indexOf(item.key)
            index > -1 ? this.checkedKeys.splice(index, 1) : this.checkedKeys.push(item.key)
            this.$parent.handleCheckedKeys()
        },
        toggleSelectAll (status) {
            let keys = status
                ? this.filterData.filter(data => !data.disabled || this.checkedKeys.indexOf(data.key) > -1).map(data => data.key)
                : this.filterData.filter(data => data.disabled && this.checkedKeys.indexOf(data.key) > -1).map(data => data.key)
            this.$emit('on-checked-keys-change', keys)
        }
    },
    created () {
        this.updateFilteredData()
    },
    mounted () {
        this.showFooter = this.$slots.default !== undefined
    }
}
</script>
