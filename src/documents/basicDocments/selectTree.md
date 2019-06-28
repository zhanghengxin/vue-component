# SelectTree 检索树组件
用清晰的层级结构展示信息，可展开或折叠。

### 单/复选模式切换
可设置 `show-checkbox`设置`SelectTree`的单双选模式。

<div class="example">
    <div class="example-box">
        <div>
            <b-select-tree label='单选' width='200' :data='data1'></b-select-tree>
            <b-select-tree show-checkbox label='复选' width='250' :data='data1'></b-select-tree>
        </div>
    </div>

::: code
```html
    <template>
        <div>
            <b-select-tree label='单选' width='200' :data='data1'></b-select-tree>
            <b-select-tree show-checkbox label='复选' width='250' :data='data1'></b-select-tree>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data1:[
                       {
                           name: 'root',
                           expand: true,
                           id:1,
                           children: [
                               {
                                   name: 'parent1',
                                   expand: true,
                                   id:2,
                                   children: [
                                       {
                                           id:3,
                                           name: 'leaf1'
                                       },
                                       {
                                           id:4,
                                           name: 'leaf2'
                                       }
                                   ]
                               }
                           ]
                        }
                    ]
                }
            }
        }
    </script>
```
:::
</div>


### 模式切换
可设置 `fixed`设置组件的两种模式。

<div class="example">
    <div class="example-box">
        <div>
            <b-select-tree label='无边框' width='200' :data='data2'></b-select-tree>
            <b-select-tree fixed label='边框' width='300' :data='data2'></b-select-tree>
        </div>
    </div>

::: code
```html
    <template>
        <div>
            <b-select-tree label='无边框' width='200' :data='data2'></b-select-tree>
            <b-select-tree fixed label='边框' width='300' :data='data2'></b-select-tree>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data2:[
                       {
                           name: 'root',
                           expand: true,
                           id:1,
                           children: [
                               {
                                   name: 'parent1',
                                   expand: true,
                                   id:2,
                                   children: [
                                       {
                                           id:3,
                                           name: 'leaf1'
                                       },
                                       {
                                           id:4,
                                           name: 'leaf2'
                                       }
                                   ]
                               }
                           ]
                        }
                    ]
                }
            }
        }
    </script>
```
:::
</div>


### 模糊检索
设置 `filterable`改变组件的模糊检索模式。<br/>
设置 `auto-filter`开启组件的自动检索模式。

<div class="example">
    <div class="example-box">
        <div>
           <b-select-tree fixed label='复选' filterable width='250' :data='data3' show-checkbox></b-select-tree>
           <b-select-tree fixed auto-filter label='模糊检索' width='250' filterable :data='data3'></b-select-tree>
        </div>
    </div>

::: code
```html
    <template>
        <div>
            <b-select-tree fixed label='复选' filterable width='250' :data='data3' show-checkbox></b-select-tree>
            <b-select-tree fixed auto-filter label='模糊检索' width='250' filterable :data='data3'></b-select-tree>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data3:[
                       {
                           name: 'root',
                           expand: true,
                           id:1,
                           children: [
                               {
                                   name: 'parent1',
                                   id:2,
                                   children: [
                                       {
                                           id:3,
                                           name: 'leaf1'
                                       },
                                       {
                                           id:4,
                                           name: 'leaf2'
                                       }
                                   ]
                               }
                           ]
                        }
                    ]
                }
            }
        }
    </script>
```
:::
</div>

### 全选模式
设置 `showAllcheck`开启组件的全选模式

<div class="example">
    <div class="example-box">
        <div>
           <b-select-tree show-allcheck fixed label='复选' filterable width='250' :data='data4' show-checkbox></b-select-tree>
        </div>
    </div>

::: code
```html
    <template>
        <b-select-tree
            show-allcheck
            fixed
            label='复选'
            filterable
            width='250'
            :data='data4'
            show-checkbox>
        </b-select-tree>
    </template>
    <script>
        export default {
            data () {
                return {
                    data4:[
                        {
                            name: 'root',
                            expand: true,
                            id:1,
                            children: [
                                {
                                    name: 'parent1',
                                    id:2,
                                    children: [
                                        {
                                            id:3,
                                            name: 'leaf1'
                                        },
                                        {
                                            id:4,
                                            name: 'leaf2'
                                        }
                                    ]
                                },
                                {
                                    name: 'parent2',
                                    id:5,
                                    children: [
                                        {
                                            id:6,
                                            name: 'leaf2-1'
                                        },
                                        {
                                            id:7,
                                            name: 'leaf2-2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    </script>
```
:::
</div>

### 级联切换
设置 `checkboxOptions`配置树形数据的级联效果

<div class="example">
    <div class="example-box">
        <div>
           <b-select-tree :checkbox-options='checkboxOptions' fixed label='复选'  width='250' :data='data5' show-checkbox></b-select-tree>
           <span><b-checkbox @on-change='handleChange'>是否级联父级数据</b-checkbox></span>
        </div>
    </div>

::: code
```html
    <template>
        <div>
            <b-select-tree :checkbox-options='checkboxOptions' fixed label='复选'  width='250' :data='data5' show-checkbox></b-select-tree>
            <span><b-checkbox @on-change='handleChange'>是否级联父级数据</b-checkbox></span>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data5:[
                        {
                            name: 'root',
                            expand: true,
                            id:1,
                            children: [
                                {
                                    name: 'parent1',
                                    id:2,
                                    children: [
                                        {
                                            id:3,
                                            name: 'leaf1'
                                        },
                                        {
                                            id:4,
                                            name: 'leaf2'
                                        }
                                    ]
                                }
                            ]
                         }
                    ],
                    checkboxOptions: { // 多选级联配置
                        parent: false, // 是否影响父级节点
                        children: false // 是否影响子级节点
                    }
                }
            },
            methods: {
                handleChange (status){
                    this.checkboxOptions.parent = status
                    this.checkboxOptions.children = status
                }
            }
        }
    </script>
```
:::
</div>

### 默认选中
设置 `defaltValues`默认选中数据

<div class="example">
    <div class="example-box">
        <div>
           <b-select-tree :default-values='defaltValues' fixed label='复选'  width='250' :data='data6' show-checkbox></b-select-tree>
           <b-select-tree :default-values='selectValues' fixed label='单选'  width='250' :data='data7'></b-select-tree>
        </div>
    </div>

::: code
```html
    <template>
        <div>
            <b-select-tree :default-values='defaltValues' fixed label='复选'  width='250' :data='data6' show-checkbox></b-select-tree>
            <b-select-tree :default-values='selectValues' fixed label='单选'  width='250' :data='data7'></b-select-tree>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data6:[
                       {
                           name: 'root',
                           expand: true,
                           id:1,
                           children: [
                               {
                                   name: 'parent1',
                                   id:2,
                                   expand: true,
                                   children: [
                                       {
                                           id:3,
                                           name: 'leaf1'
                                       },
                                       {
                                           id:4,
                                           name: 'leaf2'
                                       },
                                       {
                                           id:5,
                                           name: 'leaf3'
                                       }
                                   ]
                               }
                           ]
                        }
                    ],
                    data7:[
                       {
                           name: 'root',
                           expand: true,
                           id:1,
                           children: [
                               {
                                   name: 'parent1',
                                   id:2,
                                   expand: true,
                                   children: [
                                       {
                                           id:3,
                                           name: 'leaf1'
                                       },
                                       {
                                           id:4,
                                           name: 'leaf2'
                                       },
                                       {
                                           id:5,
                                           name: 'leaf3'
                                       }
                                   ]
                               }
                           ]
                        }
                    ],
                    defaltValues:[4,5],
                    selectValues:[4]
                }
            },
            methods: {
                handleChange (status){
                    this.checkboxOptions.parent = status
                    this.checkboxOptions.children = status
                }
            }
        }
    </script>
```
:::
</div>

### 禁用状态
设置 `disabled`修改禁用状态

<div class="example">
    <div class="example-box">
        <div>
           <b-select-tree disabled label='复选'  width='250' :data='data6'></b-select-tree>
        </div>
    </div>

::: code
```html
    <template>
         <b-select-tree disabled label='复选'  width='250' :data='data6'></b-select-tree>
    </template>
    <script>
        export default {
            data () {
                return {
                    data6:[
                       {
                           name: 'root',
                           expand: true,
                           id:1,
                           children: [
                               {
                                   name: 'parent1',
                                   id:2,
                                   expand: true,
                                   children: [
                                       {
                                           id:3,
                                           name: 'leaf1'
                                       },
                                       {
                                           id:4,
                                           name: 'leaf2'
                                       },
                                       {
                                           id:5,
                                           name: 'leaf3'
                                       }
                                   ]
                               }
                           ]
                        }
                    ]
                }
            }
        }
    </script>
```
:::
</div>

<script>
export default {
    data () {
        return {
            data1:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           expand: true,
                           id:2,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               }
                           ]
                       }
                   ]
                }
            ],
            data2:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           expand: true,
                           id:2,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               }
                           ]
                       }
                   ]
                }
            ],
            data3:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           id:2,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               }
                           ]
                       }
                   ]
                }
            ],
            data4:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           id:2,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               }
                           ]
                       },
                       {
                           name: 'parent2',
                           id:5,
                           children: [
                               {
                                   id:6,
                                   name: 'leaf2-1'
                               },
                               {
                                   id:7,
                                   name: 'leaf2-2'
                               }
                           ]
                       }
                   ]
                }
            ],
            data5:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           id:2,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               }
                           ]
                       }
                   ]
                }
            ],
            data6:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           id:2,
                           expand: true,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               },
                               {
                                   id:5,
                                   name: 'leaf3'
                               }
                           ]
                       }
                   ]
                }
            ],
            data7:[
               {
                   name: 'root',
                   expand: true,
                   id:1,
                   children: [
                       {
                           name: 'parent1',
                           id:2,
                           expand: true,
                           children: [
                               {
                                   id:3,
                                   name: 'leaf1'
                               },
                               {
                                   id:4,
                                   name: 'leaf2'
                               },
                               {
                                   id:5,
                                   name: 'leaf3'
                               }
                           ]
                       }
                   ]
                }
            ],
            checkboxOptions: { // 多选级联配置
                parent: false, // 是否影响父级节点
                children: false // 是否影响子级节点
            },
            defaltValues:[4,5],
            selectValues:[4]
        }
    },
    methods: {
        handleChange (status){
            this.checkboxOptions.parent = status
            this.checkboxOptions.children = status
        }
    }
}
</script>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data     |  可嵌套的节点属性的数组，标准 tree 数据  | Array  |  -    |    []   |
| accordion     |  是否支持手风琴效果   |  Boolean    |  -|     false  |
| accordionOptions     | 手风琴配置项，具体配置见下文   | Object    |  -  |     -  |
| show-checkbox     | 是否显示多选框	   | Boolean    |  -  |     false  |
| checkboxOptions     |  多选配置项，具体配置见下文 | Object    |  -  |     -  |
| loading     | 是否开启懒加载   | Boolean    |  -  |     false  |
| load-method     |  异步加载数据的方法，详见例子 | Function    |  -  |     -  |
| filterable     |  是否开启过滤模式 |  Boolean   |  -  |     false |
| filter-method     |  模糊检索的自定义函数   | 	string    |   -  |     -  |
| auto-filter     |  是否开启组件的自动检索模式   | 	Boolean    |   -  |     false  |
| defaultOpt     | 各种选中效果的配置项，具体配置见下文   | 	Object    |  -  |   -    |
| draggable     |  是否开启节点拖拽编辑 | 	Boolean    |  -  |    fasle    |
| disabled     |   是否禁用 | 	Boolean    |  -  |    fasle    |
| clearable     |  是否开启清除数据【只有单选模式生效】 | 	Boolean    |  -  |    true    |
| label      | 设置说明文字 	| String，Number | - |  -  |
| fixed      | 搭配文字的两种样式类型	| Boolean | - |   false  |
| className      | 给 item-name 附加的 class	| String | - |   -  |
| width | 开启 `label` 模式时生效,自定义宽度	| Number |	-   |     -   |
| show-allcheck |  是否开启组件的全选模式	| Boolean |	-   |     false   |
| placement    | 下拉框出现的位置 | string | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`,<br/>`bottom-end`, `left`,`left-start`, `left-end`, <br/>`right`, `right-start`, `right-end`| bottom-start |
| labelWidth | 自定义说明文字的宽度	| Number、String |	-   |     -   |
| defalt-values | 默认选中的数据	| Array |	-   |     []   |

### children
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| children     |  子节点属性  |  Array  |  -    |
| name     |  显示文本  |  String  |  -    |
| disabled     |  失效状态  |  Boolean  |  -    |
| checked    |  勾选状态  |  Boolean  |  -    |
| expand     |  展开状态  |  Boolean  |  -   |
| draggable     |  是否开拖拽状态  |  Boolean  |  -   |
| render     |  自定义渲染内容	 | 	Function    |  -  |

### defaultOpt
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| childrenKey     |  子节点属性配置项Key值  |  String  |  children    |
| nameKey     |  显示文本配置项Key值  |  String  |  name    |
| disabledKey     |  失效属性配置项Key值  |  String  |  disabled    |
| checkedKey     |  勾选属性配置项Key值  |  String  |  checked    |
| expandKey     |  展开属性配置项Key值  |  String  |  expand   |
| selectedKey     |  选中属性配置项Key值  |  String  |  selected   |
| idKey     |  选中数据唯一标识配置项Key值【当开启label时有效】  |  String  |   id   |

### accordionOptions
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |
| isCache      |  是否缓存其他同级节点的展开状态  |  Boolean  |  true    |

### checkboxOptions
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |
| parent      |   勾选时是否级联父级节点 |  Boolean  |  true    |
| children      |  勾选时是否级联子级节点  |  Boolean  |  true    |

### events
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| on-all-check     |  点击全选时触发   |   status  |
| on-clear     |  清除数据时触发   |   -  |
| on-select     |  当选中节点时触发   |  options【Object】 : <br> `data`:  当前选中的数据<br> `getSelectedNodes`:  当前选中的数据集合<br> |
| on-check     |  当勾选/取消节点时触发   |  options【Object】 : <br> `checkedNodes`:  当前选中的数据<br> `indeterminateNodes`:  当前半选节点集合<br>`checkedNodes`:  当前选中节点集合 |
| on-expand     |  当展开/收起节点时触发   |  options【Object】 : <br> `data`:  当前选中的数据 |
