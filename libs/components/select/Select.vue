<template>
    <div :class='[boxClasses]'
         :style='selectBoxStyles'
         v-click-outside="clickOutside"
    >
        <div :class='selectGroupClasses'
            @mouseenter="clearShow = clearable && true"
            @mouseleave="clearShow = clearable && false">
            <div v-if='label'
                 :class='[prefixCls+`-label`]'
                 :style='labelStyles'
            >{{label}}
            </div>
            <div
                ref="reference"
                :class="classes"
                :style='[selectWidth]'
                :tabindex="tabindex"
                @blur="toggleHeaderFocus"
                @focus="toggleHeaderFocus"
                @click="toggleMenu"
                @keydown.esc="handleKeydown"
                @keydown.enter="handleKeydown"
                @keydown.up.prevent="handleKeydown"
                @keydown.down.prevent="handleKeydown"
                @keydown.tab="handleKeydown"
                @keydown.delete="handleInputDelete">
                <input type="hidden" :name="name" :value="publicValue">
                <div :class='[`${prefixCls}-main-flex`]'>
                    <span v-if='showContent' :class="showSelectedCls">{{showValue || localePlaceholder}}</span>
                    <template v-if='multiple'>
                        <div
                            v-for="item in multipleValues"
                            :key='item.value'
                            :class="[prefixCls+`-tag`]">
                            <span v-text="showMultipleValues(item)"></span>
                            <Icon v-if="showMultipleIcon" type='quxiao-guanbi-shanchu'
                                  @click.native.stop='removeTag(item)'></Icon>
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
                        @blur='onInputBlur'
                        @keydown.exact="slideDropAndSetInput"
                        @focus="onInputFocus"
                        @keydown.delete="handleInputDelete"
                    />
                </div>
            </div>
            <div :class="[prefixCls+`-icon`]">
                <Icon
                    type='xia'
                    v-if='!disabled && !autoComplete'
                    v-show='iconShow'
                    :class="[prefixCls+`-arrow`]">
                </Icon>
                <Icon
                    type='shibai-mian'
                    v-if='clearable'
                    v-show='closeIcon'
                    :class="[prefixCls+`-arrow`]"
                    @click.native.stop='clearValues'>
                </Icon>
            </div>
        </div>
        <slot name='tree'>
            <transition name='slide'>
                <Drop
                    v-show='dropShow'
                    :class='dropTransferCls'
                    :width='dropWidth'
                    :placement='placement'
                    ref="dropdown"
                    :data-transfer="transfer"
                    :transfer="transfer"
                    v-transfer-dom
                >
                    <ul v-if='notFoundData'>
                        <li :class='[prefix+`option-tip`,]'>{{notFoundText}}</li>
                    </ul>
                    <ul v-if='(dropList.length > 0) && !loading && !group'>
                        <Option
                            v-for='item in dropList'
                            :key='item.value'
                            :value='item.value'
                            :label='item.label'
                            :disabled='item.disabled'
                            :isFocused='JSON.stringify(item) === focusValue'
                            :multiple='multiple'
                            :publicValue='publicValue'>
                        </Option>
                    </ul>
                    <ul v-if='(dropList.length > 0) && !loading && group'>
                        <li v-for='s in dropList' :key='s.label'>
                            <p :class='[prefixCls+`-group-label`]'>{{s.label}}</p>
                            <ul>
                                <Option
                                    v-for='item in s.options'
                                    :key='item.value'
                                    :value='item.value'
                                    :label='item.label'
                                    :isFocused='JSON.stringify(item) === focusValue'
                                    :disabled='item.disabled'
                                    :multiple='multiple'
                                    :publicValue='publicValue'>
                                </Option>
                            </ul>
                        </li>
                    </ul>
                    <ul v-if='loading'>
                        <li :class='[prefix+`option-tip`]'>{{loadingText}}</li>
                    </ul>
                </Drop>
            </transition>
        </slot>
        <functional-options
            :slot-update-hook="updateSlotOptions"
            :slot-options="slotOptions"
        ></functional-options>
    </div>
</template>
<script>
import Drop from './Dropdown'
import Option from './Option'
import Emitter from '../../mixins/emitter'
import clickOutside from '../../utils/directives/clickOutside'
import TransferDom from '../../utils/directives/transfer-dom'
import { typeOf } from '../../utils/assist'
import { prefix, propsInit } from '../../utils/common'
import Icon from '../icon'
import FunctionalOptions from './functional-options.vue'

const prefixCls = prefix + 'select'

const findChildrenText = (componentOptions = {}, cData = {}) => {
    let text = ''
    let children = componentOptions.children
    text += (cData.domProps && cData.domProps.textContent) || ''
    if (!children) return text
    for (let vnode of children) {
        const cOptions = vnode.componentOptions
        const cData = vnode.data
        text += vnode.text || ''
        text += findChildrenText(cOptions, cData)
    }
    return text
}

const initGroupList = (list) => {
    let container = []
    for (let item of list) {
        container = container.concat(item.options)
    }
    return container
}

const findChild = (instance, checkFn) => {
    let match = checkFn(instance)
    if (match) return instance
    for (let i = 0, l = instance.$children.length; i < l; i++) {
        const child = instance.$children[i]
        match = findChild(child, checkFn)
        if (match) return match
    }
}

export default {
    name: prefixCls,
    mixins: [Emitter],
    directives: {clickOutside, TransferDom},
    components: {FunctionalOptions, Drop, Option, Icon},
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
            stylePloyfill: false,
            selectWidth: {},
            slotOptions: this.$slots.default,
            selectOptions: this.options,
            focusIndex: -1,
            focusValue: null
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
        placeholder: {
            type: String,
            default: '请选择'
        },
        className: {
            type: String,
            default: ''
        },
        size: {
            default: 'default',
            validator: function (value) {
                return ['large', 'small', 'default'].indexOf(value) !== -1
            }
        },
        notFoundText: {
            type: String,
            default: '无匹配数据'
        },
        loadingText: {
            type: String,
            default: '加载中..'
        },
        filterFn: {
            type: Function
        },
        remoteFn: {
            type: Function
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        // props type为[Number, String]的配置
        ...propsInit({
            // label label样式的文字描述
            // width input的宽度
            // labelWidth label样式的文字的宽度 仅在fixed为false时有效
            props: ['label', 'width', 'labelWidth'],
            config: {
                type: [Number, String]
            }
        }),
        // props type为 Boolean 的配置
        ...propsInit({
            // nameInCode 返回值包含value 与 label
            // multiple 多选
            // clearable 清空
            // disabled disabled
            // autowarp 多选的时候是否仅单行显示
            // filterabled 筛选
            // loading loading
            // fixed label的两种样式
            // transfer 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
            // auto-complete 在auto-comoplete中使用select
            props: ['nameInCode', 'multiple', 'clearable', 'disabled', 'autowarp', 'filterabled', 'loading', 'fixed', 'group', 'transfer', 'autoComplete'],
            config: {
                type: Boolean,
                default: false
            }
        }),
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
                    idKey: 'id',
                    focusIndex: -1
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
        boxClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-group`]: this.label && !this.fixed && this.stylePloyfill,
                    [`${this.className}`]: this.className
                }
            ]
        },
        selectGroupClasses () {
            return [
                {
                    [`${prefixCls}-${this.size}`]: this.size,
                    [`${prefixCls}-fixed-disabled`]: this.label && this.fixed && this.disabled,
                    [`${prefixCls}-multiple`]: this.multiple,
                    [`${prefixCls}-group-fixed`]: this.label && this.fixed && this.stylePloyfill,
                    [`${prefixCls}-group-fixed-focused`]: this.isFocused && this.show && !!this.label && !!this.fixed
                }
            ]
        },
        classes () {
            return [
                `${prefixCls}-main`,
                {
                    [`${prefixCls}-show`]: this.show, // 旋转小icon
                    [`${prefixCls}-focused`]: this.isFocused && this.show && (!this.label || !this.fixed),
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-autowarp`]: this.multiple && this.autowarp
                }
            ]
        },
        showSelectedCls () {
            return [
                `${prefixCls}-main-content`,
                {
                    [`${prefixCls}-main-placeholder`]: this.localePlaceholder && (!this.showValue || this.multiple),
                    [`${prefixCls}-filterabled`]: !this.filterabled && this.multiple
                }
            ]
        },
        dropTransferCls () {
            return {
                [prefix + 'drop-transfer']: this.transfer
            }
        },
        labelStyles () {
            const {label, labelWidth} = this
            let style = {}
            if (label && labelWidth) {
                style = {
                    width: `${labelWidth}px`
                }
            }
            return style
        },
        selectBoxStyles () {
            const {label, fixed, width} = this
            let style = {}
            if ((!label || (label && fixed)) && width) {
                style.width = `${width}px`
            }
            return style
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
        dropShow () {
            if (this.autoComplete) {
                return this.show && this.dropList.length
            } else {
                return this.show
            }
        },
        inputShow () {
            const {multiple, show, values} = this
            return !multiple || ((show && multiple) || !values.length) || this.remoteFn
        },
        iconShow () {
            const {clearable, clearShow, values, disabled, treeValues} = this
            return clearable && clearShow ? !(values.length || treeValues.length) : !disabled
        },
        closeIcon () {
            const {disabled, clearShow, values, treeValues, autoComplete, query} = this
            return !disabled && clearShow && (values.length || treeValues.length || (autoComplete && query !== ''))
        },
        showValue () {
            const {multiple, values, treeValues, defaultOpt} = this
            if (multiple) {
                return ''
            } else if (treeValues.length) {
                return treeValues[0] ? treeValues[0][defaultOpt.nameKey] : ''
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
            const {multiple, values} = this
            return multiple ? values.map(option => option.value) : (values[0] || {}).value
        },
        notFoundData () {
            const {dropList, loading} = this
            return dropList && dropList.length === 0 && !loading
        },
        tabindex () {
            return this.disabled || 0
        },
        dropList () {
            const {selectOptions, filterabled, query, remoteFn, codeKey, nameKey, group} = this
            let dropList = (selectOptions || []).map(item => {
                if (group) {
                    return item
                }
                return typeOf(item) === 'object' && {
                    value: item[codeKey],
                    label: item[nameKey],
                    disabled: item.disabled || false
                }
            })
            if (filterabled && !remoteFn) {
                if (group) {
                    dropList = this.filterOption(dropList, query)
                } else {
                    dropList = dropList.filter(item => this.filterOptionFn(query, item))
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
        this.selectOptionsInit()
        this.$on('on-select-selected', this.onOptionClick)
        if (this.selectOptions && this.selectOptions.length > 0) {
            this.values = this.valuesInit()
        }
        this.widthInit()
        if (this.filterabled && this.remoteFn && this.value) {
            this.query = this.multiple ? this.value[0] : this.value
        }
    },
    methods: {
        updateSlotOptions () {
            this.slotOptions = this.$slots.default
            this.selectOptionsInit()
        },
        selectOptionsInit () {
            const selectOptions = []
            if (this.slotOptions) {
                for (let option of this.slotOptions) {
                    const cOptions = option.componentOptions
                    const cData = option.data
                    if (!cOptions) continue
                    let label = ''
                    if (cOptions.propsData.label === undefined) {
                        // 兼容v-text 兼容 {{}}传递label数据
                        label = findChildrenText(cOptions, cData)
                        selectOptions.push({
                            value: cOptions.propsData.value,
                            label
                        })
                    } else {
                        selectOptions.push(cOptions.propsData)
                    }
                }
                this.selectOptions = selectOptions
            } else if (this.autoComplete) {
                this.selectOptions = []
            }
        },
        widthInit () {
            const {label, fixed, $el} = this
            let width = ''
            if (label && fixed) { //
                let clientWidth = parseInt($el.style.width) || parseInt($el.clientWidth)
                let labelWidth = this.labelWidth || +$el.querySelector(`.${prefixCls}-label`).clientWidth
                width = clientWidth - labelWidth - 2
                this.selectWidth = {
                    width: width + 'px'
                }
            } else if (label) {
                width = this.width || this.$refs.reference.clientWidth
                this.selectWidth = {
                    width: width + 'px'
                }
            }
            this.dropWidth = width
            this.stylePloyfill = true // 兼容table-cell设置在width之前不生效
            this.$emit('get-drop-width', this.dropWidth)
        },
        dropWidthInit () {
            const {label, fixed, $el} = this
            let width = $el.clientWidth
            if (label && fixed) { //
                let clientWidth = $el.clientWidth
                let labelWidth = this.labelWidth || +$el.querySelector(`.${prefixCls}-label`).clientWidth
                width = clientWidth - labelWidth - 2
            } else if (label) {
                width = this.width || this.$refs.reference.clientWidth
            }
            this.dropWidth = width
        },
        valuesInit () {
            return this.getInitValue().map(value => {
                if (typeof value !== 'number' && !value) return null
                return this.getOptionData(value)
            }).filter(Boolean)
        },
        clickOutside () {
            const {filterabled, values, multiple, showValue, broadcastPopperUpdate} = this
            if (this.transfer) {
                const {$el} = this.$refs.dropdown
                if ($el === event.target || $el.contains(event.target)) {
                    return
                }
            }
            if (filterabled && !multiple && values.length > 0) {
                this.query = showValue
            }
            broadcastPopperUpdate()
            this.show = false
            this.$emit('on-outside')
        },
        onOptionClick (option) {
            const {multiple, filterabled, values, toggleMenu, broadcastPopperUpdate} = this
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
                if (filterabled) {
                    this.query = option.label
                }
                this.values = [option]
                toggleMenu()
            }
            broadcastPopperUpdate()
            this.focusValue = JSON.stringify(option)
        },
        getInitValue () { // []
            const {multiple, value} = this
            let initValue = typeOf(value) === 'array' ? value : [value]
            if (!multiple && (typeOf(initValue[0]) === 'undefined' || String(initValue[0]).trim() === '')) { initValue = [] }
            return initValue
        },
        getOptionData (val) {
            const {group, dropList} = this
            let item = []
            if (group) {
                let list = dropList.filter((item) => item.options.filter(({value}) => value === val).length > 0)
                const options = list[0] && list[0].options
                item = options && options.filter(({value}) => value === val)
            } else {
                item = dropList.filter(({value}) => value === val)
            }
            return item && item[0]
        },
        filterOption (dropList, query) {
            let list = dropList.filter((item) => item.options.filter((item) => this.filterOptionFn(query, item)).length > 0)
            list = JSON.parse(JSON.stringify(list))
            return list.map((item) => {
                item.options = item.options.filter(item => this.filterOptionFn(query, item))
                return item
            })
        },
        filterOptionFn (query, item) {
            const {filterFn} = this
            if (filterFn) {
                return this.filterFn(query, item)
            } else {
                return item.label.indexOf(query) > -1
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
            if (this.show) {
                this.broadcastPopperUpdate()
                this.dropWidthInit()
            }
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
            this.query = ''
            let type = this.multiple ? 'checked' : 'select'
            this.$emit('on-clear', type)
        },
        slideDropAndSetInput () {
            this.show = true
        },
        onInputFocus (event) {
            this.isFocused = true
            if (this.autoComplete) { this.$emit('on-focus', event) }
        },
        onInputBlur (event) {
            if (this.autoComplete) { this.$emit('on-blur', event) }
        },
        handleInputDelete () {
            const {query, values, multiple} = this
            if (!query && multiple) {
                this.values = values.slice(0, values.length - 1)
            }
            this.broadcastPopperUpdate()
        },
        broadcastPopperUpdate () {
            this.broadcast(`${prefix}drop`, 'on-update-popper')
        },
        showMultipleValues (item) {
            const {defaultOpt, treeValues} = this
            return treeValues.length ? item[defaultOpt.nameKey] : item.label
        },
        handleKeydown (e) {
            if (e.key === 'Backspace') {
                return // so we don't call preventDefault
            }
            if (this.show) {
                if (this.$slots.tree) return
                e.preventDefault()
                if (e.key === 'Tab') {
                    e.stopPropagation()
                }

                // Esc
                if (e.key === 'Escape') {
                    e.stopPropagation()
                    this.show = false
                }
                // next
                if (e.key === 'ArrowUp') {
                    this.navigateOptions(-1)
                }
                // prev
                if (e.key === 'ArrowDown') {
                    this.navigateOptions(1)
                }
                // enter
                if (e.key === 'Enter') {
                    if (this.focusIndex === -1) this.show = false
                    this.onOptionClick(JSON.parse(this.focusValue))
                }
            } else {
                const keysThatCanOpenSelect = ['ArrowUp', 'ArrowDown']
                if (keysThatCanOpenSelect.includes(e.key)) this.toggleMenu()
            }
        },
        navigateOptions (direction) {
            let dropList = this.dropList
            if (this.group) {
                dropList = initGroupList(this.dropList)
            }
            const optionsLength = dropList.length - 1

            let index = this.focusIndex + direction

            if (index < 0) index = optionsLength
            if (index > optionsLength) index = 0

            if (direction > 0) {
                let nearestActiveOption = -1
                for (let i = 0; i < dropList.length; i++) {
                    const optionIsActive = !dropList[i].disabled
                    if (optionIsActive) nearestActiveOption = i
                    if (nearestActiveOption >= index) break
                }
                index = nearestActiveOption
            } else {
                let nearestActiveOption = dropList.length
                for (let i = optionsLength; i >= 0; i--) {
                    const optionIsActive = !dropList[i].disabled
                    if (optionIsActive) nearestActiveOption = i
                    if (nearestActiveOption <= index) break
                }
                index = nearestActiveOption
            }
            this.focusIndex = index
            this.focusValue = JSON.stringify(dropList[index])
        }
    },
    watch: {
        value (val) {
            let {publicValue, getInitValue, getOptionData, autoComplete} = this
            if (val === '') {
                this.values = []
                this.query = ''
                this.focusIndex = -1
                this.focusValue = null
            } else if (JSON.stringify(val) !== JSON.stringify(publicValue)) {
                if (autoComplete) { this.query = val }
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
            if (!this.query && !this.remoteFn) {
                this.query = values.length > 0 ? (multiple ? '' : values[0].label) : ''
            }
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
            // this.broadcast(`${prefix}drop`, this.show ? 'on-update-popper' : 'on-destroy-popper')
        },
        query () {
            const {filterabled, remoteFn, query, autoComplete} = this
            if (autoComplete && this.query === '') {
                this.values = []
            }
            if ((filterabled && remoteFn && query !== '') || autoComplete) {
                this.remoteFn(query)
            }
        },
        selectOptions (now, before) {
            const {multiple, value, nameInCode, codeKey} = this
            const newValue = JSON.stringify(now)
            const oldValue = JSON.stringify(before)
            if (multiple && this.values.length > 0) {
                let values = this.values.concat(this.valuesInit())
                let unique = {}
                values.forEach(item => {
                    unique[item[codeKey]] = item
                })
                this.values = Object.keys(unique).map(item => {
                    return unique[item]
                })
            } else {
                this.values = this.valuesInit()
            }
            if (newValue !== oldValue) {
                this.$emit('on-change', nameInCode ? (multiple ? this.values : this.values[0]) : value)
                this.dispatch('FormItem', 'on-form-change', nameInCode ? this.values : value)
            }
            this.broadcastPopperUpdate()
        },
        options (now, before) {
            this.selectOptions = now
        },
        focusIndex (index) {
            if (index < 0 || this.autoComplete) return

            const optionValue = JSON.parse(this.focusValue)[this.codeKey]
            const optionInstance = findChild(this, ({$options}) => {
                return $options.name === (prefix + 'option') && $options.propsData.value === optionValue
            })
            let bottomOverflowDistance = optionInstance.$el.getBoundingClientRect().bottom - this.$refs.dropdown.$el.getBoundingClientRect().bottom
            let topOverflowDistance = optionInstance.$el.getBoundingClientRect().top - this.$refs.dropdown.$el.getBoundingClientRect().top
            if (bottomOverflowDistance > 0) {
                this.$refs.dropdown.$el.scrollTop += bottomOverflowDistance
            }
            if (topOverflowDistance < 0) {
                this.$refs.dropdown.$el.scrollTop += topOverflowDistance
            }
        }
    }
}
</script>
