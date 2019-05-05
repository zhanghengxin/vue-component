<template>
    <div
        @mouseenter="clearShow = clearable && true"
        @mouseleave="clearShow = clearable && false"
        :class="classes"
        v-click-outside="handleClose">
        <div @click="handClick" :class="relClasses">
            <b-input
                :disabled="disabled"
                :value="displayInputRender"
            ></b-input>
            <slot>
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
            <Drop ref="drop" v-show="show">
                <div>
                    <Caspanel
                        :trigger="trigger"
                        :prefix-cls="prefixCls"
                        :data="data">
                    </Caspanel>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
import { prefix, oneOf } from '../../utils/common'
import { deepCopy } from '../../utils/assist'
import { directive as clickOutside } from 'v-click-outside-x'
import BInput from '../input'
import Icon from '../icon'
import Emitter from '../../mixins/emitter'
import Caspanel from './caspanel'
import Drop from '../../components/select/Dropdown'

const prefixCls = prefix + 'cascader'

export default {
    name: prefixCls,
    mixins: [Emitter],
    components: {BInput, Drop, Icon, Caspanel},
    directives: {clickOutside},
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        clearable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default () {
                return []
            }
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
            show: false,
            clearShow: false,
            selected: [],
            validDataStr: '',
            tmpSelected: [],
            updatingValue: false, // to fix set value in changeOnSelect type
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
                    // [`${prefixCls}-size-${this.size}`]: !!this.size,
                    // [`${prefixCls}-visible`]: this.visible,
                    [`${prefixCls}-disabled`]: this.disabled
                    // [`${prefixCls}-not-found`]: this.filterable && this.query !== '' && !this.querySelections.length
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

        displayRender () {
            let label = []
            for (let i = 0; i < this.selected.length; i++) {
                label.push(this.selected[i].label)
            }
            return this.renderFormat(label, this.selected)
        }
    },
    watch: {
        show (val) {
            if (val) {
                if (this.currentValue.length) {
                    this.updateSelected()
                }
                if (this.transfer) {
                    this.$refs.drop.update()
                }
                this.broadcast('Drop', 'on-update-popper')
            } else {
                if (this.filterable) {
                    this.query = ''
                    this.$refs.input.currentValue = ''
                }
                if (this.transfer) {
                    this.$refs.drop.destroy()
                }
                this.broadcast('Drop', 'on-destroy-popper')
            }
            this.$emit('on-visible-change', val)
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
                // if (!this.filterable) this.handleClose()
                this.handleClose()
            } else {
                this.onFocus()
            }
        },
        updateSelected (init = false, changeOnSelectDataChange = false) {
            if (!this.changeOnSelect || init || changeOnSelectDataChange) {
                this.broadcast('Caspanel', 'on-find-selected', {
                    value: this.currentValue
                })
            }
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
                this.$nextTick(() => {
                    this.dispatch('FormItem', 'on-form-change', {
                        value: this.currentValue,
                        selected: deepCopy(this.selected)
                    })
                })
            }
        },
        handleChange (params) {
            // lastValue: is click the final val
            // fromInit: is this emit from update value
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
