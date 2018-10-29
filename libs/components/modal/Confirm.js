/**
 * confirm instance
 * 简易modal 建议 用于 提示功能
 * author by @zhengshuai
 */

import Vue from 'vue'
import BModal from './Modal'
import BButton from '../button'
import BIcon from '../icon'

const prefixCls = 'b-modal-confirm'

BModal.Instance = (params = {}) => {
    const Instance = new Vue({
        data () {
            return {
                ...params,
                visible: false,
                width: 400,
                title: '',
                body: '',
                iconType: '',
                iconName: '',
                okText: undefined,
                cancelText: undefined,
                showCancel: true,
                loading: false,
                okLoading: false,
                scrollable: false,
                closable: false
            }
        },
        render (h) {
            // render header, when render with no title, hide head
            let headRender
            if (this.title) {
                headRender = h('div', {
                    attrs: {
                        class: `${prefixCls}-head`
                    }
                }, [
                    h('div', {
                        class: this.iconTypeCls
                    }, [
                        h(BIcon, {
                            class: this.iconNameCls,
                            attrs: {
                                type: this.iconName,
                                size: 24
                            }
                        })
                    ]),
                    h('div', {
                        attrs: {
                            class: `${prefixCls}-head-title`
                        },
                        domProps: {
                            innerHTML: this.title
                        }
                    })
                ])
            }

            // render content
            let bodyRender
            if (this.render) {
                bodyRender = h('div', {
                    attrs: {
                        class: `${prefixCls}-body ${prefixCls}-body-render`
                    }
                }, [this.render(h)])
            } else {
                bodyRender = h('div', {
                    attrs: {
                        class: `${prefixCls}-body`
                    }
                }, [
                    h('div', {
                        domProps: {
                            innerHTML: this.body
                        }
                    })
                ])
            }

            // render footer
            let footerVNodes = []
            let footerRender
            if (this.showCancel) {
                footerVNodes.push(h(BButton, {
                    props: {
                        type: 'default'
                    },
                    on: {
                        'on-click': this.cancel
                    }
                }, this.localeCancelText))
            }
            footerVNodes.push(h(BButton, {
                props: {
                    type: 'primary',
                    loading: this.okLoading
                },
                on: {
                    'on-click': this.ok
                }
            }, this.localeOkText))
            footerRender = h('div', {
                attrs: {
                    class: `${prefixCls}-footer`
                }
            }, footerVNodes)

            return h(BModal, {
                props: Object.assign({}, params, {
                    width: this.width,
                    scrollable: this.scrollable,
                    closable: this.closable
                }),
                domProps: {
                    value: this.visible
                },
                on: {
                    input: (status) => {
                        this.visible = status
                    }
                }
            }, [
                h('div', {
                    attrs: {
                        class: prefixCls
                    }
                }, [
                    headRender,
                    bodyRender,
                    footerRender
                ])
            ])
        },
        computed: {
            iconTypeCls () {
                return [
                    `${prefixCls}-head-icon`,
                    `${prefixCls}-head-icon-${this.iconType}`
                ]
            },
            iconNameCls () {
                return [
                    'b-icon'
                    // `bw-${this.iconName}`
                ]
            },
            localeOkText () {
                if (this.okText === undefined) {
                    return '确定'
                } else {
                    return this.okText
                }
            },
            localeCancelText () {
                if (this.cancelText === undefined) {
                    return '取消'
                } else {
                    return this.cancelText
                }
            }
        },
        methods: {
            cancel () {
                this.$children[0].visible = false
                this.okLoading = false
                this.onCancel()
                this.remove()
            },
            ok () {
                if (this.loading) {
                    this.okLoading = true
                } else {
                    this.$children[0].visible = false
                    this.remove()
                }
                this.onOk()
            },
            remove () {
                setTimeout(() => {
                    this.destroy()
                }, 300)
            },
            destroy () {
                this.$destroy()
                document.body.removeChild(this.$el)
                this.onRemove()
            },
            onOk () {},
            onCancel () {},
            onRemove () {}
        }
    })

    const component = Instance.$mount()
    document.body.appendChild(component.$el)
    const modal = Instance.$children[0]
    // TODO UI图标
    const iconNameStore = {
        info: 'yiban',
        success: 'chenggong',
        warning: 'yichang',
        error: 'shibai',
        confirm: 'yiban'
    }

    return {
        show (props) {
            modal.$parent.showCancel = props.showCancel ? props.showCancel : true
            modal.$parent.iconType = props.icon

            modal.$parent.iconName = iconNameStore[props.icon]

            if (props.content) {
                modal.$parent.body = props.content
                delete props.content
            }

            Object.assign(modal.$parent, props)

            modal.$parent.onRemove = props.onRemove

            modal.visible = true
        },
        remove () {
            modal.visible = false
            modal.$parent.okLoading = false
            modal.$parent.remove()
        },
        component: modal
    }
}

export default BModal
