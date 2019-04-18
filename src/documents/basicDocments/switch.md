# Switch 开关
-----
### 基础用法

<div class="example">
    <div class="example-box">
        <b-switch v-model="switch1" @on-change="change" @on-click='handleClick'></b-switch>
    </div>

::: code
```html
    <b-switch v-model="switch1" @on-change="change" @on-click='handleClick'></b-switch>
    <script>
        export default {
            data () {
                return {
                    switch1: false
                }
            },
            methods: {
                change (status) {
                    console.log("开关状态"+status)
                },
                handleClick (status) {
                    console.log("点击前开关"+status)
                }
            }
        }
    </script>
```
:::
</div>
-----
### 开关禁用

<div class="example">
    <div class="example-box">
        <b-switch :disabled="disabled"></b-switch>
    </div>

::: code
```html
    <b-switch :disabled="disabled"></b-switch>
    <script>
        export default {
            data () {
                return {
                    disabled: true
                }
            }
        }
    </script>
```
:::
</div>

-----
### 开关尺寸

<div class="example">
    <div class="example-box">
        <b-switch size="large" :value='true'></b-switch>
            &nbsp;&nbsp;
        <b-switch size="default"></b-switch>
            &nbsp;&nbsp;
        <b-switch size="small"></b-switch>
    </div>

::: code
```html
        <b-switch size="large" :value='true'></b-switch>
        <b-switch size="default"></b-switch>
        <b-switch size="small"></b-switch>
```
:::
</div>
-----

### 文字和图标

<div class="example">
    <div class="example-box">
        <b-switch>
            <span slot="open">开</span>
            <span slot="close">关</span>
        </b-switch>
        &nbsp;&nbsp;
        <b-switch>
            <b-icon slot="open" type="queding" size="14"></b-icon>
            <b-icon slot="close" type="quxiao-guanbi-shanchu" size="14"></b-icon>
        </b-switch>
    </div>

::: code
```html
    <b-switch>
        <span slot="open">开</span>
        <span slot="close">关</span>
    </b-switch>
    <b-switch>
        <b-icon slot="open" type="queding" size="14"></b-icon>
        <b-icon slot="close" type="quxiao-guanbi-shanchu" size="14"></b-icon>
    </b-switch>
```
:::
</div>

### 加载中

<div class="example">
    <div class="example-box">
        <b-switch :value='true' loading></b-switch>
        <b-switch :value='false' loading size='small'></b-switch>
    </div>

::: code
```html
     <b-switch loading :value='true'></b-switch>
```
:::
</div>

<script>
export default {
        data () {
            return {
                switch1: false,
                disabled: true,
                switch2: false
            }
        },
        methods: {
            change (status) {
                console.log("开关状态"+status)
            },
            handleClick (status) {
                console.log("点击前开关"+status)
            }
        }
}
</script>

### Props
| 参数 | 说明 | 类型 | 可选值 |默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 指定当前选中的状态   | Boolean、Number、String  | --- |false |
| size | 开关的尺寸 | string | `small`、`default`、`large` | default |
| disabled | 禁用开关| Boolean| --- | false |
| true-value   | 开关选中的值 | Boolean、Number、String| ----   | true   |
| false-value   | 开关不选中的值 | Boolean、Number、String| ----   | false   |
| loading | 加载中的开关 | Boolean | | false |

### Slots
| name | 说明 |
| ---- | ---- |
| open  |  自定义显示打开时的内容   |
| close | 自定义显示关闭时的内容 |

### Events
| 事件名称 | 说明 |   返回值说明  |
| ---- | ---- |   ---- |
|  on-change | 开关变化时触发，返回当前的状态 |  `true`、`|`、`false`   |

