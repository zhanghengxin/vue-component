# Carousel 走马灯

### 基础用法

<div class='example'>
    <div class='example-box'>
        <b-carousel :auto='false'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
    </b-carousel>
```
:::
</div>

### 动画

使用```animation``` 属性来定义 Carousel 的动画

<div class='example'>
    <div class='example-box'>
        <b-carousel animation='slide'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel animation='slide'>
        <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
        <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
    </b-carousel>
```
:::
</div>

### 当前显示

使用```current``` 属性来定义 Carousel 当前显示的页面

使用```auto``` 属性来定义 Carousle 是否自动轮播

<div class='example'>
    <div class='example-box'>
        <b-carousel :current='2' :auto='false'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel :current='current' :auto='auto'>
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
                    current: 2,
                    auto: false
                }
            }
        }
    </script>
```
:::
</div>

### 切换箭头

使用```arrow``` 属性来定义 Carousel 切换箭头是否显示

<div class='example'>
    <div class='example-box'>
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
            data () {
                return {
                    arrow: false
                }
            }
        }
    </script>
```
:::
</div>

### 指示器

使用```pointer``` 属性来定义 Carousel 指示器是否显示

<div class='example'>
    <div class='example-box'>
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
            data () {
                return {
                    pointer: false
                }
            }
        }
    </script>
```
:::
</div>

### 循环播放

使用```loop``` 属性来定义 Carousel 是否循环播放

<div class='example'>
    <div class='example-box'>
        <b-carousel :loop='false'>
            <b-carousel-item><div class='carousel-example'>1</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>2</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>3</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>4</div></b-carousel-item>
            <b-carousel-item><div class='carousel-example'>5</div></b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel :loop='loop'>
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
                    loop: false
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
| speed | 过渡时间 | number |  | 300 |
| interval | 停留时间 | number |  | 3000 |
| auto | 自动播放 | boolean | `true`、`false` | true |
| loop | 循环播放 | boolean | `true`、`false` | true |
| current | 当前显示 | number |  | 0 |
| pointer | 指示器 | boolean | `true`、`false` | true |
| arrow | 切换箭头 | boolean | `true`、`false` | true |
| hoverPause | 鼠标划过时暂停 | boolean | `true`、`false` | true |

### events
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| after | 加载完成后 | - |
| slideAfter | 滑动结束 | index |

