# Modal 对话框

## 概述

模态对话框，在浮层中显示，引导用户进行相关操作。
Modal提供了两种用法，普通组件使用和封装好的简洁实例调用。
-----
### 基础用法
普通组件使用方法

<div class="example">
    <div class="example-box">
        <div>
           <b-button type="info" @click="modal1 = true">Display dialog box</b-button>
            <b-modal
                v-model="modal1"
                title="Common Modal dialog box title"
            >
                <p>Content of dialog</p>
                <p>Content of dialog</p>
                <p>Content of dialog</p>
            </b-modal>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="info">默认按钮</b-button>
        <b-button type="white">主要按钮</b-button>
    </div>
```
:::
</div>


### 不同尺寸
Button 组件可以在不同场景下选择合适的按钮尺寸。
尺寸选项：```normal```、```small```，通过设置```size```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
            <b-button size="normal">默认尺寸</b-button>
            <b-button size="small">小尺寸</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button size="normal">默认尺寸</b-button>
        <b-button size="small">小尺寸</b-button>
    </div>
```
:::
</div>

### events
Button 支持click 事件

<div class="example">
    <div class="example-box">
        <div>
            <b-button size="normal" @on-click="handleClick">点击事件</b-button>
        </div>
    </div>

<script>
    export default {
        methods: {
            handleClick(event) {
                alert('点击事件！')
            }
        }
    }
</script>

::: code
```html
   <div>
       <b-button size="normal" @on-click="handleClick">点击事件</b-button>
   </div>
   <script>
       export default {
           methods: {
               handleClick(event) {
                   alert('点击事件！')
               }
           }
       }
   </script>
```
:::
</div>

### props
| 参数      | 说明    | 类型        | 默认值   |
|---------- |-------- |---------- |-------------  |
| value            | 对话框是否显示，可使用 v-model 双向绑定数据                                 | Boolean        | false      |
| closable         | 是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭                             | Boolean        | true       |
| mask-closable    | 是否允许点击遮罩层关闭                                                    | Boolean        | false   |
| title            | 对话框标题，如果使用 slot 自定义了页头，则 title 无效                        | String         |  -  |
| width            | 对话框宽度，对话框的宽度是响应式的                                          | Number, String |  520  |
| ok-text          | 确定按钮文字                                                            | String         | 确定   |
| cancel-text      | 取消按钮文字                                                            | String         | 取消   |
| loading          | 点击确定按钮时，确定按钮是否显示 loading 状态，开启则需手动设置value来关闭对话框 | Boolean        | false   |
| styles           | 设置浮层样式，调整浮层位置等，该属性设置的是.bw-modal的样式                   | Object         | -  |
| class-name       | 设置对话框容器.bw-modal-wrap的类名，可辅助实现垂直居中等自定义效果            | String          | -   |
| footer-hide      | 不显示底部                                                             | Boolean         | false   |
| scrollable       | 页面是否可以滚动                                                        | Boolean         | false   |
| transition-names | 自定义显示动画，第一项是模态框，第二项是背景                                 | Array           | ['ease', 'fade']   |
| append-to-body   | 是否将弹层放置于 body 内                                                 | Boolean        | true   |
| fullscreen       | 是否全屏显示                                                            | Boolean        | false   |
| mask             | 是否显示遮罩层，开启 draggable 时，强制不显示                              | Boolean         | true   |
| z-index          | 层级                                                                  | Numbber         | 1000 |
| draggable        | 是否可以拖拽移动                                                        | Boolean         | false   |

### events
| 事件名              | 说明                | 返回值 |
| -----------------  | ------------------ | ------ |
| on-ok              | 点击确定的回调        | 无    |
| on-cancel          | 点击取消的回调        | 无    |
| on-visible-change  | 显示状态发送变化是触发 | true / false   |
| on-after-close     | 显示状态是的回调       | 无  |
