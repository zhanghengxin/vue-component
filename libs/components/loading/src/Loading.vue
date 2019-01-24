<template>
    <transition name="fade" @after-leave="handleAfterLeave">
        <div
        v-show="visible"
        :style="{ backgroundColor: background || '' }"
        :class="maskClasses">
            <div :class="[prefixCls+'-spinner']">
                <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none"/>
                </svg>
                <Icon v-else :class="[prefixCls+'-icon']" :type="spinner"></Icon>
                <p v-if="text" :class="[prefixCls+'-text']">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<script>

import Icon from '../../icon'
import { prefix } from '../../../utils/common'
const prefixCls = prefix + 'loading'

export default {
    name: prefixCls,
    components: { Icon },
    data () {
        return {
            prefixCls,
            text: null,
            spinner: null,
            background: null,
            fullscreen: true,
            visible: false,
            customClass: ''
        }
    },
    computed: {
        maskClasses () {
            return [
                `${prefixCls}-mask`,
                {
                    [`${this.customClass}`]: this.customClass,
                    [`is-fullscreen`]: this.fullscreen
                }
            ]
        }
    },
    methods: {
        handleAfterLeave () {
            this.$emit('after-leave')
        },
        setText (text) {
            this.text = text
        }
    }
}
</script>
