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
                        <Icon :type="statusIcon"></Icon>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
import Icon from '../icon'

const prefixCls = prefix + 'progress'

export default {
    name: prefixCls,
    components: {Icon},
    data () {
        return {
            prefixCls,
            currentStatus: this.status
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
    watch: {
        status (val) {
            this.currentStatus = val
        }
    },
    computed: {
        value () {
            return this.percentage
        },
        ishowText () {
            return this.showText
        },
        statusIcon () {
            let type = ''
            switch (this.currentStatus) {
                case 'wrong':
                    type = 'shibai'
                    break
                case 'success':
                    type = 'chenggong'
                    break
            }
            return type
        },
        percent () {
            return this.currentStatus !== 'success' && this.currentStatus !== 'wrong' && this.value !== 100
        },
        outbox () {
            return this.vertical ? {height: '100%', display: 'inline-block'} : {width: '100%', display: 'inline-block'}
        },
        leftStyle () {
            return `${prefixCls}-left`
        },
        rightStyle () {
            return [
                `${prefixCls}-right`,
                `${prefixCls}-right-${this.currentStatus}`
            ]
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
                'width': this.vertical ? this.strokeWidth + 'px' : (this.value === 100 || this.currentStatus === 'success' ? '100%' : this.percentage + '%'),
                'height': this.vertical ? (this.value === 100 || this.currentStatus === 'success' ? '100%' : this.percentage + '%') : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px'
            }
        },
        bgColor () {
            return this.color ? {
                'backgroundColor': this.color
            } : {}
        },
        bgStyle () {
            return this.currentStatus === 'success' || this.value === 100 ? `${prefixCls}-success` : (this.currentStatus === 'wrong' ? `${prefixCls}-wrong` : (this.color ? `${prefixCls}-primary` : ''))
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
