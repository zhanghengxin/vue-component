
<script>
    export default {
        data () {
            return {
                value: '',
                value0: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                value8: '',
                value9: '',
                value10: '',
                value11: '',
                value12: ''
            }
        },
        methods:{
            changemal(e){
                console.log(e.target.value)
            }
        }
    }
</script>

# label 输入框组合
基本组件，支持 input、select、datepicker的组合使用，支持两种样式的组合方式。
-----
### 基础用法
可使用 v-model 实现数据的双向绑定。<br/>
可直接设置 style 来改变输入框的宽度，默认 100%。<br/>
可直接设置 error 来改变输入框的hover focus样式
<div class="example">
    <div class="example-box">
        <div>
            <b-label>
                <b-input v-model="value" placeholder="请输入..." style='width:200px' /></b-input>
            </b-label>
            <span>{{value}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-label>
            <b-input v-model="value" placeholder="请输入..." style='width:200px' /></b-input>
        </b-label>
        <span>{{value}}</span>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                }
            }
        }
    </script>
```
:::


### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| value    | 绑定的值，可使用 v-model 双向绑定   | String,Number  | - |   -  |
| type     | 输入框类型   | String  | `text`、`password`、`textarea`、`url`、`email` |   -  |
| placeholder | 占位文本   | String  | - |   请输入..  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
