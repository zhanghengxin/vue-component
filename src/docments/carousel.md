# Carousel 轮播图

### 基础用法

<div>
    <b-carousel>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
    </b-carousel>

::: code
```html
    <b-carousel>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
    </b-carousel>
```
:::
</div>

### 当前显示

使用```current``` 属性来定义 Carousel 当前显示的页面

<div>
    <div>
        <b-carousel :current='current'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>
    <script>
        export default {
            data () {
                return {
                    current: 2
                }
            }
        }
    </script>

::: code
```html
    <b-carousel :current='current'>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data () {
                return {
                    current: 2
                }
            }
        }
    </script>
```
:::
</div>

### 显示箭头

使用```arrow``` 属性来定义 Carousel 是否显示左右侧控制按钮

<div>
    <div>
        <b-carousel :arrow='false'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel :arrow='arrow'>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data() {
                return {
                    arrow: false
                }
            }
        }
    </script>
```
:::
</div>

### 显示箭头

使用```pointer``` 属性来定义 Carousel 是否显示底部控制按钮

<div>
    <div>
        <b-carousel :pointer='false'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel :pointer='pointer'>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data() {
                return {
                    pointer: false
                }
            }
        }
    </script>
```
:::
</div>

### props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| height | 高度   | number  |  | 360 |
| animation | 类型 | string | `fade`、`slide` | fade |
| interval | 停留时间 | number |  | 3000 |
| auto | 自动播放 | boolean | `true`、`false` | true |
| loop | 循环播放 | boolean | `true`、`false` | true |
| current | 当前显示 | number |  | 0 |
| pointer | 显示点 | boolean | `true`、`false` | true |
| arrow | 显示箭头 | boolean | `true`、`false` | true |
| hoverPause | 鼠标划过时暂停 | boolean | `true`、`false` | true |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |

