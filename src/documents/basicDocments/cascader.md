# Cascader 级联选择框
当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法
请参照示例的格式使用data，每项数据至少包含 value、label 两项，子集为 children，使用 v-model 进行双向绑定。
<div class='example'>
    <div class='example-box'>
        <b-cascader :data="data" v-model="value1"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader :data="data" v-model="value1"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   value1: [],
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            }
        }
    </script>
```
:::
</div>

### 尺寸
通过设置`size`属性为`large`和`small`将输入框设置为大和小尺寸，不设置为默认（中）尺寸。

<div class='example'>
    <div class='example-box'>
        <b-cascader filterable  size='small' :data="data"></b-cascader>
        <b-cascader filterable :data="data"></b-cascader>
        <b-cascader filterable size='large' :data="data"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader size='small' :data="data"></b-cascader>
        <b-cascader :data="data"></b-cascader>
        <b-cascader size='large' :data="data"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            }
        }
    </script>
```
:::
</div>

### 选择即改变
设置`change-on-select`开启点击或移入选项即表示选中该项，可用于选择任意一级菜单的选项。

<div class='example'>
    <div class='example-box'>
        <b-cascader change-on-select :data="data"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader change-on-select :data="data"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            }
        }
    </script>
```
:::
</div>


### 默认值
指定 value 默认值，组件会在初始化时选定数据。

<div class='example'>
    <div class='example-box'>
        <b-cascader :data="data" v-model="value2"></b-cascader><span>{{value2}}</span>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader :data="data" v-model="value2"></b-cascader><span>{{value2}}</span>
    </div>
    <script>
        export default {
            data () {
                return {
                   value2: ['fruit','pineapple'],
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            }
        }
    </script>
```
:::
</div>

### 划入展示
设置属性 `trigger` 为 `hover`，当鼠标悬停时就会展示子集。

<div class='example'>
    <div class='example-box'>
        <b-cascader :data="data" trigger='hover'></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader :data="data" trigger='hover'></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜',
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜',
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            }
        }
    </script>
```
:::
</div>

### 禁用
设置属性 `disabled` 可以禁用组件。<br>
给`data`中的某项数据设置 `disabled: true` 可以禁用某一项。

<div class='example'>
    <div class='example-box'>
        <b-cascader disabled :data="data1"></b-cascader>
        <b-cascader :data="data1"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader disabled :data="data1"></b-cascader>
        <b-cascader :data="data1"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   data1: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   disabled:true,
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            }
        }
    </script>
```
:::
</div>

### 自定义显示
对于显示的结果，可以通过 render-format 接收一个函数来自定义。<br>
可以利用`labels`[当前选择label集合]、`selectedData`[是当前选择的数据集合]自由搭配显示
<div class='example'>
    <div class='example-box'>
        <b-cascader :render-format='formatMethods' :data="data"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader :render-format='formatMethods' :data="data"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
                       }
                   ]
                }
            },
            methods: {
                formatMethods (labels, selectedData) {
                    const data = selectedData[0] || false
                    if (data && data.code) {
                        return labels[0] + ' —— ' + data.code
                    }
                    return labels[0]
                }
            }
        }
    </script>
```
:::
</div>

### 动态加载次级选项
使用 `load-data` 属性可以动态加载次级选项，需要给数据增加 `loading` 来标识当前是否在加载中。

`load-data` 的第二个参数为回调，如果执行，则会自动展开当前项的子列表。

<div class='example'>
    <div class='example-box'>
        <b-cascader :load-data="loadData" :data="data2"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader disabled :data="data1"></b-cascader>
        <b-cascader :data="data1"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                    data2:[
                        {
                            value: 'fruit',
                            label: '水果',
                            loading:false,
                            children:[]
                        },
                        {
                            value: 'vegetables',
                            label: '蔬菜',
                            loading:false,
                            children:[]
                        }
                    ]
                }
            },
            methods: {
                loadData (item, callback) {
                    item.loading = true
                    setTimeout(() => {
                        if (item.value === 'fruit') {
                            item.children = [
                                {
                                   value: 'pineapple',
                                   label: '凤梨'
                                },
                                {
                                   value: 'apple',
                                   label: '苹果'
                                },
                                {
                                   value: 'cherry',
                                   label: '樱桃'
                                }
                            ];
                        } else if (item.value === 'vegetables') {
                            item.children = [
                                {
                                   value: 'shaddock',
                                   label: '柚子'
                                },
                                {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                                }
                            ]
                        }
                        item.loading = false;
                        callback()
                    }, 1000)
                }
            }
        }
    </script>
```
:::
</div>

### 可搜索
将`filterable`赋值为`true`即可打开搜索功能。

<div class='example'>
    <div class='example-box'>
        <b-cascader filterable :data="data"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
        <b-cascader filterable :data="data"></b-cascader>
    </div>
    <script>
        export default {
            data () {
                return {
                   data: [
                       {
                           value: 'fruit',
                           label: '水果',
                           children: [
                               {
                                   value: 'pineapple',
                                   label: '凤梨'
                               },
                               {
                                   value: 'apple',
                                   label: '苹果'
                               },
                               {
                                   value: 'cherry',
                                   label: '樱桃'
                               }
                           ]
                       },
                       {
                           value: 'vegetables',
                           label: '蔬菜',
                           children: [
                               {
                                   value: 'shaddock',
                                   label: '柚子'
                               },
                               {
                                   value: 'melon',
                                   label: '瓜类',
                                   children: [
                                       {
                                           value: 'muskmelon',
                                           label: '香瓜'
                                       },
                                       {
                                           value: 'watermelon',
                                           label: '西瓜'
                                       }
                                   ]
                               }
                           ],
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
               value1: [],
               value2: ['fruit','pineapple'],
               data: [
                   {
                       value: 'fruit',
                       label: '水果',
                       children: [
                           {
                               value: 'pineapple',
                               label: '凤梨'
                           },
                           {
                               value: 'apple',
                               label: '苹果'
                           },
                           {
                               value: 'cherry',
                               label: '樱桃'
                           }
                       ]
                   },
                   {
                       value: 'vegetables',
                       label: '蔬菜',
                       children: [
                           {
                               value: 'shaddock',
                               label: '柚子'
                           },
                           {
                               value: 'melon',
                               label: '瓜类',
                               children: [
                                   {
                                       value: 'muskmelon',
                                       label: '香瓜'
                                   },
                                   {
                                       value: 'watermelon',
                                       label: '西瓜'
                                   }
                               ]
                           }
                       ],
                   }
               ],
               data1: [
                  {
                      value: 'fruit',
                      label: '水果',
                      children: [
                          {
                              value: 'pineapple',
                              label: '凤梨'
                          },
                          {
                              value: 'apple',
                              label: '苹果'
                          },
                          {
                              value: 'cherry',
                              label: '樱桃'
                          }
                      ]
                  },
                  {
                      value: 'vegetables',
                      label: '蔬菜',
                      children: [
                          {
                              disabled:true,
                              value: 'shaddock',
                              label: '柚子'
                          },
                          {
                              value: 'melon',
                              label: '瓜类',
                              children: [
                                  {
                                      value: 'muskmelon',
                                      label: '香瓜'
                                  },
                                  {
                                      value: 'watermelon',
                                      label: '西瓜'
                                  }
                              ]
                          }
                      ],
                  }
               ],
               data2:[
                   {
                       value: 'fruit',
                       label: '水果',
                       loading:false,
                       children:[]
                   },
                   {
                       value: 'vegetables',
                       label: '蔬菜',
                       loading:false,
                       children:[]
                   }
               ]
            }
        },
        methods: {
            formatMethods (labels, selectedData) {
                const data = selectedData[0] || false
                if (data && data.value) {
                    return labels[0] + ' —— ' + data.value
                }
                return labels[0];
            },
            loadData (item, callback) {
                item.loading = true
                setTimeout(() => {
                    if (item.value === 'fruit') {
                        item.children = [
                            {
                               value: 'pineapple',
                               label: '凤梨'
                            },
                            {
                               value: 'apple',
                               label: '苹果'
                            },
                            {
                               value: 'cherry',
                               label: '樱桃'
                            }
                        ];
                    } else if (item.value === 'vegetables') {
                        item.children = [
                            {
                               value: 'shaddock',
                               label: '柚子'
                            },
                            {
                               value: 'melon',
                               label: '瓜类',
                               children: [
                                   {
                                       value: 'muskmelon',
                                       label: '香瓜'
                                   },
                                   {
                                       value: 'watermelon',
                                       label: '西瓜'
                                   }
                               ]
                            }
                        ]
                    }
                    item.loading = false;
                    callback()
                }, 1000)
            }
        }
    }
</script>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| data    | 可选项的数据，格式参照基本用法	   | Array  | - |   []  |
| value    | 当前已选项的数据，格式参照示例  | Array  | - |   []  |
| render-format    | 选择后展示的函数，用于自定义显示格式  | Function  | - |   label => label.join(' / ')  |
| clearable    | 是否支持清除选中项  | Boolean  | - |   true  |
| disabled    | 是否禁用级联选择器  | Boolean  | - |   false  |
| filterable    | 是否支持搜索  | Boolean  | - |   false  |
| change-on-select    | 是否开启选择即改变效果  | Boolean  | - |   false  |
| placeholder    | 输入框占位符  |  String  | - |   '请选择'  |
| trigger    | 次级菜单展开方式	  |  String  |  `click` 或 `hover` |   'click'  |
| size	    | 输入框大小	  |  String  |  `large` 或 `small` 或者 `default` |   'default'  |
| load-data	  | 动态获取数据，数据源`data`需标识 loading |  Function	  |  - |   - |
| not-found-text  | 当搜索列表为空时显示的内容	 |  String	  |  - |   '无匹配数据' |
| transfer  | 添加此属性，它将不受父级样式影响，从而达到更好的效果	 |  Boolean	  |  - |   false |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-change	    | 选择完成后的回调，返回值 value 即已选值 value，selectedData 为已选项的具体数据    | value, selectedData |
| on-visible-change	  | 展开和关闭弹窗时触发	 | status |
