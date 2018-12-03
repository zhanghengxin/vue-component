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
import { oneOf, prefix } from '../../utils/common.js'

const prefixCls = prefix + 'carousel'

export default {
    name: prefixCls,
    data () {
        return {
            prefixCls,
            timer: null, // 定时器
            active: this.current,
            previous: !this.loop, // 上下可点击，循环时就一直是false
            next: false,
            pages: 0, // 共有多少页
            conWidth: '', // 组件宽度
            moveWidth: '' // 每次移动的宽
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
                position: 'absolute',
                width: this.conWidth + 'px',
                overflow: 'hidden',
                height: this.height + 'px'
            }
        }
    },
    mounted () {
        if (this.animation === 'fade') {
            this.controlFade(true, this.active)
        }
        this.$nextTick(() => {
            this.pages = this.$children.length
            this.conWidth = this.getWidth(this.$refs.wrapper)
            if (this.animation === 'slide') {
                this.resetItemPosition()
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
                this.controlFade(false, oldVal)
                this.controlFade(true, val)
            } else if (this.animation === 'slide') {
                this.resetItemPosition()
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
        controlFade (show, index) {
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
        resetItemPosition () {
            this.$children.forEach((item, index) => {
                this.translateItem(item, index, this.active)
            })
        },
        translateItem (item, index, activeIndex) {
            let parentWidth = this.conWidth
            let length = this.$children.length
            if (index !== activeIndex && length > 2) {
                index = this.resetIndex(index, activeIndex, length)
            }
            item.translate = parentWidth * (index - activeIndex)
        },
        resetIndex (index, activeIndex, length) {
            if (activeIndex === 0 && index === length - 1) {
                return -1
            } else if (activeIndex === length - 1 && index === 0) {
                return length
            } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
                return length + 1
            } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
                return -2
            }
            return index
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
        },
        getWidth (elements) {
            // 处理两个特殊 window document
            if (elements === window) {
                return document.documentElement.clientWidth || document.body.clientWidth
            } else if (elements === document) {
                return document.documentElement.scrollWidth || document.body.scrollWidth
            } else if (typeof elements === 'object') {
                return elements.offsetWidth
            } else if (typeof elements === 'string') {
                return document.getElementById(elements).offsetWidth
            }
        }
    }
}
</script>
