<!--
    作者：张泽秀
    时间：2018-10-12
    描述：circle进度环
-->
<template>
    <div :class="prefixCls">
        <svg :xmlns='xmlns' :height='getHw' :width='getHw'>
            <circle :class="prefixCls + '-' + strokeccl" :style="strokecValsty" :cx='getCxy' :cy='getCxy' :r='radiusVal' fill='none' :stroke-width='strokewVal' stroke-linecap='round'></circle>
            <circle :class="prefixCls + '-' + probarccl"  :style='bruStro' ref='probar' :cx='getCxy' :cy='getCxy' :r='radiusVal' fill='none'  :stroke-width='strokewVal' :stroke-dasharray='strokedash' stroke-linecap='round'></circle>
            <foreignObject :width='getHw' :height='getHw' >
                <html :xmlns='textxmlns'>
                    <div :height='getHw' :width='getHw' :style="textcsty" :class="[prefixCls + '-foreigntext',prefixCls + '-' + textccl]">
                        <slot>{{percent}}%</slot>
                    </div>
                </html>
            </foreignObject>
            <!--<text :x='getCxy' :y='getCxy' :fill='textcVal'>
                <slot></slot>
            </text>-->
        </svg>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'circle'
export default {
    name: prefixCls,
    data () {
        return {
            prefixCls: prefixCls,
            strokeccl: 'strokec',
            probarccl: this.comatch,
            textccl: 'textc',
            xmlns: 'http://www.w3.org/200/svg',
            radiusVal: this.radius,
            strokewVal: this.strokew,
            strokecVal: this.strokec,
            probarcVal: this.probarc,
            textcVal: this.textc,
            percentVal: this.percent,
            textxmlns: 'http://www.w3.org/1999/xhtml',
            strokedash: '0, 10000'
        }
    },
    props: {
        radius: { // 半径
            type: Number,
            default: 50
        },
        strokew: { // 环宽
            type: Number,
            default: 5
        },
        strokec: { // 圆环颜色
            type: String,
            default: ''
        },
        probarc: { // 进度条颜色
            type: String,
            default: ''
        },
        percent: { // 百分数
            type: Number,
            default: 30
        },
        textc: { // 文字颜色
            type: String,
            default: ''
        },
        size: { // 尺寸
            type: String,
            default: ''
        },
        comatch: { // 配色
            type: String,
            default: 'essco'
        }
    },
    computed: {
        textcsty: function () {
            if (this.textcVal !== '') {
                return 'color:' + this.textcVal
            } else {
                return ''
            }
        },
        strokecValsty: function () {
            if (this.strokecVal !== '') {
                return 'stroke:' + this.strokecVal
            } else {
                return ''
            }
        },
        getCxy () {
            if (this.size) {
                this.circleSize(this.size)
            }
            return Math.round(this.radiusVal) + Math.round(this.strokewVal)
        },
        getHw () {
            if (this.size) {
                this.circleSize(this.size)
            }
            return (Math.round(this.radiusVal) + Math.round(this.strokewVal)) * 2
        },
        bruStro () {
            let traor = this.getCxy + 'px'
            var bru = {'transformOrigin': `${traor} ${traor}`, 'transform': 'rotate(-90deg)', 'transition': 'stroke-dasharray .3s ease-in'}
            if (this.probarcVal !== '') {
                bru['stroke'] = this.probarcVal
            }
            return bru
        }
    },
    watch: {
        percent: function (newvalue, oldvalue) {
            this.rotateCircle(newvalue)
        },
        size: function (newvalue, oldvalue) {
            this.circleSize(newvalue)
        },
        comatch: function (newvalue, oldvalue) {
            this.circlecoMatch(newvalue)
        },
        radius: function (newvalue, oldvalue) {
            this.radiusVal = newvalue
            this.rotateCircle(this.percentVal)
        },
        strokew: function (newvalue, oldvalue) {
            this.strokewVal = newvalue
            this.rotateCircle(this.percentVal)
        },
        strokec: function (newvalue, oldvalue) {
            this.strokecVal = newvalue
        },
        probarc: function (newvalue, oldvalue) {
            this.probarcVal = newvalue
        },
        textc: function (newvalue, oldvalue) {
            this.textcVal = newvalue
        }
    },
    mounted () {
        this.rotateCircle(this.percentVal)
    },
    methods: {
        rotateCircle: function (percent) {
            if (this.comatch) {
                this.circlecoMatch(this.comatch)
            }
            var circleLength = Math.floor(2 * Math.PI * this.radiusVal)
            var probar = this.$refs.probar
            percent = Math.max(0, percent)
            percent = Math.min(100, percent)
            setTimeout(function () { probar.setAttribute('stroke-dasharray', '' + circleLength * percent / 100 + ',' + circleLength) }, 60)
        },
        circleSize: function (standard) {
            if (standard === 'normal') {
                this.radiusVal = 50
                this.strokewVal = 5
            } else if (standard === 'big') {
                this.radiusVal = 80
                this.strokewVal = 10
            } else if (standard === 'small') {
                this.radiusVal = 40
                this.strokewVal = 6
            } else {
                this.radiusVal = this.radius
                this.strokewVal = this.strokew
            }
        },
        circlecoMatch: function (standard) {
            if (standard === 'secco') { // 辅色
                this.probarccl = 'secco'
            } else if (standard === 'neuco') { // 中性色
                this.probarccl = 'neuco'
            } else { // 主色、默认色
                this.probarccl = 'essco'
            }
        }
    }
}
</script>

<style>
</style>
