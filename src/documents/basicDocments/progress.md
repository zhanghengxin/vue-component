# Progress进度条
### 基础用法
使用```percentage``` 属性来定义Progress 的值

<div class="example">
    <div class="example-box">
        <div style="width:500px">
            <b-progress :percentage='30'></b-progress>
            <b-progress :percentage='100'></b-progress>
        </div>
    </div>

:::code
```html
    <div style="width:500px">
        <b-progress :percentage='30'></b-progress>
        <b-progress :percentage='70'></b-progress>
    </div>
```
:::
</div>


### 设置状态
Progress 组件可通过属性```status```设置成功和异常状态。
状态选项```success``` 、```wrong```

<div class="example">
    <div class="example-box">
        <div style="width:500px">
            <b-progress :percentage='50' status="wrong"></b-progress>
            <b-progress :percentage='30' status="success"></b-progress>
        </div>
    </div>

::: code
```html
    <div style="width:500px">
        <b-progress :percentage='50' status="wrong"></b-progress>
        <b-progress :percentage='30' status="success"></b-progress>
    </div>
```
:::
</div>

### 设置颜色
Progress 组件可通过 ```color``` 设置进度条颜色

<div class="example">
    <div class="example-box">
        <div style="width:500px;height:120px">
            <b-progress :percentage='30' color="#7171C6"></b-progress>
            <b-progress :percentage='50' color="#ff8f00"></b-progress>
            <b-progress :percentage='90' color="#CD6889"></b-progress>
        </div>
    </div>

::: code
```html
    <div style="width:500px;height:120px">
        <b-progress :percentage='30' color="#7171C6"></b-progress>
        <b-progress :percentage='50' color="#ff8f00"></b-progress>
        <b-progress :percentage='90' color="#CD6889"></b-progress>
    </div>
```
:::
</div>

### 设置是否显示标注
Progress 组件可通过 ```showText``` 设置是否显示文字

<div class="example">
    <div class="example-box">
        <div style="width:500px;">
            <b-progress :percentage='60' :showText='false'></b-progress>
        </div>
    </div>

::: code
```html
    <div style="width:500px;">
        <b-progress :percentage='60' :showText='false'></b-progress>
    </div>
```
:::
</div>

### 设置方向
Progress 组件可通过设置 ```vertical``` 设置进度条方向


<div class="example">
    <div class="example-box">
        <div style="height:200px;">
            <b-progress :percentage='30' :vertical="true"></b-progress>
            <b-progress :percentage='70' :vertical="true"></b-progress>
        </div>
    </div>

::: code
```html
    <div style="height:200px;">
        <b-progress :percentage='30' :vertical="true"></b-progress>
        <b-progress :percentage='70' :vertical="true"></b-progress>
    </div>
```
:::
</div>


### 设置宽度
Progress 组件可通过 ```strokeWidth``` 设置线条宽度

<div class="example">
    <div class="example-box">
        <div style="width:500px;">
            <b-progress :percentage='90' :strokeWidth='5'></b-progress>
        </div>
    </div>

::: code
```html
    <div style="width:500px;">
        <b-progress :percentage='90' :strokeWidth='5'></b-progress>
    </div>
```
:::
</div>

### 自定义标注

<div class="example">
    <div class="example-box">
        <div style="width:500px;">
            <b-progress :percentage='30' status="success">
                <b-icon type="queding" color="green"></b-icon>
            </b-progress>
        </div>
    </div>

::: code
```html
    <div style="width:500px;">
        <b-progress :percentage='30' status="success">
            <b-icon type="queding" color="green"></b-icon>
        </b-progress>
    </div>
```
:::
</div>

### Example

<div class="example">
    <div class="example-box">
        <div style="width:500px;">
            <b-progress :percentage='percent'></b-progress>
            <b-button size="small" @on-click='add'>增加</b-button>
            <b-button size="small" @on-click='reduce'>减小</b-button>
        </div>
        <script>
            export default {
                data () {
                    return {
                        percent: 30
                    }
                },
                methods: {
                    add () {
                        let result = this.percent + 3
                        if (result > 100) {
                            this.percent = 100
                        } else {
                            this.percent +=3
                        }
                    },
                    reduce () {
                        let result = this.percent - 3
                        if (result <0) {
                            this.percent = 0
                        } else {
                            this.percent -=3
                        }
                    }
                }
            }
        </script>
    </div>
    
::: code
```html
    <div style="width:500px;">
        <b-progress :percentage='percent'></b-progress>
        <b-button type="primary" size="small" @on-click='add'>增加</b-button>
        <b-button type="primary" size="small" @on-click='reduce'>减小</b-button>
    </div>
    <script>
        export default {
            data () {
                return {
                    percent: 30
                }
            },
            methods: {
                add () {
                    let result = this.percent + 3
                    if (result > 100) {
                        this.percent = 100
                    } else {
                        this.percent += 3
                    }
                },
                reduce () {
                    let result = this.percent - 3
                    if (result <=0) {
                        this.percent = 0
                    } else {
                        this.percent -= 3
                    }
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
| percentage     | 值 （必填）  | number  |         |    0   |
| status     | 状态   | string    |   `success` 、`wrong`、`active`|     无  |
| color     | 颜色   | string    |    |     #0079CC  |
| vertical     | 是否纵向   | boolean    |    |     false  |
| showText     | 是否显示标注   | boolean    |    |     true  |
| strokeWidth     | 线条宽度   | 	number    |   |     10px  |
