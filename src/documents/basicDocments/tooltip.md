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
            <div class="top">
                <b-tooltip content="Top Left 文字提示" placement="top-start">
                    <b-button size="small">上左</b-button>
                </b-tooltip>
                <b-tooltip content="Top Center 文字提示" placement="top">
                    <b-button size="small">上边</b-button>
                </b-tooltip>
                <b-tooltip content="Top Right 文字提示" placement="top-end">
                    <b-button size="small">上右</b-button>
                </b-tooltip>
            </div>
            <div class="center">
                <div class="center-left">
                    <b-tooltip content="Left Top 文字提示" placement="left-start">
                        <b-button size="small" >左上</b-button>
                    </b-tooltip><br /><br />
                    <b-tooltip content="Left Center 文字提示" placement="left">
                        <b-button size="small">左边</b-button>
                    </b-tooltip><br /><br />
                    <b-tooltip content="Left Bottom 文字提示" placement="left-end">
                        <b-button size="small">左下</b-button>
                    </b-tooltip>
                </div>
                <div class="center-right">
                    <b-tooltip content="Right Top 文字提示" placement="right-start">
                        <b-button size="small" >右上</b-button>
                    </b-tooltip><br /><br />
                    <b-tooltip content="Right Center 文字提示" placement="right">
                        <b-button size="small" >右边</b-button>
                    </b-tooltip><br /><br />
                    <b-tooltip content="Right Bottom 文字提示" placement="right-end">
                        <b-button size="small" >右下</b-button>
                    </b-tooltip>
                </div>
            </div>
            <div class="bottom">
                <b-tooltip content="Bottom Left 文字提示" placement="bottom-start">
                    <b-button size="small" >下左</b-button>
                </b-tooltip>
                <b-tooltip content="Bottom Center 文字提示" placement="bottom">
                    <b-button size="small" >下边</b-button>
                </b-tooltip>
                <b-tooltip content="Bottom Right 文字提示" placement="bottom-end">
                    <b-button size="small" >下右</b-button>
                </b-tooltip>
            </div>
        </div>
    </div>

::: code
```html
    <div>
        <div class="top">
            <b-tooltip content="Top Left 文字提示" placement="top-start">
                <b-button size="small" >上左</b-button>
            </b-tooltip>
            <b-tooltip content="Top Center 文字提示" placement="top">
                <b-button size="small" >上边</b-button>
            </b-tooltip>
            <b-tooltip content="Top Right 文字提示" placement="top-end">
                <b-button size="small" >上右</b-button>
            </b-tooltip>
        </div>
        <div class="center">
            <div class="center-left">
                <b-tooltip content="Left Top 文字提示" placement="left-start">
                    <b-button size="small" >左上</b-button>
                </b-tooltip><br /><br />
                <b-tooltip content="Left Center 文字提示" placement="left">
                    <b-button size="small" >左边</b-button>
                </b-tooltip><br /><br />
                <b-tooltip content="Left Bottom 文字提示" placement="left-end">
                    <b-button size="small" >左下</b-button>
                </b-tooltip>
            </div>
            <div class="center-right">
                <b-tooltip content="Right Top 文字提示" placement="right-start">
                    <b-button size="small" >右上</b-button>
                </b-tooltip><br /><br />
                <b-tooltip content="Right Center 文字提示" placement="right">
                    <b-button size="small" >右边</b-button>
                </b-tooltip><br /><br />
                <b-tooltip content="Right Bottom 文字提示" placement="right-end">
                    <b-button size="small" >右下</b-button>
                </b-tooltip>
            </div>
        </div>
        <div class="bottom">
            <b-tooltip content="Bottom Left 文字提示" placement="bottom-start">
                <b-button size="small" >下左</b-button>
            </b-tooltip>
            <b-tooltip content="Bottom Center 文字提示" placement="bottom">
                <b-button size="small" >下边</b-button>
            </b-tooltip>
            <b-tooltip content="Bottom Right 文字提示" placement="bottom-end">
                <b-button size="small" >下右</b-button>
            </b-tooltip>
        </div>
    </div>
    <style scoped>
        .top,.bottom{
            text-align: center;
        }
        .center{
            width: 420px;
            margin: 10px auto;
            overflow: hidden;
        }
        .center-left{
            float: left;
        }
        .center-right{
            float: right;
        }
    </style>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-tooltip placement="top" theme="light">
                <b-button size="small" >多行</b-button>
                <div slot="content">
                    <p>Display multiple lines of information</p>
                    <p><i>Can customize the style</i></p>
                </div>
            </b-tooltip>
        </div>
    </div>

::: code
```html
    <div>
        <b-tooltip placement="top" theme="light">
            <b-button size="small" >多行</b-button>
            <div slot="content">
                <p>Display multiple lines of information</p>
                <p><i>Can customize the style</i></p>
            </div>
        </b-tooltip>
    </div>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-tooltip placement="top" max-width="200" content="我是长文本，我是长文本，我是长文本，我是长文本，我是长文本">
                <b-button size="small" >我是长文本</b-button>
            </b-tooltip>
        </div>
    </div>

::: code
```html
    <div>
        <b-tooltip placement="top" max-width="200" content="我是长文本，我是长文本，我是长文本，我是长文本，我是长文本">
            <b-button size="small" >我是长文本</b-button>
        </b-tooltip>
    </div>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-tooltip placement="top" content="禁用提示框" :disabled="disabled">
                <b-button size="small"  @on-click="disabled = true">点击禁用提示框</b-button>
            </b-tooltip>
        </div>
    </div>

::: code
```html
    <div>
        <b-tooltip placement="top" content="禁用提示框" :disabled="disabled">
            <b-button size="small"  @on-click="disabled = true">点击禁用提示框</b-button>
        </b-tooltip>
    </div>
    <script>
        export default {
            data () {
                return {
                    disabled: false
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
            <b-tooltip placement="top" content="延时1秒显示" :delay="1000">
                <b-button size="small" >点击延时1秒显示</b-button>
            </b-tooltip>
        </div>
    </div>

::: code
```html
    <div>
        <b-tooltip placement="top" content="延时1秒显示" :delay="1000">
            <b-button size="small" >点击延时1秒显示</b-button>
        </b-tooltip>
    </div>
```
:::
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-tooltip placement="top" content="Default(dark) 深色">
                <b-button size="small" >默认(深色)</b-button>
            </b-tooltip>
            <b-tooltip placement="right" content="light 白色 白色" theme="light">
                <b-button size="small" >白色</b-button>
            </b-tooltip>
        </div>
    </div>

::: code
```html
    <div>
        <b-tooltip placement="top" content="Default(dark)">
            <b-button size="small" >默认（深色）</b-button>
        </b-tooltip>
        <b-tooltip placement="top" content="light" theme="light">
            <b-button size="small" >白色</b-button>
        </b-tooltip>
    </div>
```
:::
</div>

<script>
export default {
    data () {
        return {
            disabled: false
        }
    },
    methods: {
    }
}
</script>
<style scoped>
    .top,.bottom{
        text-align: center;
    }
    .center{
        width: 420px;
        margin: 10px auto;
        overflow: hidden;
    }
    .center-left{
        float: left;
    }
    .center-right{
        float: right;
    }
</style>

### props
| 参数      | 说明    | 类型        | 默认值   |
|---------- |-------- |---------- |-------------  |
| content   | 显示的内容                               | String        | -      |
| placement | 提示框出现的位置，可选值为top,&-start,&-end,bottom,&-start,&-end,left,&-start,&-end,right,&-start,&-end，支持自动识别 | String | bottom |
| disabled  | 是否禁用提示框                                    | Boolean         | false   |
| delay     | 延迟显示，单位毫秒                                 | Number          |  0  |
| always    | 是否总是可见                                      | Boolean         |  false  |
| theme     | 主题，可选值为 dark 或 light                       | String          | dark   |
| offset    | 出现位置的偏移量                                   | Number          | 0  |
| max-width | 最大宽度，超出最大值后，文本将自动换行，并两端对齐       | String | Number | -  |
| transfer  | 是否将弹层放置于 body 内                            | Boolean         | false   |
| options   | 自定义 popper.js 的配置项，具体配置见 <a href="https://popper.js.org/popper-documentation.html" target="_blank">popper.js 文档</a> | Object    | |

### events
| 事件名          | 说明              | 返回值 |
| -------------- | ---------------- | -- |
| on-popper-show | 在提示框显示时触发  | 无 |
| on-popper-hide | 在提示框消失时触发  | 无 |

### slot
| 名称      | 说明    |
| ---------- | ------- |
| 无         | 主体内容                                               |
| content    | 提示框的内容，定义此 `slot` 时，会覆盖 `props content`。   |
