# Table 表格控件
用于展示大量结构类似的数据，支持数据进行排序、筛选、编辑或其他自定义操作。

基础功能
- 斑马纹切换、边框切换效果、hover 效果
- 单选、单击、双击效果
- 固定表头 + 最大宽度
- 固定列
- 单选 多选
- 列表排序
- 自定义列表render

扩展功能
- 指定数据特定样式
- 列表筛选
- 自定义表头
- 可展开
- 多级表头
- 数据加载蒙层
- 表尾合计行
- 合并行或列
- 自定义索引
- 拖拽修改列宽
- 拖拽编辑表格
- 单元格编辑

### 基础用法
通过设置`columns`以及`data`来渲染基础的表格
<div class="example">
    <div class="example-box">
        <div>
           <b-table :columns='columns1' :data='data1'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table :columns='columns1' :data='data1'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                      columns1: [
                          {
                              title: 'Name',
                              key: 'name',
                              width:200
                          },
                          {
                              title: 'Age',
                              key: 'age'
                          },
                          {
                              title: 'Sex',
                              key: 'sex',
                          }
                      ],
                      data1: [
                          {
                              name: '欧阳',
                              age: 12,
                              sex: '男'
                          },
                          {
                              name: '青蛙',
                              age: 18,
                              sex: '男'
                          },
                          {
                              name: '警长',
                              age: 28,
                              sex: '男'
                          }
                      ]
                    }
            }
        }
    </script>
```
:::
</div>




### 边框
通过设置`border`来设置携带边框的表格
<div class="example">
    <div class="example-box">
        <div>
           <b-table border :columns='columns1' :data='data1'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table border :columns='columns1' :data='data1'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                      columns1: [
                          {
                              title: 'Name',
                              key: 'name',
                              width:200
                          },
                          {
                              title: 'Age',
                              key: 'age'
                          },
                          {
                              title: 'Sex',
                              key: 'sex',
                          }
                      ],
                      data1: [
                          {
                              name: '欧阳',
                              age: 12,
                              sex: '男'
                          },
                          {
                              name: '青蛙',
                              age: 18,
                              sex: '男'
                          },
                          {
                              name: '警长',
                              age: 28,
                              sex: '男'
                          }
                      ]
                    }
            }
        }
    </script>
```
:::
</div>

### 斑马纹
通过设置`stripe`斑马纹，切换不同的显示效果
<div class="example">
    <div class="example-box">
        <div>
           <b-table border stripe :columns='columns1' :data='data1'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table stripe border :columns='columns1' :data='data1'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                      columns1: [
                          {
                              title: 'Name',
                              key: 'name',
                              width:200
                          },
                          {
                              title: 'Age',
                              key: 'age'
                          },
                          {
                              title: 'Sex',
                              key: 'sex',
                          }
                      ],
                      data1: [
                          {
                              name: '欧阳',
                              age: 12,
                              sex: '男'
                          },
                          {
                              name: '青蛙',
                              age: 18,
                              sex: '男'
                          },
                          {
                              name: '警长',
                              age: 28,
                              sex: '男'
                          }
                      ]
                    }
            }
        }
    </script>
```
:::
</div>

### 固定表头
设置属性 `height` 给表格指定高度，会自动固定表头，设置`width` 会固定表格宽度。
<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 :columns='columns2' :data='data2'></b-table>
           <br/>
           <b-table border width=1000 height=150 :columns='columns2' :data='data2'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table border width=1000 :columns='columns3' :data='data3'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns2: [
                        {
                          title: 'Name',
                          key: 'name',
                          width:200
                        },
                        {
                          title: 'Age',
                          key: 'age',
                          width:300
                        },
                        {
                          title: 'Sex',
                          key: 'sex',
                          width:300
                        },
                        {
                          title: 'hobby',
                          key: 'hobby',
                          width:200
                        },
                        {
                          title: 'occupation',
                          key: 'occupation',
                          width:200
                        }
                    ],
                    data2: [
                        {
                          name: '欧阳',
                          age: 12,
                          sex: '男',
                          hobby:'Swimming',
                          occupation:'Doctor'
                        },
                        {
                          name: '青蛙',
                          age: 18,
                          sex: '男',
                          hobby:'Swimming',
                          occupation:'Doctor'
                        },
                        {
                          name: '警长',
                          age: 28,
                          sex: '男',
                          hobby:'Swimming',
                          occupation:'Doctor'
                        }
                    ]
                }
            }
    </script>
```
:::
</div>

### 固定列
通过给数据 columns 的项设置 fixed 为 left 或 right，可以左右固定需要的列。当横向内容过多时可以使用。
<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 height=200 :columns='columns3' :data='data3'></b-table>
           <br/>
           <b-table border width=1000 :columns='columns3' :data='data3'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table border width=1000 height=200 :columns='columns3' :data='data3'></b-table>
         <b-table border width=1000 :columns='columns3' :data='data3'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns3: [
                        {
                            title: 'Name',
                            key: 'name',
                            width:200,
                            fixed:'left'
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            width:300
                        },
                        {
                            title: 'Sex',
                            key: 'sex',
                            width:300
                        },
                        {
                            title: 'hobby',
                            key: 'hobby',
                            width:200
                        },
                        {
                            title: 'occupation',
                            key: 'occupation',
                            width:200
                        },
                        {
                            title: 'Pets',
                            key: 'pets',
                            width:200,
                            fixed:'right'
                        },
                    ],
                    data3: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor'
                        },
                        {
                            name: '青蛙',
                            age: 18,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 28,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 38,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 48,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Thousand-hand Bodhisattva',
                            occupation:'President'
                        }
                    ]
                }
            }
    </script>
```
:::
</div>

### 多选
通过给 `columns` 数据指定 `type: 'selection'`，即可自动开启多选。

给 `data` 项设置`_checked: true` 可以默认选中当前项。

给 `data` 项设置`_disabled: true` 可以禁止选择当前项。

<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 height=200 :columns='columns4' :data='data3'></b-table>
           <br/>
           <b-table border width=1000 height=200 :columns='columns5' :data='data3'></b-table>
           <br/>
           <b-table border width=1000 :columns='columns5' :data='data4'></b-table>
           <br/>
        </div>
    </div>

::: code
```html
    <div>
        <b-table border width=1000 height=200 :columns='columns4' :data='data3'></b-table>
        <b-table border width=1000 height=200 :columns='columns5' :data='data3'></b-table>
        <b-table border width=1000 :columns='columns5' :data='data4'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns4: [
                         {
                             title: 'selection',
                             type:'selection',
                             fixed:'left',
                             width:80,
                             align:'center'
                         },
                         {
                             title: 'Name',
                             key: 'name',
                             width:200
                         },
                         {
                             title: 'Age',
                             key: 'age',
                             width:300
                         },
                         {
                             title: 'Sex',
                             key: 'sex',
                             width:300
                         },
                         {
                             title: 'hobby',
                             key: 'hobby',
                             width:200
                         },
                         {
                             title: 'occupation',
                             key: 'occupation',
                             width:200
                         }
                    ],
                    columns5: [
                         {
                             title: 'selection',
                             type:'selection',
                             width:80,
                             align:'center'
                         },
                         {
                             title: 'Name',
                             key: 'name',
                             width:200
                         },
                         {
                             title: 'Age',
                             key: 'age',
                             width:300
                         },
                         {
                             title: 'Sex',
                             key: 'sex',
                             width:300
                         },
                         {
                             title: 'hobby',
                             key: 'hobby',
                             width:200
                         },
                         {
                             title: 'occupation',
                             key: 'occupation',
                             width:200
                         }
                    ],
                    data3: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor'
                        },
                        {
                            name: '青蛙',
                            age: 18,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 28,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 38,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 48,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Thousand-hand Bodhisattva',
                            occupation:'President'
                        }
                    ]
                }
            }
    </script>
```
:::
</div>


### 自定义表格
通过给 `columns` 数据的项，设置一个函数 `render`，可以自定义渲染当前列。

`render` 函数传入两个参数，第一个是 h，第二个是对象，包含 `row`、`column` 和 `index`，分别指当前单元格数据，当前列数据，当前是第几行。

<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 :columns='columns6' :data='data5'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table border width=1000 :columns='columns6' :data='data5'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    data5: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor',
                            _disabled:true
                        },
                        {
                            name: '青蛙',
                            age: 18,
                            sex: '男',
                            pets:'cat',
                            _checked:true,
                            hobby:'Swimming',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 28,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            occupation:'Doctor'
                        }
                    ],
                    columns6: [
                        {
                            title: 'selection',
                            type:'selection',
                            fixed:'left',
                            width:80,
                            align:'center'
                        },
                        {
                            title: 'Name',
                            key: 'name',
                            width:200
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            width:300
                        },
                        {
                            title: 'Sex',
                            key: 'sex',
                            width:300
                        },
                        {
                            title: 'hobby',
                            key: 'hobby',
                            width:200
                        },
                        {
                            title: 'occupation',
                            key: 'occupation',
                            width:120,
                            fixed:'right',
                            align:'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('b-button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            'on-click': () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, 'Delete')
                                ])
                            }
                        }
                    ]
                }
            },
            methods:{
                remove(index){
                    this.data5.splice(index,1)
                }
            }
    </script>
```
:::
</div>

### 表格排序
通过给 columns 数据的项，设置 `sortable: true`，即可对该列数据进行排序。

排序默认使用升序和降序，也可以通过设置属性 `sortMethod` 指定一个自定义排序函数，接收三个参数 a 、 b 和 type。

通过给某一列设置 _sortType 可以在初始化时使用排序。

<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 :columns='columns7' :data='data6'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table border width=1000 :columns='columns7' :data='data6'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns7: [
                       {
                           title: 'Name',
                           key: 'name',
                           width:200
                       },
                       {
                           title: 'Age',
                           key: 'age',
                           sortable:true,
                           width:300
                       },
                       {
                           title: 'Sex',
                           key: 'sex',
                           width:300
                       },
                       {
                           title: 'hobby',
                           key: 'hobby',
                           width:200
                       },
                       {
                           title: 'Pets',
                           key: 'pets',
                           width:200,
                           sortable:true,
                           fixed:'right'
                       }
                   ],
                   data6: [
                       {
                           name: '欧阳',
                           age: 12,
                           sex: '男',
                           hobby:'Swimming',
                           pets:'dog',
                           occupation:'Doctor'
                       },
                       {
                           name: '青蛙',
                           sex: '男',
                           age: 22,
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Doctor'
                       },
                       {
                           name: '警长',
                           age: 18,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Swimming',
                           occupation:'Doctor'
                       },
                       {
                           name: '球形闪电',
                           age: 6,
                           sex: '男',
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Bodyguard'
                       },
                       {
                           name: '会长',
                           age: 38,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Thousand-hand Bodhisattva',
                           occupation:'President'
                       }
                   ]
                }
            }
    </script>
```
:::
</div>

### 特定样式
行：通过给数据 data 设置字段 _className 可以给某一行指定一个样式名称。

列：通过给列 columns 设置字段 className 可以给某一列指定一个样式。

单元格：通过给数据 data 设置字段 _cellClass 可以给任意一个单元格指定样式。
<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 :columns='columns8' :data='data7'></b-table>
           <br/>
           <b-table border width=1000 :columns='columns3' :data='data8'></b-table>
        </div>
    </div>

::: code
```html
    <div>
        <b-table border width=1000 :columns='columns8' :data='data7'></b-table>
        <br/>
        <b-table border width=1000 :columns='columns3' :data='data8'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                   columns8: [
                       {
                           title: 'Name',
                           key: 'name',
                           width:200
                       },
                       {
                           title: 'Age',
                           key: 'age',
                           width:300,
                           className:'test-table-columns'
                       },
                       {
                           title: 'Sex',
                           key: 'sex',
                           width:300
                       },
                       {
                           title: 'hobby',
                           key: 'hobby',
                           width:200
                       },
                       {
                           title: 'Pets',
                           key: 'pets',
                           width:200,
                           fixed:'right'
                       }
                   ],
                   data7: [
                       {
                           name: '欧阳',
                           age: 12,
                           sex: '男',
                           hobby:'Swimming',
                           pets:'dog',
                           _cellClass:{
                               name:'test-table-cell'
                           },
                           occupation:'Doctor'
                       },
                       {
                           name: '青蛙',
                           sex: '男',
                           age: 22,
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Doctor'
                       },
                       {
                           name: '警长',
                           age: 18,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Swimming',
                           _cellClass:{
                               sex:'test-table-cell'
                           },
                           occupation:'Doctor'
                       },
                       {
                           name: '球形闪电',
                           age: 6,
                           sex: '男',
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Bodyguard'
                       },
                       {
                           name: '会长',
                           age: 38,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Thousand-hand Bodhisattva',
                           occupation:'President'
                       }
                   ],
                   data8: [
                       {
                           name: '欧阳',
                           age: 12,
                           sex: '男',
                           hobby:'Swimming',
                           pets:'dog',
                           _cellClass:{
                               name:'test-table-cell'
                           },
                           occupation:'Doctor'
                       },
                       {
                           name: '青蛙',
                           sex: '男',
                           age: 22,
                           pets:'cat',
                           hobby:'Swimming',
                           _className:'test-table-row',
                           occupation:'Doctor'
                       },
                       {
                           name: '警长',
                           age: 18,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Swimming',
                           _cellClass:{
                               sex:'test-table-cell'
                           },
                           occupation:'Doctor'
                       },
                       {
                           name: '球形闪电',
                           age: 6,
                           sex: '男',
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Bodyguard'
                       },
                       {
                           name: '会长',
                           age: 38,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Thousand-hand Bodhisattva',
                           occupation:'President'
                       }
                   ]
                }
            }
    </script>
    <style>
          td.test-table-columns {
            background: cornflowerblue;
          }
          .test-table-cell{
            background: red;
          }
          .test-table-row td{
            background: greenyellow;
          }
    </style>
```
:::
</div>

### 合并行、列
行：通过给数据 data 设置字段 `colspan` 可以设置某一行的合并单元格

列：通过给数据 data 设置字段 `rowspan` 可以给某一列的合并单元格

<div class="example">
    <div class="example-box">
        <div>
           <b-table border width=1000 :columns='columns9' :data='data9'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table border width=1000 :columns='columns9' :data='data9'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                      columns9: [
                          {
                              title: 'Name',
                              key: 'name',
                              width:200
                          },
                          {
                              title: 'Age',
                              key: 'age',
                              width:300
                          },
                          {
                              title: 'Sex',
                              key: 'sex',
                              width:300
                          },
                          {
                              title: 'hobby',
                              key: 'hobby',
                              width:200
                          },
                          {
                              title: 'Pets',
                              key: 'pets',
                              width:200,
                              fixed:'right'
                          }
                      ],
                      data9: [
                          {
                              name: '欧阳',
                              age: 12,
                              sex: '男',
                              hobby:'Swimming',
                              pets:'dog',
                              occupation:'Doctor'
                          },
                          {
                              name: '青蛙',
                              sex: '男',
                              age: 22,
                              pets:'cat',
                              rowspan:{
                                  name:3
                              },
                              hobby:'Swimming',
                              occupation:'Doctor'
                          },
                          {
                              name: '警长',
                              age: 18,
                              sex: '男',
                              pets:'rhizomys',
                              hobby:'Swimming',
                              colspan:{
                                  age:2
                              },
                              occupation:'Doctor'
                          },
                          {
                              name: '球形闪电',
                              age: 6,
                              sex: '男',
                              pets:'cat',
                              hobby:'Swimming',
                              occupation:'Bodyguard'
                          },
                          {
                              name: '会长',
                              age: 38,
                              sex: '男',
                              pets:'rhizomys',
                              hobby:'Thousand-hand Bodhisattva',
                              occupation:'President'
                          }
                      ]
                }
            }
    </script>
    <style>
          td.test-table-columns {
            background: cornflowerblue;
          }
          .test-table-cell{
            background: red;
          }
          .test-table-row td{
            background: greenyellow;
          }
    </style>
```
:::
</div>

### 单选、单击、双击效果
设置属性`highlightRow`来给表格开启单选效果

也提供了单击`on-row-click`和双击`on-row-dbclick`事件回调，返回值为当前点击列的数据。

<div class="example">
    <div class="example-box">
        <div>
           <b-table
               @on-row-click='handleClick'
               @on-row-dbclick='handleDbclick'
               border
               highlightRow
               width=1000
               :columns='columns7'
               :data='data6'>
           </b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table
             @on-row-click='handleClick'
             @on-row-dbclick='handleDbclick'
             border
             highlightRow
             width=1000
             :columns='columns7'
             :data='data6'>
         </b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns7: [
                       {
                           title: 'Name',
                           key: 'name',
                           width:200
                       },
                       {
                           title: 'Age',
                           key: 'age',
                           sortable:true,
                           width:300
                       },
                       {
                           title: 'Sex',
                           key: 'sex',
                           width:300
                       },
                       {
                           title: 'hobby',
                           key: 'hobby',
                           width:200
                       },
                       {
                           title: 'Pets',
                           key: 'pets',
                           width:200,
                           sortable:true,
                           fixed:'right'
                       }
                   ],
                   data6: [
                       {
                           name: '欧阳',
                           age: 12,
                           sex: '男',
                           hobby:'Swimming',
                           pets:'dog',
                           occupation:'Doctor'
                       },
                       {
                           name: '青蛙',
                           sex: '男',
                           age: 22,
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Doctor'
                       },
                       {
                           name: '警长',
                           age: 18,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Swimming',
                           occupation:'Doctor'
                       },
                       {
                           name: '球形闪电',
                           age: 6,
                           sex: '男',
                           pets:'cat',
                           hobby:'Swimming',
                           occupation:'Bodyguard'
                       },
                       {
                           name: '会长',
                           age: 38,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Thousand-hand Bodhisattva',
                           occupation:'President'
                       }
                   ]
                }
            },
            methods:{
                 handleClick(row){
                     console.log('单击事件,当前选中的数据为：',row)
                 },
                 handleDbclick(row){
                     console.log('双击事件,当前选中的数据为：',row)
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
                columns1: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                    }
                ],
                data1: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男'
                    },
                    {
                        name: '青蛙',
                        age: 18,
                        sex: '男'
                    },
                    {
                        name: '警长',
                        age: 28,
                        sex: '男'
                    }
                ],
                columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'occupation',
                        key: 'occupation',
                        width:200
                    }
                ],
                data2: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '青蛙',
                        age: 18,
                        sex: '男',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 28,
                        sex: '男',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    }
                ],
                columns3: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:200,
                        fixed:'left'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'occupation',
                        key: 'occupation',
                        width:200
                    },
                    {
                        title: 'Pets',
                        key: 'pets',
                        width:200,
                        fixed:'right'
                    },
                ],
                data3: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        occupation:'Doctor',
                        _disabled:true
                    },
                    {
                        name: '青蛙',
                        age: 18,
                        sex: '男',
                        pets:'cat',
                        _checked:true,
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 28,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 38,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 48,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ],
                data4:[],
                data5: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        occupation:'Doctor',
                        _disabled:true
                    },
                    {
                        name: '青蛙',
                        age: 18,
                        sex: '男',
                        pets:'cat',
                        _checked:true,
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 28,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    }
                ],
                columns4: [
                    {
                        title: 'selection',
                        type:'selection',
                        fixed:'left',
                        width:80,
                        align:'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'occupation',
                        key: 'occupation',
                        width:200
                    }
                ],
                columns5: [
                    {
                        title: 'selection',
                        type:'selection',
                        width:80,
                        align:'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'occupation',
                        key: 'occupation',
                        width:200
                    }
                ],
                columns6: [
                    {
                        title: 'selection',
                        type:'selection',
                        fixed:'left',
                        width:80,
                        align:'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'occupation',
                        key: 'occupation',
                        width:120,
                        fixed:'right',
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('b-button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        'on-click': () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ])
                        }
                    }
                ],
                columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable:true,
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'Pets',
                        key: 'pets',
                        width:200,
                        sortable:true,
                        fixed:'right'
                    }
                ],
                data6: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        occupation:'Doctor'
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ],
                columns8: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300,
                        className:'test-table-columns'
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'Pets',
                        key: 'pets',
                        width:200,
                        fixed:'right'
                    }
                ],
                data7: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        _cellClass:{
                            name:'test-table-cell'
                        },
                        occupation:'Doctor'
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        _cellClass:{
                            sex:'test-table-cell'
                        },
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ],
                data8: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        _cellClass:{
                            name:'test-table-cell'
                        },
                        occupation:'Doctor'
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        hobby:'Swimming',
                        _className:'test-table-row',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        _cellClass:{
                            sex:'test-table-cell'
                        },
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ],
                columns9: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:200
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:300
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:300
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'Pets',
                        key: 'pets',
                        width:200,
                        fixed:'right'
                    }
                ],
                data9: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        occupation:'Doctor'
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        rowspan:{
                            name:3
                        },
                        hobby:'Swimming',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        colspan:{
                            age:2
                        },
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ]
            }
        },
        methods:{
            remove(index){
                this.data5.splice(index,1)
            },
            handleClick(row){
                console.log('单击事件,当前选中的数据为：',row)
            },
            handleDbclick(row){
                console.log('双击事件,当前选中的数据为：',row)
            }
        }
    }
</script>