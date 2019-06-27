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
- 支持自定义节点内容

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
    <template>
        <div>
            <b-tree :data='data1' @on-select='handleselect'></b-tree>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data1:[
                       {
                           name: 'parent 1',
                           expand: true,
                           selected:true,
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
                                           name: 'leaf 1-2-1',
                                           disabled:true
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
    <template>
        <div>
            <b-checkbox v-model="accordionOptions.isCache">手风琴是否开启缓存</b-checkbox>
            <b-tree :data='data2' accordion :accordionOptions='accordionOptions'></b-tree>
        <div>
    </template>
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
           <b-checkbox v-model="checkboxOptions.disabled">是否级联禁用数据</b-checkbox>
           <b-tree :data='data3' show-checkbox :checkboxOptions='checkboxOptions' @on-check='handleChecked'></b-tree>
        </div>
    </div>

::: code
```html
    <template>
        <div>
            <b-checkbox v-model="checkboxOptions.parent">是否级联父级数据</b-checkbox>
            <b-checkbox v-model="checkboxOptions.children">是否级联子级数据</b-checkbox>
            <b-checkbox v-model="checkboxOptions.disabled">是否级联禁用数据</b-checkbox>
            <b-tree :data='data3' show-checkbox :checkboxOptions='checkboxOptions' @on-check='handleChecked'></b-tree>
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
                                    checked:true,
                                    id:2,
                                    children: [
                                        {
                                            id:3,
                                            checked:true,
                                            name: 'leaf1'
                                        },
                                        {
                                            id:4,
                                            checked:true,
                                            name: 'leaf2'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    name: 'parent2',
                                    expand: true,
                                    children: [
                                        {
                                            id:6,
                                            name: 'leaf 1-2-1'
                                        },
                                        {
                                            id:7,
                                            name: 'leaf 1-2-2',
                                            expand: true,
                                            children: [
                                                {
                                                    id:8,
                                                    name: 'parent 1-2-2-1',
                                                    disabled:true,
                                                    children: [
                                                        {
                                                            id:10,
                                                            name: 'leaf 1-2-2-1-1'
                                                        },
                                                        {
                                                            id:11,
                                                            name: 'leaf 1-2-2-1-2'
                                                        }
                                                    ]
                                                },
                                                {
                                                    id:9,
                                                    name: 'parent 1-2-2-1',
                                                    children: [
                                                        {
                                                            id:12,
                                                            name: 'leaf 1-2-2-1-1'
                                                        },
                                                        {
                                                            id:13,
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
                        disabled: false,
                        children: true
                    }
                }
            },
            methods:{
                handleChecked (options){
                    console.log(`选中获取的数据:`,options)
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
    <template>
        <b-tree :data='data5' loading :load-method="loadMethod"></b-tree>
    </template>
    <script>
        export default {
            data () {
                return {
                    data5:[
                        {
                            name: '根节点',
                            loading: false
                        }
                    ]
                }
            },
            methods:{
                loadMethod (item, callback) {
                    setTimeout(() => {
                        const data = [
                            {
                                name: '懒加载数据',
                                loading: false
                            }
                        ]
                        callback(data)
                    }, 1000)
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
    <template>
        <b-tree :data='data6' draggable></b-tree>
    </template>
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


### 自定义节点内容
使用 Render 函数可以自定义节点显示内容【考虑到要兼容以前用iview的项目,固render函数对比iview无使用改动】

Render 函数的第二个参数，包含三个字段：
- root ：树的根节点
- node ：当前节点
- data ：当前节点的数据

通过合理地使用 root、node 和 data 可以实现各种效果，每个节点都有一个 nodeKey 字段，用来标识节点的 id。

- Render 函数分两种，一种是给当前树的每个节点都设置同样的渲染内容，此 render 通过 Tree 组件的属性 render 传递；
- 另一种是单独给某个节点设置，在该节点的 render 字段内设置；同时设置时，会优先使用当前节点的 Render 函数。

<div class="example">
    <div class="example-box">
        <div>
            <b-tree :data='data6' :render='renderContent'></b-tree>
        </div>
    </div>

::: code
```html
    <template>
         <b-tree :data='data6' :render='renderContent'></b-tree>
    </template>
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
                remove (root, node, data) {
                    const parentKey = root.find(el => el === node).parent;
                    if (parentKey === undefined) return;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);
                },
                append (data) {
                    const children = data.children || [];
                    children.push({
                        name: '添加数据',
                        expand: true
                    });
                    this.$set(data, 'children', children);
                },
                renderContent (h, {root, node, data}) {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('span', data.name)
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        }, [
                            h('b-icon', {
                                props: {type: 'tianjia-chuangjian'},
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    'on-click': () => { this.append(data) }
                                }
                            }),
                            h('b-icon', {
                                props: {type: 'quxiao-guanbi-shanchu'},
                                on: {
                                    'on-click': () => { this.remove(root, node, data) }
                                }
                            })
                        ])
                    ]);
                }
            }
        }
    </script>
```
:::
</div>

### 自动滚动

单选模式下，设置 `auto-scroll` 可开启自动滚动功能，选中数据时滚动条自动调节。

<div class="example">
    <div class="example-box">
        <div>
            <b-tree style="height:150px;overflow: scroll"  auto-scroll :data='data8'></b-tree>
        </div>
    </div>

::: code
```html
    <template>
        <b-tree style="height:150px;overflow: scroll" auto-scroll :data='data8'></b-tree>
    </template>
    <script>
        export default {
            data () {
                return {
                    data8:[
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
                                    name: 'parent 1-3',
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
                                    name: 'parent 1-4',
                                    expand: true,
                                    children: [
                                        {
                                            selected:true,
                                            name: 'leaf 1-2-1'
                                        },
                                        {
                                            name: 'leaf 1-2-1'
                                        }
                                    ]
                                },
                                {
                                    name: 'parent 1-5',
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
                                    name: 'parent 1-6',
                                    expand: true,
                                    children: [
                                        {
                                            name: 'leaf 1-1-1'
                                        },
                                        {
                                            name: 'leaf 1-1-2'
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

### 综合应用
在需要对节点进行过滤时，传入`filterText`关键字进行过滤，同时也需要设置`filter-method`作为过滤函数。<br>
通过`default-expanded-values` 默认选中的节点。<br>
通过`default-expanded-values` 默认展开的节点。<br>
通过`checkboxOptions`来配置级联的效果
<div class="example">
    <div class="example-box">
        <div>
            <b-input width=200 v-model='filterText' suffix='chaxun'></b-input>
            <b-checkbox  @on-change='changeCascade'>包含下级</b-checkbox>
            <b-tree
                :default-checked-values='defaultCheckedValues'
                :default-expanded-values='defaultExpandedValues'
                showCheckbox
                :checkbox-options='dataOptions'
                :data='data7'
                :filter-text='filterText'
                :filter-method='filterMethod'>
            </b-tree>
        </div>
    </div>

::: code
```html
    <template>
        <div>
           <b-input width=200 v-model='filterText' suffix='chaxun'></b-input>
           <b-checkbox @on-change='changeCascade'>包含下级</b-checkbox>
           <b-tree
                :default-checked-values='defaultCheckedValues'
                :default-expanded-values='defaultExpandedValues'
                showCheckbox
                :checkbox-options='dataOptions'
                :data='data7'
                :filter-text='filterText'
                :filter-method='filterMethod'>
           </b-tree>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    data7:[
                        {
                            name: 'parent-0',
                            id:1
                        },
                        {
                           name: 'parent-1',
                           id:2,
                           children: [
                               {
                                   name: 'parent 1-1',
                                   id:3,
                                   children: [
                                       {
                                           id:4,
                                           name: 'leaf 1-1-1'
                                       },
                                       {
                                           id:5,
                                           name: 'leaf 1-1-2'
                                       }
                                   ]
                               },
                               {
                                   name: 'parent 1-2',
                                   id:6,
                                   children: [
                                       {
                                           id:7,
                                           name: 'leaf 1-2-1'
                                       },
                                       {
                                           id:8,
                                           name: 'leaf 1-2-1'
                                       }
                                   ]
                               }
                           ]
                       }
                    ],
                    filterText:'',
                    dataOptions: { // 多选级联配置
                        parent: false, // 是否影响父级节点
                        children: true // 是否影响子级节点
                    },
                    defaultCheckedValues:[4,7],
                    defaultExpandedValues:[2,3]
                }
            },
            methods: {
                filterMethod(value, data){
                     return data.name.indexOf(value) !== -1
                },
                changeCascade(status){
                    this.dataOptions.children = status
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
            defaultCheckedValues:[4,7],
            defaultExpandedValues:[2,3],
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
                                   name: 'leaf 1-2-1',
                                   disabled:true
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
                    name: 'root',
                    expand: true,
                    id:1,
                    children: [
                        {
                            name: 'parent1',
                            checked:true,
                            id:2,
                            children: [
                                {
                                    id:3,
                                    checked:true,
                                    name: 'leaf1'
                                },
                                {
                                    id:4,
                                    checked:true,
                                    name: 'leaf2'
                                }
                            ]
                        },
                        {
                            id:5,
                            name: 'parent2',
                            expand: true,
                            children: [
                                {
                                    id:6,
                                    name: 'leaf 1-2-1'
                                },
                                {
                                    id:7,
                                    name: 'leaf 1-2-2',
                                    expand: true,
                                    children: [
                                        {
                                            id:8,
                                            name: 'parent 1-2-2-1',
                                            disabled:true,
                                            children: [
                                                {
                                                    id:10,
                                                    name: 'leaf 1-2-2-1-1'
                                                },
                                                {
                                                    id:11,
                                                    name: 'leaf 1-2-2-1-2'
                                                }
                                            ]
                                        },
                                        {
                                            id:9,
                                            name: 'parent 1-2-2-1',
                                            children: [
                                                {
                                                    id:12,
                                                    name: 'leaf 1-2-2-1-1'
                                                },
                                                {
                                                    id:13,
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
            data7:[
                {
                    name: 'parent-0',
                    id:1
                },
                {
                   name: 'parent-1',
                   id:2,
                   children: [
                       {
                           name: 'parent 1-1',
                           id:3,
                           children: [
                               {
                                   id:4,
                                   name: 'leaf 1-1-1'
                               },
                               {
                                   id:5,
                                   name: 'leaf 1-1-2'
                               }
                           ]
                       },
                       {
                           name: 'parent 1-2',
                           id:6,
                           children: [
                               {
                                   id:7,
                                   name: 'leaf 1-2-1'
                               },
                               {
                                   id:8,
                                   name: 'leaf 1-2-1'
                               }
                           ]
                       }
                   ]
               }
            ],
            data8:[
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
                            name: 'parent 1-3',
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
                            name: 'parent 1-4',
                            expand: true,
                            children: [
                                {
                                    selected:true,
                                    name: 'leaf 1-2-1'
                                },
                                {
                                    name: 'leaf 1-2-1'
                                }
                            ]
                        },
                        {
                            name: 'parent 1-5',
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
                            name: 'parent 1-6',
                            expand: true,
                            children: [
                                {
                                    name: 'leaf 1-1-1'
                                },
                                {
                                    name: 'leaf 1-1-2'
                                }
                            ]
                        }
                    ]
                }
            ],
            accordionOptions: {
                isCache: true // 是否缓存其他同级节点的展开状态
            },
            dataOptions: { // 多选级联配置
                parent: false, // 是否影响父级节点
                children: true // 是否影响子级节点
            },
            checkboxOptions: { // 多选级联配置
                parent: true, // 是否影响父级节点
                disabled: false, // 是否影响父级节点
                children: true // 是否影响子级节点
            },
            filterText:''
        }
    },
    methods: {
        handleselect (data){
            console.log(`当前选中的数据为:`,data)
        },
        handleChecked (options){
            console.log(`选中获取的数据:`,options)
        },
        changeCascade(status){
            this.dataOptions.children = status
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
        },
        append (data) {
            const children = data.children || [];
            children.push({
                name: '添加数据',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            if(parentKey === undefined) return;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.name)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('b-icon', {
                        props: {type:'tianjia-chuangjian'},
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            'on-click': () => { this.append(data) }
                        }
                    }),
                    h('b-icon', {
                        props: {type:'quxiao-guanbi-shanchu'},
                        on: {
                            'on-click': () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },

    }
}
</script>

### Tree props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data     |  可嵌套的节点属性的数组，标准 tree 数据  | Array  |  -    |    []   |
| accordion     |  是否支持手风琴效果   |  Boolean    |  -|     false  |
| accordion-options     | 手风琴配置项，具体配置见下文   | Object    |  -  |     -  |
| show-checkbox     | 是否显示多选框	   | Boolean    |  -  |     false  |
| checkbox-options     |  多选配置项，具体配置见下文 | Object    |  -  |     -  |
| loading     | 是否开启懒加载   | Boolean    |  -  |     false  |
| load-method     |  异步加载数据的方法，详见例子 | Function    |  -  |     -  |
| filter-text     |  模糊搜索的关键字 |  String \ Number    |  -  |     ''  |
| filter-method     |  模糊检索的自定义函数   | 	string    |   -  |     -  |
| default-opt     | 各种选中效果的配置项，具体配置见下文   | 	Object    |  -  |   -    |
| draggable     |  是否开启节点拖拽编辑 | 	Boolean    |  -  |    fasle    |
| check-cascade     |  是否开启父子级联效果 | 	Boolean    |  -  |     true    |
| auto-scroll     |  是否开启自动滚动功能、此功能只在单选模式生效，选中数据时滚动条自动调节 | 	Boolean    |  -  |     true    |
| render     |  自定义渲染内容，见示例	 | 	Function    |  -  |    -    |
| class-name      | 给 item-name 附加的 class	| String | - |   -  |
| width | 开启 `label` 模式时生效,自定义宽度	| Number |	-   |     -   |
| placement    | 下拉框出现的位置 | string | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`,<br/>`bottom-end`, `left`,`left-start`, `left-end`, <br/>`right`, `right-start`, `right-end`| bottom-start |
| label-width | 开启 `label` 和`fixed` 模式时生效,自定义label文字宽度	| Number |	-   |     -   |
| default-expanded-values | 默认勾选的节点的 key 的数组		| Array |	-   |    []   |


### Tree methods
| 方法名		      | 说明	    | 参数 |
|---------- |-------- |---------- |
| getCheckedNodes   |  获取被勾选的节点集合	   | - |
| getSelectedNodes   |  获取被选中的节点	集合	   | - |
| getIndeterminateNodes   |  获取半选状态节点集合	   | - |


### data props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| children     |  子节点属性  |  Array  |  -    |
| name     |  显示文本  |  String  |  -    |
| disabled     |  失效状态  |  Boolean  |  -    |
| checked    |  勾选状态  |  Boolean  |  -    |
| expand     |  展开状态  |  Boolean  |  -   |
| draggable     |  是否开拖拽状态  |  Boolean  |  -   |
| render     |  自定义渲染内容	 | 	Function    |  -  |

### defaultOpt props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| childrenKey     |  子节点属性配置项Key值  |  String  |  children    |
| nameKey     |  显示文本配置项Key值  |  String  |  name    |
| idKey     |  数据的唯一标识字段  |  String  |   id    |
| disabledKey     |  失效属性配置项Key值  |  String  |  disabled    |
| checkedKey     |  勾选属性配置项Key值  |  String  |  checked    |
| expandKey     |  展开属性配置项Key值  |  String  |  expand   |
| selectedKey     |  选中属性配置项Key值  |  String  |  selected   |

### accordionOptions props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |
| isCache      |  是否缓存其他同级节点的展开状态  |  Boolean  |  true    |

### checkboxOptions props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |
| parent      |   勾选时是否级联父级节点 |  Boolean  |  true    |
| children      |  勾选时是否级联子级节点  |  Boolean  |  true    |
| disabled      |  勾选时是否级联禁用节点 |  Boolean  |  true    |

### events
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| on-select     |  当选中节点时触发   |  options【Object】 : <br> `data`:  当前选中的数据<br> `getSelectedNodes`:  当前选中的数据集合<br> |
| on-check     |  当勾选/取消节点时触发   |  options【Object】 : <br> `checkedNodes`:  当前全选节点集合<br> `indeterminateNodes`:  当前半选节点集合<br>`checkedAndIndeterminateNodes`:  当前半选节点和全选节点合集<br>`currentNode`:  当前选中节点 |
| on-expand     |  当展开/收起节点时触发   |  options【Object】 : <br> `data`:  当前选中的数据 |

