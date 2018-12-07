<template>
    <div
        v-click-outside="clickOutside"
        :style='widthStyle'
        :class="selectClasses">
        <div
            ref="reference"
            :class="classes"
            :tabindex="tabindex"
            @blur="toggleHeaderFocus"
            @focus="toggleHeaderFocus"
            @click="toggleMenu"
            @mouseenter="clearShow = clearabled && true"
            @mouseleave="clearShow =  clearabled && false">
            <slot name="input">
                <input type="hidden" :name="name" :value="publicValue">
                <div style='position:relative'>
                    <span v-if='!multiple && !filterabled'
                          :class="showSelectedCls">{{showValue || localePlaceholder}}</span>
                    <span v-if='multiple && !filterabled && !values.length' :class="showSelectedCls">{{localePlaceholder}}</span>
                    <div v-if='multiple' v-for="item in values" :key='item.code' :class="[prefixCls+`-tag`]">
                        <span>{{item.name}}</span>
                        <b-icon type='quxiao-guanbi-shanchu' @click.native.stop='removeTag(item)'></b-icon>
                    </div>
                    <input
                        type="text"
                        v-if="filterabled"
                        v-model="query"
                        :disabled="disabled"
                        :class="[prefixCls + '-input']"
                        :placeholder="localePlaceholder"
                        :style="inputStyle"
                        autocomplete="off"
                        spellcheck="false"
                        @keydown="slideDropAndSetInput"
                        @focus="onInputFocus"
                        @keydown.delete="handleInputDelete"
                    />
                </div>
                <b-icon
                    type='xia'
                    v-if='iconShow'
                    :class="[prefixCls+`-arrow`]">
                </b-icon>
                <b-icon
                    type='shibai-mian'
                    v-if='closeIcon'
                    :class="[prefixCls+`-arrow`]"
                    @click.native.stop='clearValues'>
                </b-icon>
            </slot>
        </div>
        <transition name='fade'>
            <Drop
                v-show='show'>
                <ul v-show='notFoundData'>
                    <li :class='[prefix+`option`]'>{{notFoundText}}</li>
                </ul>
                <ul v-if='dropList.length > 0'>
                    <Option
                        v-for='item in dropList'
                        :key='item.code'
                        :code='item.code'
                        :name='item.name'
                        :disabled='item.disabled'
                        :multiple='multiple'
                        :publicValue='publicValue'>
                    </Option>
                </ul>
                <ul v-show='loading'>
                    <li :class='[prefix+`option`]'>{{loadingText}}</li>
                </ul>
            </Drop>
        </transition>
    </div>
</template>
<script>
import Drop from './Dropdown'
import Option from './Option'
import Emitter from '&/mixins/emitter'
import clickOutside from '&/utils/directives/clickOutside'
import { typeOf } from '&/utils/assist'
import { prefix } from '&/utils/common'

const prefixCls = prefix + 'select'

export default {
    name: prefixCls,
    mixins: [Emitter],
    directives: {clickOutside},
    components: {Drop, Option},
    data () {
        return {
            prefix,
            prefixCls: prefixCls,
            show: false,
            clearShow: false,
            values: [],
            query: '',
            dropList: []
        }
    },
    props: {
        // 双向绑定
        value: {
            type: [String, Number, Array],
            default: ''
        },
        name: {
            type: String
        },
        options: {
            type: Array
        },
        nameKey: {
            type: String,
            default: 'name'
        },
        codeKey: {
            type: String,
            default: 'code'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        clearabled: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        className: {
            type: String,
            default: ''
        },
        autowarp: { // 多选的时候是否仅单行显示
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number]
        },
        filterabled: {
            type: Boolean,
            default: false
        },
        notFoundText: {
            type: String,
            default: '无匹配数据'
        },
        loadingText: {
            type: String,
            default: '加载中..'
        },
        loading: {
            type: Boolean,
            default: false
        },
        filterFn: {
            type: Function
        }
    },
    computed: {
        selectClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-multiple`]: this.multiple,
                    [`${this.className}`]: this.className
                }
            ]
        },
        classes () {
            return [
                `${prefixCls}-selection`,
                {
                    [`${prefixCls}-show`]: this.show, // 旋转小icon
                    [`${prefixCls}-selection-focused`]: this.isFocused && this.show,
                    [`${prefixCls}-selection-disabled`]: this.disabled,
                    [`${prefixCls}-selection-autowarp`]: !this.autowarp
                }
            ]
        },
        showSelectedCls () {
            return [
                `${prefixCls}-selection-content`,
                {
                    [`${prefixCls}-selection-placeholder`]: this.localePlaceholder && (!this.showValue || this.multiple)
                }
            ]
        },
        widthStyle () {
            return {
                width: this.width ? `${this.width}px` : ''
            }
        },
        inputStyle () {
            let style = {}
            const {multiple, values, inputLength} = this
            if (multiple) {
                if (!values.length) {
                    style.width = '100%'
                } else {
                    style.width = `${inputLength}px`
                }
            }
            return style
        },
        inputLength () {
            const {query} = this
            let width = this.$el && this.$el.clientWidth
            let inputWidth = query.length * 12 + 20
            if (width && inputWidth >= width) { // 如果当前的input的宽度大于select整体宽度 则input的宽度为select宽度减去padding
                return width - 24
            } else {
                return inputWidth
            }
        },
        iconShow () {
            const {clearabled, clearShow, disabled, values} = this
            if (clearabled && clearShow) {
                return !disabled && !values.length
            } else {
                return !disabled
            }
        },
        closeIcon () {
            if (this.clearabled) {
                return !this.disabled && this.clearShow && this.values.length
            } else {
                return false
            }
        },
        showValue () {
            return this.values[0] ? this.values[0].name : ''
        },
        localePlaceholder () {
            const {values, placeholder} = this
            return (values && values.length > 0) ? '' : placeholder
        },
        publicValue () {
            return this.multiple ? this.values.map(option => option.code) : (this.values[0] || {}).code
        },
        notFoundData () {
            const {filterabled, dropList, loading} = this
            return dropList && dropList.length === 0 && filterabled && !loading
        },
        tabindex () {
            return this.disabled || 0
        }
    },
    created () {
        this.optionsInit()
    },
    mounted () {
        this.$on('on-select-selected', this.onOptionClick)

        if (this.options && this.options.length > 0) {
            this.values = this.getInitValue().map(value => {
                if (typeof value !== 'number' && !value) return null
                return this.getOptionData(value)
            }).filter(Boolean)
        }
    },
    methods: {
        isArray (arr) {
            return typeOf(arr) === 'array'
        },
        clickOutside () {
            if (this.filterabled) {
                if (this.multiple && this.values.length > 0) {
                    this.query = ''
                } else if (this.values.length > 0) {
                    this.query = this.showValue
                }
            }
            this.show = false
        },
        optionsInit () {
            let dropList = this.options.map(item => {
                return typeOf(item) === 'object' && {
                    code: item[this.codeKey],
                    name: item[this.nameKey],
                    disabled: item.disabled || false
                }
            })
            if (this.filterabled && this.query) {
                if (this.filterFn) {
                    dropList = dropList.filter(item => this.filterFn(this.query, item))
                } else {
                    dropList = dropList.filter(({name}) => name.indexOf(this.query) > -1)
                }
            }
            this.dropList = dropList
        },
        onOptionClick (option) {
            if (this.multiple) {
                if (this.filterabled) {
                    this.query = ''
                }
                let isLive = this.values.filter(({code}) => code === option.code) || []
                if (isLive.length) { // 如果点击的已存在values中 则过滤
                    this.values = this.values.filter(({code}) => code !== option.code)
                } else {
                    this.values = this.values.concat(option)
                }
            } else {
                if (this.filterabled) {
                    this.query = option.name
                }
                this.values = [option]
                this.toggleMenu()
            }
            this.$emit('on-change', this.values)
        },
        getInitValue () { // []
            const {multiple, value} = this
            let initValue = this.isArray(value) ? value : [value]
            if (!multiple && (typeOf(initValue[0]) === 'undefined' || String(initValue[0]).trim() === '')) { initValue = [] }
            return initValue
        },
        getOptionData (value) {
            if (this.multiple) {
                let items = this.dropList.filter(({code}) => value && value.indexOf(code) > -1)
                return items && items[0]
            } else {
                let item = this.dropList.filter(({code}) => code === value)
                return item && item[0]
            }
        },
        toggleHeaderFocus ({type}) {
            if (this.disabled) return
            this.isFocused = type === 'focus'
            const {isFocused, multiple, filterabled, $el} = this
            if (isFocused && multiple && filterabled) {
                $el.querySelector(`[type='text']`).focus()
            }
        },
        toggleMenu (e) {
            if (this.disabled) {
                return false
            }
            this.show = !this.show
        },
        removeTag (e) {
            if (!this.disabled) { this.values = this.values.filter(({code}) => code !== e.code) }
        },
        clearValues () {
            this.values = []
            this.query = ''
            this.$emit('on-clear')
        },
        slideDropAndSetInput () {
            this.show = true
        },
        onInputFocus () {
            this.isFocused = true
        },
        handleInputDelete () {
            const {query, values} = this
            if (!query) {
                this.values = values.slice(0, values.length - 1)
            }
        }
    },
    watch: {
        value (val) {
            let {publicValue, getInitValue, getOptionData} = this
            if (val === '') {
                this.values = []
            } else if (JSON.stringify(val) !== JSON.stringify(publicValue)) {
                this.$nextTick(() => {
                    this.values = getInitValue().map(getOptionData).filter(Boolean)
                })
            }
        },
        values (now, before) {
            const newValue = JSON.stringify(now)
            const oldValue = JSON.stringify(before)
            console.log('oldValue,newValue', oldValue, newValue)
            const vModelValue = this.values.length > 0 ? (this.multiple ? this.values.map(({code}) => code) : this.values[0].code) : (this.multiple ? [] : '')
            const shouldEmitInput = newValue !== oldValue && vModelValue !== this.value
            if (shouldEmitInput) {
                this.$emit('input', vModelValue) // to update v-model
                this.dispatch('FormItem', 'on-form-change', this.publicValue)
            }
        },
        query (val) {
            this.optionsInit()
        }
    }
}
</script>
