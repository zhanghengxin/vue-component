<template>
    <div :class="rowClass" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
import { prefix, oneOf } from '../../utils/common'
import { findComponentDownward, findBrothersComponents } from '../../utils/assist'

const prefixCls = prefix + 'row'

export default {
    name: `${prefixCls}`,
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['flex'])
            }
        },
        interval: {
            type: [Number, String],
            default: 0
        },
        align: {
            validator (value) {
                return oneOf(value, ['top', 'middle', 'bottom'])
            }
        },
        justify: {
            validator (value) {
                return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between'])
            }
        },
        className: String
    },
    mounted () {
        if (this.interval) this.updateInterval(this.interval)
    },
    computed: {
        rowClass () {
            return [
                {
                    [`${prefixCls}`]: !this.type,
                    [`${prefixCls}-${this.type}`]: !!this.type,
                    [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
                    [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
                    [`${this.className}`]: !!this.className
                }
            ]
        },
        rowStyle () {
            let style = {}
            if (this.interval) {
                style = {
                    marginLeft: this.interval / -2 + 'px',
                    marginRight: this.interval / -2 + 'px'
                }
            }
            return style
        }
    },
    methods: {
        updateInterval (val) {
            const Col = findComponentDownward(this, 'b-col')
            const Cols = findBrothersComponents(Col, 'b-col', false)
            if (Cols.length) {
                Cols.forEach((child) => {
                    if (val !== 0) {
                        child.interval = val
                    }
                })
            }
        }
    },
    watch: {
        interval (val) {
            this.updateInterval(val)
        }
    }
}
</script>
