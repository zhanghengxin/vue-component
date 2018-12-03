<!-- 商品选择 弹框出现后后  二次弹框 新增商品 -->
<template>
    <div>
        <Modal width="1160" v-model="showX" :mask-closable="false" @on-cancel="cancle" title="添加商品" @on-visible-change="changeStatus" :class-name="className">
            <div :class="contenRbox">
                <div class="content">
                    <div class="content_ltree" :style="treeStyle">
                        <p class="content_ltree_title">商品编码：</p>
                        <Tree :data="baseData" ref="tree" @on-select-change="selectChangeModal" @on-toggle-expand="selectChange"></Tree>
                    </div>
                    <div class="conten_rbox ">
                        <addBussiness
                            ref="addBus"
                            :addShow="true"
                            :addStatus="addStatus"
                            :addBussinessParams="addBussinessParams"
                            @change="addBusinessChange"
                            @successchange="successchange"
                            @close="closeFun"
                            @modalChange="modalChange"
                        >
                        </addBussiness>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button size="large" @click="cancle(1)">取消</Button>
                <Button size="large" @click="cancle(2)" >保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import addBussiness from './addBussiness'
import goodsCodeNo from '../mixins/goodsCodeNo.js'
const nodeRender = function (h, {root, node, data}) {
    let nodeList = []
    nodeList.push(node.node)
    let nodeData = node.node
    return h('span', {
        style: {
            color: 'blue',
            cursor: 'pointer'
        },
        'class': ['ivu-tree-title', nodeData.selected ? ' ivu-tree-title-selected' : ''],
        on: {
            click: () => {
                let selectedNodes = this.$refs.tree.getSelectedNodes()
                selectedNodes.forEach(node => { node.selected = false })

                nodeData.selected = true
                this.selectChangeModal(nodeList)
            }
        }
    }, [data.title])
}
const addBussinessParamsTpl = () => {
    return {
        goodsCode: '', // 商品编码
        goodsName: '', // 商品名称
        illustrateStr: '', // 说明
        vatRate: '', // 增值税税率
        rate: '', // 税率
        keyWorld: '', // 关键字
        summarized: '', // 汇总项
        version: '', // 版本
        goodsPrice: '', // 商品单价
        userDefined: '', // 自定义
        vatSprcialManage: '', // 增值税特殊管理
        vatPolicyBasis: '', // 增值税政策依据
        useDiscount: '', // 是否使用优惠政策
        discountType: '', // 优惠政策类型
        updateTime: '' // 启用时间}
    }
}
export default {
    props: {
        addShow: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number]
        },
        visibleChangeCallback: {
            type: Function,
            default: () => {}
        },
        className: {
            type: String
        }
    },
    mixins: [ goodsCodeNo ],
    components: { addBussiness },
    watch: {
        addShow: {
            handler (val) {
                this.showX = val
            },
            immediate: true
        }
    },
    computed: {
        contenRbox () {
            return [
                'conten_rbox',
                {
                    'no-left-border': this.height
                }
            ]
        },
        treeStyle () {
            let style = {}
            if (this.height) {
                const height = parseInt(this.height)
                style.height = `${height}px`
            }
            return style
        }
    },
    data () {
        return {
            showX: false,
            addBussinessParams: {},
            addStatus: 'add', // 标志状态，add添加，update编辑
            customername: '',
            selectItem: [], // 蓝色字体用作储存当前选中参数
            baseData: [{
                expand: true,
                title: '商品编码',
                children: []
            }]
        }
    },
    methods: {
        // modalChange为成功的回调
        modalChange (ajaxDate) {
            this.$emit('change', false)
            this.$emit('add-goods', ajaxDate)
        },
        cancle (status) {
            if (status === 1) {
                this.$emit('change', false)
            }
            if (status === 2) {
                this.$refs.addBus.cancle(2)
            }
            this.addBussinessParams = { ...addBussinessParamsTpl() }
        },
        changeStatus (params) {
            this.visibleChangeCallback.call(null, params)
            if (!params) {
                this.$emit('change', false)
            }
        },
        closeFun () {
            this.addShow = false
            return false
        },
        // 组件添加后，根据当前节点信息，来刷新子节点
        addBusinessChange () {
            let e = this.selectItem || this.$refs.tree.getSelectedNodes()
            if (e) {
                let goodsCode = e[0].goodsCode || ''
                this.goodsTree(goodsCode)

                    .then((res) => {
                        if (res !== 1) {
                            res.forEach((item, index) => {
                                item.title = item.goodsName
                                item.render = nodeRender.bind(this)
                            })
                            e[0].children = res
                        }
                    })
                this.addShow = false
            } else {
                this.addShow = false
            }
        },
        // 子组件更新成功后，触发父组件刷新
        successchange (goodsCode) {
            function chooseArr (arr, goodsCode, res) {
                arr.forEach(item => {
                    if (item.goodsCode === goodsCode) {
                        item.children = res
                        return arr
                    } else {
                        let childdrenArr = item.children || []
                        chooseArr(childdrenArr, goodsCode, res)
                    }
                })
            }
            let selectItem = this.selectItem || this.$refs.tree.getSelectedNodes()
            this.goodsTree(goodsCode).then((res) => {
                if (res !== 1) {
                    res.forEach((item, index) => {
                        item.title = item.goodsName
                        // 触发回显事件
                        if (item.goodsCode === selectItem[0].goodsCode) {
                            this.selectItem = []
                            this.selectItem.push(item)
                            res[index].render = nodeRender.bind(this)
                        }
                    })
                    chooseArr(this.baseData, goodsCode, res)
                    this.addShow = false
                }
            })
        },
        goodsTree (goodsCode) {
            goodsCode = goodsCode || ''
            let params = {
                goodsCode: goodsCode
            }
            return new Promise((resolve, reject) => {
                this.http.outPost('/api/taxGoodsCode/initGoodsTree', params).then(resp => {
                    if (resp.success) {
                        let results = resp.data.results
                        results.forEach(item => {
                            if (item.isparent === 'Y' && !item.children) {
                                item.children = [{}]
                            }
                        })
                        var children = this.baseData[0].children
                        if (goodsCode === '') {
                            children = results
                            children.forEach((item, index) => {
                                children[index].title = children[index].goodsName
                            })
                            this.baseData[0].children = children
                            resolve(1)
                        } else {
                            resolve(results)
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            })
        },
        selectChangeModal (e) {
            if (e === '') {
                return false
            }
            if (!Array.isArray(e)) {
                let arr = []
                arr.push(e)
                e = arr
            }
            let goodsCode = e[0].goodsCode || ''
            let isparent = e[0].isparent
            this.selectItem = e

            if (isparent === 'Y' || isparent === '是') {
                this.goodsTree(goodsCode).then((res) => {
                    if (res !== 1) {
                        res.forEach((item, index) => {
                            item.title = item.goodsName

                            if (res[index].rate) {
                                res[index].render = nodeRender.bind(this)
                            }
                        })
                        e[0].children = res
                    }
                })
            }

            this.selectItem = e
            if (e[0].summarized !== '否') {

            }

            if (e === '' || !e) {
                this.$Message.info('请选择操作节点！')
                return false
            }

            // 税率  rate ， goodsCode商品编码  ，分类编码classificationCode，freeType 免税类型
            let params = {
                ...e[0]
            }

            if (e === '') {
                isparent = '是'
            } else {
                isparent = e[0].isparent || '是'
            }
            if (e[0].summarized === '否' || e[0].summarized === 'N') {
                setTimeout(() => {
                    let children = e[0].children || []
                    // 添加商品时 编码多加后两位\
                    let code = this.goodsCodeCange(children)
                    params.goodsCode = params.goodsCode + code

                    this.addBussinessParams = this.dataFormat(params)
                }, 500)
            } else {
                this.$Message.info('只能在最末级节点增加商品！')
                this.addBussinessParams = { ...addBussinessParamsTpl() }
            }
        },
        selectChange (e) {
            if (e === '') {
                return false
            }
            if (!Array.isArray(e)) {
                let arr = []
                arr.push(e)
                e = arr
            }
            let goodsCode = e[0].goodsCode || ''
            let isparent = e[0].isparent
            this.selectItem = e
            if (isparent === 'Y' || isparent === '是') {
                this.goodsTree(goodsCode).then((res) => {
                    if (res !== 1) {
                        res.forEach((item, index) => {
                            item.title = item.goodsName
                            if (item.title.length > 35) {
                                item.title = item.title.slice(0, 35) + '....'
                            }
                            if (res[index].rate || (res[index].rate + '') === '0') {
                                res[index].render = nodeRender.bind(this)
                            }
                        })
                        e[0].children = res
                    }
                })
            }
        },
        // 数据转换
        dataFormat (data) {
            let obj = {
                'N': false,
                'Y': true
            }
            for (let key in data) {
                let dk = data[key]
                data[key] = obj[dk]
            }
            return data
        },
        // 计算商品编码:
        goodsCodeCange (arr) {
            arr = arr || []
            let goodsCodeArr = arr.map(item => item.goodsCode.substr(item.goodsCode.length - 2, 2))
            var baseArr = this.goodsCodeNos

            for (let code of goodsCodeArr.entries()) {
                if (baseArr.includes(code)) {
                    let index = baseArr.indexOf(code)
                    baseArr.splice(index, 1)
                }
            }

            return baseArr[0]
        }
    }
}
</script>

<style lang="scss" scoped>
    .content {
        border: 1px solid $border;

        height: 500px;
        overflow: scroll;
    }

    .content_ltree {
        float: left;
        padding: 0 15px;
        min-width: 200px;
    }

    .conten_rbox {
        width: auto;
        border-left: 1px solid #dddee1;
        overflow: hidden;
        padding: 15px;
    }
    .no-left-border{
        border: none;
    }

    .ivu-form-item {
        margin-bottom: 10px;
    }
</style>
