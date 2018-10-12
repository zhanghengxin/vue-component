/**
* 走马灯组件 b-carousel
* Created by hanshuai on 2018/9/10.
*/

<template>
    <div :class="[prefixCls]" :style="animationStyle">
        <div
            v-if="animation=='fade'"
            :class="[prefixCls + '-wrapper']"
            :style="animationStyle"
            @mouseover="mouseOver"
            @mouseleave="mouseLeave"
            ref="wrapper">
            <slot/>
        </div>
        <div
            v-if="animation=='slide'"
            :class="[prefixCls + '-wrapper']"
            :style="[animationStyle, slideStyle]"
            ref="wrapper">
                <div
                    :class="[prefixCls + '-scroll']"
                    :style="scrollStyle"
                    ref="scroll">
                    <slot/>
                </div>
        </div>
        <ul
          :class="[prefixCls + '-control']"
          v-if="pointer">
            <li
              :class="{'active':index===active}"
              v-for="(item,index) in pages"
              :key="index"
              @click="handleClickPointer(index)">
            </li>
        </ul>
        <ul
          :class="[prefixCls + '-direction']"
          v-if="arrow">
            <li
              :class="[prefixCls + '-prev', { disable: previous }]"
              @click="slideControl(-1)">
            </li>
            <li
              :class="[prefixCls + '-next', { disable: next }]"
              @click="slideControl(1)">
            </li>
        </ul>
    </div>
</template>
<script>
import { oneOf } from '../../utils/common.js'

const prefixCls = 'b-carousel'

export default {
    name: 'b-carousel',
    data () {
        return {
            prefixCls,
            timer: null, // 定时器
            active: this.current,
            previous: !this.loop, // 上下可点击，循环时就一直是false
            next: false,
            pages: 0, // 共有多少页
            conWidth: '', // 组件宽度
            moveWidth: '', // 每次移动的宽
            speeded: 0
        }
    },
    props: {
        height: {
            type: Number,
            default: 360
        },
        // 目前支持 fade 和 slide 两种
        animation: {
            type: String,
            default: 'fade',
            validator (value) {
                return oneOf(value, ['fade', 'slide'])
            }
        },
        // 停留时间，毫秒
        interval: {
            type: Number,
            default: 3000
        },
        // 是否自动播放
        auto: {
            type: Boolean,
            default: true
        },
        // 鼠标划过时暂停
        hoverPause: {
            type: Boolean,
            default: true
        },
        // 循环播放
        loop: {
            Boolean,
            default: true
        },
        // 当前显示第几个，默认第一个
        current: {
            type: Number,
            default: 0
        },
        // 下方点控制
        pointer: {
            type: Boolean,
            default: true
        },
        // 箭头控制
        arrow: {
            type: Boolean,
            default: true
        },
        // 动画过渡时间，单位毫秒
        speed: {
            type: Number,
            default: 300
        },
        after: {
            type: Function,
            default: function () {}
        }, // 加载完成
        slideAfter: {
            type: Function,
            default: function (val) {}
        } // 滑动结束
    },
    computed: {
        animationStyle () {
            return {
                height: this.height + 'px'
            }
        },
        slideStyle () {
            return {
                width: this.conWidth + 'px'
            }
        },
        scrollStyle () {
            return {
                width: this.conWidth * (this.pages + 2) + 'px',
                overflow: 'hidden',
                transform: `translate(${this.moveWidth - this.conWidth}px, 0)`,
                transition: `transform ${this.speeded / 1000}s ease`
            }
        }
    },
    mounted () {
        if (this.animation === 'fade') {
            this.controlFade(this.animation, true, this.active)
        } else {
            this.controlSlide(this.animation, this.active)
        }

        this.$nextTick(() => {
            this.pages = this.$children.length
            this.conWidth = this.$refs.wrapper.offsetWidth
            if (this.animation === 'slide') {
                let firstNode = this.$children[0].$el.cloneNode(true)
                firstNode.style.width = this.conWidth + 'px'
                let lastNode = this.$children[this.pages - 1].$el.cloneNode(true)
                lastNode.style.width = this.conWidth + 'px'
                this.$refs.scroll.appendChild(firstNode)
                this.$refs.scroll.insertBefore(lastNode, this.$children[0].$el)
            }
            // 自动轮播
            this.autoPlay()
            // 加载完成
            this.after()
        })
    },
    watch: {
        active (val, oldVal) {
            if (this.animation === 'fade') {
                this.controlFade(this.animation, false, oldVal)
                this.controlFade(this.animation, true, val)
            } else if (this.animation === 'slide') {
                this.controlSlide(this.animation, val, oldVal)
            }
            this.slideAfter(val)
        }
    },
    methods: {
        // 自动播放
        autoPlay () {
            if (this.auto) {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.slideControl(1)
                }, this.interval)
            }
        },
        // 鼠标划过，自动暂停
        mouseOver () {
            if (this.hoverPause) {
                clearInterval(this.timer)
            }
        },
        // 鼠标离开、继续滑动
        mouseLeave () {
            this.autoPlay()
        },
        // 切换当前内容
        slideControl (i) {
            clearInterval(this.timer)
            if (i > 0) {
                this.previous = false
                if (this.active < this.pages - 1) {
                    this.active += i
                } else {
                    if (this.loop) {
                        this.active = 0
                    } else {
                        this.next = true
                    }
                }
            } else {
                this.next = false
                if (this.active > 0) {
                    this.active += i
                } else {
                    if (this.loop) {
                        this.active = this.pages - 1
                    } else {
                        this.previous = true
                    }
                }
            }
            this.autoPlay()
        },
        // 控制样式 fade
        controlFade (animation, show, index) {
            let el = this.$children[index].$el
            if (show) {
                el.style.opacity = 1
                el.style.zIndex = 1
            } else {
                el.style.opacity = 0
                el.style.zIndex = 0
            }
        },
        // 控制样式 slide
        controlSlide (animation, val, oldVal) {
            if (oldVal === 4 && val === 0) {
                this.moveWidth = -this.conWidth * this.pages
                let timer = null
                clearTimeout(timer)
                timer = setTimeout(() => {
                    this.moveWidth = 0
                    this.speeded = 0
                }, this.interval / 20)
            } else if (oldVal === 0 && val === 4) {
                this.moveWidth = this.conWidth
                let timer = null
                clearTimeout(timer)
                timer = setTimeout(() => {
                    this.moveWidth = -this.conWidth * (this.pages - 1)
                    this.speeded = 0
                }, this.interval / 20)
            } else {
                this.speeded = this.speed
                this.moveWidth = -this.conWidth * val
            }
        },
        // 点击下方导航
        handleClickPointer (i) {
            clearInterval(this.timer)
            let current = 0
            if (i > this.active) {
                current = i - this.active
            } else if (i === this.active) {
                return
            } else {
                current = i - this.active
            }
            this.slideControl(current)
            this.autoPlay()
        }
    }
}
</script>
