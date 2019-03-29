<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    import { prefix, oneOf } from '../../utils/common'
    const prefixCls = prefix + 'button-group'

    export default {
        name: prefixCls,
        props: {
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default'])
                },
                default () {
                    return 'default'
                }
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline'])
                }
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-vertical`]: this.vertical
                    }
                ]
            }
        }
    }
</script>
