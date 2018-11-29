# TimePicker 时间选择器

### 基本用法

<div class='example'>
    <div class='example-box'>
        <b-timepicker 
            v-model='time' 
            @change='handleChangeTime'>
        <b-timepicker>
    </div>
    
::: code
```html
    <div>
        <b-timepicker v-model='time'><b-timepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    time: '',
                }
            }
        }
    </script>
```
:::
</div>

### 默认时间显示

设置 v-model 绑定值 `date: new Date('2018-11-24 18:00:01')` 默认展示时间

<div class='example'>
    <div class='example-box'>
        <b-timepicker v-model='time1'><b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker v-model='time'><b-timepicker>
    </div> 
    <script>
        export default {
            data () {
                return {
                    time: new Date('2018-11-24 18:00:01')
                }
            }
        }
    </script>
```
:::
</div>

### 选择时间范围

设置属性 `range` 为 true 可在一个选择器中选择一个时间范围

<div class='example'>
    <div class='example-box'>
        <b-timepicker v-model='daterange' range><b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker v-model='timerange' range><b-timepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    timerange: '',
                }
            }
        }
    </script>
```
:::
</div>

### 自适应位置

设置属性 `popup` 为 true 来自适应垂直方向位置

<div class='example'>
    <div class='example-box'>
        <b-timepicker v-model='popup' popup><b-timepicker>
    </div>
    
::: code
```html
    <div>
        <b-timepicker v-model='time' popup><b-timepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    time: '',
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
                time: '',
                time1: new Date('2018-11-24 18:00:01'),
                daterange: '',
                popup: ''
            }
        },
        methods: {
            handleChangeTime(value) {
                console.log('v', value)
            }
        }
    }
</script>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 日期选择器中的值，使用 v-model 双向绑定数据 | String |
| label | input前的说明文字 | String | | |
| labelText | 自定义 label 模式的内容 | String  | | 日期 |
| fixed | input的搭配文字的两种样式类型 | Boolean  | `true`、`false` | false |
| size | input组件的尺寸。 | Boolean  | `small` `normal` `large` | normal |
| format | 日期格式化 | String  | | YYYY-MM-DD |
| clearable | 是否显示清除按钮 | Boolean  | `true` `false` | true |
| editable | 输入框内是否可编辑 | Boolean  | `true` `false` | true |
| disabled | 是否可用 | Boolean | `true` `false` | false |
| confirm | 若为 true 则显示确认按钮且需要确认才更新时间 | Boolean | `true` `false` | false |
| confirm-text | 确认按钮的名称 | Boolean | | 确认 |
| placeholder | 默认提示性文字 | String |  | 请选择日期 |

### Slots
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| calendar-icon | 图标 | - |
| header |  |  |
| footer |  |  |


### events
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| change | 日期改变的时候触发 | 选择的日期 |
| input | 日期改变的时候触发 | 选择的日期 |
| confirm | 点击确认按钮触发，配合 confirm 属性使用 | 选择的日期 |