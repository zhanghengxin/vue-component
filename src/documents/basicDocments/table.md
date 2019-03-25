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
- 多级表头

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
                              key: 'age',
                              width:400
                          },
                          {
                              title: 'Sex',
                              key: 'sex',
                              width:400
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
        <b-table border width=1000 :columns='columns2' :data='data2'></b-table>
        <br/>
        <b-table border width=1000 height=150 :columns='columns2' :data='data2'></b-table>
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
                            width:400
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
                           width:35,
                           align:'center'
                       },
                       {
                           title: 'Name',
                           key: 'name',
                           width:200,
                           render: (h, params) => {
                               return h('div', [
                                   h('b-input', {
                                       on: {
                                           'on-change': (data) => {
                                               this.edit(data,params.index)
                                           }
                                       },
                                       value:params
                                   })
                               ])
                           }
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
                },
                edit(data,index) {
                    this.data5[index].age = new Date()
                }
            }
    </script>
```
:::
</div>

### 表格排序
通过给 columns 数据的项，设置 `sortable: true`，即可对该列数据进行排序。

排序默认使用升序和降序，也可以通过设置属性 `sortMethod` 指定一个自定义排序函数，接收三个参数 a 、 b 和 type。

通过给某一列设置 sortType 可以在初始化时使用排序。

<div class="example">
    <div class="example-box">
        <div>
           <b-table @on-sort-change="sortChange" border width=1000 :columns='columns7' :data='data6'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table @on-sort-change="sortChange" border width=1000 :columns='columns7' :data='data6'></b-table>
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
                sortChange(options){
                    console.log(options.column,'column')
                    console.log(options.key,'key')
                    console.log(options.order,'order')
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
行：通过给数据 data 设置字段 `_colspan` 可以设置某一行的合并单元格

列：通过给数据 data 设置字段 `_rowspan` 可以给某一列的合并单元格

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
                              _rowspan:{
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
                              _colspan:{
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

### 可拖拽列宽
通过给组件设置 resizeable 属性可以开启拖拽列宽功能

<div class="example">
    <div class="example-box">
        <div>
            <b-table resizeable border width=1000 height=200 :columns='columns3' :data='data3'></b-table>
            <br/>
            <b-table resizeable border width=1000 :columns='columns2' :data='data2'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table resizeable border width=1000 height=200 :columns='columns3' :data='data3'></b-table>
         <br/>
         <b-table resizeable border width=1000 :columns='columns2' :data='data2'></b-table>
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
                            width:400
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

### 拖拽排序
通过给组件设置 draggable 属性可以开启拖拽排序功能
<div class="example">
    <div class="example-box">
        <div>
           <b-table  draggable border width=1000 height=200 :columns='columns10' :data='data10'></b-table>
        </div>
    </div>

::: code
```html
    <div>
       <b-table  draggable border width=1000 height=200 :columns='columns10' :data='data10'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                   columns10: [
                       {
                           title: 'Name',
                           key: 'name',
                           width:100,
                           fixed:'left'
                       },
                       {
                           title: 'Age',
                           key: 'age',
                           width:100
                       },
                       {
                           title: 'Sex',
                           key: 'sex',
                           width:150
                       },
                       {
                           title: 'Hobby',
                           key: 'hobby',
                           width:100
                       },
                       {
                           title: 'Pets',
                           key: 'pets',
                           width:200
                       },
                       {
                           title: 'Like',
                           key: 'like',
                           width:200
                       },
                       {
                           title: 'ID',
                           key: 'id',
                           width:200,
                           fixed:'right'
                       },
                       {
                           title: 'Book',
                           key: 'book',
                           width:200,
                           fixed:'right'
                       }
                   ],
                   data10: [
                       {
                           name: '欧阳',
                           age: 12,
                           sex: '男',
                           hobby:'Swimming',
                           pets:'dog',
                           occupation:'Doctor',
                           like:'red',
                           id:'1',
                           book:'《贩罪》'
                       },
                       {
                           name: '青蛙',
                           sex: '男',
                           age: 22,
                           pets:'cat',
                           hobby:'Swimming',
                           id:'2',
                           book:'《霸皇纪》',
                           occupation:'Doctor'
                       },
                       {
                           name: '警长',
                           age: 18,
                           sex: '男',
                           pets:'rhizomys',
                           hobby:'Swimming',
                           id:'3',
                           book:'《龙族》',
                           occupation:'Doctor'
                       },
                       {
                           name: '球形闪电',
                           age: 6,
                           sex: '男',
                           pets:'cat',
                           hobby:'Swimming',
                           book:'《卡徒》',
                           id:'4',
                           occupation:'Bodyguard'
                       },
                       {
                           name: '会长',
                           age: 38,
                           sex: '男',
                           book:'《无限道武者路》',
                           id:'5',
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


### 显示隐藏列
通过给组件设置 dynamicable 属性可以开启显示隐藏列功能
通过给组件设置 dynamicallocation 属性可以开启显示隐藏列功能【弹层版本】
<div class="example">
    <div class="example-box">
        <div>
            <b-table dynamicable border width=1000 :columns='columns3' :data='data3'></b-table>
            <br/>
            <b-table dynamicable border width=1000 :columns='columns2' :data='data2'></b-table>
            <br/>
            <p>弹层版本</p>
            <b-table style="margin-top:10px" dynamicallocation border width=1000 :columns='columns3' :data='data3'></b-table>
            <br/>
            <b-table style="margin-top:20px" dynamicallocation border width=1000 :columns='columns2' :data='data2'></b-table>
        </div>
    </div>

::: code
```html
    <div>
        <b-table dynamicable border width=1000 :columns='columns3' :data='data3'></b-table>
        <b-table dynamicable border width=1000 :columns='columns2' :data='data2'></b-table>
        <b-table dynamicallocation border width=1000 :columns='columns3' :data='data3'></b-table>
        <b-table dynamicallocation border width=1000 :columns='columns2' :data='data2'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns11: [
                         {
                             title: 'Name',
                             key: 'name',
                             width:100
                         },
                         {
                             title: 'Age',
                             key: 'age',
                             width:100
                         },
                         {
                             title: 'Pets',
                             key: 'pets',
                             width:200
                         },
                         {
                             title: 'Like',
                             key: 'like',
                             width:200
                         },
                         {
                             title: 'ID',
                             key: 'id',
                             width:200
                         },
                         {
                             title: 'Book',
                             key: 'book',
                             width:200
                         }
                    ],
                    data10: [
                         {
                             name: '欧阳',
                             age: 12,
                             sex: '男',
                             hobby:'Swimming',
                             pets:'dog',
                             occupation:'Doctor',
                             like:'red',
                             id:'1',
                             book:'《贩罪》'
                         },
                         {
                             name: '青蛙',
                             sex: '男',
                             age: 22,
                             pets:'cat',
                             like:'green',
                             hobby:'Swimming',
                             id:'2',
                             book:'《霸皇纪》',
                             occupation:'Doctor'
                         },
                         {
                             name: '警长',
                             age: 18,
                             sex: '男',
                             pets:'rhizomys',
                             hobby:'Swimming',
                             like:'orange',
                             id:'3',
                             book:'《龙族》',
                             occupation:'Doctor'
                         },
                         {
                             name: '球形闪电',
                             age: 6,
                             sex: '男',
                             pets:'cat',
                             hobby:'Swimming',
                             like:'pink',
                             book:'《卡徒》',
                             id:'4',
                             occupation:'Bodyguard'
                         },
                         {
                             name: '会长',
                             age: 38,
                             sex: '男',
                             book:'《无限道武者路》',
                             id:'5',
                             like:'blue',
                             pets:'rhizomys',
                             hobby:'Thousand-hand Bodhisattva',
                             occupation:'President'
                         }
                    ],
                    columns10: [
                        {
                            title: 'Name',
                            key: 'name',
                            width:100,
                            fixed:'left'
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            width:100
                        },
                        {
                            title: 'Sex',
                            key: 'sex',
                            width:150
                        },
                        {
                            title: 'Hobby',
                            key: 'hobby',
                            width:100
                        },
                        {
                            title: 'Pets',
                            key: 'pets',
                            width:200
                        },
                        {
                            title: 'Like',
                            key: 'like',
                            width:200
                        },
                        {
                            title: 'ID',
                            key: 'id',
                            width:200,
                            fixed:'right'
                        },
                        {
                            title: 'Book',
                            key: 'book',
                            width:200,
                            fixed:'right'
                        }
                    ]
                }
            }
    </script>
```
:::
</div>

### 表格序号
通过给组件设置 showIndex 属性可以开启序号,可以通过配置`indexInfo`来支持分页以及其他属性
<div class="example">
    <div class="example-box">
        <div>
           <b-table show-index border width=1000 :columns='columns11' :data='data11'></b-table>
           <b-table border width=1000 :columns='columns13' :data='data11'></b-table>
        </div>
    </div>

::: code
```html
    <div>
        <b-table show-index border width=1000 :columns='columns11' :data='data11'></b-table>
        <b-table border width=1000 :columns='columns13' :data='data11'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns11: [
                         {
                             title: 'Name',
                             key: 'name',
                             width:100
                         },
                         {
                             title: 'Age',
                             key: 'age',
                             width:100
                         },
                         {
                             title: 'Pets',
                             key: 'pets',
                             width:200
                         },
                         {
                             title: 'Like',
                             key: 'like',
                             width:200
                         },
                         {
                             title: 'ID',
                             key: 'id',
                             width:200
                         },
                         {
                             title: 'Book',
                             key: 'book',
                             width:200
                         }
                    ],
                    columns13: [
                        {
                           title: '序号',
                           width:60,
                           align:'center',
                           type:'index'
                        },
                        {
                           title: 'Age',
                           key: 'age',
                           width:100
                        },
                        {
                           title: 'Pets',
                           key: 'pets',
                           minWidth:100
                        },
                        {
                           title: 'Like',
                           key: 'like',
                           maxWidth:100
                        },
                        {
                           title: 'ID',
                           key: 'id',
                        },
                        {
                           title: 'Book',
                           key: 'book'
                        }
                    ],
                    data11: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor',
                            like:'red',
                            id:'1',
                            book:'《贩罪》'
                        },
                        {
                            name: '青蛙',
                            sex: '男',
                            age: 22,
                            pets:'cat',
                            hobby:'Swimming',
                            id:'2',
                            book:'《霸皇纪》',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 18,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            id:'3',
                            book:'《龙族》',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 6,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            book:'《卡徒》',
                            id:'4',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 38,
                            sex: '男',
                            book:'《无限道武者路》',
                            id:'5',
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

### 最小和最大宽度
通过给数据 `columns` 设置字段 `minWidth` 可以给某一列的数据设置最小宽度

设置字段 `maxWidth` 可以给某一列的数据字段设置最大宽度。

<div class="example">
    <div class="example-box">
        <div>
           <b-table show-index border width=1000 :columns='columns12' :data='data11'></b-table>
        </div>
    </div>

::: code
```html
    <div>
       <b-table border width=1000 :columns='columns12' :data='data11'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns12: [
                        {
                           title: 'Name',
                           key: 'name',
                           width:100
                        },
                        {
                           title: 'Age',
                           key: 'age',
                           width:100
                        },
                        {
                           title: 'Pets',
                           key: 'pets',
                           minWidth:100
                        },
                        {
                           title: 'Like',
                           key: 'like',
                           maxWidth:100
                        },
                        {
                           title: 'ID',
                           key: 'id',
                        },
                        {
                           title: 'Book',
                           key: 'book'
                        }
                    ],
                    data11: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor',
                            like:'red',
                            id:'1',
                            book:'《贩罪》'
                        },
                        {
                            name: '青蛙',
                            sex: '男',
                            age: 22,
                            pets:'cat',
                            hobby:'Swimming',
                            id:'2',
                            book:'《霸皇纪》',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 18,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            id:'3',
                            book:'《龙族》',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 6,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            book:'《卡徒》',
                            id:'4',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 38,
                            sex: '男',
                            book:'《无限道武者路》',
                            id:'5',
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

### 加载蒙层
通过设置属性`loading`可以让表格处于加载中状态，在异步请求数据、分页时建议使用。

<div class="example">
    <div class="example-box">
        <div>
             <b-table :loading="loading" border width=1000 :columns='columns12' :data='data11'></b-table>
             <span>切换loading 效果</span><b-switch v-model="loading"></b-switch>
        </div>
    </div>

::: code
```html
    <div>
       <b-table :loading="loading" border width=1000 :columns='columns12' :data='data11'></b-table>
       <span>切换loading 效果</span><b-switch v-model="loading"></b-switch>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns12: [
                        {
                           title: 'Name',
                           key: 'name',
                           width:100
                        },
                        {
                           title: 'Age',
                           key: 'age',
                           width:100
                        },
                        {
                           title: 'Pets',
                           key: 'pets',
                           minWidth:100
                        },
                        {
                           title: 'Like',
                           key: 'like',
                           maxWidth:100
                        },
                        {
                           title: 'ID',
                           key: 'id',
                        },
                        {
                           title: 'Book',
                           key: 'book'
                        }
                    ],
                    data11: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor',
                            like:'red',
                            id:'1',
                            book:'《贩罪》'
                        },
                        {
                            name: '青蛙',
                            sex: '男',
                            age: 22,
                            pets:'cat',
                            hobby:'Swimming',
                            id:'2',
                            book:'《霸皇纪》',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 18,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            id:'3',
                            book:'《龙族》',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 6,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            book:'《卡徒》',
                            id:'4',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 38,
                            sex: '男',
                            book:'《无限道武者路》',
                            id:'5',
                            pets:'rhizomys',
                            hobby:'Thousand-hand Bodhisattva',
                            occupation:'President'
                        }
                    ],
                    loading:true
                }
            }
    </script>
```
:::
</div>

### 过滤
通过给数据 columns 里的 row  设置字段 filters 可以给列表设置过滤效果，具体见示例以及文档

<div class="example">
    <div class="example-box">
        <div>
             <b-table border width=1000 :columns='columns14' :data='data11'></b-table>
        </div>
    </div>

::: code
```html
    <div>
            <b-table border width=1000 :columns='columns14' :data='data11'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns14: [
                        {
                           title: '序号',
                           width:60,
                           align:'center',
                           type:'index'
                        },
                        {
                           title: 'Age',
                           key: 'age',
                           width:100,
                           filters: [
                               {
                                   label: 'Greater than 18',
                                   value: 1
                               },
                               {
                                   label: 'Less than 18',
                                   value: 2
                               }
                           ],
                           filterMethod (value, row) {
                               if (value === 1) {
                                   return row.age >= 18;
                               } else if (value === 2) {
                                   return row.age < 18;
                               }
                           }
                        },
                        {
                           title: 'Pets',
                           key: 'pets',
                           minWidth:100
                        },
                        {
                           title: 'Like',
                           key: 'like',
                           maxWidth:100
                        },
                        {
                           title: 'ID',
                           key: 'id',
                        },
                        {
                           title: 'Book',
                           key: 'book'
                        }
                    ],
                    data11: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor',
                            like:'red',
                            id:'1',
                            book:'《贩罪》'
                        },
                        {
                            name: '青蛙',
                            sex: '男',
                            age: 22,
                            pets:'cat',
                            hobby:'Swimming',
                            id:'2',
                            book:'《霸皇纪》',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 18,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            id:'3',
                            book:'《龙族》',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 6,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            book:'《卡徒》',
                            id:'4',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 38,
                            sex: '男',
                            book:'《无限道武者路》',
                            id:'5',
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

### 扩展
表格内容多不能完全展示时使用。<br/>
给 `columns` 数据设置设置 `type: 'expand'`，开启扩展功能。<br/>
给 `data` 的某项设置 `_disableExpand` 可以禁用当前行的展开功能。<br/>
渲染展开区域与自定义列模板方法类似，使用 render 函数，函数名为`expandRender`。

<div class="example">
    <div class="example-box">
        <div>
             <b-table height=200 width=1000 :columns='columns15' :data='data12'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table height=200 width=1000 :columns='columns15' :data='data12'></b-table>
    </div>
    <style>
    .b-table {
        b-table-expand-cell {
          border-bottom: none;
          .expend-table {
            margin-bottom: 0px;
            border: none;
            td {
              background: $Background;
            }
          }
        }
    }
    </style>
    <script>
        export default {
            data () {
                return {
                    data12: [
                        {
                            name: '欧阳',
                            age: 12,
                            pets:'dog',
                            occupation:'red',
                            book:'《贩罪》',
                            children:[
                                {
                                    name: '佐罗',
                                    age: 15,
                                    pets:'pig',
                                    occupation:'yellow',
                                    book:'《惊悚乐园》'
                                },
                                {
                                    name: '轩辕',
                                    age: 12,
                                    pets:'drag',
                                    occupation:'red',
                                    book:'《龙族》'
                                }
                            ]
                        },
                        {
                            name: '青蛙',
                            sex: '男',
                            age: 22,
                            pets:'cat',
                            book:'《霸皇纪》',
                            _disableExpand:true,
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 18,
                            sex: '男',
                            pets:'rhizomys',
                            _disableExpand:true,
                            book:'《龙族》',
                            _disableExpand:true,
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 6,
                            pets:'cat',
                            book:'《卡徒》',
                            _disableExpand:true,
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 38,
                            book:'《无限道武者路》',
                            pets:'rhizomys',
                            _disableExpand:true,
                            occupation:'President'
                        }
                    ],
                    columns15: [
                        {
                            type: 'expand',
                            width: 40,
                            center:'align',
                            expandRender: (h, params) => {
                                return h('render-table', {
                                    props: {
                                        data: params.row.children,
                                        columns: this.columns16
                                    }
                                })
                            }
                        },
                        {
                           title: 'Name',
                           key: 'name',
                           width:100
                        },
                        {
                           title: 'Age',
                           key: 'age',
                           width:100,
                           sortable:true
                        },
                        {
                           title: 'Pets',
                           key: 'pets',
                           minWidth:100
                        },
                        {
                           title: 'Occupation',
                           key: 'occupation',
                           maxWidth:100
                        },
                        {
                           title: 'Book',
                           key: 'book',
                           width:100
                        }
                    ],
                    columns16:[
                        {
                          width: 40
                        },
                        {
                         title: 'Name',
                         key: 'name',
                         width:100
                        },
                        {
                         title: 'Age',
                         key: 'age',
                         width:100,
                         sortable:true
                        },
                        {
                         title: 'Pets',
                         key: 'pets',
                         minWidth:100
                        },
                        {
                         title: 'Occupation',
                         key: 'occupation',
                         maxWidth:100
                        },
                        {
                         title: 'Book',
                         key: 'book',
                         width:100
                        }
                    ]
                }
            }
    </script>

    // render-tabele
    <b-table
        class="expend-table"
        :border="border"
        :columns='columns'
        disHover
        :stripe='stripe'
        :show-header="showHeader"
        :data='data'>
    </b-table>

    export default {
        name: 'render-table',
        data () {
            return {
                showHeader: false
            }
        },
        props: {
            columns: {
                type: Array,
                default () {
                    return []
                }
            },
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            border: {
                type: Boolean,
                default: false
            },
            stripe: {
                type: Boolean,
                default: false
            }
        }
    }

```
:::
</div>

### 多级表头
column 设置 children，可以渲染出多级表头<br/>
注意：不支持在多级表头里面嵌套 fixed 固定列

<div class="example">
    <div class="example-box">
        <div>
             <b-table border width=1000 :columns='columns17' :data='data11'></b-table>
        </div>
    </div>

::: code
```html
    <div>
         <b-table height=200 width=1000 :columns='columns17' :data='data11'></b-table>
    </div>
    <script>
        export default {
            data () {
                return {
                    columns17:[
                        {
                             title: 'Age',
                             key: 'age',
                             width:100,
                             fixed: 'left',
                             sortable:true,
                             filters: [
                                {
                                    label: 'Greater than 18',
                                    value: 1
                                },
                                {
                                    label: 'Less than 18',
                                    value: 2
                                }
                            ],
                            filterMethod (value, row) {
                                if (value === 1) {
                                    return row.age >= 18;
                                } else if (value === 2) {
                                    return row.age < 18;
                                }
                            }
                        },
                        {
                             title: '测试',
                             align:'center',
                             children:[
                                {
                                  title: 'Name',
                                  key: 'name',
                                  width:200,
                                  sortable:true
                                },
                                {
                                  title: 'Sex',
                                  key: 'sex',
                                  width:200,
                                  sortable:true
                                },
                                {
                                    title: '合计',
                                    children:[
                                      {
                                        title: 'Hobby',
                                        key: 'hobby',
                                        width:100,
                                        sortable:true
                                      },
                                      {
                                        title: 'id',
                                        key: 'id',
                                        width:100
                                      }
                                    ]
                                }
                             ]
                        },
                        {
                         title: 'Pets',
                         key: 'pets',
                         width:100
                        },
                        {
                         title: 'Occupation',
                         key: 'occupation',
                         width:100
                        },
                        {
                         title: 'Book',
                         key: 'book',
                         width:200
                        }
                    ],
                    data11: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby:'Swimming',
                            pets:'dog',
                            occupation:'Doctor',
                            like:'red',
                            id:'1',
                            book:'《贩罪》'
                        },
                        {
                            name: '青蛙',
                            sex: '男',
                            age: 22,
                            pets:'cat',
                            hobby:'Swimming',
                            id:'2',
                            book:'《霸皇纪》',
                            occupation:'Doctor'
                        },
                        {
                            name: '警长',
                            age: 18,
                            sex: '男',
                            pets:'rhizomys',
                            hobby:'Swimming',
                            id:'3',
                            book:'《龙族》',
                            occupation:'Doctor'
                        },
                        {
                            name: '球形闪电',
                            age: 6,
                            sex: '男',
                            pets:'cat',
                            hobby:'Swimming',
                            book:'《卡徒》',
                            id:'4',
                            occupation:'Bodyguard'
                        },
                        {
                            name: '会长',
                            age: 38,
                            sex: '男',
                            book:'《无限道武者路》',
                            id:'5',
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
                        key: 'sex'
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
                        title: 'Pets',
                        key: 'pets',
                        width:200,
                        fixed:'right'
                    },
                    {
                        title: 'hobby',
                        key: 'hobby',
                        width:200
                    },
                    {
                        title: 'occupation',
                        key: 'occupation',
                        width:400
                    }
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
                        width:35,
                        align:'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        width:200,
                        render: (h, params) => {
                            return h('div', [
                                h('b-input', {
                                    on: {
                                        'on-change': (data) => {
                                            this.edit(data,params.index)
                                        }
                                    },
                                    value:params
                                })
                            ])
                        }
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
                        _rowspan:{
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
                        _colspan:{
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
                ],
                columns10: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:100,
                        fixed:'left'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:100
                    },
                    {
                        title: 'Sex',
                        key: 'sex',
                        width:150
                    },
                    {
                        title: 'Hobby',
                        key: 'hobby',
                        width:100
                    },
                    {
                        title: 'Pets',
                        key: 'pets',
                        width:200
                    },
                    {
                        title: 'Like',
                        key: 'like',
                        width:200
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        width:200,
                        fixed:'right'
                    },
                    {
                        title: 'Book',
                        key: 'book',
                        width:200,
                        fixed:'right'
                    }
                ],
                data10: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        occupation:'Doctor',
                        like:'red',
                        id:'1',
                        book:'《贩罪》'
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        like:'green',
                        hobby:'Swimming',
                        id:'2',
                        book:'《霸皇纪》',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        like:'orange',
                        id:'3',
                        book:'《龙族》',
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        like:'pink',
                        book:'《卡徒》',
                        id:'4',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        sex: '男',
                        book:'《无限道武者路》',
                        id:'5',
                        like:'blue',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ],
                columns11: [
                    {
                        title: 'Name',
                        key: 'name',
                        width:100
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width:100
                    },
                    {
                        title: 'Pets',
                        key: 'pets',
                        width:200
                    },
                    {
                        title: 'Like',
                        key: 'like',
                        width:200
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        width:200
                    },
                    {
                        title: 'Book',
                        key: 'book',
                        width:200
                    }
                ],
                data11: [
                    {
                        name: '欧阳',
                        age: 12,
                        sex: '男',
                        hobby:'Swimming',
                        pets:'dog',
                        occupation:'Doctor',
                        like:'red',
                        id:'1',
                        book:'《贩罪》'
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        hobby:'Swimming',
                        id:'2',
                        book:'《霸皇纪》',
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        hobby:'Swimming',
                        id:'3',
                        book:'《龙族》',
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        sex: '男',
                        pets:'cat',
                        hobby:'Swimming',
                        book:'《卡徒》',
                        id:'4',
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        sex: '男',
                        book:'《无限道武者路》',
                        id:'5',
                        pets:'rhizomys',
                        hobby:'Thousand-hand Bodhisattva',
                        occupation:'President'
                    }
                ],
                columns12: [
                    {
                       title: 'Name',
                       key: 'name',
                       width:100
                    },
                    {
                       title: 'Age',
                       key: 'age',
                       width:100
                    },
                    {
                       title: 'Pets',
                       key: 'pets',
                       minWidth:100
                    },
                    {
                       title: 'Like',
                       key: 'like',
                       maxWidth:100
                    },
                    {
                       title: 'ID',
                       key: 'id',
                    },
                    {
                       title: 'Book',
                       key: 'book'
                    }
                ],
                columns13: [
                    {
                       title: '序号',
                       width:60,
                       align:'center',
                       type:'index'
                    },
                    {
                       title: 'Age',
                       key: 'age',
                       width:100
                    },
                    {
                       title: 'Pets',
                       key: 'pets',
                       minWidth:100
                    },
                    {
                       title: 'Like',
                       key: 'like',
                       maxWidth:100
                    },
                    {
                       title: 'ID',
                       key: 'id',
                    },
                    {
                       title: 'Book',
                       key: 'book'
                    }
                ],
                columns14: [
                    {
                       title: '序号',
                       width:60,
                       align:'center',
                       type:'index'
                    },
                    {
                       title: 'Age',
                       key: 'age',
                       width:100,
                       sortable:true,
                       filters: [
                           {
                               label: 'Greater than 18',
                               value: 1
                           },
                           {
                               label: 'Less than 18',
                               value: 2
                           }
                       ],
                       filterMethod (value, row) {
                           if (value === 1) {
                               return row.age >= 18;
                           } else if (value === 2) {
                               return row.age < 18;
                           }
                       }
                    },
                    {
                       title: 'Pets',
                       key: 'pets',
                       minWidth:100
                    },
                    {
                       title: 'Like',
                       key: 'like',
                       maxWidth:100
                    },
                    {
                       title: 'ID',
                       key: 'id',
                    },
                    {
                       title: 'Book',
                       key: 'book'
                    }
                ],
                data12: [
                    {
                        name: '欧阳',
                        age: 12,
                        pets:'dog',
                        occupation:'red',
                        book:'《贩罪》',
                        children:[
                            {
                                name: '佐罗',
                                age: 15,
                                pets:'pig',
                                occupation:'yellow',
                                book:'《惊悚乐园》'
                            },
                            {
                                name: '轩辕',
                                age: 12,
                                pets:'drag',
                                occupation:'red',
                                book:'《龙族》'
                            }
                        ]
                    },
                    {
                        name: '青蛙',
                        sex: '男',
                        age: 22,
                        pets:'cat',
                        book:'《霸皇纪》',
                        _disableExpand:true,
                        occupation:'Doctor'
                    },
                    {
                        name: '警长',
                        age: 18,
                        sex: '男',
                        pets:'rhizomys',
                        _disableExpand:true,
                        book:'《龙族》',
                        _disableExpand:true,
                        occupation:'Doctor'
                    },
                    {
                        name: '球形闪电',
                        age: 6,
                        pets:'cat',
                        book:'《卡徒》',
                        _disableExpand:true,
                        occupation:'Bodyguard'
                    },
                    {
                        name: '会长',
                        age: 38,
                        book:'《无限道武者路》',
                        pets:'rhizomys',
                        _disableExpand:true,
                        occupation:'President'
                    }
                ],
                columns15: [
                    {
                        type: 'expand',
                        width: 40,
                        center:'align',
                        expandRender: (h, params) => {
                           return h('render-table', {
                               props: {
                                   data: params.row.children,
                                   columns: this.columns16
                               }
                           })
                        }
                    },
                    {
                       title: 'Name',
                       key: 'name',
                       width:100
                    },
                    {
                       title: 'Age',
                       key: 'age',
                       width:100,
                       sortable:true
                    },
                    {
                       title: 'Pets',
                       key: 'pets',
                       minWidth:100
                    },
                    {
                       title: 'Occupation',
                       key: 'occupation',
                       maxWidth:100
                    },
                    {
                       title: 'Book',
                       key: 'book',
                       width:100
                    }
                ],
                columns16:[
                    {
                      width: 40
                    },
                    {
                     title: 'Name',
                     key: 'name',
                     width:100
                    },
                    {
                     title: 'Age',
                     key: 'age',
                     width:100,
                     sortable:true
                    },
                    {
                     title: 'Pets',
                     key: 'pets',
                     minWidth:100
                    },
                    {
                     title: 'Occupation',
                     key: 'occupation',
                     maxWidth:100
                    },
                    {
                     title: 'Book',
                     key: 'book',
                     width:100
                    }
                ],
                columns17:[
                    {
                         title: 'Age',
                         key: 'age',
                         width:100,
                         fixed: 'left',
                         sortable:true,
                         filters: [
                            {
                                label: 'Greater than 18',
                                value: 1
                            },
                            {
                                label: 'Less than 18',
                                value: 2
                            }
                        ],
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age >= 18;
                            } else if (value === 2) {
                                return row.age < 18;
                            }
                        }
                    },
                    {
                         title: '测试',
                         align:'center',
                         children:[
                            {
                              title: 'Name',
                              key: 'name',
                              width:200,
                              sortable:true
                            },
                            {
                              title: 'Sex',
                              key: 'sex',
                              width:200,
                              sortable:true
                            },
                            {
                                title: '合计',
                                children:[
                                  {
                                    title: 'Hobby',
                                    key: 'hobby',
                                    width:100,
                                    sortable:true
                                  },
                                  {
                                    title: 'id',
                                    key: 'id',
                                    width:100
                                  }
                                ]
                            }
                         ]
                    },
                    {
                     title: 'Pets',
                     key: 'pets',
                     width:100
                    },
                    {
                     title: 'Occupation',
                     key: 'occupation',
                     width:100
                    },
                    {
                     title: 'Book',
                     key: 'book',
                     width:200
                    }
                ],
                loading:true
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
            },
            edit (data,index) {
                this.data5[index].age = new Date()
            },
            sortChange(options){
                console.log(options.column,'column')
                console.log(options.key,'key')
                console.log(options.order,'order')
            }
        }
    }
</script>

### props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| data     |  显示的结构化数据，特殊配置项具体项见下文  | Array  |    [ ]   |
| columns     |  表格列的配置描述，具体项见下文  | Array  |   [ ]   |
| border     |  是否显示单元格边框  |  Boolean  |    false   |
| stripe     |  是否显示间隔斑马纹  |  Boolean  |    false   |
| resizeable     |  是否开启拖拽列宽  |  Boolean  |   false   |
| draggable     |  是否开启拖拽排序  |  Boolean  |    false   |
| dynamicable     |  是否开启显示隐藏列  |  Boolean  |  false   |
| dynamicallocation     |  是否开启显示隐藏列【弹层模式】，dynamicable显示隐藏列和此模式二者只能开启一种  |  Boolean  |   false   |
| show-index     |  是否开启表格序号  |  Boolean  |  false   |
| index-info     |  表格序号的配置项 |   Object  |   `page`:当前页【1】<br> `size`:页大小【10】<br>`width`: 序号列宽【50】<br>`align`:排列方式 【center】<br>`fixed`:固定列情况 【】<br>`title`:表头 【序号】<br> |
| width     |  表格宽度	  |  Number / String  |   auto   |
| height     |  表格高度，设置后，如果表格内容大于此值，会固定表头	  |  Number / String  |  -    |    auto   |
| loading     |  	表格是否加载中	  |  Boolean  |    false   |
| highlight-row     |  	是否支持高亮选中的行，即单选	  |  Boolean  |    false   |
| no-data-text     |  	数据为空时显示的提示内容	  |  Number / String  |    暂无数据   |
| loading-text     |  	加载数据时显示的文本	  |  Number / String  |    -   |
| disHover     |  	关闭 hover 模式	  |  Boolean  |     false   |
| show-header     |  	 是否显示表头	  |  Boolean  |      true   |

### columns
| 属性      | 说明    | 类型      | 可选值       | 默认值       |
| ---------- | -------- | ----------- | ------------- | -------- |
| type     |  列类型，可选值为   |  String  | `selection`、`html`、`index`、`expand`   | html    |
| title     |  列头显示文字  |  String  |  -    | '...'    |
| key     |  对应列内容的字段名  |  String  |  -    | -    |
| width     |  列宽	  |  Number  |  -    | -    |
| minWidth     |  最小列宽	  |  Number  |  -    | -    |
| maxWidth     |  最小列宽	  |  Number  |  -    | -    |
| align     |  对齐方式	  |  String  |  `left`、`right`、`center`    | -    |
| className     |  列的样式名称		  |  String  |  -    | -    |
| fixed     |  列是否固定在左侧或者右侧	  |  String  |  `left`、`right`   | -    |
| render     |  自定义渲染列，使用 Vue 的 Render 函数。详见示例	  |  Function  | -  | -    |
| sortable     |  对应列是否可以排序	  |  Boolean  | -  | false   |
| sortMethod     |  自定义排序使用的方法，当设置 sortable: true 时有效。详见示例	  |  Boolean  | -  | -   |
| sortType     |  设置初始化排序	  |  Boolean  | `asc`、`desc`  | -   |
| filters     |  过滤数据的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配置 filterMethod	  |  Array  |-  | -   |
| filterMethod     |  数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示		  |  Function  | -  | -   |
| filterMultiple     |  数据过滤的选项是否多选  |  Boolean  | -  | false   |
| children     |  多级表头配置项，具体见示例  |   Array  | -  | -   |

### data
| 属性      | 说明    | 类型      | 可选值       | 默认值       |
| ---------- | -------- | ----------- | ------------- | -------- |
| _checked     |  设定当前行默认选中状态  |  Boolean  | - | false |
| _disabled     |  设定当前行默认禁止状态  |  Boolean  |  -    | false    |
| _className     |  给某一行指定一个样式名称,详见特定样式  |  String  |  -    | -    |
| _cellClass     |  给任意一个单元格指定样式,详见特定样式	  |  Object  |  -    | -    |
| _colspan     |  某一行的合并单元格,详见合并行、列	  |  Object  |  -    | -    |
| _rowspan     |  某一列的合并单元格,详见合并行、列  |  Object  |  -    | -    |
| _disableExpand     |   某一行禁用扩展功能  |   Boolean  |  -    | false    |

### events
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| on-select     |  当选中节点时触发   |  `selection`: 已经选中的数据<br>`row`: 当前选中的数据  |
| on-select-cancel     |  当取消选中节点时触发   |  `selection`: 已经选中的数据<br>`row`: 当前取消选中的数据  |
| on-selection-change     |  当选中状态改变时触发   |  `selection`: 已经选中的数据  |
| on-selection-all     |  当全选数据时触发   |  `selection`: 已经选中的数据  |
| on-selection-all-cancel     |  当全部取消数据时触发   |  -  |
| on-row-click     |  当选中节点时触发   |  `row`: 当前选中的数据  |
| on-row-dbclick     |  当选中节点时触发   |  `row`: 当前选中的数据  |
| on-sort-change     |  当选中节点时触发   |  `column`: 当前列数据 <br> `key`: 排序依据的指标 <br> `order`: 排序的顺序，值为 asc 或 desc|
| on-filter-change	    |  筛选条件发生变化时触发	   |  当前列数据 |
| on-expand-change	    |  扩展状态改变时触发	   |  `row`: 当前扩展的数据<br> `status`: 展开状态 |