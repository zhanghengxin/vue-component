# Tree 树形控件
用清晰的层级结构展示信息，可展开或折叠。
- 当数据过多时，配合 table 组件批量显示数据。
- 支持默认选中不选中，默认禁用启用，默认展开收起
- 支持节点数据异步加载
- 支持节点级联勾选或只能单个勾选
- 支持全选、反选
- 支持节点搜索，模糊查询
- 支持手风琴效果，一个节点展开，同级其他节点收起
- 支持节点拖拽进行树节点编辑


### 基础用法
给节点设置 `selected`可以将节点设置为选中,`on-select`触发选中事件。
<div class="example">
    <div class="example-box">
        <div>
           <b-tree :data='data1' @on-select='handleselect'></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data1' @on-select='handleselect'></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
                    data1:[
                       {
                           name: 'parent 1',
                           expand: true,
                           children: [
                               {
                                   name: 'parent 1-1',
                                   children: [
                                       {
                                           name: 'leaf 1-1-1'
                                       },
                                       {
                                           name: 'leaf 1-1-2'
                                       }
                                   ]
                               },
                               {
                                   name: 'parent 1-2',
                                   children: [
                                       {
                                           name: 'leaf 1-2-1'
                                       },
                                       {
                                           name: 'leaf 1-2-1'
                                       }
                                   ]
                               }
                           ]
                       }
                    ]
                }
            },
            methods: {
                handleselect (data){
                    console.log(`当前选中的数据为:`,data)
                }
            }
        }
    </script>
```
:::
</div>

### 手风琴
一个节点展开，同级其他节点收起,设置`accordion`可以触发改效果,`accordionOptions`来配置级联的效果

<div class="example">
    <div class="example-box">
        <div>
            <b-checkbox v-model="accordionOptions.isCache">手风琴是否开启缓存</b-checkbox>
            <b-tree :data='data2' accordion :accordionOptions='accordionOptions'></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data2' accordion :accordionOptions='accordionOptions'></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
                     data2:[
                        {
                            name: 'parent 1',
                            selected:true,
                            expand: true,
                            children: [
                                {
                                    name: 'parent 1-1',
                                    children: [
                                        {
                                            name: 'leaf 1-1-1'
                                        },
                                        {
                                            name: 'leaf 1-1-2'
                                        }
                                    ]
                                },
                                {
                                    name: 'parent 1-2',
                                    children: [
                                        {
                                            name: 'leaf 1-2-1'
                                        },
                                        {
                                            name: 'leaf 1-2-2',
                                            children: [
                                               {
                                                   name: 'parent 1-2-2-1',
                                                   children: [
                                                       {
                                                           name: 'leaf 1-2-2-1-1'
                                                       },
                                                       {
                                                           name: 'leaf 1-2-2-1-2'
                                                       }
                                                   ]
                                               },
                                               {
                                                   name: 'parent 1-2-2-1',
                                                   children: [
                                                       {
                                                           name: 'leaf 1-2-2-1-1'
                                                       },
                                                       {
                                                           name: 'leaf 1-2-2-1-2'
                                                       }
                                                   ]
                                               }
                                           ]
                                        }
                                    ]
                                }
                            ]
                        }
                     ],
                     accordionOptions: {
                         isCache: true
                     }
                }
            }
        }
    </script>
```
:::
</div>

### 可勾选
- 支持节点级联勾选或只能单个勾选,`show-checkbox来控制`是否显示勾选栏,`checkboxOptions`来配置级联的效果
- 给节点设置 `expand`、`selected`、`checked` 和 `disabled` 可以将节点设置为展开、选中、勾选和禁用
- 也可以通过`defaultOpt`配置以上 Key值【见文档配置项】
<div class="example">
    <div class="example-box">
        <div>
           <b-checkbox v-model="checkboxOptions.parent">是否级联父级数据</b-checkbox>
           <b-checkbox v-model="checkboxOptions.children">是否级联子级数据</b-checkbox>
           <b-tree :data='data3' show-checkbox :checkboxOptions='checkboxOptions'></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data3' show-checkbox :checkboxOptions='checkboxOptions'></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
                    data3:[
                       {
                           name: 'parent 1',
                           expand: true,
                           children: [
                               {
                                   name: 'parent 1-1',
                                   checked:true,
                                   children: [
                                       {
                                           name: 'leaf 1-1-1'
                                       },
                                       {
                                           name: 'leaf 1-1-2'
                                       }
                                   ]
                               },
                               {
                                   name: 'parent 1-2',
                                   children: [
                                       {
                                           name: 'leaf 1-2-1'
                                       },
                                       {
                                           name: 'leaf 1-2-2',
                                           children: [
                                              {
                                                  name: 'parent 1-2-2-1',
                                                  children: [
                                                      {
                                                          name: 'leaf 1-2-2-1-1'
                                                      },
                                                      {
                                                          name: 'leaf 1-2-2-1-2'
                                                      }
                                                  ]
                                              },
                                              {
                                                  name: 'parent 1-2-2-1',
                                                  children: [
                                                      {
                                                          name: 'leaf 1-2-2-1-1'
                                                      },
                                                      {
                                                          name: 'leaf 1-2-2-1-2'
                                                      }
                                                  ]
                                              }
                                          ]
                                       }
                                   ]
                               }
                           ]
                       }
                    ],
                    checkboxOptions: {
                        parent: true,
                        children: true
                    }
                }
            }
        }
    </script>
```
:::
</div>

### 模糊检索
在需要对节点进行过滤时，传入`filterText`关键字进行过滤，同时也需要设置`filter-method`作为过滤函数。
<div class="example">
    <div class="example-box">
        <div>
            <b-input v-model='filterText'></b-input>
            <b-tree :data='data4' :filter-text='filterText' :filter-method='filterMethod'></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-input v-model='filterText'></b-input>
        <b-tree :data='data4' :filter-text='filterText' :filter-method='filterMethod'></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
                    data4:[
                       {
                           name: 'parent 1',
                           expand: true,
                           children: [
                               {
                                   name: 'parent 1-1',
                                   children: [
                                       {
                                           name: 'leaf 1-1-1'
                                       },
                                       {
                                           name: 'leaf 1-1-2'
                                       }
                                   ]
                               },
                               {
                                   name: 'parent 1-2',
                                   children: [
                                       {
                                           name: 'leaf 1-2-1'
                                       },
                                       {
                                           name: 'leaf 1-2-2',
                                           children: [
                                              {
                                                  name: 'parent 1-2-2-1',
                                                  children: [
                                                      {
                                                          name: 'leaf 1-2-2-1-1'
                                                      },
                                                      {
                                                          name: 'leaf 1-2-2-1-2'
                                                      }
                                                  ]
                                              },
                                              {
                                                  name: 'parent 1-2-2-1',
                                                  children: [
                                                      {
                                                          name: 'leaf 1-2-2-1-1'
                                                      },
                                                      {
                                                          name: 'leaf 1-2-2-1-2'
                                                      }
                                                  ]
                                              }
                                          ]
                                       }
                                   ]
                               }
                           ]
                       }
                    ]
                }
            },
            methods: {
                filterMethod(value, data){
                     return data.name.indexOf(value) !== -1
                }
            }
        }
    </script>
```
:::
</div>


### 异步加载
需要使用懒加载进行数据展示时，传入`loading`为 true 开启功能，同时也需要设置`load-method`作为异步获取数据函数。
<div class="example">
    <div class="example-box">
        <div>
            <b-tree :data='data5' loading :load-method="loadMethod"></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data5' loading :load-method="loadMethod"></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
                    data5:[
                        {
                            title: '根节点',
                            loading: false
                        }
                    ]
                }
            },
            methods:{
                loadData (item, callback) {
                    setTimeout(() => {
                        const data = [
                            {
                                name: '懒加载数据',
                                loading: false
                            }
                        ];
                        callback(data);
                    }, 1000);
                }
            }
        }
    </script>
```
:::
</div>

### 拖拽编辑
通过 `draggable` 属性可让节点变为可拖拽,并且可以设置节点数据中的`draggable`属性来控制节点是否可以编辑。
<div class="example">
    <div class="example-box">
        <div>
            <b-tree :data='data6' draggable></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data6' draggable></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
                   data6:[
                      {
                          name: 'parent 1',
                          expand: true,
                          children: [
                              {
                                  name: 'parent 1-1',
                                  expand: true,
                                  children: [
                                      {
                                          name: 'leaf 1-1-1'
                                      },
                                      {
                                          name: 'leaf 1-1-2'
                                      }
                                  ]
                              },
                              {
                                  name: 'parent 1-2',
                                  expand: true,
                                  draggable:false,
                                  children: [
                                      {
                                          name: 'leaf 1-2-1'
                                      },
                                      {
                                          name: 'leaf 1-2-1'
                                      }
                                  ]
                              }
                          ]
                      }
                   ],
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
                   name: 'parent 1',
                   selected:true,
                   expand: true,
                   children: [
                       {
                           name: 'parent 1-1',
                           children: [
                               {
                                   name: 'leaf 1-1-1'
                               },
                               {
                                   name: 'leaf 1-1-2'
                               }
                           ]
                       },
                       {
                           name: 'parent 1-2',
                           children: [
                               {
                                   name: 'leaf 1-2-1'
                               },
                               {
                                   name: 'leaf 1-2-1'
                               }
                           ]
                       }
                   ]
               }
            ],
            data2:[
               {
                   name: 'parent 1',
                   expand: true,
                   children: [
                       {
                           name: 'parent 1-1',
                           children: [
                               {
                                   name: 'leaf 1-1-1'
                               },
                               {
                                   name: 'leaf 1-1-2'
                               }
                           ]
                       },
                       {
                           name: 'parent 1-2',
                           children: [
                               {
                                   name: 'leaf 1-2-1'
                               },
                               {
                                   name: 'leaf 1-2-2',
                                   children: [
                                      {
                                          name: 'parent 1-2-2-1',
                                          children: [
                                              {
                                                  name: 'leaf 1-2-2-1-1'
                                              },
                                              {
                                                  name: 'leaf 1-2-2-1-2'
                                              }
                                          ]
                                      },
                                      {
                                          name: 'parent 1-2-2-1',
                                          children: [
                                              {
                                                  name: 'leaf 1-2-2-1-1'
                                              },
                                              {
                                                  name: 'leaf 1-2-2-1-2'
                                              }
                                          ]
                                      }
                                  ]
                               }
                           ]
                       }
                   ]}
               ],
            data3:[
               {
                   name: 'parent 1',
                   expand: true,
                   children: [
                       {
                           name: 'parent 1-1',
                           checked:true,
                           disabled:true,
                           children: [
                               {
                                   name: 'leaf 1-1-1'
                               },
                               {
                                   name: 'leaf 1-1-2'
                               }
                           ]
                       },
                       {
                           name: 'parent 1-2',
                           children: [
                               {
                                   name: 'leaf 1-2-1'
                               },
                               {
                                   name: 'leaf 1-2-2',
                                   children: [
                                      {
                                          name: 'parent 1-2-2-1',
                                          children: [
                                              {
                                                  name: 'leaf 1-2-2-1-1'
                                              },
                                              {
                                                  name: 'leaf 1-2-2-1-2'
                                              }
                                          ]
                                      },
                                      {
                                          name: 'parent 1-2-2-1',
                                          children: [
                                              {
                                                  name: 'leaf 1-2-2-1-1'
                                              },
                                              {
                                                  name: 'leaf 1-2-2-1-2'
                                              }
                                          ]
                                      }
                                  ]
                               }
                           ]
                       }
                   ]}
               ],
            data4:[
               {
                   name: 'parent 1',
                   expand: true,
                   children: [
                       {
                           name: 'parent 1-1',
                           children: [
                               {
                                   name: 'leaf 1-1-1'
                               },
                               {
                                   name: 'leaf 1-1-2'
                               }
                           ]
                       },
                       {
                           name: 'parent 1-2',
                           children: [
                               {
                                   name: 'leaf 1-2-1'
                               },
                               {
                                   name: 'leaf 1-2-2',
                                   children: [
                                      {
                                          name: 'parent 1-2-2-1',
                                          children: [
                                              {
                                                  name: 'leaf 1-2-2-1-1'
                                              },
                                              {
                                                  name: 'leaf 1-2-2-1-2'
                                              }
                                          ]
                                      },
                                      {
                                          name: 'parent 1-2-2-1',
                                          children: [
                                              {
                                                  name: 'leaf 1-2-2-1-1'
                                              },
                                              {
                                                  name: 'leaf 1-2-2-1-2'
                                              }
                                          ]
                                      }
                                  ]
                               }
                           ]
                       }
                   ]
               }
            ],
            data5:[
                {
                    name: '根节点',
                    loading: false
                }
            ],
            data6:[
               {
                   name: 'parent 1',
                   expand: true,
                   children: [
                       {
                           name: 'parent 1-1',
                           expand: true,
                           children: [
                               {
                                   name: 'leaf 1-1-1'
                               },
                               {
                                   name: 'leaf 1-1-2'
                               }
                           ]
                       },
                       {
                           name: 'parent 1-2',
                           expand: true,
                           draggable:false,
                           children: [
                               {
                                   name: 'leaf 1-2-1'
                               },
                               {
                                   name: 'leaf 1-2-1'
                               }
                           ]
                       }
                   ]
               }
            ],
            accordionOptions: {
                isCache: true // 是否缓存其他同级节点的展开状态
            },
            checkboxOptions: { // 多选级联配置
                parent: true, // 是否影响父级节点
                children: true // 是否影响子级节点
            },
            filterText:''
        }
    },
    methods: {
        handleselect (data){
            console.log(`当前选中的数据为:`,data)
        },
        filterMethod(value, data){
             return data.name.indexOf(value) !== -1
        },
        loadMethod (item, callback) {
            setTimeout(() => {
                const data = [
                    {
                        name: '懒加载数据',
                        loading: false
                    }
                ];
                callback(data);
            }, 1000);
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
| filter-text     |  模糊搜索的关键字 |  String \ Number    |  -  |     ''  |
| filter-method     |  自定义上一页的文本   | 	string    |   -  |     -  |
| defaultOpt     | 各种选中效果的配置项，具体配置见下文   | 	Object    |  -  |   -    |
| draggable     |  是否开启节点拖拽编辑 | 	Boolean    |  -  |    fasle    |

### children
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| children     |  子节点属性  |  Array  |  -    |
| name     |  显示文本  |  String  |  -    |
| disabled     |  失效状态  |  Boolean  |  -    |
| checked    |  勾选状态  |  Boolean  |  -    |
| expand     |  展开状态  |  Boolean  |  -   |
| draggable     |  是否开拖拽状态  |  Boolean  |  -   |

### defaultOpt
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| childrenKey     |  子节点属性配置项Key值  |  String  |  children    |
| nameKey     |  显示文本配置项Key值  |  String  |  name    |
| disabledKey     |  失效属性配置项Key值  |  String  |  disabled    |
| checkedKey     |  勾选属性配置项Key值  |  String  |  checked    |
| expandKey     |  展开属性配置项Key值  |  String  |  expand   |
| selectedKey     |  选中属性配置项Key值  |  String  |  selected   |

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
| on-select     |  当选中节点时触发   |  options  |
| on-check     |  当勾选/取消节点时触发   |  options  |
| on-expand     |  当展开/收起节点时触发   |  options  |

