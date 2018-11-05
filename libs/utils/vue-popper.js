import Vue from 'vue'
import PopupManager from './popup/popup-manager.js'
// import Popper from 'popper.js'
const isServer = Vue.prototype.$isServer
const Popper = isServer ? function() {} : require('popper.js/dist/umd/popper.js');  // eslint-disable-line
const stop = e => e.stopPropagation()
/*
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=bottom] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
    props: {
        transformOrigin: {
            type: [Boolean, String],
            default: true
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        boundariesPadding: {
            type: Number,
            default: 5
        },
        reference: {},
        popper: {},
        offset: {
            default: 0
        },
        visibleArrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 35
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        popperOptions: {
            type: Object,
            default () {
                return {
                    gpuAcceleration: false
                }
            }
        }
    },
    data () {
        return {
            showPopper: false,
            currentPlacement: ''
        }
    },
    watch: {
        showPopper (val) {
            if (this.disabled) {
                return
            }
            val ? this.updatePopper() : this.destroyPopper()
        }
    },
    methods: {
        createPopper () {
            if (this.$isServer) return
            this.currentPlacement = this.currentPlacement || this.placement
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
                return
            }
            const options = this.popperOptions
            const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper
            let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference
            if (!reference &&
                this.$slots.reference &&
                this.$slots.reference[0]) {
                reference = this.referenceElm = this.$slots.reference[0].elm
            }
            if (!popper || !reference) return
            if (this.visibleArrow) this.appendArrow(popper)
            if (this.appendToBody) document.body.appendChild(this.popperElm)
            if (this.Popper && this.Popper.destroy) {
                this.Popper.destroy()
            }
            options.placement = this.currentPlacement
            options.offset = this.offset
            options.arrowOffset = this.arrowOffset
            this.Popper = new Popper(reference, popper, options)
            this.resetTransformOrigin()
            if (typeof options.onUpdate === 'function') {
                this.Popper.onUpdate(options.onUpdate)
            }
            this.Popper.popper.style.zIndex = PopupManager.nextZIndex()
            this.popperElm.addEventListener('click', stop)
        },
        updatePopper () {
            const Popper = this.Popper
            if (Popper) {
                Popper.update()
                if (Popper._popper) {
                    Popper._popper.style.zIndex = PopupManager.nextZIndex()
                }
            } else {
                this.createPopper()
            }
        },

        doDestroy (forceDestroy) {
            if (!this.Popper || (this.showPopper && !forceDestroy)) return
            this.Popper.destroy()
            this.Popper = null
        },
        destroyPopper () {
            if (this.Popper) {
                this.resetTransformOrigin(this.Popper)
                this.doDestroy(true)
            }
        },
        resetTransformOrigin () {
            let placementMap = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            }
            let placement = this.Popper.popper.getAttribute('x-placement').split('-')[0]
            let origin = placementMap[placement]
            this.Popper.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center` || this.transformOrigin
        },

        appendArrow (element) {
            let hash
            if (this.appended) {
                return
            }
            this.appended = true
            for (let item in element.attributes) {
                if (/^_v-/.test(element.attributes[item].name)) {
                    hash = element.attributes[item].name
                    break
                }
            }
            const arrow = document.createElement('div')
            if (hash) {
                arrow.setAttribute(hash, '')
            }
            arrow.setAttribute('x-arrow', '')
            arrow.className = 'popper_arrow'
            element.appendChild(arrow)
        }
    },
    beforeDestroy () {
        this.doDestroy(true)
        if (this.popperElm && this.popperElm.parentNode === document.body) {
            this.popperElm.removeEventListener('click', stop)
            document.body.removeChild(this.popperElm)
        }
    },
    deactivated () {
        this.$options.beforeDestroy[0].call(this)
    }
}
