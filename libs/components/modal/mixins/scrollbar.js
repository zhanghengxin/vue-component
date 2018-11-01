// used for Modal & $Spin
// For Modal scrollBar hidden
import Vue from 'vue'
const isServer = Vue.prototype.$isServer

let cached
export const getScrollBarSize = (fresh) => {
    if (isServer) return 0
    if (fresh || cached === undefined) {
        const inner = document.createElement('div')
        inner.style.width = '100%'
        inner.style.height = '200px'

        const outer = document.createElement('div')
        const outerStyle = outer.style

        outerStyle.position = 'absolute'
        outerStyle.top = 0
        outerStyle.left = 0
        outerStyle.pointerEvents = 'none'
        outerStyle.visibility = 'hidden'
        outerStyle.width = '200px'
        outerStyle.height = '150px'
        outerStyle.overflow = 'hidden'

        outer.appendChild(inner)

        document.body.appendChild(outer)

        const widthContained = inner.offsetWidth
        outer.style.overflow = 'scroll'
        let widthScroll = inner.offsetWidth

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth
        }

        document.body.removeChild(outer)

        cached = widthContained - widthScroll
    }
    return cached
}

export default {
    methods: {
        checkScrollBar () {
            let fullWindowWidth = window.innerWidth
            if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                const documentElementRect = document.documentElement.getBoundingClientRect()
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
            if (this.bodyIsOverflowing) {
                this.scrollBarWidth = getScrollBarSize()
            }
        },
        checkMaskInVisible () {
            let masks = document.getElementsByClassName('bw-modal-mask') || []
            return Array.from(masks).every(m => m.style.display === 'none' || m.classList.contains('fade-leave-to'))
        },
        setScrollBar () {
            if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
                document.body.style.paddingRight = `${this.scrollBarWidth}px`
            }
        },
        resetScrollBar () {
            document.body.style.paddingRight = ''
        },
        addScrollEffect () {
            this.checkScrollBar()
            this.setScrollBar()
            document.body.style.overflow = 'hidden'
        },
        removeScrollEffect () {
            if (this.checkMaskInVisible()) {
                document.body.style.overflow = ''
                this.resetScrollBar()
            }
        }
    }
}
