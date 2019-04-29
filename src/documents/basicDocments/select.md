
<script>
    export default {
        data () {
            return {
                value: '004',
                value0: '007',
                value1: '',
                value2: [],
                value3: '',
                value4: ['004','007'],
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
                value04: ['004'],
                value05: [],
                value06: [],
                value13: '',
                value14: '',
                clearable:true,
                disabled:true,
                autowarp:true,
                fixed:true,
                options:[{
                    label:'增专',
                    value:'004'
                },{
                    label:'增普',
                    value:'007'
                },{
                    label:'机动车',
                    value:'0073'
                },{
                    label:'电子票',
                    value:'025'
                }],
                options1:[{
                    label:'增专',
                    value:'004'
                },{
                    label:'增普',
                    value:'007'
                },{
                    label:'机动车',
                    value:'005',
                    disabled:true
                },{
                    label:'电子票',
                    value:'025'
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
                nameInCode:true,
                options3:[],
                options4:[],
                options5:[],
                options6: [{
                    label: '热门城市',
                    options: [{
                            value: 'Shanghai',
                            label: '上海'
                        }, {
                            value: 'Beijing',
                            label: '北京'
                        }]
                    }, {
                    label: '城市名',
                    options: [{
                            value: 'Chengdu',
                            label: '成都'
                        }, {
                            value: 'Shenzhen',
                            label: '深圳'
                        }, {
                            value: 'Guangzhou',
                            label: '广州'
                        }, {
                            value: 'Dalian',
                            label: '大连'
                        }]
                    }
                ],
                nameKey:'label',
                codeKey:'value',
                multiple:true,
                filterabled:true,
                loading:false,
                group:true
            }
        },
        mounted () {
            setTimeout(_=>{
                this.options5 = this.options2
            },1000)
        },
        methods:{
            changeConsole(e){
                console.log('e1',e)
            },
            filterFn(query,item){
                return (item.label + item.value).indexOf(query) > -1
            },
            remoteFn(query){
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        this.options3 = [].concat(this.options.filter(item => (item.label + item.value).indexOf(query) > -1))
                    }, 1000)
                } else {
                    this.options3 = []
                }
            },
            remoteFnMultiple(query){
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                        this.options4 = [].concat(this.options.filter(item => (item.label + item.value).indexOf(query) > -1))
                    }, 1000)
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
可使用 slot与options传值两种方式。<br/>
可直接设置 style 或 width 来改变输入框的宽度，默认 100%。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select v-model="value" width='200' @on-change='changeConsole'>
                <b-option v-for='item in options5' :value='item.value' v-text='item.label' :key='item.value'></b-option>
            </b-select>   
            <b-select v-model="value" width='200' :options='options5' @on-change='changeConsole'></b-select>   
            <span>{{value}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select v-model="value" width='200' @on-change='changeConsole'>
                <b-option v-for='item in options5' :value='item.value' :label='item.label' :key='item.value'></b-option>
            </b-select>   
            <b-select v-model="value" width='200' :options='options5' @on-change='changeConsole'></b-select>   
            <span>{{value}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    options5: [],
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
            },
            mounted () {
                setTimeout(_=>{
                    this.options5 = this.options2
                },1000)
            },
        }
    </script>
```
:::

### 尺寸
Select 组件可以在不同场景下选择合适的尺寸。<br/>
尺寸选项：```large```、```default```、```small```，通过设置```size```属性来配置它们。
<div class="example">
    <div class="example-box">
        <div>
            <b-select v-model="value00"  style="width:200px" size='small' :options='options' ></b-select>
            <b-select v-model="value01"  style="width:200px" size='default' :options='options' ></b-select>
            <b-select v-model="value02"  style="width:200px" size='large' :options='options' ></b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select v-model="value00"  style="width:200px" size='small' :options='options' ></b-select>
            <b-select v-model="value01"  style="width:200px" size='default' :options='options' ></b-select>
            <b-select v-model="value02"  style="width:200px" size='large' :options='options' ></b-select>
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

### 禁用
选项禁用  可设置 ```options```中的单项的```disabled``` 为 true 禁用单项option。<br/>
组件禁用  可设置 ```disabled``` 为 ```true``` 设置禁用状态。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value1"  
                style="width:200px" 
                :options='options1' >
            </b-select>
            <b-select 
                v-model="value2"  
                style="width:200px" 
                :disabled='disabled' 
                :options='options' >
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
                :options='options1' >
            </b-select>
            <b-select 
                v-model="value2"  
                style="width:200px" 
                :disabled='disabled' 
                :options='options' >
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
                        label:'增专',
                        value:'004'
                    },{
                        label:'增普',
                        value:'007'
                    },{
                        label:'机动车',
                        value:'005',
                        disabled:true
                    },{
                        label:'电子票',
                        value:'025'
                    }],
                    options:[{
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

### 多选
可直接设置 ```multiple``` 为 ```true``` 支持多选。<br/>
可直接设置 ```autowarp``` 为 ```true ```设置自适应换行，默认false。<br/>
多选时v-model绑定array类型<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value3"
                width='200'
                :multiple='multiple' 
                :options='options' 
                :nameInCode='nameInCode'>
            </b-select>
            <b-select 
                v-model="value4" 
                :multiple='multiple' 
                :options='options'
                width='200'
                :autowarp='autowarp'>
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
                :nameInCode='nameInCode'>
            </b-select>
            <b-select 
                v-model="value4" 
                :multiple='multiple' 
                :options='options'
                :autowarp='autowarp'>
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

### 自定义nameKey codeKey
可直接设置 ```nameKey```、```codeKey``` 的值来从options的各个项目中取值。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value5" 
                style="width:200px"
                :options='options2' 
                :nameKey='nameKey'
                :codeKey='codeKey'
                >
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
                >
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
            <b-select v-model="value0"  style="width:200px" :clearable='clearable' :options='options' ></b-select></b-select>
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
                :clearable='clearable' 
                :options='options' >
            </b-select>
            <span>{{value0}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value0: '',
                    clearable:true,
                    options:[{
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
            >
            </b-select>
            <b-select 
                v-model="value7" 
                style="width:200px"
                :multiple='multiple' 
                :options='options' 
                :filterabled='filterabled'
                :autowarp='autowarp'>
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
                >
            </b-select>
            <b-select 
                v-model="value7" 
                style="width:200px"
                :multiple='multiple' 
                :options='options' 
                :filterabled='filterabled'
                :autowarp='autowarp'>
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

可设置```filterFn```函数定义筛选条件。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value8" 
                style="width:200px"
                :filterabled='filterabled'
                :filterFn='filterFn'
                :options='options'
                >
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
                >
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
            },
            methods:{
                filterFn(query,item){
                    return (item.label + item.value).indexOf(query) > -1
                }
            }
        }
    </script>
```
:::


### label样式
通过设置```label```、```fixed```属性 设置带文字描述的select组合组件 <br/>
fixed为false时可设置通过width来设置select框的宽度，labelWidth设置label文字的宽度（不设置labelWidth时，文字宽度默认自适应）
fixed为true时可设置通过width来设置整体select的宽度，labelWidth设置label文字的宽度（不设置labelWidth时，文字宽度默认自适应）
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value9"  
                label='发票类型'
                :fixed='fixed'
                style='width:200px'
                :options='options' >
            </b-select>
            <b-select 
                v-model="value05"  
                label='发票类型'
                :multiple='multiple'
                :fixed='fixed'
                width='280'
                labelWidth='100'
                :options='options' >
            </b-select>
            <br/>
            <br/>
            <b-select 
                v-model="value10"
                label='发票类型'
                width='200'
                :options='options' >
            </b-select>
            <b-select 
                v-model="value06"
                :multiple='multiple' 
                label='发票类型'
                width='200' 
                labelWidth='100'
                :options='options' >
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
                label='发票类型'
                :fixed='fixed'
                width='280'
                :options='options' >
            </b-select>
            <b-select 
                v-model="value05"  
                label='发票类型'
                :multiple='multiple'
                :fixed='fixed'
                width='280'
                labelWidth='100'
                :options='options' >
            </b-select>
            <br/>
            <br/>
            <b-select 
                v-model="value10"
                label='发票类型'
                width='200'
                :options='options' >
            </b-select>
            <b-select 
                v-model="value06"
                :multiple='multiple' 
                label='发票类型'
                width='200' 
                labelWidth='100'
                :options='options' >
            </b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value9: '',
                    value10: '',
                    value05: [],
                    value06: [],
                    fixed: true,
                    options:[{
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
                width='200' >
                <b-option v-for='item in options3' :value='item.value' :label='item.label' :key='item.value'></b-option>
            </b-select>
            <b-select 
                v-model="value04" 
                :filterabled='filterabled'
                :multiple='multiple'
                :remoteFn='remoteFnMultiple'
                :loading='loading'
                :options='options4'
                width='200' >
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
                width='200' >
            </b-select>
            <b-select
                v-model="value04"
                :filterabled='filterabled'
                :multiple='multiple'
                :remoteFn='remoteFnMultiple'
                :loading='loading'
                :options='options4'
                width='200' >
            </b-select>
        </div>
    </template>
    <script>
        export default {
           data () {
            return {
                value03: '',
                value04: '',
                options:[{
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
                        this.options3 = [].concat(this.options.filter(item => (item.label + item.value).indexOf(query) > -1))
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
                        this.options4 = [].concat(this.options.filter(item => (item.label + item.value).indexOf(query) > -1))
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


### 分组
设置 ```group```可以设置select的分组<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-select 
                v-model="value13"  
                :group='group'
                :options='options6'
                width='200' >
            </b-select>
            <b-select 
                v-model="value14" 
                :multiple='multiple'
                :group='group'
                :options='options6'
                width='200' >
            </b-select>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-select 
                v-model="value13"  
                :group='group'
                :options='options6'
                width='200' >
            </b-select>
            <b-select 
                v-model="value14" 
                :multiple='multiple'
                :group='group'
                :options='options6'
                width='200' >
            </b-select>
        </div>
    </template>
    <script>
        export default {
            data () {
            return {
                value13: '',
                value14: '',
                group: true,
                multiple:true,
                options6: [{
                    label: '热门城市',
                    options: [{
                            value: 'Shanghai',
                            label: '上海'
                        }, {
                            value: 'Beijing',
                            label: '北京'
                        }]
                    }, {
                    label: '城市名',
                    options: [{
                            value: 'Chengdu',
                            label: '成都'
                        }, {
                            value: 'Shenzhen',
                            label: '深圳'
                        }, {
                            value: 'Guangzhou',
                            label: '广州'
                        }, {
                            value: 'Dalian',
                            label: '大连'
                        }]
                    }
                ]
            }
        }
    }
    </script>
```
:::
### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| value    | 指定选中项的 value 值，可以使用 v-model 双向绑定数据。<br/>单选时只接受 String 或 Number，多选时只接受 Array   | String,Number,Array |	-   |     -    |
| nameInCode | change返回值得类型 <br/>默认false返回单选返回string 多选返回array <br/>true返回[{value:'',label:''}]	|Boolean | `true`、`false` |   false  |
| multiple | 是否支持多选	|Boolean | `true`、`false` |   false  |
| disabled | 是否禁用	|Boolean | `true`、`false` |   false  |
| clearable | 是否可以清空选项	|Boolean | `true`、`false` |   false  |
| autowarp | 多选的时候是否自动换行	| Boolean | `true`、`false` |   false  |
| width | 自定义宽度	| Number |	-   |     -   |
| size | 设置选择器的尺寸 | String  | `small`、`default`、`large` | `default`|
| placeholder | 选择框默认文字	|String |	-   |     -    |
| name      | 原生name	| String |	-   |     -    |
| nameKey      | 要展示的字段的key值	| String |	-   |     label    |
| codeKey      | 要设为value的字段的key值	| String |	-   |     value    |
| options      | 传入的下拉列表的数据	| Array |	-   |     -    |
| className      | 最外层可扩展class	| String |	-   |     -    |
| filterabled      | 是否支持筛选	| Boolean | `true`、`false` |   false  |
| notFoundText      | 没有数据的提示	| String | - |   '无匹配数据'  |
| filterFn      | 筛选函数，filterabled为true时可用	| Function | - |  -  |
| label      | 设置说明文字 	| String，Number | - |  -  |
| placement    | 下拉框出现的位置 | string | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`,<br/>`bottom-end`, `left`,`left-start`, `left-end`, <br/>`right`, `right-start`, `right-end`| bottom-start |
| fixed      | 搭配文字的两种样式类型	| Boolean | `true`、`false` |   false  |
| labelWidth  | input前的说明文字的宽度   | Number  |  -  |   72  |
| loading  | 远程加载时的加载状态   | Boolean  |  `true`、`false`  |   false  |
| remoteFn  | 远程加载时搜索的方法   | Function  |  -  |   -  |
| group  | 设置select的下拉框分组   | Boolean  |  `true`、`false`  |   false  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-change   | 选中的Option变化时触发，默认返回 [{label,value}] | event |
| on-clear   | 点击清空按钮时触发 | - |

### options
| 数据	      | 说明	    | 数据结构  |
|-------------|---------|---------|
| disabled   | 默认为false  | [{label:'',value:''}] |
| value   | 默认为为code为key值 可用codeKey修改 | [{label:'',value:''}]|
| label   | 默认为name为key值 可用nameKey修改 | [{label:'',value:''}]|

###Group分组的options数据结构
| group状态	      | 说明	    | 数据结构  |
|-------------|---------|---------|
| false   | 下拉框不分组  | [{label:'',value:''}] |
| true   | 下拉框分组 | [{label:'',options:[{label:'',value:''}]}]分组例子中的代码|

### filterFn
| 数据	      | 说明	    |
|-------------|---------|
| item   | 当前的每一项 |
| query  | 输入的查询条件 |
| 返回值   | `true`、`false` |
