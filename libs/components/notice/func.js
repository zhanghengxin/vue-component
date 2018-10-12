import Notice from './notice.vue'

export default {
    extends: Notice,
    computed: {
        style () {
            return {
                position: 'fixed',
                right: '20px',
                top: `${this.verticalOffset}px`
            }
        }
    },
    mounted () {
        this.createTimer()
    },
    methods: {
        createTimer () {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        afterEnter () {
            this.height = this.$el.offsetHeight
        }
    },
    beforeDestory () {
        this.clearTimer()
    },
    data () {
        return {
            verticalOffset: 0,
            autoClose: 3000,
            height: 0,
            visible: false
        }
    }
}