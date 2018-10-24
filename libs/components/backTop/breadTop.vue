<template>
    <div v-if="backTop" class="classStyle" :style="styles" @click='back'>返回顶端</div>
</template>

<script>
const prefixCls = 'b-back-top' // 防止与别人发生冲突
export default {
    name: 'Backtop',
    props: {
        height: { // 当滚动至高度是400的时候出现
            type: Number,
            default: 400
        },
        bottom: { // 距离下面默认显示30
            type: Number,
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
            srcoll: ''
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
        menu: function () {
            this.srcoll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.backTop = window.pageYOffset >= this.height
        },
        back: function () {
            const sTop = document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop(window, sTop, 0, this.duration)
        },
        scrollTop: function (el, from = 0, to, duration = 500, endCallback) {
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = (
                    window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
                )
            }
            const difference = Math.abs(from - to)
            const step = Math.ceil(difference / duration * 50)

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
        window.addEventListener('scroll', this.menu)
    }
}
</script>
<style scoped>
  .classStyle {
    padding: 10px;
    cursor: pointer;
    font-size: 12px;
    line-height: 1.5;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
    position: fixed;
  }
</style>
