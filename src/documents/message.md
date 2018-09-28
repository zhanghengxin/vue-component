# Message 消息
常用的 Message 消息组件
-----

### 基础用法
使用```message``` 属性来定义 Message 的显示内容

<div style='margin-bottom: 10px;'>
    <bw-button
        type='white'
        @on-click="handleClick">
        信息
    </bw-button>
</div>
<script>
    export default {
        data() {
            return {
                message: '你好，我是 Message 组件'
            }
        },
        methods: {
            handleClick(type) {
                this.$message({
                    message: this.message,
                    type,
                    duration: 1500
                })
            },
            handleClickShowClose() {
                this.$message({
                    message: this.message,
                    showClose: true
                })
            },
            handleClickDruation() {
                this.$message({
                    message: this.message,
                    duration: 5000
                })
            }
        }
    }
</script>

::: code 
```html
    <div>
        <bw-button
            type='white'
            @on-click="handleClick">
            信息
        </bw-button>
    </div>
    <script>
        export default {
            data() {
                return {
                    message: '你好，我是 Message 组件'
                }
            },
            methods: {
                handleClick() {
                    this.$message({
                        message: this.message,
                    })
                }
            }
        }
    </script>
```
:::

### 不同状态
使用```type``` 属性来定义 Message 的不同状态

<div style='margin-bottom: 10px;'>
    <bw-button
        type='white'
        @on-click="handleClick('info')">
        信息
    </bw-button>
    <bw-button
        type='white'
        @on-click="handleClick('success')">
        成功
    </bw-button>
    <bw-button
        type='white'
        @on-click="handleClick('error')">
        错误
    </bw-button>
    <bw-button
        type='white'
        @on-click="handleClick('warning')">
        警告
    </bw-button>
</div>
<script>
    export default {
        data() {
            return {
                message: '你好，我是 Message 组件'
            }
        },
        methods: {
            handleClick(type) {
                this.$message({
                    message: this.message,
                    type,
                })
            }
        }
    }
</script>

::: code
```html
    <div>
        <bw-button
            type='white'
            @on-click="handleClick('info')">
            信息
        </bw-button>
        <bw-button
            type='white'
            @on-click="handleClick('success')">
            成功
        </bw-button>
        <bw-button
            type='white'
            @on-click="handleClick('error')">
            错误
        </bw-button>
        <bw-button
            type='white'
            @on-click="handleClick('warning')">
            警告
        </bw-button>
    </div>
    <script>
        export default {
            data() {
                return {
                    message: '你好，我是 message 组件'
                }
            },
            methods: {
                handleClick(type) {
                    this.$message({
                        message: this.message,
                        type,
                    })
                }
            }
        }
    </script>
```
:::


### 自定义显示时长
使用```duration``` 属性来定义 Message 的显示时长

<div style='margin-bottom: 10px;'>
    <bw-button
        type='white'
        @on-click="handleClickDruation">
        信息
    </bw-button>
</div>

::: code
```html
    <div>
        <bw-button
            type='white'
            @on-click="handleClick">
            信息
        </bw-button>
    </div>
    <script>
        export default {
            data() {
                return {
                    message: '你好，我是 Message 组件'
                }
            },
            methods: {
                handleClick() {
                    this.$message({
                        message: this.message,
                        duration: 5000
                    })
                }
            }
        }
    </script>
```
:::

### 可关闭
使用```showClose``` 属性来显示 Message 的关闭按钮

<div style='margin-bottom: 10px'>
    <bw-button
        type='white'
        @on-click="handleClickShowClose">
        信息
    </bw-button>
</div>

::: code
```html
    <div>
        <bw-button
            type='white'
            @on-click="handleClick">
            信息
        </bw-button>
    </div>
    <script>
        export default {
            data() {
                return {
                    message: '你好，我是 Message 组件'
                }
            },
            methods: {
                handleClick() {
                    this.$message({
                        message: this.message,
                        showClose: true
                    })
                }
            }
        }
    </script>
```
:::

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| message     | 显示内容   | string  |        |       |
| type     | 类型   | string    |   `info`、`success`、`warning`、`error`、`null` |    |
| duration     | 显示时长   | number    |    |  3000  |
| showClose     | 显示关闭按钮  | boolean    |   `true`、`false` |  false  |
