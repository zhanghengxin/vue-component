
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
                value6: 12,
                value7: '',
                value8: 2,
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
可通过 max min 设置可输入的数据的范围<br/>
可以通过输入、鼠标点击或键盘的上下键来改变数值大小。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number
                v-model="value" 
                placeholder="请输入..." 
                :max='max' 
                :min='min' 
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
            placeholder="请输入..." 
            :max='max' 
            :min='min' 
            @on-change='changemal'/>
        </b-input-number>
        <span>{{value}}</span>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    max:10,
                    min:0
                }
            }
        }
    </script>
```
:::

### step属性精度
通过设置step属性控制每次改变的精度。
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number 
                v-model="value7" 
                :max="10" :min="1" :step="1.2" />
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
            :max="10" :min="1" :step="1.2" />
        </b-input-number>
        <span>{{value7}}</div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value7: ''
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


### 格式化展示
通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number
                :max="10000"
                v-model="value4"
                :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                :parser="value => value.replace(/$s?|(,*)/g, '')"></b-input-number>
            <b-input-number
                :max="100"
                v-model="value4"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"></b-input-number>
        </div>
    </div>
</div>

::: code
```html

    <template>
         <b-input-number
            :max="10000"
            v-model="value4"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')"></b-input-number>
        <b-input-number
            :max="100"
            v-model="value4"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"></b-input-number>
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

### 只读
通过设置readonly属性开启只读。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number 
                v-model="value6" 
                readonly />
            </b-input-number>
        </div>
    </div>
</div>

::: code
```html
    <template>
         <b-input-number 
            v-model="value6" 
            readonly />
        </b-input-number>
    </template>
    <script>
        export default {
            data () {
                return {
                    value6:12
                }
            }
        }
    </script>
```
:::

### 不可编辑
通过设置editable属性控制是否能编辑。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-input-number 
                v-model="value8" 
                :editable="false" />
            </b-input-number>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-input-number 
            v-model="value8" 
            :editable="false" />
        </b-input-number>
    </template>
    <script>
        export default {
            data () {
                return {
                    value8:''
                }
            }
        }
    </script>
```
:::


### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| max | 最大输入  | Number  | - |   -  |
| min | 最大输入   | Number  | - |   -  |
| value    | 绑定的值，可使用 v-model 双向绑定   | String,Number  | - |   -  |
| step |  每次改变的步伐，可以是小数   | Number  | - |  1  |
| size | 设置输入框的尺寸   | String  | `small`、`default`、`large` |   default  |
| disabled | 设置输入框为禁用状态   | Boolean  | `true`、`false` |   false  |
| placeholder | 占位文本   | String  | - |   请输入..  |
| formatter | 指定输入框展示值的格式   | Function  | - |   -  |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用   | Function  | - |   -  |
| readonly | 设置输入框为只读   | Boolean  | `true`、`false` |   false  |
| editable     | 是否可编辑	   | Boolean  |  `true`、`false` |   false  |
| precision     | 数值精度	   | Number  |  - |   -  |
| element-id  | 给表单元素设置 id   | String  |  -  |   —  |
| active-change     | 是否实时响应数据，设置为 false 时，只会在失焦时更改数据   | Boolean  |  `true`、`false` |   true  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-change   | 数据改变时触发 | 当前值 |
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
