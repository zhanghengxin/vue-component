# TimePicker 时间选择器

### 时间及时间范围

设置属性 `type` 为  time 或 timerange 可以选择时间或时间范围

<div class='example'>
    <div class='example-box'>
        <b-timepicker label='时间' width='160'></b-timepicker>
        <b-timepicker type='timerange' label='时间范围' width='160'></b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker type='time' label='时间' width='160'></b-timepicker>
        <b-timepicker type='timerange' label='时间范围' width='160'></b-timepicker>
    </div>
```
:::
</div>

### 默认时间显示

设置 v-model 绑定值 `time: 16:22:44` 默认展示时间

<div class='example'>
    <div class='example-box'>
        <b-timepicker v-model='time'></b-timepicker>
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
                    time: '16:22:44'
                }
            }
        }
    </script>
```
:::
</div>

### 时间间隔

设置属性 `steps`设置时间间隔。数组的三项分别对应小时、分钟、秒。

<div class='example'>
    <div class='example-box'>
        <b-timepicker :steps="[1, 15, 15]"></b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker :steps="[1, 15, 15]"></b-timepicker>
    </div>
```
:::
</div>

### 不可选时间 

可以使用 `disabled-hours` `disabled-minutes` `disabled-seconds` 组合禁止用户选择某个时间

<div class='example'>
    <div class='example-box'>
        <b-timepicker 
            :disabled-hours="[1,5,10]"
            :disabled-minutes="[0,10,20]">
        </b-timepicker>
    </div>

::: code
```html
    <div>
        <b-timepicker 
            :disabled-hours="[1,5,10]"
            :disabled-minutes="[0,10,20]">
        </b-timepicker>
    </div>
```
:::
</div>

<script>
    export default {
        data () {
            return {
                time: '16:22:44'
            }
        }
    }
</script>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 时间，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的时间格式，点击右边查看 注意：value 使用 v-model 时，值是 Date 类型，可以配合 @on-change 使用 | Date |
| type | 类型 | String  | `time` `timerange` | time |
| width | input宽度, 默认为原生 input 框默认宽度，label 模式下，需设置 width 宽度 | Number |
| label | input前的说明文字 | String |
| label-width | input前的说明文字的宽度 fixed为false时有效 |
| fixed | input的搭配文字的两种样式类型 | Boolean  | `true`、`false` | false |
| size | input组件的尺寸 | Boolean  | `small` `default` `large` | default |
| format | 时间格式化 | String  | | HH:mm:ss |
| placement | 时间选择器出现的位置 | String | `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end`| bottom-start |
| clearable | 是否显示清除按钮 | Boolean  | `true` `false` | true |
| editable | 输入框内是否可编辑 | Boolean  | `true` `false` | true |
| disabled | 是否可用 | Boolean | `true` `false` | false |
| confirm | 若为 true 则显示确认按钮且需要确认才更新时间 | Boolean | `true` `false` | false |
| placeholder | 默认提示性文字 | String |  | 请选择时间 |
| steps | 下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45 | Array | | [] |

### events
| 事件名 | 说明  | 返回值 |
| ---- | ---- | ---- |
| on-change | 时间改变的时候触发 | date |
| on-ok | 点击确认按钮触发，配合 confirm 属性使用 |
| on-clear | 在 confirm 模式或 clearable = true 时有效，在清空时间时触发 |
