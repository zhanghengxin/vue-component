
<script>
    export default {
        data () {
            return {
                value: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                name:'姓名',
                pwd:'密码',
                disabled:true,
                error:true
            }
        },
        methods:{
            changemal(e){
                console.log(e.target.value)
            }
        }
    }
</script>

# Input\Textarea 输入框（待完善..）
基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。
-----
### 基础用法
可使用 v-model 实现数据的双向绑定。<br/>
可直接设置 style 来改变输入框的宽度，默认 180px。
可直接设置 error 来改变输入框的hover focus，默认 180px。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value" placeholder="请输入..." /></b-input>
            <b-input v-model="value" placeholder="请输入..." :error='error' /></b-input>
            <span>{{value}}</div>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value" placeholder="请输入..." /></b-input>
        <span>{{value}}</span>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: ''
                }
            }
        }
    </script>
```
:::
</div>


### 尺寸
Input 组件可以在不同场景下选择合适的尺寸。<br/>
尺寸选项：```large```、```normal```、```small```，通过设置```size```属性来配置它们。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value1" size="large" placeholder="large" ></b-input>
            <hr/>
            <b-input v-model="value2" size="normal" placeholder="normal" ></b-input>
            <hr/>
            <b-input v-model="value3" size="small" placeholder="small" ></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value1" size="large" placeholder="large" ></b-input>
        <hr/>
        <b-input v-model="value2" size="normal" placeholder="normal" ></b-input>
        <hr/>
        <b-input v-model="value3" size="small" placeholder="small" ></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value1: ''
                }
            }
        }
    </script>
```
:::
</div>

### 禁用
通过添加disabled属性可设置为不可用状态。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value5" size="large" placeholder="large" disabled></b-input>
            <hr/>
            <b-input v-model="value6" size="normal" placeholder="normal" :disabled='disabled'></b-input>
            <hr/>
            <b-input v-model="value7" size="small" placeholder="small" :disabled='disabled'></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template
        <b-input v-model="value5" size="large" placeholder="large" disabled></b-input>
        <hr/>
        <b-input v-model="value6" size="normal" placeholder="normal" :disabled='disabled'></b-input>
        <hr/>
        <b-input v-model="value7" size="small" placeholder="small" :disabled='disabled'></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value5: '',
                    value6: '',
                    value7: ''
                }
            }
        }
    </script>
```
:::
</div>

### 样式类型
Input 组件可以在不同场景下选择合适的样式。<br/>
样式选项：通过设置```labelText```属性来配置它们。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value4" @change='changemal' size="large" :labelText="name"></b-input>
            <hr/>
            <b-input v-model="value4" @change='changemal' :labelText="pwd" :error='error'></b-input>
            <hr/>
            <b-input v-model="value4" @change='changemal' size="small" :labelText="name"></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value4" @change='changemal' size="large" :labelText="name"></b-input>
        <hr/>
        <b-input v-model="value4" @change='changemal' :labelText="pwd" :error='error'></b-input>
        <hr/>
        <b-input v-model="value4" @change='changemal' size="small" :labelText="name"></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    name:'姓名'
                    pwd:'密码',
                    value4: ''
                }
            }
        }
    </script>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| value    | 绑定的值，可使用 v-model 双向绑定   | String,Number  | - |   -  |
| type     | 输入框类型   | String  | `text`、`password`、`textarea`、`url`、`email` |   -  |
| placeholder | 占位文本   | String  | - |   -  |
| disabled | 设置输入框为禁用状态   | Boolean  | `true`、`false` |   false  |
| readonly | 设置输入框为只读   | Boolean  | `true`、`false` |   false  |
| error | 设置输入框为error状态   | Boolean  | `true`、`false` |   false  |
| name | 设置输入框name   | String  | - |   -  |
| maxlength | 最大输入长度   | Number  | - |   -  |
| minlength | 最大输入长度   | Number  | - |   -  |
| autofocus | 自动获取焦点   | Boolean  | `true`、`false` |   false  |
| size     | 尺寸   | String  |  `large`、`normal`、`small` |   normal  |
| labelText| 输入框前的文字   | String    |   -  |   -  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-click    | 点击时触发    | -  |
| on-change   | 数据改变时触发 | event |
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
| on-keyup   | 原生的 keyup 事件 | event |
| on-keydown   | 原生的 keydown 事件 | event |
