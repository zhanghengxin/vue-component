
<script>
    export default {
        data () {
            return {
                value: 6,
                value0: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                step:0.01,
                max:10,
                min:0,
                precision:2,
                disabled:true,
                error:true,
                clearable:true,
                prefix:true,
                suffix:true,
                icon:'chaxun',
                autosize:true,
                fixed:true,
                type:false
            }
        },
        methods:{
            changemal(e){
                console.log(e)
            }
        }
    }
</script>

# InputNumber 输入框
使用鼠标或键盘输入一定范围的标准数值。
-----
### 基础用法
可使用 v-model 实现数据的双向绑定。<br/>
可通过 precision 设置保留的小数位数<br/>
可通过 max min 设置可输入的数据的范围<br/>
可通过 step 设置改变的步伐 默认 1<br/>
可通过 style 设置输入框的宽度，默认 100%。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number
                v-model="value" 
                style='width:200px'
                placeholder="请输入..." 
                :precision='precision' 
                :max='max' 
                :min='min' 
                :step='step' 
                @on-change='changemal'/>
            </b-input-number>
            <span>{{value}}</span>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-input-number 
            v-model="value" 
            style='width:200px'
            placeholder="请输入..." 
            :precision='precision' 
            :max='max' 
            :min='min' 
            :step='step' 
            @on-change='changemal'/>
        </b-input-number>
        <span>{{value}}</span>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    value0: '',
                    max:10,
                    min:0,
                    precision:2,
                    error:true
                }
            }
        }
    </script>
```
:::

### 两种样式
设置type 为 false 显示两端的计数器
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number 
                v-model="value7" 
                style='width:200px'
                placeholder="请输入..." 
                :type='type'
                :step='step' />
            </b-input-number>
            <span>{{value7}}</div>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-input-number 
            v-model="value7" 
            style='width:200px'
            placeholder="请输入..." 
            :type='type'
            :step='step' />
        </b-input-number>
        <span>{{value7}}</div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value7: '',
                    type:false
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
            <b-input-number v-model="value1" size="large" @on-change='changemal' placeholder="large" ></b-input-number>
            <b-input-number v-model="value2" size="default" placeholder="default" ></b-input-number>
            <b-input-number v-model="value3" size="small" placeholder="small" ></b-input-number>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-input-number v-model="value1" size="large" @on-change='changemal' placeholder="large" ></b-input-number>
        <b-input-number v-model="value2" size="default" placeholder="default" ></b-input-number>
        <b-input-number v-model="value3" size="small" placeholder="small" ></b-input-number>
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
            <b-input-number v-model="value4" :disabled='disabled'></b-input-number>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input-number v-model="value4" :disabled='disabled'></b-input-number>
    </template>
    <script>
        export default {
            data () {
                return {
                    value4: '',
                    disabled: true
                }
            }
        }
    </script>
```
:::

### label属性的两种样式
通过设置```label```属性 设置带文字描述的input组合组件 <br/>
label文字大小可根据input的size变化<br/>
通过设置```labelWidth```属性可设置label文字所占的宽度 labelWidth默认自适应<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number 
                v-model="value6" 
                label='价格' 
                placeholder="请输入..." />
            </b-input-number>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-input-number 
            v-model="value6" 
            label='价格'
            placeholder="请输入..." />
        </b-input-number>
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
通过设置fixed为```true``` 属性可设置带label文字描述的样式 label文字与input的宽度根据自动适应 整体宽度默认100%
<br/>
<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number 
                v-model="value6" 
                label='价格' 
                :fixed='fixed' 
                placeholder="请输入..." />
            </b-input-number>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-input-number
            v-model="value6" 
            label='价格' 
            :fixed='fixed' 
            placeholder="请输入..." />
        </b-input-number>
    </template>
    <script>
        export default {
            data () {
                return {
                    value6:'',
                    fixed:true,
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
| type     | 计数器的类型 是否在两端   | Boolean  | `true`、`false` |   false  |
| placeholder | 占位文本   | String  | - |   请输入..  |
| disabled | 设置输入框为禁用状态   | Boolean  | `true`、`false` |   false  |
| readonly | 设置输入框为只读   | Boolean  | `true`、`false` |   false  |
| size | 设置输入框的尺寸   | String  | `small`、`default`、`large` |   default  |
| max | 最大输入  | Number  | - |   -  |
| min | 最大输入   | Number  | - |   -  |
| step |  每次改变的步伐，可以是小数   | Number  | - |  1  |
| icon     | icon的名称class   | String  |  详见icon组件 |   -  |
| label     | input前的说明文字   | String  |  - |   -  |
| labelWidth  | input前的说明文字的宽度 fixed为false时有效   | Number  |  -  |   —  |
| fixed     | input的搭配文字的两种样式类型   | Boolean  |  `true`、`false` |   false  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-change   | 数据改变时触发 | event |
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
