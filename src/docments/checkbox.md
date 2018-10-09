# Checkbox 多选框
多选框
-----
### 基础用法
单独使用可以表示两种状态之间的切换

<div>
    <Checkbox v-model="test1">测试</Checkbox>
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
        <Checkbox v-model="test2">测试失效未选中</Checkbox>
        <Checkbox v-model="test3">测试失效选中</Checkbox>
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

### 组合用法
使用CheckboxGroup配合数组来生成组合。在组合使用时，Checkbox 使用 label 来自动判断选中状态。每个 Checkbox 的内容可以自定义，如不填写则默认使用 label 的值。

<div>
    <CheckboxGroup v-model="testgroup">
        <Checkbox label="测试1"></Checkbox>
        <Checkbox label="测试2"></Checkbox>
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

        }
    }
</script>


### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |  `normal`、`small`  、`big`       |    normal   |
| type     | 类型   | string    |   `tynormal` 、`typrimary`、`tysuccess`  、`tywarning` 、`tyerror`|     typrimary  |
| loading     | 是否圆角按钮   | boolean    |    |     false  |
| round     | 是否加载中状态   | boolean    |    |     false  |
| plain     | 是否朴素按钮   | boolean    |    |     false  |
| disabled     | 是否禁用状态   | 	boolean    |   `无`  |     false  |
| icon     | 图表类型   | 	string    |   `参考icon代码`  |       |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |
