# DateTimePicker 选择器

### 基本用法

设置属性 `shortcuts` 为 true 显示选择单日快捷方式

<div class='example'>
    <div class='example-box'>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <b-datetimepicker 
            v-model='date' 
            :shortcuts='short'>
        <b-datetimepicker>
    </div>

::: code
```html
    <div>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <b-datetimepicker 
            v-model='date' 
            :shortcuts='short'>
        <b-datetimepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: '',
                    short: false
                }
            },
            methods: {
                handleChange(val) {
                    this.short = val
                }
            }
        }
    </script>
```
:::
</div>

### 默认日期显示

设置 v-model 绑定值 `date: new Date('2018-11-24 18:00:01')` 默认展示时间

<div class='example'>
    <div class='example-box'>
        <b-datetimepicker v-model='date1'><b-datetimepicker>
    </div>

::: code
```html
    <div>
        <b-datetimepicker v-model='date'><b-datetimepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: new Date('2018-11-24 18:00:01')
                }
            }
        }
    </script>
```
:::
</div>

### 选择日期范围

设置属性 `range` 为 true 可在一个选择器中选择一个日期范围

<div class='example'>
    <div class='example-box'>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChangeShortcuts"></b-switch>
        </div>
        <b-datetimepicker 
            v-model='daterange' 
            range 
            :shortcuts='shortcuts'>
        <b-datetimepicker>
    </div>

::: code
```html
    <div>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <b-datetimepicker 
            v-model='daterange' 
            range 
            :shortcuts='shortcuts'>
        <b-datetimepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    daterange: '',
                    shortcuts: false
                }
            },
            methods: {
                handleChange(val) {
                    this.shortcuts = val
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
        <b-datetimepicker 
            v-model='popup' 
            popup>
        <b-datetimepicker>
    </div>
    
::: code
```html
    <div>
        <b-datetimepicker 
            v-model='date' 
            popup>
        <b-datetimepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: '',
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
                date: '',
                short: false,
                date1: new Date('2018-11-24 18:00:01'),
                daterange: '',
                shortcutsdate: '',
                shortcuts: false,
                popup: '',
            }
        },
        methods: {
            handleChange(val) {
                this.short = val
            },
            handleChangeShortcuts(val) {
                this.shortcuts = val
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
| size | input组件的尺寸 | Boolean  | `small` `normal` `large` | normal |
| range | 日期选择中选择一个时间范围 | Boolean  | `true` `false` | false |
| format | 日期格式化 | String  | | YYYY-MM-DD |
| clearable | 是否显示清除按钮 | Boolean  | `true` `false` | true |
| editable | 输入框内是否可编辑 | Boolean  | `true` `false` | true |
| disabled | 是否可用 | Boolean | `true` `false` | false |
| popup | 是否自适应位置 | Boolean | `true` `false` | false |
| confirm | 若为 true 则显示确认按钮且需要确认才更新时间 | Boolean | `true` `false` | false |
| confirm-text | 确认按钮的名称 | Boolean | | 确认 |
| placeholder | 默认提示性文字 | String |  | 请选择日期 |
| shortcuts | 今天、昨天、一周前，最近一周、最近一个月、最近三个月 | Boolean |  | false |

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
