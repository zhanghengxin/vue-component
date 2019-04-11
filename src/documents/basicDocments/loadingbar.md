# LoadingBar 加载进度条

### 基本用法

<div class='example'>
    <div class="example-box">
        <b-button @on-click="start">Start</b-button>
        <b-button @on-click="finish">Finish</b-button>
        <b-button @on-click="error">Error</b-button>
    </div>
    <script>
        export default {
            methods: {
                start () {
                    this.$LoadingBar.start();
                },
                finish () {
                    this.$LoadingBar.finish();
                },
                error () {
                    this.$LoadingBar.error();
                }
            }
        }
    </script>

::: code
```html
    <div class='example-box'>
        <template>
            <b-button @click="start">Start</b-button>
            <b-button @click="finish">Finish</b-button>
            <b-button @click="error">Error</b-button>
        </template>
        <script>
            export default {
                methods: {
                    start () {
                        this.$LoadingBar.start();
                    },
                    finish () {
                        this.$LoadingBar.finish();
                    },
                    error () {
                        this.$LoadingBar.error();
                    }
                }
            }
        </script>
    </div>
```
:::
</div>

<script>
    export default {
        methods: {
            start () {
                this.$LoadingBar.start();
            },
            finish () {
                this.$LoadingBar.finish();
            },
            error () {
                this.$LoadingBar.error();
            }
        }
    }
</script>

### API

通过直接调用以下方法来使用组件：

```js
this.$LoadingBar.start()
this.$LoadingBar.finish()
this.$LoadingBar.error()
this.$LoadingBar.update(percent)
this.$LoadingBar.destroy()
this.$LoadingBar.config({
    color: '#ccc',
    failedColor: '#666',
    height: 10
})
```

### Function

| 函数名      | 说明    | 参数      |
|---------- |-------- |---------- |
| start     | 开始从 0 显示进度条，并自动加载进度   |    |
| finish     | 结束进度条，自动补全剩余进度   |   |
| error     | 以错误的类型结束进度条，自动补全剩余进度   |  |
| update     | 精确加载到指定的进度  | percent,  指定的进度百分比 |

### config 

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| color     | 进度条的颜色   | String  |        |   #0079CC    |
| failedColor     | 失败时的进度条颜色   | String    |  |  #f44336  |
| height     | 进度条高度，单位 px   | Number    |    |  2  |