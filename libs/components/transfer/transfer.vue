<script>
import List from './list'
import Operation from './operation'
import { prefix } from '../../utils/common'
import Emitter from '../../mixins/emitter'

const prefixCls = `${prefix}transfer`

export default {
    name: prefixCls,
    mixins: [ Emitter ],
    render (h) {
        function cloneVNode (vnode) {
            const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
            const cloned = h(vnode.tag, vnode.data, clonedChildren)
            cloned.text = vnode.text
            cloned.isComment = vnode.isComment
            cloned.componentOptions = vnode.componentOptions
            cloned.elm = vnode.elm
            cloned.context = vnode.context
            cloned.ns = vnode.ns
            cloned.isStatic = vnode.isStatic
            cloned.key = vnode.key
            return cloned
        }
        const vNodes = this.$slots.default === undefined ? [] : this.$slots.default
        const clonedVNodes = this.$slots.default === undefined ? [] : vNodes.map(vnode => cloneVNode(vnode))

        return h('div', {
            class: this.classes
        }, [
            h(List, {
                ref: 'left',
                props: {
                    data: this.leftData,
                    renderFormat: this.renderFormat,
                    checkedKeys: this.leftCheckedKeys,
                    validKeysCount: this.leftValidKeysCount,
                    listStyle: this.listStyle,
                    title: this.titles[0],
                    filterable: this.filterable,
                    filterPlaceholder: this.filterPlaceholder,
                    filterMethod: this.filterMethod,
                    notFoundText: this.notFoundText
                },
                on: {
                    'on-checked-keys-change': this.handleLeftCheckedKeysChange
                }
            }, vNodes),
            h(Operation, {
                props: {
                    operations: this.operations,
                    leftActive: this.leftValidKeysCount > 0,
                    rightActive: this.rightValidKeysCount > 0
                }
            }),
            h(List, {
                ref: 'right',
                props: {
                    data: this.rightData,
                    renderFormat: this.renderFormat,
                    checkedKeys: this.rightCheckedKeys,
                    validKeysCount: this.rightValidKeysCount,
                    listStyle: this.listStyle,
                    title: this.titles[1],
                    filterable: this.filterable,
                    filterPlaceholder: this.filterPlaceholder,
                    filterMethod: this.filterMethod,
                    notFoundText: this.notFoundText
                },
                on: {
                    'on-checked-keys-change': this.handleRightCheckedKeysChange
                }
            }, clonedVNodes)
        ])
    },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        renderFormat: {
            type: Function,
            default (item) {
                return item.label || item.key
            }
        },
        targetKeys: {
            type: Array,
            default () {
                return []
            }
        },
        selectedKeys: {
            type: Array,
            default () {
                return []
            }
        },
        listStyle: {
            type: Object,
            default () {
                return {}
            }
        },
        titles: {
            type: Array,
            default () {
                return ['源列表', '目的列表']
            }
        },
        operations: {
            type: Array,
            default () {
                return []
            }
        },
        filterable: {
            type: Boolean,
            default: false
        },
        filterPlaceholder: {
            type: String
        },
        filterMethod: {
            type: Function,
            default (data, query) {
                let type = ('label' in data) ? 'label' : 'key'
                return data[type].indexOf(query) > -1
            }
        },
        notFoundText: {
            type: String,
            default: '列表为空'
        }
    },
    data () {
        return {
            prefixCls,
            leftData: [],
            rightData: [],
            leftCheckedKeys: [],
            rightCheckedKeys: []
        }
    },
    computed: {
        classes () {
            return prefixCls
        },
        leftValidKeysCount () {
            return this.getValidKeys('left').length
        },
        rightValidKeysCount () {
            return this.getValidKeys('right').length
        }
    },
    watch: {
        targetKeys () {
            this.splitData(false)
        },
        data () {
            this.splitData(false)
        }
    },
    methods: {
        getValidKeys (direction) {
            return this[`${direction}Data`].filter(item => !item.disabled && this[`${direction}CheckedKeys`].indexOf(item.key) > -1).map(data => data.key)
        },
        splitData (init = false) {
            this.leftData = [...this.data]
            this.rightData = []

            if (this.targetKeys.length) {
                this.targetKeys.forEach(targetKey => {
                    let filteredData = this.leftData.filter((item, index) => {
                        if (item.key === targetKey) {
                            this.leftData.splice(index, 1)
                            return true
                        }
                        return false
                    })
                    if (filteredData && filteredData.length) this.rightData.push(filteredData[0])
                })
            }

            if (init) {
                this.splitSelectedKey()
            }
        },
        splitSelectedKey () {
            if (this.selectedKeys.length) {
                this.leftCheckedKeys = this.leftData
                    .filter(item => this.selectedKeys.indexOf(item.key) > -1)
                    .map(data => data.key)

                this.rightCheckedKeys = this.rightData
                    .filter(item => this.selectedKeys.indexOf(item.key) > -1)
                    .map(data => data.key)
            }
        },
        handleLeftCheckedKeysChange (keys) {
            this.leftCheckedKeys = keys
        },
        handleRightCheckedKeysChange (keys) {
            this.rightCheckedKeys = keys
        },
        handleCheckedKeys () {
            let sourceSelectedKeys = this.getValidKeys('left')
            let targetSelectedKeys = this.getValidKeys('right')
            this.$emit('on-selected-change', sourceSelectedKeys, targetSelectedKeys)
        },
        moveTo (direction) {
            let opposite = direction === 'left' ? 'right' : 'left'
            let moveKeys = this.getValidKeys(opposite)

            let newTargetKeys = direction === 'right'
                ? moveKeys.concat(this.targetKeys)
                : this.targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey))
            this.$refs[opposite].toggleSelectAll(false)
            this.$emit('on-change', newTargetKeys, direction, moveKeys)
            this.dispatch('FormItem', 'on-form-change', {
                tarketKeys: newTargetKeys,
                direction: direction,
                moveKeys: moveKeys
            })
        }
    },
    mounted () {
        this.splitData(true)
    }
}
</script>
