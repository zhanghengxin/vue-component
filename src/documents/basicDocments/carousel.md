# Carousel 走马灯

### 基础用法

<div class='example'>
    <div class='example-box'>
        <b-carousel v-model="value1" loop style='width: 1028px'>
            <b-carousel-item>
                <div class="carousel">1</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">2</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">3</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">4</div>
            </b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel v-model="value1" loop>
        <b-carousel-item>
            <div class="carousel">1</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">2</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">3</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">4</div>
        </b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data () {
                return {
                    value1: 0
                }
            }
        }
    </script>
    <style>
        .carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 60px;
            background: #ccc;
        }
    </style>
```
:::
</div>

### 自动切换

使用```autoplay``` 属性来定义 Carousel 的自动切换

<div class='example'>
    <div class='example-box'>
        <b-carousel v-model="value2" loop autoplay style='width: 1028px'>
            <b-carousel-item>
                <div class="carousel">1</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">2</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">3</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">4</div>
            </b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel v-model="value2" loop autoplay>
        <b-carousel-item>
            <div class="carousel">1</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">2</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">3</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">4</div>
        </b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data () {
                return {
                    value2: 0
                }
            }
        }
    </script>
    <style>
        .carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 60px;
            background: #ccc;
        }
    </style>
```
:::
</div>

### 切换箭头

使用```arrow``` 属性来定义 Carousel 切换箭头是否显示

<div class='example'>
    <div class='example-box'>
        <b-carousel v-model="value3" loop arrow='always' style='width: 1028px'>
            <b-carousel-item>
                <div class="carousel">1</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">2</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">3</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">4</div>
            </b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel v-model="value3" loop arrow='always'>
        <b-carousel-item>
            <div class="carousel">1</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">2</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">3</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">4</div>
        </b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data () {
                return {
                    value3: 0
                }
            }
        }
    </script>
    <style>
        .carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 60px;
            background: #ccc;
        }
    </style>
```
:::
</div>

### 指示器

使用```dots``` 属性来定义 Carousel 指示器显示位置

<div class='example'>
    <div class='example-box'>
        <b-carousel v-model="value4" loop dots='outside' style='width: 1028px'>
            <b-carousel-item>
                <div class="carousel">1</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">2</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">3</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">4</div>
            </b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
    <b-carousel v-model="value4" loop dots='outside'>
        <b-carousel-item>
            <div class="carousel">1</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">2</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">3</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">4</div>
        </b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data () {
                return {
                    value4: 0
                }
            }
        }
    </script>
    <style>
        .carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 60px;
            background: #ccc;
        }
    </style>
```
:::
</div>

### 圆形指示器

使用```radius-dot``` 属性来定义 Carousel 显示圆形指示器

<div class='example'>
    <div class='example-box'>
        <b-carousel v-model="value5" loop radius-dot style='width: 1028px'>
            <b-carousel-item>
                <div class="carousel">1</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">2</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">3</div>
            </b-carousel-item>
            <b-carousel-item>
                <div class="carousel">4</div>
            </b-carousel-item>
        </b-carousel>
    </div>

::: code
```html
     <b-carousel v-model="value5" loop radius-dot>
        <b-carousel-item>
            <div class="carousel">1</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">2</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">3</div>
        </b-carousel-item>
        <b-carousel-item>
            <div class="carousel">4</div>
        </b-carousel-item>
    </b-carousel>
    <script>
        export default {
            data () {
                return {
                    value5: 0
                }
            }
        }
    </script>
    <style>
        .carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 60px;
            background: #ccc;
        }
    </style>
```
:::
</div>
<script>
export default {
    data () {
        return {
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            value5: 0
        }
    }
}
</script>
<style>
    .carousel {
        width: 100%;
        height: 200px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 60px;
        background: #ccc;
    }
</style>

### props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 幻灯片的索引，从 0 开始，可以使用 v-model 双向绑定数据 | Number |  | 0 |
| height | 走马灯的高度，可填 auto 或具体高度数值，单位 px | String/Number  |  | auto |
| autoplay-speed | 过渡时间，时间为 ms | Number |  | 2000 |
| autoplay | 自动播放 | Boolean | `true`、`false` | true |
| dots | 指示器的位置 | String | `inside` `outside` `none`  | inside |
| loop | 循环播放 | Boolean | `true` `false` | true |
| radius-dot | 是否显示圆形指示器 | Boolean | `true`、`false` | false |
| arrow | 切换箭头的显示时机 | String | `houver` `always` `never` | hover |
| trigger | 指示器的触发方式 | String | `click` `hover` | click|
| easing | 动画效果 | String |  | ease|


### events
| 事件名 | 说明	| 返回值 |
| ---- | ---- | ---- |
| on-change | 幻灯片切换时触发，目前激活的幻灯片的索引，原幻灯片的索引 | oldValue, value |
