# DatePicker 日期选择器

### 基本用法

设置属性 `type` 为 date 显示选择单日

<div class='example'>
    <div class='example-box'>
        <calendar-picker type='daterange'></calendar-picker>
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
                    date: '',
                }
            }
        }
    </script>
```
:::
</div>
