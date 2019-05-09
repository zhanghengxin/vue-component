# DatePicker 日期选择器

### 日期及日期范围

设置属性 `type` 为  date 或 daterange 可以选择日期或日期范围

<div class='example'>
    <div class='example-box'>
        <b-datepicker label='日期' width='160'></b-datepicker>
        <b-datepicker type='daterange' label='日期范围' width='160'></b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker type='date' label='日期' width='160'></b-datepicker>
        <b-datepicker type='daterange' label='日期范围' width='160'></b-datepicker>
    </div>
```
:::
</div>

### 默认日期显示

设置 v-model 绑定值 `date: 2019-03-28` 默认展示时间

<div class='example'>
    <div class='example-box'>
        <b-datepicker v-model='date'></b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker v-model='date'></b-datepicker>
    </div>
    <script>
        export default {
            data () {
                return {
                    date: '2019-03-28'
                }
            }
        }
    </script>
```
:::
</div>

### 面板不联动

设置属性 `split-panels` 为 true 左右两面板在切换年、月时不联动

<div class='example'>
    <div class='example-box'>
        <b-datepicker type='daterange' split-panels></b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker type='daterange' split-panels></b-datepicker>
    </div>
```
:::
</div>

### 日期多选

设置属性 `multiple` 为 true 可选择多个日期

<div class='example'>
    <div class='example-box'>
        <b-datepicker type='date' multiple width='300'></b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker type='date' multiple></b-datepicker>
    </div>
```
:::
</div>

### 快捷方式

设置属性 options 对象中的 shortcuts 可以设置快捷选项

<div class='example'>
    <div class='example-box'>
        <b-datepicker type='date' :options="dateOptions" label='日期快捷方式' width='160'></b-datepicker>
        <b-datepicker type='daterange' :options="dateRangeOptions" label='日期范围快捷方式' width='160'></b-datepicker>
    </div>

::: code
```html
    <div>
        <b-datepicker type='date' :options="dateOptions" label='日期快捷方式' width='160'></b-datepicker>
        <b-datepicker type='daterange' :options="dateRangeOptions" label='日期范围快捷方式' width='160'></b-datepicker>
    </div>
    <script>
        export default {
        data () {
            return {
                dateOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('Click today');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('Click yesterday');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('Click a week ago');
                            }
                        }
                    ]
                },
                dateRangeOptions: {
                    shortcuts: [
                        {
                            text: '1 week',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '1 month',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '3 months',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        }
    }
    </script>
```
:::
</div>

### 起始日期

设置属性 `start-date` 后，可以将默认显示的日期面板设置为指定日期

<div class='example'>
    <div class='example-box'>
        <b-datepicker :start-date="new Date(2019, 1, 14)"></b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker :start-date="new Date(2019, 1, 14)"></b-datepicker>
    </div>
```
:::
</div>

### 选择年份

设置属性 `type` 为 year 显示选择年份

<div class='example'>
    <div class='example-box'>
        <b-datepicker type='year'></b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker type='year'></b-datepicker>
    </div>
```
:::
</div>

### 选择月份

设置属性 `type` 为 month 显示选择月份

<div class='example'>
    <div class='example-box'>
        <b-datepicker type='month'></b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker type='month'></b-datepicker>
    </div>
```
:::
</div>

### 日期时间选择

设置属性 `type` 为 datetime 或 datetimerange 可以选择时间

<div class='example'>
    <div class='example-box'>
        <b-datepicker type='datetime' label='日期时间' fixed width='220'></b-datepicker>
        <b-datepicker type='datetimerange' label='日期时间范围' width='160'></b-datepicker>
    </div>
    
::: code
```html
    <div>
        <b-datepicker type='datetime' label='日期时间' fixed width='220'></b-datepicker>
        <b-datepicker type='datetimerange' label='日期时间范围' width='160'></b-datepicker>
    </div>
```
:::
</div>

<script>
    export default {
        data () {
            return {
                date: '2019-03-28',
                dateOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('今天');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('昨天');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('一周前');
                            }
                        }
                    ]
                },
                dateRangeOptions: {
                    shortcuts: [
                        {
                            text: '一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            handleChangeDate(val) {
                console.log(val)
            }
        }
    }
</script>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 日期，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的日期格式，点击右边查看 注意：value 使用 v-model 时，值是 Date 类型，可以配合 @on-change 使用 | Date |
| type | 类型 | String  | `date` `daterange` `datetime` `datetimerange` `year` `month` | date |
| width | input宽度, 默认为原生 input 框默认宽度，label 模式下，需设置 width 宽度 | Number |
| label | input前的说明文字 | String |
| label-width | input前的说明文字的宽度 fixed为false时有效 |
| fixed | input的搭配文字的两种样式类型 | Boolean  | `true`、`false` | false |
| size | input组件的尺寸 | Boolean  | `small` `default` `large` | default |
| format | 日期格式化 | String  | | yyyy-MM-dd |
| placement | 日期选择器出现的位置 | String | `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end`| bottom-start |
| clearable | 是否显示清除按钮 | Boolean  | `true` `false` | true |
| editable | 输入框内是否可编辑 | Boolean  | `true` `false` | true |
| disabled | 是否可用 | Boolean | `true` `false` | false |
| confirm | 若为 true 则显示确认按钮且需要确认才更新时间 | Boolean | `true` `false` | false |
| placeholder | 默认提示性文字 | String |  | 请选择日期 |
| split-panels | 面板是否联动，仅在 daterange 和 datetimerange 下可用 | Boolean | `true` `false` | false |
| time-picker-options | 可以在 type 为 datetime 和 datetimerange 下，配置 TimePicker 的属性，比如时间间隔 steps：:time-picker-options="{steps: [1, 10, 10]}" | Object | | {} |
| show-week-numbers | 开启后，可以显示星期数 | Boolean | `true` `false` | false |
| multiple | 可以选择多个日期，仅在 date 下可用 | Boolean | `true` `false` | false |
| options | 选择器额外配置，比如不可选日期与快捷选项，具体项详见下表 | Object |

### options 

| 属性 | 说明 | 类型 |
| ---- | ---- | ---- |
| shortcuts | 设置快捷选项，每项内容：`text: String`：显示的文案 `value: Function`：返回指定的日期，如需自己控制逻辑，可不设置，并使用 onClick 回调 `onClick: Function`：点击时的回调，参数为当前日期选择器的 Vue 实例，当需要自定义复杂操作时，可以使用 | Boolean/Array |  | false |
| disabledDate | 设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天 | Function |

### events
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| on-change | 日期改变的时候触发 | date |
| on-ok | 点击确认按钮触发，配合 confirm 属性使用 |
| on-clear | 在 confirm 模式或 clearable = true 时有效，在清空日期时触发 |