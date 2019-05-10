
<script>
    export default {
        data () {
            return {
                value: '123',
                options1:[],
                value1: '',
                data2: [],
                value3: '',
                data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive']
            }
        },
        methods:{
            handleSearch1 (value) {
                this.options1 = !value ? [] : [
                    value,
                    value + value,
                    value + value + value
                ]
            },
            handleSearch2 (value) {
                setTimeout(_=>{
                    this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
                        value + '@qq.com',
                        value + '@sina.com',
                        value + '@163.com'
                    ];
                },200)
            },
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            }
        }
    }
</script>

# AutoComplete 自动完成
输入框自动完成功能。
-----
### 基础用法 
可使用 v-model 实现数据的双向绑定。<br/>
基本用法，通过 data 设置自动完成的数据源。<br/>
可直接设置 style 或 width 来改变输入框的宽度，默认 100%。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-auto-complete v-model="value" @on-search="handleSearch1" width='200' :data="options1"></b-auto-complete>   
            <span>{{value}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-auto-complete v-model="value" @on-search="handleSearch1" width='200' :data="options1"></b-auto-complete>   
            <span>{{value}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    options1:[]
                }
            },
            methods:{
                handleSearch1 (value) {
                    this.options1 = !value ? [] : [
                        value,
                        value + value,
                        value + value + value
                    ]
                }
            }
        }
    </script>
```
:::

### 自定义选项
除了使用 data，还可以直接传入 Option 组件作为 slot 使用，这样可以自定义显示效果。
<div class="example">
    <div class="example-box">
        <div>
            <b-auto-complete v-model="value1" @on-search="handleSearch2" width='200'>
                <b-option v-for="item in data2" :value="item" :key="item">{{ item }}</b-option>
            </b-auto-complete>   
            <span>{{value1}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-auto-complete v-model="value1" @on-search="handleSearch2" width='200'>
                <b-option v-for="item in data2" :value="item" :key="item">{{ item }}</b-option>
            </b-auto-complete>   
            <span>{{value1}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value1: '',
                    data2: []
                }
            },
             methods:{
                handleSearch2 (value) {
                    this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
                        value + '@qq.com',
                        value + '@sina.com',
                        value + '@163.com'
                    ];
                }
            }
        }
    </script>
```
:::

### 不区分大小写 
不区分大小写的 AutoComplete，及过滤的用法。
<div class="example">
    <div class="example-box">
        <div>
            <b-auto-complete v-model="value3"
                :data="data3"
                :clearable='true'
                :filter-method="filterMethod"
                placeholder="input here"
                style="width:200px">
            </b-auto-complete>   
            <span>{{value3}}</span>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <div>
            <b-auto-complete v-model="value3"
                :data="data3"
                :clearable='true'
                :filter-method="filterMethod"
                placeholder="input here"
                style="width:200px">
            </b-auto-complete>   
            <span>{{value3}}</span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value3: '',
                    data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive']
                }
            },
            methods: {
                filterMethod (value, option) {
                    return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
                }
            }
        }
    </script>
```
:::


### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| value    | 绑定的值，可使用 v-model 双向绑定   | String\Number |	-   |     -    |
| data | 自动完成的数据源	|Array | - |   []  |
| clearable | 是否可以清空选项	|Boolean | `true`、`false` |   false  |
| placeholder | 占位文本		|String | - |   -  |
| size | 设置选择器的尺寸 | String  | `small`、`default`、`large` | `default`|
| filter-method | 是否根据输入项进行筛选。当其为一个函数时，会接收 value 和 option 两个参数，<br/>当 option 符合筛选条件时，应返回 true，反之则返回 false	| Function\Boolean | - |   false  |
| placement | 弹窗的展开方向	| String |	-   |    bottom  |
| transfer | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此<br/>属性，它将不受父级样式影响，从而达到更好的效果	| Boolean | `true`、`false` |   false  |
| width | 自定义宽度	| Number |	-   |     -   |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-change   | 选中 option，或 input 的 value 变化时，调用此函数 | value |
| on-select   | 被选中时调用，参数为选中项的 value 值 | value |
| on-search   | 点击清搜索补全项的时候调用 | query |
| on-focus   | 聚焦时触发	 | event |
| on-blur   | 失焦时触发	 | event |
| on-clear   | 点击清空按钮时触发 | - |
