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
                console.log(1234)
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