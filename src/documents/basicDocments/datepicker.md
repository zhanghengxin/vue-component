# DatePicker 日期选择器

### 基本用法

设置属性 `type` 为 date 显示选择单日 设置属性 `shortcuts` 为 true 显示选择单日快捷方式

<div class='example'>
    <div class='example-box'>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <b-datepicker 
            v-model='date' 
            :shortcuts='short'
            @on-change='handleChangeDate'>
        <b-datepicker>
    </div>

::: code
```html
    <div>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <b-datepicker v-model='date' :shortcuts='shortcuts'><b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: '',
                    shortcuts: false
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

设置 v-model 绑定值 `date: 2018-11-24` 默认展示时间

<div class='example'>
    <div class='example-box'>
        <b-datepicker v-model='date1'><b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='date'><b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: '2018-11-24'
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
        <b-datepicker v-model='daterange' range :shortcuts='shortcuts'><b-datepicker>
    </div>

::: code
```html
    <div>
        <div style='margin-bottom: 10px'>
            切换显示快捷方式：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <b-datepicker v-model='daterange' range :shortcuts='shortcuts'><b-datepicker>
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

### 选择年份

设置属性 `type` 为 year 显示选择年份，搭配 `format` 使用

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='year' 
            type='year' 
        format="YYYY">
    <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker 
            v-model='year' 
            type='year' 
            format="YYYY">
        <b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    year: '',
                }
            }
        }
    </script>
```
:::
</div>

### 选择年份范围

设置属性 `range` 设置选择年份范围

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='yearRange' 
            type='year'  
            range
            format="YYYY">
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker 
            v-model='year' 
            type='year'
            range
            format="YYYY">
        <b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    year: ''
                }
            }
        }
    </script>
```
:::
</div>

### 选择月份

设置属性 `type` 为 month 显示选择月份，搭配 `format` 使用

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='month' 
            type='month'  
            format="YYYY-MM">
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker 
            v-model='month' 
            type='month'
            format="YYYY-MM">
        <b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    month: ''
                }
            }
        }
    </script>
```
:::
</div>

### 选择月份范围

设置属性 `range` 设置选择月份范围

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='monthRange' 
            type='month'  
            range
            format="YYYY-MM">
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker 
            v-model='month' 
            type='month'
            range
            format="YYYY-MM">
        <b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    month: ''
                }
            }
        }
    </script>
```
:::
</div>

### 定义输入框格式

设置属性 `labelText` 来显示 label 的内容

<div class='example'>
    <div class='example-box'>
        <div style='margin-bottom: 10px'>
            切换Label属性：<b-switch @on-change="handleChangeLabel"></b-switch>
        </div>
        <div style='margin-bottom: 10px'>
            切换快捷方式：<b-switch @on-change="handleChangeLabelCuts"></b-switch>
        </div>
        <div style='margin-bottom: 10px'>
            切换确认按钮：<b-switch @on-change="handleChangeButton"></b-switch>
        </div>
        <b-datepicker 
            v-model='label'
            :fixed='fixed'
            :width='400'
            :shortcuts='labelShorcuts'
            :labelText='labelText'
            :confirm='confirmed'
            label>
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <div style='margin-bottom: 10px'>
            切换Label属性：<b-switch @on-change="handleChange"></b-switch>
        </div>
        <div style='margin-bottom: 10px'>
            切换快捷方式：<b-switch @on-change="handleChangeLabelCuts"></b-switch>
        </div>
        <div style='margin-bottom: 10px'>
            切换确认按钮：<b-switch @on-change="handleChangeButton"></b-switch>
        </div>
        <b-datepicker 
            v-model='date'
            :labelText='labelText'
            :shortcuts='shortcuts'
            :fixed='fixed'
            :width='1000'
            :confirm='confirm'
            label>
        <b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: '',
                    fixed: false,
                    shortcuts: false,
                    confirm: false,
                    labelText: '发布日期'
                }
            },
            methods: {
                handleChange(val) {
                    this.fixed = val
                },
                handleChangeLabelCuts(val) {
                    this.shortcuts = val
                },
                handleChangeButton(val) {
                    this.confirm = val
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
                date1: '2018-11-24',
                year: '',
                yearRange: '',
                month: '',
                monthRange: '',
                daterange: '',
                shortcutsdate: '',
                shortcuts: false,
                popup: '',
                time: '',
                label: '',
                fixed: false,
                labelText: '发布日期',
                labelShorcuts: false,
                confirmed: false
            }
        },
        methods: {
            confirm(value) {
                console.log('v', value)
            },
            handleChange(val) {
                this.short = val
            },
            handleChangeShortcuts(val) {
                this.shortcuts = val
            },
            handleChangeDate(val) {
                console.log('val', val)
            },
            handleChangeLabel(val) {
                this.fixed = val
            },
            handleChangeLabelCuts(val) {
                this.labelShorcuts = val
            },
            handleChangeButton(val) {
                this.confirmed = val
            }
        }
    }
</script>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 日期选择器中的值，使用 v-model 双向绑定数据 | String |
| type | 类型 | String  | `date` `year` `month` | date |
| label | input前的说明文字 | String | | |
| labelText | 自定义 label 模式的内容 | String  | | 日期 |
| fixed | input的搭配文字的两种样式类型 | Boolean  | `true`、`false` | false |
| size | input组件的尺寸 | Boolean  | `small` `normal` `large` | normal |
| range | 日期选择中选择一个时间范围 | Boolean  | `true` `false` | false |
| format | 日期格式化 | String  | | YYYY-MM-DD |
| dateType | 返回日期格式 | String | `formatdate` `timestamp` `date` | formatdate |
| clearable | 是否显示清除按钮 | Boolean  | `true` `false` | true |
| editable | 输入框内是否可编辑 | Boolean  | `true` `false` | true |
| disabled | 是否可用 | Boolean | `true` `false` | false |
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
| on-change | 日期改变的时候触发 | 选择的日期 |
| input | 日期改变的时候触发 | 选择的日期 |
| on-confirm | 点击确认按钮触发，配合 confirm 属性使用 | 选择的日期 |
