# Split 面板分割

### 基本用法

<div class='example'>
    <div class='example-box demo-split'>
        <b-split v-model="split1" min='100px'>
            <div slot="left" class="demo-split-pane">
                左面
            </div>
            <div slot="right" class="demo-split-pane">
                右面
            </div>
        </b-split>
    </div>

::: code
```html
    <div class='example-box demo-split'>
        <b-split v-model="split1">
            <div slot="left" class="demo-split-pane">
                左面
            </div>
            <div slot="right" class="demo-split-pane">
                右面
            </div>
        </b-split>
    </div>
    <script>
        export default {
            data () {
                return {
                    split1: 0.5
                }
            },
        }
    </script>
    <style>
        .demo-split{
            height: 200px;
            border: 1px solid #dcdee2;
        }
        .demo-split-pane{
            padding: 10px;
        }
    </style>
```
:::
</div>

### 上下分割

<div class='example'>
    <div class='example-box demo-split'>
        <b-split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">
                上面
            </div>
            <div slot="bottom" class="demo-split-pane">
                下面
            </div>
        </b-split>
    </div>

::: code
```html
    <div class='example-box demo-split'>
        <b-split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">
                上面
            </div>
            <div slot="bottom" class="demo-split-pane">
                下面
            </div>
        </b-split>
    </div>
    <script>
        export default {
            data () {
                return {
                    split2: 0.5
                }
            },
        }
    </script>
    <style>
        .demo-split{
            height: 200px;
            border: 1px solid #dcdee2;
        }
        .demo-split-pane{
            padding: 10px;
        }
    </style>
```
:::
</div>

### 嵌套使用

<div class='example'>
    <div class='example-box demo-split'>
        <b-split v-model="split3">
            <div slot="left" class="demo-split-pane no-padding">
                <b-split v-model="split4" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        上面    
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        下面
                    </div>
                </b-split>
            </div>
            <div slot="right" class="demo-split-pane">
                右面
            </div>
        </b-split>
    </div>

::: code
```html
    <div class='example-box demo-split'>
        <b-split v-model="split3">
            <div slot="left" class="demo-split-pane no-padding">
                <b-split v-model="split4" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        上面
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        下面
                    </div>
                </b-split>
            </div>
            <div slot="right" class="demo-split-pane">
                右面
            </div>
        </b-split>
    </div>
    <script>
        export default {
            data () {
                return {
                    split2: 0.5
                }
            },
        }
    </script>
    <style>
        .demo-split{
            height: 200px;
            border: 1px solid #dcdee2;
        }
        .demo-split-pane{
            padding: 10px;
        }
    </style>
```
:::
</div>

<script>
    export default {
        data () {
            return {
                date: '',
                split1: 0.2,
                split2: 0.5,
                split3: 0.5,
                split4: 0.5
            }
        },
    }
</script>
<style>
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
        overflow: hidden;
    }
    .demo-split-pane{
        padding: 10px;
        overflow: hidden;
    }
    .demo-split-pane.no-padding{
        height: 200px;
        padding: 0;
        overflow: hidden;
    }
</style>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| value     | 面板位置，可以是 0~1 代表百分比，或具体数值的像素，可用 v-model 双向绑定 | Number | String  |        |   0.5    |
| mode     | 类型 | String |  `horizontal` `vertical` |  horizontal |
| min     | 最小阈值   | Number/String    |  |  40px  |
| max     | 最大阈值  | Number/String    |   |  40px  |

### events
| 事件名      | 说明    |  返回值  |
|---------- |-------- |---------- |------------- |-------- |
| on-move-start | 拖拽开始 | - |
| on-moving | 拖拽中 | event |
| on-move-end | 拖拽结束  | - |

### slot

| 名称      | 说明    | 
|---------- |-------- |
| left | mode 为 horizontal 时可用，左边面板 |
| right | mode 为 horizontal 时可用，右边面板 |
| top | mode 为 vertical 时可用，上边面板 |
| bottom | mode 为 vertical 时可用，下边面板 |
| trigger | 自定义分割拖拽节点 |