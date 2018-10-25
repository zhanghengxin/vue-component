# Checkbox 多选框
多选框
-----
### 基础用法
单独使用可以表示两种状态之间的切换

<div>
    <Checkbox v-model="test1" @on-change="change">测试</Checkbox>
    <p>{{test1}}</p>

::: code
```html
    <template>
        <Checkbox v-model="test1">测试</Checkbox>
    </template>
    <script>
        export default {
            data () {
                return {
                    test1: false
                }
            }
        }
    </script>
```
:::
</div>

### 禁用状态
多选框不可用状态

<div>
    <Checkbox v-model="test2" disabled>测试失效未选中</Checkbox>
    <Checkbox v-model="test3" disabled>测试失效选中</Checkbox>
    
::: code
```html
    <template>
        <Checkbox v-model="test2" disabled>测试失效未选中</Checkbox>
        <Checkbox v-model="test3" disabled>测试失效选中</Checkbox>
    </template>
    <script>
        export default {
            data () {
                return {
                    test2:false,
                    test3:true
                }
            }
        }
    </script>
```
:::
</div>

### 组合用法
使用CheckboxGroup配合数组来生成组合。在组合使用时，Checkbox 使用 label 来自动判断选中状态。每个 Checkbox 的内容可以自定义，如不填写则默认使用 label 的值。

<div>
    <CheckboxGroup v-model="testgroup"  @on-change="changeGroup">
    <div>
        <Checkbox label="测试1"></Checkbox>
        <Checkbox label="测试2"></Checkbox>
        <Checkbox label="测试3">444</Checkbox>
        </div>
    </CheckboxGroup>
    <p>{{testgroup}}</p>
    
::: code
```html
    <template>
        <CheckboxGroup v-model="testgroup">
            <Checkbox label="测试1"></Checkbox>
            <Checkbox label="测试2"></Checkbox>
        </CheckboxGroup>
        <p>{{testgroup}}</p>
    </template>
    <script>
        export default {
            data () {
                return {
                    testgroup: ['测试1','测试2']
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
                test1:false,
                test2:false,
                test3:true,
                testgroup: ['测试1','测试2']
            }
        },
        methods: {
            change(data){
                console.log('change',data)
            },
            changeGroup(data){
                console.log('change',data)
            }
        }
    }
</script>


### checkbox props
| 参数      | 说明    | 类型       | 默认值   |
|---------- |-------- |---------- |-------- |
| value     | 只在单独使用时有效。可以使用 v-model 双向绑定数据   | Boolean    |    false   |
| label     | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中   | string    |   -  |
| disabled     | 是否禁用当前项   | boolean    |    |     false  |

### checkbox events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发 |	true/false  |


### checkboxGroup props
| 参数      | 说明    | 类型       | 默认值   |
|---------- |-------- |---------- |-------- |
| value     | 指定选中项目的集合，可以使用 v-model 双向绑定数据  | Array    |    []   |

### checkboxGroup events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发 |	[...]  |