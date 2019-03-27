<template>
    <div
        :class="[prefixCls + '-confirm']"
        @keydown.tab.capture="handleTab">
        <b-button
            :class="timeClasses"
            size="small"
            type="text"
            :disabled="timeDisabled"
            v-if="showTime"
            @on-click="handleToggleTime">
            {{ labels.time }}
        </b-button>
        <b-button
            size="small"
            @click.native="handleClear"
            @keydown.enter.native="handleClear">
            {{ labels.clear }}
        </b-button>
        <b-button
            size="small"
            type="primary"
            @on-click.native="handleSuccess"
            @keydown.enter.native="handleSuccess">
            {{ labels.ok }}
        </b-button>
    </div>
</template>
<script>
    import bButton from '../../button'
    import Emitter from '../../../mixins/emitter'
    import lange from '../../../utils/date'
    const prefixCls = 'ivu-picker'

    export default {
        mixins: [ Emitter ],
        components: { bButton },
        props: {
            showTime: {
                type: Boolean,
                default: false
            },
            isTime: {
                type: Boolean,
                default: false
            },
            timeDisabled: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                prefixCls: prefixCls
            }
        },
        computed: {
            timeClasses () {
                return `${prefixCls}-confirm-time`
            },
            labels () {
                const labels = ['time', 'clear', 'ok']
                const values = [(this.isTime ? 'selectDate' : 'selectTime'), 'clear', 'ok']
                return labels.reduce((obj, key, i) => {
                    obj[key] = lange.i.datepicker[values[i]]
                    return obj
                }, {})
            }
        },
        methods: {
            handleClear () {
                this.$emit('on-pick-clear')
            },
            handleSuccess () {
                this.$emit('on-pick-success')
            },
            handleToggleTime () {
                if (this.timeDisabled) return
                this.$emit('on-pick-toggle-time')
                this.dispatch('CalendarPicker', 'focus-input')
                this.dispatch('CalendarPicker', 'update-popper')
            },
            handleTab (e) {
                const tabbables = [...this.$el.children]
                const expectedFocus = tabbables[e.shiftKey ? 'shift' : 'pop']()
                if (document.activeElement === expectedFocus) {
                    e.preventDefault()
                    e.stopPropagation()
                    this.dispatch('CalendarPicker', 'focus-input')
                }
            }
        }
    }
</script>
