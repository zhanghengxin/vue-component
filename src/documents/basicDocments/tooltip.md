# Tooltip 文字提示
&nbsp;
## 概述
<br>
文字提示气泡框，在鼠标悬停时显示，代替了系统的title提示。<br>
-----
### 基础用法
普通组件使用方法

<div class="example">
    <div class="example-box">
        <div>
            <b-tooltip content="Top Left text" placement="top-start">
                <b-button>Top Left</b-button>
            </b-tooltip>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal" @on-click="modal1 = true">基本弹框</b-button>
        <b-modal
            v-model="modal1"
            title="普通对话框"
        >
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </b-modal>
    </div>
    <script>
        export default {
            data () {
                return {
                    modal1: false
                }
            },
            methods: {
                ok () {
                    console.log('Clicked ok')
                },
                cancel () {
                    console.log('Clicked cancel')
                }
            }
        }
    </script>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-button @on-click="modal2 = true">自定义页头和页脚</b-button>
            <b-button @on-click="modal3 = true">不带标题栏和自定义宽度</b-button>
            <b-modal v-model="modal2">
                <p slot="header" style="color:#f60;text-align:center">
                    <b-icon type="yiban" size="16"></b-icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>此任务删除后，下游 10 个任务将无法执行。</p>
                    <p>是否继续删除？</p>
                </div>
                <div slot="footer">
                    <b-button type="error" @on-click="del">删除</b-button>
                </div>
            </b-modal>
            <b-modal v-model="modal3" width="360">
                <p>对话框内容</p>
                <p>对话框内容</p>
                <p>对话框内容</p>
            </b-modal>
        </div>
    </div>

::: code
```html
    <div>
        <b-button @on-click="modal2 = true">自定义页头和页脚</b-button>
        <b-button @on-click="modal3 = true">不带标题栏和自定义宽度</b-button>
        <b-modal v-model="modal2">
            <p slot="header" style="color:#f60;text-align:center">
                <b-icon type="yiban" size="16"></b-icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>此任务删除后，下游 10 个任务将无法执行。</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <b-button type="error" @on-click="del">删除</b-button>
            </div>
        </b-modal>
        <b-modal v-model="modal3" width="360">
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </b-modal>
    </div>
    <script>
        export default {
            data () {
                return {
                    modal2: false,
                    modal3: false
                }
            }
        }
    </script>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-button @on-click="modal4 = true">显示全屏对话框</b-button>
            <b-modal v-model="modal4" fullscreen title="全屏对话框">
                <div>这是一个全屏的对话框</div>
            </b-modal>
        </div>
    </div>

::: code
```html
    <div>
        <b-button @on-click="modal4 = true">显示全屏对话框</b-button>
        <b-modal v-model="modal4" fullscreen title="全屏对话框">
            <div>这是一个全屏的对话框</div>
        </b-modal>
    </div>
    <script>
        export default {
            data () {
                return {
                    modal4: false
                }
            }
        }
    </script>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-button @on-click="modal5 = true">拖拽对话框1</b-button>
            <b-button @on-click="modal6 = true">拖拽对话框1</b-button>
            <b-modal v-model="modal5" draggable scrollable :center="false" title="拖拽对话框1">
                <div>第一个拖拽对话框</div>
            </b-modal>
            <b-modal v-model="modal6" draggable scrollable :center="false" title="拖拽对话框2">
                <div>第二个拖拽对话框</div>
            </b-modal>
        </div>
    </div>

::: code
```html
    <div>
        <b-button @click="modal5 = true">拖拽对话框1</b-button>
        <b-button @click="modal6 = true">拖拽对话框1</b-button>
        <b-modal v-model="modal5" draggable scrollable :center="false" title="拖拽对话框1">
            <div>第一个拖拽对话框</div>
        </b-modal>
        <b-modal v-model="modal6" draggable scrollable :center="false" title="拖拽对话框2">
            <div>第二个拖拽对话框</div>
        </b-modal>
    </div>
    <script>
        export default {
            data () {
                return {
                    modal5: false,
                    modal6: false
                }
            }
        }
    </script>
```
:::
</div>

<script>
export default {
    data () {
        return {
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            modal6: false,
            modal7: false,
            modal8: false,
            name: ''
        }
    },
    methods: {
        ok () {
            console.log('Clicked ok')
        },
        del () {
            this.modal2 = false
            console.log('Successfully delete')
        },
        cancel () {
            console.log('Clicked cancel')
        },
        instance (type) {
            this.$Modal[type]({
                title: 'Title',
                content: '内容'
            })
        },
        handleRender () {
            this.$Modal.confirm({
                render: (h) => {
                    return h('b-input', {
                        props: {
                            value: this.name,
                            autofocus: true,
                            placeholder: '请输入你的名字'
                        },
                        on: {
                            input: (val) => {
                                this.name = val
                            }
                        }
                    })
                }
            })
        }
    }
}
</script>

### props
| 参数      | 说明    | 类型        | 默认值   |
|---------- |-------- |---------- |-------------  |
| value            | 对话框是否显示, 可使用 v-model 双向绑定数据                                | Boolean        | false      |
| closable         | 是否显示右上角的关闭按钮, 关闭后 Esc 按键也将关闭                            | Boolean        | true       |
| mask-closable    | 是否允许点击遮罩层关闭                                                    | Boolean        | false   |
| title            | 对话框标题, 如果使用 slot 自定义了页头, 则 title 无效                       | String         |  -  |
| width            | 对话框宽度, 对话框的宽度是响应式的                                         | Number, String |  520  |
| ok-text          | 确定按钮文字                                                            | String         | 确定   |
| cancel-text      | 取消按钮文字                                                            | String         | 取消   |
| loading          | 点击确定按钮时, 确定按钮是否显示 loading 状态, 开启则需手动设置value来关闭对话框 | Boolean        | false   |
| styles           | 设置浮层样式, 调整浮层位置等, 该属性设置的是.bw-modal的样式                   | Object         | -  |
| center           | 是否居中显示, 居中显示, top 无效                                          | Boolean         | true  |
| class-name       | 设置对话框容器.bw-modal-wrap的类名，可辅助实现垂直居中等自定义效果             | String          | -   |
| footer-hide      | 不显示底部                                                              | Boolean         | false   |
| scrollable       | 页面是否可以滚动                                                         | Boolean         | false   |
| transition-names | 自定义显示动画, 第一项是模态框, 第二项是背景                                 | Array           | ['ease', 'fade']   |
| transfer         | 是否将弹层放置于 body 内                                                 | Boolean         | true   |
| fullscreen       | 是否全屏显示                                                            | Boolean         | false   |
| mask             | 是否显示遮罩层, 开启 draggable 时, 强制不显示                              | Boolean         | true   |
| z-index          | 层级                                                                   | Number, String  | 1000 |
| draggable        | 是否可以拖拽移动                                                         | Boolean         | false   |

### events
| 事件名              | 说明                | 返回值 |
| -----------------  | ------------------ | ------ |
| on-ok              | 点击确定的回调        | 无    |
| on-cancel          | 点击取消的回调        | 无    |
| on-visible-change  | 显示状态发送变化是触发 | true / false   |
| on-after-close     | 对话框隐藏后的回调    | 无  |

### Modal instance
通过直接调用以下方法来使用：此方法弹框 默认 top: 100px
+ `this.$Modal.info(config)`

+ `this.$Modal.success(config)`
+ `this.$Modal.warning(config)`
+ `this.$Modal.error(config)`
+ `this.$Modal.confirm(config)`
&nbsp;
##### 以上方法隐式地创建及维护Vue组件。参数 config 为对象，具体说明如下：
&nbsp;
| 参数      | 说明    | 类型        | 默认值   |
| ---------- | ------- |---------- |-------------  |
| title      | 标题                                                                            | String , Element String |  -  |
| content    | 内容                                                                            | String , Element String |  -  |
| render     | 自定义内容, 使用后不再限制类型, content 也无效                                       | Function                |  -  |
| width      | 宽度                                                                            | Number, String          |  400  |
| okText     | 确定按钮文字                                                                     | String                  | 确定   |
| cancelText | 取消按钮文字                                                                     | String                  | 取消   |
| loadinng   | 点击确定按钮时, 确定按钮是否显示 loading 状态, 开启则需手动调用Modal.remove()来关闭对话框 | Boolean                 | false   |
| scrollable | 页面是否可以滚动                                                                  | Boolean                 | false   |
| closable   | 是否可以按 Esc 键关闭                                                             | Boolean                 | false   |
| onOk       | 点击确定的回调                                                                    | Function                | -     |
| onCancel   | 点击取消的回调，只在Modal.confirm()下有效                                           | Function                | -   |
##### 全局关闭对话框的方法：
&nbsp;
+ `this.$Modal.remove()`
