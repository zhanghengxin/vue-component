# Carousel 级联选择框。
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

### 移入展开
设置属性 `trigger` 为 `hover`，当鼠标悬停时就会展开子集。

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
设置属性 disabled 可以禁用组件。<br>
给某项数据设置 disabled: true 可以禁用某一项。

<div class='example'>
    <div class='example-box'>
        <b-cascader disabled :data="data1"></b-cascader>
        <b-cascader :data="data1"></b-cascader>
    </div>

::: code
```html
    <div class='example-box'>
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
        },
        methods: {

        }
    }
</script>