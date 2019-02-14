<template>
    <div :style="outbox">
        <div :class='boxStyle'>
            <div :class='leftStyle' :style='left'>
                <div :class='[progressStyle,bgStyle]' :style="[progress,bgColor]">
                </div>
            </div>
            <div :class='rightStyle' v-if='ishowText'>
                <slot>
                    <div v-if="percent">{{value}}%</div>
                    <div v-else>
                        <img :class='statusPicStyle' :src='imgSrc'>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'progress'

export default {
    name: prefixCls,
    data () {
        return {
            prefixCls
        }
    },
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        strokeWidth: {
            type: Number,
            default: 10
        },
        status: {
            type: String,
            default: ''
        },
        showText: {
            type: Boolean,
            default: true
        },
        percentage: {
            type: Number,
            default: 0,
            required: true
        },
        color: {
            type: String,
            default: ' '
        }
    },
    updated () {
        console.log(this.$el)
    },
    computed: {
        value () {
            return this.percentage
        },
        ishowText () {
            return this.showText
        },
        imgSrc () {
            let src
            if (this.status === 'Success' || this.value === 100) {
                src = require('@/assets/image/gouM.png')
            } else if (this.status === 'Exception') {
                src = require('@/assets/image/cuoM.png')
            }
            return src
        },
        percent () {
            return this.status !== 'Success' && this.status !== 'Exception' && this.value !== 100
        },
        outbox () {
            return this.vertical ? {height: '100%', display: 'inline-block'} : {width: '100%', display: 'inline-block'}
        },
        leftStyle () {
            return `${prefixCls}-left`
        },
        rightStyle () {
            return `${prefixCls}-right`
        },
        progressStyle () {
            return `${prefixCls}-progress`
        },
        statusPicStyle () {
            return `${prefixCls}-statusPic`
        },
        boxStyle () {
            return `${prefixCls}-box`
        },
        progress () {
            return {
                'width': this.vertical ? this.strokeWidth + 'px' : (this.value === 100 || this.status === 'Success' ? '100%' : this.percentage + '%'),
                'height': this.vertical ? (this.value === 100 || this.status === 'Success' ? '100%' : this.percentage + '%') : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px'
            }
        },
        bgColor () {
            return this.color ? {
                'backgroundColor': this.color
            } : {}
        },
        bgStyle () {
            return this.status === 'Success' || this.value === 100 ? `${prefixCls}-success` : (this.status === 'Exception' ? `${prefixCls}-exception` : (this.color ? `${prefixCls}-primary` : ''))
        },
        left () {
            return {
                'width': this.vertical ? this.strokeWidth + 'px' : '100%',
                'height': this.vertical ? '100%' : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px'
            }
        }
    }
}
</script>
