# Tree 树形控件
用清晰的层级结构展示信息，可展开或折叠。
- 当数据过多时，配合 table 组件批量显示数据。
- 支持默认选中不选中，默认禁用启用，默认展开收起
- 支持节点数据异步加载
- 支持节点级联勾选或只能单个勾选
- 支持全选、反选
- 支持树节点自定义渲染
- 支持节点搜索，只匹配节点或者只匹配父节点
- 支持手风琴效果，一个节点展开，同级其他节点收起
- 支持节点拖拽进行树节点编辑


### 基础用法

<div class="example">
    <div class="example-box">
        <div>
           <b-tree :data='data1' @on-select-change='handleselect'></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data1' @on-select-change='handleselect'></b-tree>
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

### 手风琴效果

<div class="example">
    <div class="example-box">
        <div>
           <b-tree :data='data2' accordion></b-tree>
        </div>
    </div>

::: code
```html
    <div>
        <b-tree :data='data2' accordion></b-tree>
    </div>
    <script>
        export default {
            data () {
                return {
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
                   ]
               }
            ]
        }
    },
    methods: {
        handleselect (data){
            console.log(`当前选中的数据为:`,data)
        },
        handleRender () {
            this.$Modal.confirm({
                render: (h) => {
                    return h('b-input', {
                        props: {
                            value: this.name,
                            autofocus: true,
                            placeholder: '请输入你的名字'
                        },
                        on: {
                            input: (val) => {
                                this.name = val
                            }
                        }
                    })
                }
            })
        }
    }
}
</script>