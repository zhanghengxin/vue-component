# Message 消息
常用的 Message 消息组件
-----

### 基础用法
使用```message``` 属性来定义 Message 的显示内容

<div class="example">
    <div class="example-box">
        <div>
            <b-button
                @on-click="handleClick">
                信息
            </b-button>
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
                        this.$Message({
                            message: this.message,
                            type
                        })
                    },
                    handleClickShowClose() {
                        this.$Message({
                            message: this.message,
                            showClose: true
                        })
                    },
                    handleClickDruation() {
                        this.$Message({
                            message: this.message,
                            duration: 5
                        })
                    },
                    handleClickRender() {
                        this.$Message({
                            render: h => {
                                return h('span', [
                                    'This is created by ',
                                    h('a', 'render'),
                                    ' function'
                                ])
                            }
                        })
                    }
                }
            }
        </script>
    </div>

::: code 
```html
    <div>
        <b-button
            @on-click="handleClick">
            信息
        </b-button>
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
                    this.$Message({
                        message: this.message,
                    })
                }
            }
        }
    </script>
```
:::
</div>

### 不同状态
使用```type``` 属性来定义 Message 的不同状态

<div class="example">
    <div class="example-box">
        <div >
            <b-button
                @on-click="handleClick('info')">
                信息
            </b-button>
            <b-button
                type='success'
                @on-click="handleClick('success')">
                成功
            </b-button>
            <b-button
                type='error'
                @on-click="handleClick('error')">
                错误
            </b-button>
            <b-button
                type='warning'
                @on-click="handleClick('warning')">
                警告
            </b-button>
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
                        this.$Message({
                            message: this.message,
                            type,
                        })
                    }
                }
            }
        </script>
    </div>

::: code
```html
    <div>
        <b-button
            @on-click="handleClick('info')">
            信息
        </b-button>
        <b-button
            @on-click="handleClick('success')">
            成功
        </b-button>
        <b-button
            @on-click="handleClick('error')">
            错误
        </b-button>
        <b-button
            @on-click="handleClick('warning')">
            警告
        </b-button>
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
                    this.$Message({
                        message: this.message,
                        type,
                    })
                }
            }
        }
    </script>
```
:::
</div>

### 自定义显示时长
使用```duration``` 属性来定义 Message 的显示时长

<div class="example">
    <div class="example-box">
        <div >
            <b-button
                @on-click="handleClickDruation">
                信息
            </b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button
            type='white'
            @on-click="handleClick">
            信息
        </b-button>
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
                    this.$Message({
                        message: this.message,
                        duration: 5
                    })
                }
            }
        }
    </script>
```
:::
</div>

### 可关闭
使用```showClose``` 属性来显示 Message 的关闭按钮

<div class="example">
    <div class="example-box">
        <div>
            <b-button
                @on-click="handleClickShowClose">
                信息
            </b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button
            @on-click="handleClick">
            信息
        </b-button>
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
                    this.$Message({
                        message: this.message,
                        showClose: true
                    })
                }
            }
        }
    </script>
```
:::
</div>

### 自定义 Render 函数

<div class="example">
    <div class="example-box">
        <div>
            <b-button
                @on-click="handleClickRender">
                信息
            </b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button
            @on-click="handleClick">
            信息
        </b-button>
    </div>
    <script>
        export default {
            methods: {
                handleClick() {
                    this.$Message({
                        render: h => {
                            return h('span', [
                                'This is created by ',
                                h('a', 'render'),
                                ' function'
                            ])
                        }
                    })
                }
            }
        }
    </script>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| message     | 显示内容   | string  |        |       |
| type     | 类型   | string    |   `info`、`success`、`warning`、`error`、`null` |    |
| duration     | 显示时长   | number    |    |  3000  |
| showClose     | 显示关闭按钮  | boolean    |   `true`、`false` |  false  |
