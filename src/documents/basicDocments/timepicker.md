# TimePicker 时间选择器

### 基本用法

<div class='example'>
    <div class='example-box'>
        <b-timepicker 
            v-model='time'
            @on-change='handleChangeTime'>
        </b-timepicker>
    </div>
    
::: code
```html
    <div>
        <b-timepicker v-model='time'></b-timepicker>
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

### 定义分钟步频

<div class='example'>
    <div class='example-box'>
        <b-timepicker 
            v-model='timestemp'
            :minuteStep='5'>
        </b-timepicker>
    </div>
    
::: code
```html
    <div>
        <b-timepicker 
            v-model='time'
            :minute-step='5'>
        </b-timepicker>
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

设置 v-model 绑定值 `date: 18:00:01` 默认展示时间

<div class='example'>
    <div class='example-box'>
        <b-timepicker v-model='time1'></b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker v-model='time'></b-timepicker>
    </div> 
    <script>
        export default {
            data () {
                return {
                    time: '18:00:01'
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
        <b-timepicker v-model='daterange' range></b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker v-model='timerange' range></b-timepicker>
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

<script>
    export default {
        data () {
            return {
                time: '',
                time1: '18:00:01',
                daterange: '',
                popup: '',
                timestemp: 5
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
| width | input宽度 | Number |
| label | input前的说明文字 | String |
| labelWidth | label模式下label的宽度 |
| fixed | input的搭配文字的两种样式类型 | Boolean  | `true`、`false` | false |
| size | input组件的尺寸。 | Boolean  | `small` `default` `large` | default |
| format | 日期格式化 | String  | | YYYY-MM-DD |
| dateType | 返回日期格式 | String | `formatdate` `timestamp` `date` | formatdate |
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
| on-change | 日期改变的时候触发 | 选择的日期 |
| input | 日期改变的时候触发 | 选择的日期 |
| on-confirm | 点击确认按钮触发，配合 confirm 属性使用 | 选择的日期 |
