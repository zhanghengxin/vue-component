<!--
    作者：张泽秀
    时间：2018-10-12
    描述：circle进度环
-->
<template>
    <div class="inlinb">
        <svg :xmlns='xmlns' :height='getHw' :width='getHw'>
            <circle :cx='getCxy' :cy='getCxy' :r='radiusVal' fill='none' :stroke='strokecVal' :stroke-width='strokewVal' stroke-linecap='round'></circle>
            <circle :style='bruStro' ref='probar' :cx='getCxy' :cy='getCxy' :r='radiusVal' fill='none' :stroke='probarcVal' :stroke-width='strokewVal' stroke-dasharray='0,10000' stroke-linecap='round'></circle>
            <foreignObject :width='getHw' :height='getHw' >
                <html :xmlns='textxmlns'>
                    <div :height='getHw' :width='getHw' class="foreigntext">
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
export default {
    name: 'bwCircle',
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
            default: '#eceef2'
        },
        probarc: { // 进度条颜色
            type: String,
            default: '#43a3fb'
        },
        percent: { // 百分数
            type: Number,
            default: 30
        },
        textc: { // 文字颜色
            type: String,
            default: '#2db7f5'
        },
        size: { // 尺寸
            type: String,
            default: ''
        },
        comatch: { // 配色
            type: String,
            default: ''
        }
    },
    computed: {
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
            return {'transformOrigin': `${traor} ${traor}`, 'transform': 'rotate(-90deg)', 'transition': 'stroke-dasharray .3s ease-in'}
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
        }
    },
    data () {
        return {
            xmlns: 'http://www.w3.org/200/svg',
            radiusVal: this.radius,
            strokewVal: this.strokew,
            strokecVal: this.strokec,
            probarcVal: this.probarc,
            textcVal: this.textc,
            percentVal: this.percent,
            textxmlns: 'http://www.w3.org/1999/xhtml'
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
            probar.setAttribute('stroke-dasharray', '' + circleLength * percent / 100 + ',' + circleLength)
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
            if (standard === 'essco') { // 主色
                this.strokecVal = '#eceef2'
                this.probarcVal = '#43a3fb'
                this.textcVal = '#2db7f5'
            } else if (standard === 'secco') { // 辅色
                this.strokecVal = '#eceef2'
                this.probarcVal = '#0eb83a'
                this.textcVal = '#0eb83a'
            } else if (standard === 'neuco') { // 中性色
                this.strokecVal = '#eceef2'
                this.probarcVal = '#474847'
                this.textcVal = '#7e7d83'
            } else {
                this.strokecVal = this.strokec
                this.probarcVal = this.probarc
                this.textcVal = this.textc
            }
        }
    }
}
</script>

<style>
    .inlinb {
        display: inline-block;
    }
    text {
        text-anchor: middle;/*水平居中*/
        dominant-baseline: middle;/*垂直居中*/
    }
    .foreigntext {
        position: absolute;
        top:50%;
        left:50%;
        width:100%;
        transform:translate(-50%,-50%);
        text-align: center;
    }
</style>
