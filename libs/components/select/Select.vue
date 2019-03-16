<template>
    <div :class='selectGroupClasses'>
        <div v-if='label'
             :class='[prefixCls+`-label`]'
             :style='labelStyles'
        >{{label}}
        </div>
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
                @mouseenter="clearShow = clearable && true"
                @mouseleave="clearShow = clearable && false">
                <input type="hidden" :name="name" :value="publicValue">
                <div :class='[`${prefixCls}-show-selection`]'>
                    <span v-if='showContent' :class="showSelectedCls">{{showValue || localePlaceholder}}</span>
                    <template v-if='multiple'>
                        <div
                            v-for="item in multipleValues"
                            :key='item.value'
                            :class="[prefixCls+`-tag`]">
                            <span v-text="showMultipleValues(item)"></span>
                            <Icon v-if="showMultipleIcon" type='quxiao-guanbi-shanchu' @click.native.stop='removeTag(item)'></Icon>
                        </div>
                    </template>
                    <input
                        type="text"
                        v-if="filterabled"
                        v-show='inputShow'
                        v-model="query"
                        :disabled="disabled"
                        :class="[prefixCls + '-input']"
                        :placeholder="localePlaceholder"
                        :style="inputStyle"
                        autocomplete="off"
                        spellcheck="false"
                        @keydown.exact="slideDropAndSetInput"
                        @focus="onInputFocus"
                        @keydown.delete="handleInputDelete"
                    />
                </div>
                <Icon
                    type='xia'
                    v-if='!disabled'
                    v-show='iconShow'
                    :class="[prefixCls+`-arrow`]">
                </Icon>
                <Icon
                    type='shibai-mian'
                    v-if='clearable && showMultipleIcon'
                    v-show='closeIcon'
                    :class="[prefixCls+`-arrow`]"
                    @click.native.stop='clearValues'>
                </Icon>
            </div>
            <slot>
                <transition name='slide'>
                    <Drop
                        v-show='show'
                        :width='dropWidth'
                    >
                        <ul v-if='notFoundData'>
                            <li :class='[prefix+`option`]'>{{notFoundText}}</li>
                        </ul>
                        <ul v-if='(dropList.length > 0) && !loading'>
                            <Option
                                v-for='item in dropList'
                                :key='item.value'
                                :value='item.value'
                                :label='item.label'
                                :disabled='item.disabled'
                                :multiple='multiple'
                                :publicValue='publicValue'>
                            </Option>
                        </ul>
                        <ul v-if='loading'>
                            <li :class='[prefix+`option`]'>{{loadingText}}</li>
                        </ul>
                    </Drop>
                </transition>
            </slot>

        </div>
    </div>
</template>
<script>
import Drop from './Dropdown'
import Option from './Option'
import Emitter from '../../mixins/emitter'
import clickOutside from '../../utils/directives/clickOutside'
import { typeOf } from '../../utils/assist'
import { prefix } from '../../utils/common'
import Icon from '../icon'

const prefixCls = prefix + 'select'

export default {
    name: prefixCls,
    mixins: [Emitter],
    directives: {clickOutside},
    components: {Drop, Option, Icon},
    data () {
        return {
            prefix,
            prefixCls,
            show: false,
            clearShow: false,
            values: [],
            isFocused: false,
            query: '',
            lastRemoteQuery: '',
            dropWidth: null,
            dropStatus: false
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
            default: 'label'
        },
        codeKey: {
            type: String,
            default: 'value'
        },
        nameInCode: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        clearable: {
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
        size: {
            default: 'default',
            validator: function (value) {
                return ['large', 'small', 'default'].indexOf(value) !== -1
            }
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
        },
        remoteFn: {
            type: Function
        },
        label: {
            type: [String, Number],
            default: ''
        },
        labelWidth: {
            type: [String, Number],
            default: '72'
        },
        fixed: {
            type: Boolean,
            default: false
        },
        defaultOpt: {
            type: Object,
            default () {
                return {
                    childrenKey: 'children',
                    nameKey: 'name',
                    disabledKey: 'disabled',
                    checkedKey: 'checked',
                    expandKey: 'expand',
                    selectedKey: 'selected',
                    indeterminateKey: 'indeterminate',
                    idKey: 'id'
                }
            }
        },
        treeValues: { // 兼容label-tree 的缓存 values
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        selectGroupClasses () {
            return [
                `${prefixCls}-container`,
                {
                    [`${prefixCls}-group`]: this.label && !this.fixed,
                    [`${prefixCls}-group-fixed`]: this.label && this.fixed,
                    [`${prefixCls}-group-fixed-focused`]: this.isFocused && this.show && !!this.label && !!this.fixed
                }
            ]
        },
        selectClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-multiple`]: this.multiple,
                    [`${prefixCls}-${this.size}`]: this.size,
                    [`${this.className}`]: this.className
                }
            ]
        },
        classes () {
            return [
                `${prefixCls}-selection`,
                {
                    [`${prefixCls}-show`]: this.show, // 旋转小icon
                    [`${prefixCls}-selection-focused`]: this.isFocused && this.show && (!this.label || !this.fixed),
                    [`${prefixCls}-selection-disabled`]: this.disabled,
                    [`${prefixCls}-selection-autowarp`]: this.multiple && !this.autowarp
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
                width: this.width && `${this.width}px`
            }
        },
        labelStyles () {
            return {
                width: this.labelWidth && `${this.labelWidth}px`
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
            const {query, $el} = this
            let width = $el && $el.clientWidth
            let inputWidth = query.length * 12 + 20
            if (width && inputWidth >= width) { // 如果当前的input的宽度大于select整体宽度 则input的宽度为select宽度减去padding
                return width - 24
            } else {
                this.broadcastPopperUpdate()
                return inputWidth
            }
        },
        inputShow () {
            const {multiple, show, values} = this
            return !multiple || ((show && multiple) || !values.length)
        },
        iconShow () {
            const {clearable, clearShow, values, disabled} = this
            return clearable && clearShow ? !values.length : !disabled
        },
        closeIcon () {
            const {disabled, clearShow, values, treeValues} = this
            return !disabled && clearShow && (values.length || treeValues.length)
        },
        showValue () {
            const {multiple, values, treeValues} = this
            if (multiple) {
                return ''
            } else if (treeValues.length) {
                return treeValues[0] ? treeValues[0].name : ''
            } else {
                return values[0] ? values[0].label : ''
            }
        },
        showContent () {
            // 非筛选时  单选   多选切未选中
            const {multiple, values, filterabled, treeValues} = this
            return !filterabled && (!multiple || (multiple && !values.length && !treeValues.length))
        },
        localePlaceholder () {
            const {values, placeholder} = this
            return (values && values.length > 0) ? '' : placeholder
        },
        publicValue () {
            const {multiple, values, value} = this
            let s = multiple ? values.map(option => option.value) : (values[0] || {}).value
            console.log('value', s, value)
            return s
        },
        notFoundData () {
            const {filterabled, dropList, loading} = this
            return dropList && dropList.length === 0 && filterabled && !loading
        },
        tabindex () {
            return this.disabled || 0
        },
        dropList () {
            const {options, filterabled, filterFn, query, remoteFn} = this
            let dropList = options.map(item => {
                return typeOf(item) === 'object' && {
                    value: item[this.codeKey],
                    label: item[this.nameKey],
                    disabled: item.disabled || false
                }
            })
            if (filterabled && !remoteFn) {
                if (filterFn) {
                    dropList = dropList.filter(item => this.filterFn(query, item))
                } else {
                    dropList = dropList.filter(({label}) => label.indexOf(query) > -1)
                }
            }
            return dropList || []
        },
        multipleValues () {
            return this.treeValues.length ? this.treeValues : this.values
        },
        showMultipleIcon () {
            const {treeValues, multiple} = this
            if (multiple && treeValues.length) return false
            return true
        }
    },
    mounted () {
        this.$on('on-select-selected', this.onOptionClick)
        if (this.options && this.options.length > 0) {
            this.values = this.getInitValue().map(value => {
                if (typeof value !== 'number' && !value) return null
                return this.getOptionData(value)
            }).filter(Boolean)
        }
        this.fixedInitDrop()
    },
    methods: {
        clickOutside () {
            if (this.filterabled) {
                if (this.multiple && this.values.length > 0) {
                    this.query = ''
                } else if (this.values.length > 0) {
                    this.query = this.showValue
                }
            }
            this.broadcastPopperUpdate()
            this.show = false
        },
        onOptionClick (option) {
            const {multiple, filterabled, values} = this
            if (multiple) {
                if (filterabled) {
                    this.query = ''
                }
                let isLive = values.filter(({value}) => value === option.value) || []
                if (isLive.length) { // 如果点击的已存在values中 则过滤
                    this.values = values.filter(({value}) => value !== option.value)
                } else {
                    this.values = values.concat(option)
                }
            } else {
                this.values = [option]
                this.toggleMenu()
            }
            this.broadcastPopperUpdate()
        },
        getInitValue () { // []
            const {multiple, value} = this
            let initValue = typeOf(value) === 'array' ? value : [value]
            if (!multiple && (typeOf(initValue[0]) === 'undefined' || String(initValue[0]).trim() === '')) { initValue = [] }
            return initValue
        },
        getOptionData (val) {
            const {multiple, dropList} = this
            if (multiple) {
                let items = dropList.filter(({value}) => val && val.indexOf(value) > -1)
                return items && items[0]
            } else {
                let item = dropList.filter(({value}) => value === val)
                return item && item[0]
            }
        },
        toggleHeaderFocus ({type}) {
            if (this.disabled) return
            this.isFocused = type === 'focus'
            this.$emit('on-focus')
        },
        toggleMenu () {
            if (this.disabled) {
                return false
            }
            this.show = !this.show
            this.$emit('on-click')
            if (this.show) { this.broadcastPopperUpdate() }
        },
        removeTag (item) {
            const {disabled, values} = this
            if (!disabled) {
                this.values = values.filter(({value}) => value !== item.value)
                this.broadcastPopperUpdate()
            }
            this.$emit('on-clear', item)
        },
        clearValues () {
            this.values = []
            this.$emit('on-clear')
        },
        slideDropAndSetInput () {
            this.show = true
        },
        onInputFocus () {
            this.isFocused = true
        },
        handleInputDelete () {
            const {query, values, multiple} = this
            if (!query && multiple) {
                this.values = values.slice(0, values.length - 1)
            }
        },
        fixedInitDrop () {
            // cmoputed frop width
            const {label, $el} = this
            if (label && $el) {
                let clientWidth = $el.clientWidth
                let labelWidth = +$el.querySelector(`.${prefixCls}-label`).clientWidth
                this.dropWidth = clientWidth - labelWidth
            } else {
                this.dropWidth = $el.clientWidth
            }
        },
        broadcastPopperUpdate () {
            this.broadcast(`${prefix}drop`, 'on-update-popper')
        },
        showMultipleValues (item) {
            const {defaultOpt, treeValues} = this
            return treeValues.length ? item[defaultOpt.nameKey] : item.label
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
            const {values, multiple, value, publicValue, nameInCode} = this
            const newValue = JSON.stringify(now)
            const oldValue = JSON.stringify(before)
            const emitInput = newValue !== oldValue && publicValue !== value
            this.query = values.length > 0 ? (multiple ? '' : values[0].label) : ''
            if (emitInput) {
                this.$emit('input', publicValue) // to update v-model
                this.$emit('on-change', nameInCode ? (multiple ? values : values[0]) : publicValue)
                this.dispatch('FormItem', 'on-form-change', nameInCode ? values : publicValue)
            }
        },
        isFocused (val) {
            if (!val) {
                this.show = false
            }
        },
        show (val) {
            if (val && this.multiple && this.filterabled) {
                this.$nextTick(() => {
                    this.$el.querySelector(`[type='text']`).focus()
                })
            }
            this.broadcast(`${prefix}drop`, this.show ? 'on-update-popper' : 'on-destroy-popper')
        },
        query () {
            const {filterabled, remoteFn, query} = this
            if (filterabled && remoteFn && query !== '') {
                this.remoteFn(query)
            }
        },
        options () {
            this.values = this.getInitValue().map(value => {
                if (typeof value !== 'number' && !value) return null
                return this.getOptionData(value)
            }).filter(Boolean)
        }
    }
}
</script>
