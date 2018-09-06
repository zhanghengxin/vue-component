# Button 按钮
常用的操作按钮。
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <b-button type="info">默认按钮</b-button>
            <b-button type="white">主要按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="info">默认按钮</b-button>
        <b-button type="white">主要按钮</b-button>
    </div>
```
:::
</div>


### 不同尺寸
Button 组件可以在不同场景下选择合适的按钮尺寸。
尺寸选项：```normal```、```small```，通过设置```size```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
            <b-button size="normal">默认尺寸</b-button>
            <b-button size="small">小尺寸</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button size="normal">默认尺寸</b-button>
        <b-button size="small">小尺寸</b-button>
    </div>
```
:::
</div>

### events
Button 支持click 事件

<div class="example">
    <div class="example-box">
        <div>
            <b-button size="normal" @on-click="handleClick">点击事件</b-button>
        </div>
    </div>

<script>
    export default {
        methods: {
            handleClick(event) {
                alert('点击事件！')
            }
        }
    }
</script>

::: code
```html
   <div>
       <b-button size="normal" @on-click="handleClick">点击事件</b-button>
   </div>
   <script>
       export default {
           methods: {
               handleClick(event) {
                   alert('点击事件！')
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
| size     | 尺寸   | string  |  `normal`、`small`         |    normal   |
| type     | 类型   | string    |   `info`、`white` |     info  |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |
