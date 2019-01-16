
<script>
    export default {
        data () {
            return {
                value: '',
                value0: '',
                value1: '',
                value2: [],
                value3: '',
                value4: '',
                value5: '',
                value6: '004',
                value7: ['004','007'],
                value8: '',
                value9: '',
                value10: '',
                value00: '',
                value01: '',
                value02: '',
                value03: '',
                value04: '',
                clearabled:true,
                disabled:true,
                autowarp:true,
                fixed:true,
                options:[{
                    name:'增专',
                    code:'004'
                },{
                    name:'增普',
                    code:'007'
                },{
                    name:'机动车',
                    code:'005'
                },{
                    name:'电子票',
                    code:'025'
                }],
                options1:[{
                    name:'增专',
                    code:'004'
                },{
                    name:'增普',
                    code:'007'
                },{
                    name:'机动车',
                    code:'005',
                    disabled:true
                },{
                    name:'电子票',
                    code:'025'
                }],
                options2:[{
                    label:'增专',
                    value:'004'
                },{
                    label:'增普',
                    value:'007'
                },{
                    label:'机动车',
                    value:'005'
                },{
                    label:'电子票',
                    value:'025'
                }],
                options3:[],
                options4:[],
                nameKey:'label',
                codeKey:'value',
                multiple:true,
                filterabled:true,
                loading:false
            }
        },
        methods:{
            changeConsole(e){
                console.log('e',e)
            },
            filterFn(query,item){
                return (item.name + item.code).indexOf(query) > -1
            },
            remoteFn(query){
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        this.options3 = [].concat(this.options.filter(item => (item.name + item.code).indexOf(query) > -1))
                    }, 2000)
                } else {
                    this.options3 = []
                }
            },
            remoteFnMultiple(query){
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        this.options4 = [].concat(this.options.filter(item => (item.name + item.code).indexOf(query) > -1))
                    }, 2000)
                } else {
                    this.options4 = []
                }
            }
        }
    }
</script>

# Select 选择器
基本表单组件，支持 单选 和 多选，并在原生控件基础上进行了功能扩展，可以组合使用(样式类型待优化..)
-----
### 单选
可使用 v-model 实现数据的双向绑定。<br/>
可直接设置 style 来改变输入框的宽度，默认 100%。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select v-model="value" @on-change='changeConsole'  style="width:200px" :options='options' /></b-select>
            <span>{{value}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value"  
                style="width:200px" 
                :options='options' />
            </b-select>
            <span>{{value}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::

### 尺寸
Select 组件可以在不同场景下选择合适的尺寸。<br/>
尺寸选项：```large```、```normal```、```small```，通过设置```size```属性来配置它们。
<div class="example">
    <div class="example-box">
        <div>
            <b-select v-model="value00"  style="width:200px" size='small' :options='options' /></b-select>
            <b-select v-model="value01"  style="width:200px" size='normal' :options='options' /></b-select>
            <b-select v-model="value02"  style="width:200px" size='large' :options='options' /></b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select v-model="value00"  style="width:200px" size='small' :options='options' /></b-select>
            <b-select v-model="value01"  style="width:200px" size='normal' :options='options' /></b-select>
            <b-select v-model="value02"  style="width:200px" size='large' :options='options' /></b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value00: '',
                    value01: '',
                    value02: '',
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::

### 禁用
选项禁用  可设置 ```options```中的单项的```disabled``` 为 true 禁用单项option。<br/>
组件禁用  可设置 ```disabled``` 为 ```true``` 设置禁用状态。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value1"  
                style="width:200px" 
                :options='options1' />
            </b-select>
            <b-select 
                v-model="value2"  
                style="width:200px" 
                :disabled='disabled' 
                :options='options' />
            </b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value1"  
                style="width:200px" 
                :options='options1' />
            </b-select>
            <b-select 
                v-model="value2"  
                style="width:200px" 
                :disabled='disabled' 
                :options='options' />
            </b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value1: '',
                    value2: '',
                    disabled:true,
                    options1:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005',
                        disabled:true
                    },{
                        name:'电子票',
                        code:'025'
                    }],
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::

### 多选
可直接设置 ```multiple``` 为 ```true``` 支持多选。<br/>
可直接设置 ```autowarp``` 为 ```true ```设置自适应换行，默认false。<br/>
多选时v-model绑定array类型<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value3"
                :multiple='multiple' 
                :options='options' 
                size='large'
                @on-change='changeConsole'
                style="width:200px" />
            </b-select>
            <b-select 
                v-model="value4" 
                style="width:200px"
                :multiple='multiple' 
                :options='options' 
                :autowarp='autowarp'/>
            </b-select>
            <span>{{value4}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value3" 
                :multiple='multiple' 
                :options='options' 
                style="width:200px" />
            </b-select>
            <b-select 
                v-model="value4" 
                style="width:200px"
                :multiple='multiple' 
                :options='options' 
                :autowarp='autowarp'/>
            </b-select>
            <span>{{value4}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value3: '',
                    value4: '',
                    autowarp:true,
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::

### 自定义nameKey codeKey
可直接设置 ```nameKey```\```codeKey``` 的值来从options的各个项目中取值。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value5" 
                style="width:200px"
                :options='options2' 
                :nameKey='nameKey'
                :codeKey='codeKey'
                />
            </b-select>
            <span>{{value5}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value5" 
                style="width:200px"
                :options='options2' 
                :nameKey='nameKey'
                :codeKey='codeKey'
                />
            </b-select>
            <span>{{value5}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value5: '',
                    options2:[{
                        label:'增专',
                        value:'004'
                    },{
                        label:'增普',
                        value:'007'
                    },{
                        label:'机动车',
                        value:'005'
                    },{
                        label:'电子票',
                        value:'025'
                    }]
                }
            }
        }
    </script>
```
:::

### 清空
可直接设置 ```clearable``` 为 ```true``` 来支持清空。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select v-model="value0"  style="width:200px" :clearabled='clearabled' :options='options' /></b-select>
            <span>{{value0}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value0"  
                style="width:200px" 
                :clearabled='clearabled' 
                :options='options' />
            </b-select>
            <span>{{value0}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value0: '',
                    clearabled:true,
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::

### 本地筛选
通过设置属性 ```filterabled``` 为```true```可以开启搜索模式。<br/>
单选和多选都支持搜索模式，默认搜索包含名称项。<br/>
多选搜索时，可以使用键盘Delete快捷删除最后一个已选项。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
            v-model="value6" 
            style="width:200px"
            :options='options' 
            :filterabled='filterabled'
            />
            </b-select>
            <b-select 
                v-model="value7" 
                style="width:200px"
                :multiple='multiple' 
                :options='options' 
                :filterabled='filterabled'
                :autowarp='autowarp'/>
            </b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value6" 
                style="width:200px"
                :options='options' 
                :filterabled='filterabled'
                />
            </b-select>
            <b-select 
                v-model="value7" 
                style="width:200px"
                :multiple='multiple' 
                :options='options' 
                :filterabled='filterabled'
                :autowarp='autowarp'/>
            </b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value6: '',
                    value7: [],
                    filterabled:true,
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::

<br/>
<br/>
可设置```filterFn```函数定义筛选条件。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value8" 
                style="width:200px"
                :options='options' 
                :filterabled='filterabled'
                :filterFn='filterFn'
                />
            </b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value8" 
                style="width:200px"
                :options='options' 
                :filterabled='filterabled'
                :filterFn='filterFn'
                />
            </b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value8: '',
                    filterabled:true,
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            },
            methods:{
                filterFn(query,item){
                    return (item.name + item.code).indexOf(query) > -1
                }
            }
        }
    </script>
```
:::


### label样式
可设置 ```label```，```fixed```设置label的两种样式。<br/>
fixed为false 的时候可设置labelWidth的值 默认72px<br/>
fixed为true  默认280px false 默认220px<br/>
<div class="example">
    <div class="example-box">
        <div>
             <b-select 
                v-model="value9"  
                label='姓名姓名姓名姓名'
                :fixed='fixed'
                :options='options' />
            </b-select>
            <br/>
            <br/>
            <b-select 
                v-model="value10" 
                label='姓名' 
                :options='options' />
            </b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value9"  
                label='姓名'
                :fixed='fixed'
                :options='options' />
            </b-select>
            <b-select 
                v-model="value10" 
                label='姓名' 
                :options='options' />
            </b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value9: '',
                    value10: '',
                    fixed: true,
                    options:[{
                        name:'增专',
                        code:'004'
                    },{
                        name:'增普',
                        code:'007'
                    },{
                        name:'机动车',
                        code:'005'
                    },{
                        name:'电子票',
                        code:'025'
                    }]
                }
            }
        }
    </script>
```
:::


### 远程搜索
设置 ```filterabled```，```remoteFn```，```loading```可以设置远程搜索<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value03"  
                :filterabled='filterabled'
                :remoteFn='remoteFn'
                :loading='loading'
                :options='options3'
                width='200' />
            </b-select>
            <b-select 
                v-model="value04" 
                :filterabled='filterabled'
                :multiple='multiple'
                :remoteFn='remoteFnMultiple'
                :loading='loading'
                :options='options4'
                width='200' />
            </b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
           <b-select 
                v-model="value03"  
                :filterabled='filterabled'
                :remoteFn='remoteFn'
                :loading='loading'
                :options='options3'
                width='200' />
            </b-select>
            <b-select 
                v-model="value04" 
                :filterabled='filterabled'
                :multiple='multiple'
                :remoteFn='remoteFnMultiple'
                :loading='loading'
                :options='options4'
                width='200' />
        </div>
    </template>
    <script>
        export default {
           data () {
            return {
                value03: '',
                value04: '',
                options:[{
                    name:'增专',
                    code:'004'
                },{
                    name:'增普',
                    code:'007'
                },{
                    name:'机动车',
                    code:'005'
                },{
                    name:'电子票',
                    code:'025'
                }],
                options3:[],
                options4:[],
                multiple:true,
                filterabled:true,
                loading:false
            }
        },
        methods:{
            remoteFn(query){
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        this.options3 = [].concat(this.options.filter(item => (item.name + item.code).indexOf(query) > -1))
                    }, 2000)
                } else {
                    this.options3 = []
                }
            },
            remoteFnMultiple(query){
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        this.options4 = [].concat(this.options.filter(item => (item.name + item.code).indexOf(query) > -1))
                    }, 2000)
                } else {
                    this.options4 = []
                }
            }
        }
        }
    </script>
```
:::
### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| value    | 指定选中项的 code 值，可以使用 v-model 双向绑定数据。<br/>单选时只接受 String 或 Number，多选时只接受 Array   | String,Number,Array |	-   |     -    |
| nameInCode | change返回值得类型 <br/>默认false返回单选返回string 多选返回array <br/>true返回[{code:'',name:''}]	|Boolean | `true`、`false` |   false  |
| multiple | 是否支持多选	|Boolean | `true`、`false` |   false  |
| disabled | 是否禁用	|Boolean | `true`、`false` |   false  |
| disabled | 是否禁用	|Boolean | `true`、`false` |   false  |
| clearable | 是否可以清空选项	|Boolean | `true`、`false` |   false  |
| autowarp | 多选的时候是否自动换行	| Boolean | `true`、`false` |   false  |
| width | 自定义宽度	| Number |	-   |     -   |
| size | 设置选择器的尺寸 | String  | `small`、`normal`、`large` | `normal`|
| placeholder | 选择框默认文字	|String |	-   |     -    |
| name      | 原生name	| String |	-   |     -    |
| nameKey      | 要展示的字段的key值	| String |	-   |     name    |
| codeKey      | 要设为value的字段的key值	| String |	-   |     code    |
| options      | 传入的下拉列表的数据	| Array |	-   |     -    |
| className      | 最外层可扩展class	| String |	-   |     -    |
| width      | 设置select的宽度	| Number |	-   |     -    |
| filterabled      | 是否支持筛选	| Boolean | `true`、`false` |   false  |
| notFoundText      | 没有数据的提示	| String | - |   '无匹配数据'  |
| filterFn      | 筛选函数，filterabled为true时可用	| Function | - |  -  |
| label      | 设置说明文字 	| String，Number | - |  -  |
| fixed      | 搭配文字的两种样式类型	| Boolean | `true`、`false` |   false  |
| labelWidth  | input前的说明文字的宽度 fixed为false时有效   | Number  |  -  |   72  |
| loading  | 远程加载时的加载状态   | Boolean  |  `true`、`false`  |   false  |
| remoteFn  | 远程加载时搜索的方法   | Function  |  -  |   -  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-change   | 选中的Option变化时触发，默认返回 [{name,code}] | event |
| on-clear   | 点击清空按钮时触发 | - |

### options
| 数据	      | 说明	    |
|-------------|---------|
| name   | 默认为name为key值 可用nameKey修改 |
| code   | 默认为为code为key值 可用codeKey修改 |
| disabled   | 默认为false  |

### filterFn

| 数据	      | 说明	    |
|-------------|---------|
| query  | 输入的查询条件 |
| item   | 当前的每一项 |
| 返回值   | `true`、`false` |