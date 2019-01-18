
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
                value12: '',
                name:'姓名',
                pwd:'密码',
                disabled:true,
                error:true,
                clearable:true,
                prefix:true,
                suffix:true,
                icon:'chaxun',
                autosize:true,
                fixed:true
            }
        },
        methods:{
            changemal(e){
                console.log(e.target.value)
            }
        }
    }
</script>

# Input\Textarea 输入框
基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。
-----
### 基础用法
可使用 v-model 实现数据的双向绑定。<br/>
可直接设置 style 来改变输入框的宽度，默认 100%。<br/>
可直接设置 error 来改变输入框的hover focus样式
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value" placeholder="请输入..." style='width:200px' /></b-input>
            <b-input v-model="value0" placeholder="请输入..." style='width:200px' :error='error'/></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value" placeholder="请输入..." /></b-input>
        <b-input v-model="value0" placeholder="请输入..." :error='error' /></b-input>
        <span>{{value}}</div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    value0: '',
                    error:true
                }
            }
        }
    </script>
```
:::


### 尺寸
Input 组件可以在不同场景下选择合适的尺寸。<br/>
尺寸选项：```large```、```default```、```small```，通过设置```size```属性来配置它们。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value1" size="large" @on-change='changemal' placeholder="large" ></b-input>
            <b-input v-model="value2" size="default" placeholder="default" ></b-input>
            <b-input v-model="value3" size="small" placeholder="small" ></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value1" size="large" placeholder="large" ></b-input>
        <b-input v-model="value2" size="default" placeholder="default" ></b-input>
        <b-input v-model="value3" size="small" placeholder="small" ></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value1: '',
                    value2: '',
                    value3: ''
                }
            }
        }
    </script>
```
:::

### 禁用
通过添加disabled属性可设置为不可用状态。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value4" :disabled='disabled'></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value4" :disabled='disabled'></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value4: ''
                }
            }
        }
    </script>
```
:::

### 清空
通过添加clearable属性可设置带清空按钮的功能。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value5" :clearable='clearable'></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value5" :clearable='clearable'></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    clearable: true,
                    value5:''
                }
            }
        }
    </script>
```
:::

### icon
通过添加icon 属性可设置带icon的样式 ```prefix```设置显示在前 ```suffix```设置显示在后。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value6" :icon='icon' :prefix='prefix'></b-input>
            <b-input v-model="value7" :icon='icon' :suffix='suffix' :clearable='clearable'></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value6" :icon='icon' :prefix='prefix' ></b-input>
        <b-input v-model="value7" :icon='icon' :suffix='suffix' ></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    icon:'chaxun',
                    value6:'',
                    value7:'',
                    prefix:true,
                    suffix:true
                }
            }
        }
    </script>
```
:::

### label属性的两种样式
通过设置```label```属性 设置带文字描述的input组合组件 <br/>
label文字大小可根据input的size变化<br/>
通过设置```labelWidth```属性可设置label文字所占的宽度 labelWidth默认36px<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value6" label='姓名' placeholder="请输入..." /></b-input>
            <b-input v-model="value6" label='密码' type='password' placeholder="请输入..." /></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value6" label='姓名' placeholder="请输入..." /></b-input>
        <b-input v-model="value6" label='密码' type='password' placeholder="请输入..." /></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    icon:'chaxun',
                    value6:'',
                    value7:'',
                    fixed:true
                }
            }
        }
    </script>
```
:::

<br/>
通过设置fixed为```true``` 属性可设置带label文字描述的样式 label文字与input的宽度根据自动适应 整体宽度默认280px
<br/>
<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value6" label='姓名' :fixed='fixed' placeholder="请输入..." /></b-input>
            <br/>
            <b-input v-model="value6" label='密码' :fixed='fixed' :error='error' type='password' placeholder="请输入..." /></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value6" label='姓名' :fixed="fixed" placeholder="请输入..." /></b-input>
        <b-input v-model="value6" label='密码' :fixed="fixed" :error='error' type='password' placeholder="请输入..." /></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    icon:'chaxun',
                    value6:'',
                    value7:'',
                    fixed:true,
                    error:true
                }
            }
        }
    </script>
```
:::

### textarea
通过设置属性 type 为 textarea 来使用文本域，用于多行输入。
通过设置属性 rows 控制文本域默认显示的行数， 默认2行。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value8" type="textarea" /></b-input>
            <b-input v-model="value9" type="textarea" :rows="4" /></b-input>
            <b-input v-model="value10" type="textarea" :rows="4" disabled></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value8" type="textarea" /></b-input>
        <b-input v-model="value9" type="textarea" :rows="4" /></b-input>
        <b-input v-model="value10" type="textarea" :rows="4" disabled></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value8: '',
                    value9: '',
                    value10: ''
                }
            }
        }
    </script>
```
:::

### textarea
设置属性```autosize```，文本域会自动适应高度的变化。autosize也可以设定为一个对象，指定最小行数和最大行数。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value11"  type="textarea" :error='error' :autosize='autosize'></b-input>
            <b-input v-model="value12"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value11"  type="textarea" :error='error' :autosize='autosize'></b-input>
        <b-input v-model="value12"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value8: '',
                    value9: '',
                    value10: ''
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
| disabled | 设置输入框为禁用状态   | Boolean  | `true`、`false` |   false  |
| readonly | 设置输入框为只读   | Boolean  | `true`、`false` |   false  |
| error | 设置输入框为error状态   | Boolean  | `true`、`false` |   false  |
| size | 设置输入框的尺寸   | String  | `small`、`default`、`large` |   default  |
| name | 设置输入框name   | String  | - |   -  |
| maxlength | 最大输入长度   | Number  | - |   -  |
| minlength | 最大输入长度   | Number  | - |   -  |
| clearable | 是否显示清空按钮   | Boolean  | `true`、`false` | false  |
| spellcheck | 是否拼写检查   | Boolean  | `true`、`false` | false  |
| autofocus | 自动获取焦点   | Boolean  | `true`、`false` |   false  |
| icon     | icon的名称class   | String  |  详见icon组件 |   -  |
| prefix     | icon的在前面   | Boolean  |  `true`、`false` |  false   |
| suffix     | icon的在后面   | Boolean  |  `true`、`false` |  false   |
| rows     | 文本域默认行数，仅在 textarea 类型下有效   | Number  |  - |   2  |
| autosize | 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }   | Boolean,Object  |  - |   false  |
| wrap     | 原生的 wrap 属性，仅在 textarea 下生效   | String  |  `soft`、`hard` |   soft  |
| label     | input前的说明文字   | String  |  - |   -  |
| labelWidth  | input前的说明文字的宽度 fixed为false时有效   | Number  |  -  |   36  |
| fixed     | input的搭配文字的两种样式类型   | Boolean  |  `true`、`false` |   false  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-click    | 点击icon时触发    | -  |
| on-change   | 数据改变时触发 | event |
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
| on-keyup   | 原生的 keyup 事件 | event |
| on-keydown   | 原生的 keydown 事件 | event |
