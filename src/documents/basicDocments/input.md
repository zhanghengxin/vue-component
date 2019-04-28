
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
                value15: '',
                name:'姓名',
                pwd:'密码',
                disabled:true,
                error:true,
                clearable:true,
                prefix:true,
                suffix:true,
                icon:'chaxun',
                autosize:true,
                fixed:true,
                labelWidth:72,
                placeholder:'请输入数字'
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
可直接设置 width 来设置输入框的宽度，默认 100%。<br/>
可直接设置 error 来改变输入框的hover focus样式
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value" placeholder="请输入..." :width='200'>
                <template slot="prepend">发票号码</template>
            </b-input>
            <b-input v-model="value0" placeholder="请输入..." :width='200' error='error'></b-input>
            <span>{{value}}</div>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value" placeholder="请输入..." :width='200'></b-input>
        <b-input v-model="value0" placeholder="请输入..." :width='200' error='error'></b-input>
        <span>{{value}}</span>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    value0: ''
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
            <b-input v-model="value1" size="large" @on-change='changemal' :width='200' placeholder="large" ></b-input>
            <b-input v-model="value2" size="default" :width='200' placeholder="default" ></b-input>
            <b-input v-model="value3" size="small" :width='200' placeholder="small" ></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value1" size="large" @on-change='changemal' :width='200' placeholder="large"  ></b-input>
        <b-input v-model="value2" size="default" :width='200' placeholder="default" ></b-input>
        <b-input v-model="value3" size="small" :width='200' placeholder="small" ></b-input>
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
            <b-input v-model="value4" :width='200' disabled></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value4"  :width='200' disabled></b-input>
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
通过添加```clearable```属性可设置带清空按钮的功能。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value5"  :width='200' clearable></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value5"  :width='200' clearable></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value5:''
                }
            }
        }
    </script>
```
:::

### 密码框
通过添加```show-password```可得到一个可切换显示隐藏的密码框。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value5"  :width='200' show-password></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value5"  :width='200' show-password></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value5:''
                }
            }
        }
    </script>
```
:::

### icon
通过添加prefix、suffix属性可设置带前面带icon的样式 ```prefix```设置显示在前 ```suffix```设置显示在后。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value6"  :width='200' :prefix='icon' ></b-input>
            <b-input v-model="value7"  :width='200' :suffix='icon' ></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value6"  :width='200' :prefix='icon' ></b-input>
        <b-input v-model="value7"  :width='200' :suffix='icon' ></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    icon:'chaxun',
                    value6:'',
                    value7:''
                }
            }
        }
    </script>
```
:::

### label属性的两种样式
通过设置```label```、```fixed```属性 设置带文字描述的input组合组件 <br/>
fixed为false时可设置通过width来设置```input框```的宽度，labelWidth设置label文字的宽度（不设置labelWidth时，文字宽度默认自适应）<br/>
fixed为true时可设置通过width来设置 ```整体input``` 的宽度(整体宽度默认100%)，labelWidth设置label文字的宽度（不设置labelWidth时，文字宽度默认自适应）
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model="value6" label='姓名' :width='200' placeholder="请输入..." ></b-input>
            <b-input v-model="value7" label='密码' :labelWidth='labelWidth' :width='200' type='password' placeholder="请输入..." ></b-input>
            <br/> <br/>
            <b-input v-model="value6" label='姓名' width='200' fixed placeholder="请输入..." ></b-input>
            <b-input v-model="value7" label='密码' :labelWidth='labelWidth' width='280' fixed placeholder="请输入..." ></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value6" label='姓名' :labelWidth='labelWidth' :width='200' placeholder="请输入..." ></b-input>
        <b-input v-model="value7" label='密码' :labelWidth='labelWidth' :width='200' type='password' placeholder="请输入..." ></b-input>
        <br/> <br/>
        <b-input v-model="value6" label='姓名' width='200' fixed placeholder="请输入..." ></b-input>
        <b-input v-model="value7" label='密码' :labelWidth='labelWidth' width='280' fixed placeholder="请输入..." ></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value6:'',
                    value7:'',
                    labelWidth:'72'
                }
            }
        }
    </script>
```
:::


### 输入时tip展示
结合 Poptip 组件，实现一个数值输入框，方便内容超长时的全量展现。
<div class="example">
    <div class="example-box">
        <b-poptip trigger="focus" placement='top' :content='value15 || placeholder'>
            <b-input v-model="value15" prefix="jiaoyi" :placeholder="placeholder" style="width: 120px" />
        </b-poptip>
    </div>
</div>

::: code
```html

    <template>
        <b-poptip trigger="focus" placement='top' :content='value15 || "请输入数字"'>
            <b-input v-model="value15" prefix="jiaoyi" placeholder="请输入数字" style="width: 120px" />
        </b-poptip>
    </template>
    <script>
        export default {
            data () {
                return {
                    value15:'',
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
            <b-input v-model="value8" :width='200' type="textarea" ></b-input>
            <b-input v-model="value9" :width='200' type="textarea" :rows="4" ></b-input>
            <b-input v-model="value10" :width='200' type="textarea" :rows="4" disabled></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value8" :width='200' type="textarea" ></b-input>
        <b-input v-model="value9" :width='200' type="textarea" :rows="4" ></b-input>
        <b-input v-model="value10" :width='200' type="textarea" :rows="4" disabled></b-input>
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
            <b-input v-model="value11" :width='200'  type="textarea" error :autosize='autosize'></b-input>
            <b-input v-model="value12" :width='200'  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></b-input>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value11" :width='200'  type="textarea" error :autosize='autosize'></b-input>
        <b-input v-model="value12" :width='200'  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></b-input>
    </template>
    <script>
        export default {
            data () {
                return {
                    value11: '',
                    value12: ''
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
| width    | 设置输入框的宽度   | String,Number  | - |   -  |
| type     | 输入框类型   | String  | `text`、`password`、`textarea`、`url`、`email` |   -  |
| placeholder | 占位文本   | String  | - |   -  |
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
| prefix     | 输入框头部图标   | Boolean,String  |  - |  -   |
| suffix     | 输入框尾部图标   | Boolean,String  |  - |  -   |
| rows     | 文本域默认行数，仅在 textarea 类型下有效   | Number  |  - |   2  |
| autosize | 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }   | Boolean,Object  |  - |   false  |
| wrap     | 原生的 wrap 属性，仅在 textarea 下生效   | String  |  `soft`、`hard` |   soft  |
| label     | input前的说明文字   | String  |  - |   -  |
| label-width  | input前的说明文字的宽度 fixed为false时有效   | Number  |  -  |   -  |
| fixed     | input的搭配文字的两种样式类型   | Boolean  |  `true`、`false` |   false  |
| show-password     | 切换显示隐藏的密码框   | Boolean  |  `true`、`false` |   false  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-click    | 点击icon时触发    | -  |
| on-change   | 数据改变时触发 | event |
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
| on-keyup   | 原生的 keyup 事件 | event |
| on-keydown   | 原生的 keydown 事件 | event |

### slot
| name	      | 说明	    | 返回值 |
|-------------|---------|----------|
| prefix    | 需要设置设置前面的icon位置的slot    | -  |
| suffix   | 需要设置设置后面的icon位置的slot  | - |
| prepend   | 设置前面位置的slot label的fixed样式 不与label同时设置  | - |
| append   | 设置后面位置的slot label的fixed样式 不与label同时设置  | - |
| label   | 前置的label文字框  | - |