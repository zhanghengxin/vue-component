<template>
    <div
        @mouseenter="clearShow = clearable && true"
        @mouseleave="clearShow = clearable && false"
        :class="classes"
        v-click-outside="handleClose"
        ref="reference">
        <div @click="handClick" :class="relClasses" >
            <slot>
                <b-input
                    :disabled="disabled"
                    :size="size"
                    ref="input"
                    :readonly="!filterable"
                    :placeholder="inputPlaceholder"
                    @on-change="handleInput"
                    :value="displayInputRender"
                ></b-input>
                <div
                    :class="[prefixCls + '-label']"
                    v-show="filterable && query === ''"
                    @click="handleFocus">{{ displayRender }}
                </div>
                <Icon
                    type="xia"
                    :class="[prefixCls + '-arrow']">
                </Icon>
                <Icon
                    type="shibai-mian"
                    :class="[prefixCls + '-arrow']"
                    v-show="showCloseIcon"
                    @click.native.stop="clearSelect">
                </Icon>
            </slot>
        </div>
        <transition name="slide">
            <Drop
                ref="drop"
                v-show="show"
                :data-transfer="transfer"
                :transfer="transfer"
                v-transfer-dom>
                <div>
                    <Caspanel
                        ref="caspanel"
                        v-show="!filterable || (filterable && query === '')"
                        :trigger="trigger"
                        :change-on-select="changeOnSelect"
                        :prefix-cls="prefixCls"
                        :data="data">
                    </Caspanel>
                    <div :class="[prefixCls + '-dropdown']"
                         v-show="filterable && query !== '' && querySelections.length">
                        <ul :class="[selectPrefixCls + '-dropdown-list']">
                            <li :class="[selectPrefixCls + '-item', {
                                    [selectPrefixCls + '-item-disabled']: item.disabled
                                }]"
                                v-for="(item, index) in querySelections"
                                :key="index"
                                @click="handleSelectItem(index)" v-html="item.display"></li>
                        </ul>
                    </div>
                    <ul v-show="(filterable && query !== '' && !querySelections.length) || !data.length"
                        :class="[prefixCls + '-not-found-tip']">
                        <li>{{ notFoundText }}</li>
                    </ul>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
import { prefix, oneOf, propsInit } from '../../utils/common'
import { deepCopy } from '../../utils/assist'
import { directive as clickOutside } from 'v-click-outside-x'
import TransferDom from '../../utils/directives/transfer-dom'
import BInput from '../input'
import Icon from '../icon'
import Emitter from '../../mixins/emitter'
import Caspanel from './caspanel'
import Drop from '../select/Dropdown'

const prefixCls = prefix + 'cascader'
const selectPrefixCls = prefix + 'select'

export default {
    name: prefixCls,
    mixins: [Emitter],
    components: {BInput, Drop, Icon, Caspanel},
    directives: {clickOutside, TransferDom},
    props: {
        // props type为 Array 的配置
        ...propsInit({
            props: ['data', 'value'],
            config: {
                type: Array,
                default () {
                    return []
                }
            }
        }),
        // props type为 Boolean 的配置
        ...propsInit({
            props: ['disabled', 'filterable', 'changeOnSelect', 'transfer'],
            config: {
                type: Boolean,
                default: false
            }
        }),
        clearable: {
            type: Boolean,
            default: true
        },
        size: {
            validator (value) {
                return oneOf(value, ['small', 'large', 'default'])
            },
            default: 'default'
        },
        loadData: {
            type: Function
        },
        placeholder: {
            type: [String, Number],
            default: '请选择'
        },
        notFoundText: {
            type: String,
            default: '无匹配数据'
        },
        renderFormat: {
            type: Function,
            default (label) {
                return label.join(' / ')
            }
        },
        trigger: {
            validator (value) {
                return oneOf(value, ['click', 'hover'])
            },
            default: 'click'
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            selectPrefixCls: selectPrefixCls,
            show: false,
            clearShow: false,
            selected: [],
            validDataStr: '',
            query: '',
            isLoadedChildren: false,
            tmpSelected: [],
            updatingValue: false,
            currentValue: this.value
        }
    },
    created () {
        this.validDataStr = JSON.stringify(this.getValidData(this.data))
        this.$on('on-result-change', this.handleChange)
    },
    mounted () {
        this.updateSelected(true)
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-size-${this.size}`]: !!this.size,
                    // [`${prefixCls}-visible`]: this.visible,
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-not-found`]: this.filterable && this.query !== '' && !this.querySelections.length
                }
            ]
        },
        showCloseIcon () {
            return this.currentValue && this.currentValue.length && this.clearable && this.clearShow
        },
        relClasses () {
            return [
                `${prefixCls}-rel`,
                {
                    [`${prefixCls}-rel-focused`]: this.show
                }
            ]
        },
        displayInputRender () {
            return this.filterable ? '' : this.displayRender
        },
        inputPlaceholder () {
            return this.filterable && this.currentValue.length ? '' : this.placeholder
        },
        querySelections () {
            let selections = []

            function getSelections (arr, label, value) {
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i]
                    item.__label = label ? label + ' / ' + item.label : item.label
                    item.__value = value ? value + ',' + item.value : item.value

                    if (item.children && item.children.length) {
                        getSelections(item.children, item.__label, item.__value)
                        delete item.__label
                        delete item.__value
                    } else {
                        selections.push({
                            label: item.__label,
                            value: item.__value,
                            display: item.__label,
                            item: item,
                            disabled: !!item.disabled
                        })
                    }
                }
            }

            getSelections(this.data)
            selections = selections.filter(item => {
                return item.label ? item.label.indexOf(this.query) > -1 : false
            }).map(item => {
                item.display = item.display.replace(new RegExp(this.query, 'g'), `<span>${this.query}</span>`)
                return item
            })
            return selections
        },
        displayRender () {
            let label = []
            for (let i = 0; i < this.selected.length; i++) {
                label.push(this.selected[i].label)
            }
            return this.renderFormat(label, this.selected)
        }
    },
    watch: {
        show (status) {
            if (status) {
                if (this.currentValue.length) {
                    this.updateSelected()
                }
                if (this.transfer) {
                    this.$refs.drop.update()
                }
                this.broadcast(`${prefix}drop`, 'on-update-popper')
            } else {
                if (this.filterable) {
                    this.query = ''
                    this.$refs.input.currentValue = ''
                }
                if (this.transfer) {
                    this.$refs.drop.destroy()
                }
                this.broadcast(`${prefix}drop`, 'on-destroy-popper')
            }
            this.$emit('on-visible-change', status)
        },
        value (val) {
            this.currentValue = val
            if (!val.length) this.selected = []
        },
        currentValue () {
            this.$emit('input', this.currentValue)
            if (this.updatingValue) {
                this.updatingValue = false
                return
            }
            this.updateSelected(true)
        },
        data: {
            deep: true,
            handler () {
                const validDataStr = JSON.stringify(this.getValidData(this.data))
                if (validDataStr !== this.validDataStr) {
                    this.validDataStr = validDataStr
                    if (!this.isLoadedChildren) {
                        this.$nextTick(() => this.updateSelected(false, this.changeOnSelect))
                    }
                    this.isLoadedChildren = false
                }
            }
        }
    },
    methods: {
        handleClose () {
            this.show = false
        },
        handClick () {
            if (this.disabled) return false
            if (this.show) {
                if (!this.filterable) this.handleClose()
            } else {
                this.onFocus()
            }
        },
        handleInput (event) {
            this.query = event.target.value
        },
        updateSelected (init = false, changeOnSelectDataChange = false) {
            if (!this.changeOnSelect || init || changeOnSelectDataChange) {
                this.broadcast('Caspanel', 'on-find-selected', {
                    value: this.currentValue
                })
            }
        },
        handleFocus () {
            this.$refs.input.focus()
        },
        getValidData (data) {
            function deleteData (item) {
                const temItem = Object.assign({}, item)
                if ('loading' in temItem) {
                    delete temItem.loading
                }
                if ('__value' in temItem) {
                    delete temItem.__value
                }
                if ('__label' in temItem) {
                    delete temItem.__label
                }
                if ('children' in temItem && temItem.children.length) {
                    temItem.children = temItem.children.map(i => deleteData(i))
                }
                return temItem
            }

            return data.map(item => deleteData(item))
        },
        clearSelect () {
            if (this.disabled) return false
            const oldVal = JSON.stringify(this.currentValue)
            this.currentValue = this.selected = this.tmpSelected = []
            this.handleClose()
            this.emitValue(this.currentValue, oldVal)
            this.broadcast('Caspanel', 'on-clear')
        },
        onFocus () {
            this.show = true
            if (!this.currentValue.length) {
                this.broadcast('Caspanel', 'on-clear')
            }
        },
        updateResult (result) {
            this.tmpSelected = result
        },
        emitValue (val, oldVal) {
            if (JSON.stringify(val) !== oldVal) {
                this.$emit('on-change', this.currentValue, deepCopy(this.selected))
            }
        },
        handleSelectItem (index) {
            const item = this.querySelections[index]

            if (item.item.disabled) return false
            this.query = ''
            this.$refs.input.currentValue = ''
            const oldVal = JSON.stringify(this.currentValue)
            this.currentValue = item.value.split(',')
            setTimeout(() => {
                this.emitValue(this.currentValue, oldVal)
                this.handleClose()
            }, 0)
        },
        handleChange (params) {
            const lastValue = params.lastValue
            const changeOnSelect = params.changeOnSelect
            const fromInit = params.fromInit

            if (lastValue || changeOnSelect) {
                const oldVal = JSON.stringify(this.currentValue)
                this.selected = this.tmpSelected

                let newVal = []
                this.selected.forEach((item) => {
                    newVal.push(item.value)
                })

                if (!fromInit) {
                    this.updatingValue = true
                    this.currentValue = newVal
                    this.emitValue(this.currentValue, oldVal)
                }
            }
            if (lastValue && !fromInit) {
                this.handleClose()
            }
        }
    }
}
</script>

<style scoped>

</style>
