<template>
    <div v-show="backTop" :class="prefixCls" :style="styles" @click='back'>返回顶端</div>
</template>

<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'back-top' // 防止与别人发生冲突
export default {
    name: prefixCls,
    props: {
        show: {
            type: Boolean,
            default: false
        },
        height: { // 当滚动至高度是400的时候出现
            type: [Number, String],
            default: 400
        },
        bottom: { // 距离下面默认显示30
            type: [Number, String],
            default: 30
        },
        right: { // 距离右边默认显示30
            type: Number,
            default: 30
        },
        duration: { // 动画维持的时间
            type: Number,
            default: 1000
        }
    },
    data () {
        return {
            backTop: false, //  初始化默认是隐藏的
            srcoll: '',
            prefixCls: prefixCls
        }
    },
    computed: { // 在DOM节点加载后马上执行
        styles () {
            return {
                bottom: `${this.bottom}px`,
                right: `${this.right}px`
            }
        }
    },

    methods: {
        menu: function () { // pageYOffset设置或返回当前页面相对于窗口显示区左上角的 Y 位置
            this.srcoll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.backTop = window.pageYOffset >= this.height
        },
        back: function () {
            const sTop = document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop(window, sTop, 0, this.duration)
        },
        scrollTop: function (el, from = 0, to, duration = 500, endCallback) {
            if (!window.requestAnimationFrame) { // window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。
                window.requestAnimationFrame = (
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        return window.setTimeout(callback, 1000 / 60) // 因为延时器而setTimeout和setInterval的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行
                    }
                )
            }
            // 计算速率
            const difference = Math.abs(from - to)
            const step = Math.ceil(difference / duration * 50) // 是向上取整计算

            function scroll (start, end, step) {
                if (start === end) {
                    endCallback && endCallback()
                    return
                }

                let d = (start + step > end) ? end : start + step
                if (start > end) {
                    d = (start - step < end) ? end : start - step
                }

                if (el === window) {
                    window.scrollTo(d, d)
                } else {
                    el.scrollTop = d
                }
                window.requestAnimationFrame(() => scroll(d, end, step))
            }

            scroll(from, to, step)
        }
    },
    mounted () {
        if (this.show) {
            this.backTop = true
        } else {
            window.addEventListener('scroll', this.menu)
        }
    }
}
</script>
