# Switch 开关
常见的开关组件
### 概述
在两种状态间切换时用到的开关选择器。 

#### 代码演示

<div>
    <b-lswitch @on-change="change"/>
</div>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            change(type) {
                console.log(type)
            }
        }
    }
</script>

::: code
```html
<div>
    <b-lswitch @on-change="change"/>
</div>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            change(type) {
                console.log(type)
            }
        }
    }
</script>

:::
### 方法


| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| change     | 获取状态   | Boolean  |        |       |
