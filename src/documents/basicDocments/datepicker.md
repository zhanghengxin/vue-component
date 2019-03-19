# DatePicker 日期选择器

### 基本用法

设置属性 `type` 为 date 显示选择单日

<div class='example'>
    <div class='example-box'>
        <b-datepicker v-model='date'><b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='date' ><b-datepicker>
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

### 不可选日期

设置属性 `not-before`、`not-after`、`disabled-days` 设定不可选日期

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='notSelect' 
            :not-before="new Date()" 
            :not-after="new Date(new Date().getTime() + 3600 * 24 * 1000)">
        <b-datepicker>
    </div>
    <div class='example-box'>
        <b-datepicker 
            v-model='notSelectRange' 
            range
            :not-before="new Date()" 
            :not-after="new Date(new Date().getTime() + 3600 * 24 * 1000 * 30)">
        <b-datepicker>
    </div>
    <div class='example-box'>
        <b-datepicker 
            v-model='disabledDaysTime' 
            :disabled-days='disabledDays'>
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker 
            v-model='notSelect' 
            :not-before="notBefore" 
            :not-after="notAfter">
        <b-datepicker>
            <b-datepicker 
            v-model='notSelectRange' 
            range
            :not-before="notBeforeRange" 
            :not-after="notAfterRange">
        <b-datepicker>
        <b-datepicker 
            v-model='disabledDaysTime' 
            :disabled-days='disabledDays'>
        <b-datepicker>
    </div>
    <script>
        const _date = new Date().getTime()
        const nextDate = new Date(_date + (3600 * 1000 * 24))
        const preDate = new Date(_date - (3600 * 1000 * 24))
        const nextMonth = new Date(_date + (3600 * 1000 * 24 * 30))

        export default {
            data () {
                return {
                    notSelect: '',
                    notSelectRange: '',
                    disabledDaysTime: '',
                    notBefore: new Date(),
                    notAfter: nextDate,
                    notBefore: new Date(),
                    notAfter: nextMonth,
                    disabledDays: [preDate, new Date(), nextDate]
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
        <b-datepicker v-model='daterange' range><b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='daterange' range><b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    daterange: '',
                }
            }
        }
    </script>
```
:::
</div>

### 面板联动

设置属性 `split-panels` 为 false 可在一个选择器中选择一个日期范围

<div class='example'>
    <div class='example-box'>
        <b-datepicker v-model='splitPanels' range :split-panels='false'><b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='splitPanels' range :split-panels='false'><b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    splitPanels: '',
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

### 选择时间

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            type='time'
            v-model='time'>
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker v-model='time' type='time'><b-datepicker>
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

### 选择时间范围

设置属性 `range` 为 true 可在一个选择器中选择一个时间范围

<div class='example'>
    <div class='example-box'>
        <b-datepicker v-model='daterange' range type='time'><b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='timerange' range type='time'><b-datepicker>
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

### 选择日期时间

<div class='example'>
    <div class='example-box'>
        <b-datepicker v-model='datetime' type='datetime'><b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='datetime' type='datetime'><b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    datetime: ''
                }
            }
        }
    </script>
```
:::
</div>

### 选择日期时间范围

设置属性 `range` 为 true 可在一个选择器中选择一个日期时间范围

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='datetimerange' 
            range 
            type='datetime'>
        <b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker 
            v-model='datetimerange' 
            range
            type='datetime'>
        <b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    datetimerange: '',
                }
            }
        }
    </script>
```
:::
</div>

### 快捷方式

设置属性 `shortcuts` 显示快捷方式

<div class='example'>
    <div class='example-box'>
        <b-datepicker 
            v-model='shortcutsTime'
            shortcuts>
        <b-datepicker>
    </div>
    <div class='example-box'>
        <b-datepicker 
            v-model='customShortcutsTime'
            :shortcuts='customShortcuts'>
        <b-datepicker>
    </div>
    <div class='example-box'>
        <b-datepicker 
            range
            v-model='customRangeShortcutsTime'
            :shortcuts='customRangeShortcuts'>
        <b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker 
            v-model='shortcutsTime' 
            shortcuts>
        <b-datepicker>
        <b-datepicker 
            v-model='customShortcutsTime'
            :shortcuts='customShortcuts'>
        <b-datepicker>
        <b-datepicker 
            range
            v-model='customRangeShortcutsTime'
            :shortcuts='customRangeShortcuts'>
        <b-datepicker>
    </div>
    <script>
        const _date = new Date().getTime()
        const nextDate = new Date(_date + (3600 * 1000 * 24))
        export default {
            data () {
                return {
                    shortcutsTime: '',
                    customShortcutsTime: '',
                    customRangeShortcutsTime: '',
                    customRangeShortcuts: [
                        {
                            text: '最近两天',
                            start: new Date(),
                            end: nextDate
                        }
                    ],
                    customShortcuts: [
                        {
                            text: '今天',
                            date: new Date()
                        },
                        {
                            text: '明天',
                            date: nextDate
                        }
                    ]
                }
            },
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
            :shortcuts='labelShorcuts'
            :label='labelText'
            :confirm='confirmed'>
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
            :label='labelText'
            :shortcuts='shortcuts'
            :fixed='fixed'
            :confirm='confirm'>
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
    const _date = new Date().getTime()
    const nextDate = new Date(_date + (3600 * 1000 * 24))
    const preDate = new Date(_date - (3600 * 24 * 1000))
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
                shortcutsTime: '',
                customShortcutsTime: '',
                customShortcuts: [
                    {
                        text: '今天',
                        date: new Date()
                    },
                    {
                        text: '明天',
                        date: nextDate
                    }
                ],
                customRangeShortcutsTime: '',
                customRangeShortcuts: [
                    {
                        text: '最近两天',
                        date: [new Date(), nextDate]
                    }
                ],
                shortcuts: false,
                popup: '',
                time: '',
                label: '',
                fixed: false,
                labelText: '发布日期',
                labelShorcuts: false,
                confirmed: false,
                notSelect: '',
                notSelectRange: '',
                disabledDaysTime: '',
                disabledDays: [preDate, new Date(), nextDate],
                splitPanels: '',
                time: '',
                datetime: '',
                timerange: '',
                datetimerange: ''
            }
        },
        methods: {
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
| type | 类型 | String  | `date` `year` `month` `time` `datetime` | date |
| width | input宽度 | Number |
| label | input前的说明文字 | String |
| labelWidth | label模式下label的宽度 |
| fixed | input的搭配文字的两种样式类型 | Boolean  | `true`、`false` | false |
| size | input组件的尺寸 | Boolean  | `small` `default` `large` | default |
| range | 日期选择中选择一个时间范围 | Boolean  | `true` `false` | false |
| format | 日期格式化 | String  | | YYYY-MM-DD |
| dateType | 返回日期格式 | String | `formatdate` `timestamp` `date` | formatdate |
| clearable | 是否显示清除按钮 | Boolean  | `true` `false` | true |
| editable | 输入框内是否可编辑 | Boolean  | `true` `false` | true |
| disabled | 是否可用 | Boolean | `true` `false` | false |
| confirm | 若为 true 则显示确认按钮且需要确认才更新时间 | Boolean | `true` `false` | false |
| confirm-text | 确认按钮的名称 | Boolean | | 确认 |
| placeholder | 默认提示性文字 | String |  | 请选择日期 |
| shortcuts | 今天、昨天、一周前，最近一周、最近一个月、最近三个月 | Boolean/Array |  | false |
| not-before | 禁止选择这个时间之前的时间 | String/Date | | false |
| not-after |禁止选择这个时间之后的时间 | String/Date | | false |
| disabled-days | 自定义禁止的日期 | Array/function |  | [] |
| first-day-of-week | 日历星期几开头 | Number |  | 7 |
| split-panels | 面板是否联动，当 rang 为 true 时可用| Boolean | `true` `false` | true |


### Slots
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| shortcuts |  |  |
| footer |  |  |


### events
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| on-change | 日期改变的时候触发 | 选择的日期 |
| input | 日期改变的时候触发 | 选择的日期 |
| on-confirm | 点击确认按钮触发，配合 confirm 属性使用 | 选择的日期 |
