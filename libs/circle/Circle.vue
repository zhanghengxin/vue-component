<template>
    <div>
        <svg :xmlns='xmlns' :height='gethw' :width='gethw'>
            <circle :cx='getcxy' :cy='getcxy' :r='radius' fill='none' :stroke='strokec' :stroke-width='strokew' stroke-linecap='round'></circle>
            <circle class='probar' id='probar' :cx='getcxy' :cy='getcxy' :r='radius' fill='none' :stroke='probarc' :stroke-width='strokew' stroke-dasharray='0,10000'></circle>
            <text :x='getcxy' :y='getcxy' :fill='textc'>{{percent}}%</text>
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
        }
    },
    computed: {
        getcxy () {
            return Math.round(this.radius) + Math.round(this.strokew)
        },
        gethw () {
            return (Math.round(this.radius) + Math.round(this.strokew)) * 2
        }
    },
    watch: {
        percent: function (newvalue, oldvalue) {
            this.rotateCircle(newvalue)
        }
    },
    data () {
        return {
            xmlns: 'http://www.w3.org/200/svg'
        }
    },
    mounted () {
        this.rotateCircle(this.percent)
    },
    methods: {
        rotateCircle: function (jd) {
            var circleLength = Math.floor(2 * Math.PI * this.radius)
            var probar = document.querySelector('#probar')
            jd = Math.max(0, jd)
            jd = Math.min(100, jd)
            probar.setAttribute('stroke-dasharray', '' + circleLength * jd / 100 + ',10000')
        }
    }
}
</script>

<style>
    .probar {
        transform-origin: 55px 55px;
        transform: rotate(-90deg);
        transition: stroke-dasharray .3s ease-in;
    }
    text {
        text-anchor: middle;/*水平居中*/
        dominant-baseline: middle;/*垂直居中*/
    }
</style>
