<template>
    <div
        :class="[prefixCls + '-confirm']"
        @keydown.tab.capture="handleTab">
        <Button
            :class="timeClasses"
            size="small"
            type="text"
            :disabled="timeDisabled"
            v-if="showTime"
            @on-click="handleToggleTime">
            {{ labels.time }}
        </Button>
        <Button
            size="small"
            @click.native="handleClear"
            @keydown.enter.native="handleClear">
            {{ labels.clear }}
        </Button>
        <Button
            size="small"
            type="primary"
            @click.native="handleSuccess"
            @keydown.enter.native="handleSuccess">
            {{ labels.ok }}
        </Button>
    </div>
</template>
<script>
    import Button from '../../button'
    import Emitter from '../../../mixins/emitter'
    import lange from '../../../utils/date'
    import { prefix } from '../../../utils/common'
    const prefixCls = `${prefix}picker`

    export default {
        mixins: [ Emitter ],
        components: { Button },
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
                this.dispatch(`${prefix}datepicker`, 'focus-input')
                this.dispatch(`${prefix}datepicker`, 'on-update-popper')
            },
            handleTab (e) {
                const tabbables = [...this.$el.children]
                const expectedFocus = tabbables[e.shiftKey ? 'shift' : 'pop']()
                if (document.activeElement === expectedFocus) {
                    e.preventDefault()
                    e.stopPropagation()
                    this.dispatch(`${prefix}datepicker`, 'focus-input')
                }
            }
        }
    }
</script>
