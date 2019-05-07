# Page 分页
当数据过多时，配合 table 组件批量显示数据。
- 简单和复合模式切换。
- 页数过多时会自动折叠。
- 可以切换每页显示的数量。【暂时不做，等 select 出来后使用公共组件】
- 快速跳转到某一页。
- 显示总共多少条数据，接受 slot 来自定义内容。
- 可以自定义上一页和下一页的文字
- 支持键盘前进后退以及跳转确认

### 基础用法
基本的分页，页数过多时会自动折叠。
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=200 page=2></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=200 page=2></b-page>
    </div>
```
:::
</div>

### 切换页数
切换每页显示的数量。
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=200 page=2 show-sizer @on-size-change='sizeChange'></b-page>
        </div>
    </div>

::: code
```html
    <div>
         <b-page total=200 page=2 show-sizer></b-page>
    </div>
```
:::
</div>

### 电梯
当 ```show-elevator``` 为 ```true``` 时，显示快速跳转到某一页功能。
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=200 show-elevator></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=200 show-elevator></b-page>
    </div>
```
:::
</div>

### 总数
显示总条数，接受 slot 自定义显示内容。
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=200 show-total></b-page>
            <b-page total=200 show-total>
                <span slot='total'>自定义 内容 </span>
            </b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=200 show-total></b-page>
        <b-page total=200 show-total>
            <span slot='total'>自定义 内容 </span>
        </b-page>
    </div>
```
:::
</div>

### 上一页和下一页
可以使用 ```prev-text``` 和 ```next-text``` 来自定义上一页和下一页的文字
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=200 prev-text='上一页' next-text='下一页'></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=200 prev-text='上一页' next-text='下一页'></b-page>
    </div>
```
:::
</div>

### mini 模式
使用```mini``` 属性来定义Page是否采用mini方式， 当 ```mini``` 为 ```true``` 时，page 采用mini方式
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=200 mini></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=200 mini></b-page>
    </div>
```
:::
</div>

### 简易版
使用```simple``` 属性来定义Page是否采用简易方式， 当 ```simple``` 为 ```true``` 时，page 采用简易方式

<div class="example">
    <div class="example-box">
        <div>
            <b-page total=100 page=2 simple></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=100 page=2 simple></b-page>
    </div>
```
:::
</div>

### events
当页数改变时会触发 on-change 事件
<div class="example">
    <div class="example-box">
        <div>
            <b-page total=100 @on-page-change='handleChange' show-elevator></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <b-page total=100 @on-page-change='handleChange' show-elevator></b-page>
    </div>
    <script>
        export default {
            methods: {
                handleChange(page) {
                    alert('当前选中页数为'+ page)
                }
            }
        }
    </script>
```
:::
</div>

 <script>
        export default {
            data () {
                return {
                   page:1
                }
            },
            methods: {
                handleChange(page) {
                    alert('当前选中页数为'+ page)
                },
                sizeChange(size){
                    alert('当前选中页数为'+ size)
                }
            }
        }
</script>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| page     |  当前页数   | string / number  |  -    |    1   |
| size     |  每页条数   | string / number    |  -|     10  |
| total     | 数据总数	   | string / number    |  -  |     10  |
| simple     | 是否选用简易版   | boolean    |  -  |     false  |
| mini     |  是否选用mini 版 | boolean    |  -  |     false  |
| show-elevator     |  是否显示电梯功能 | boolean    |  -  |     false  |
| show-total     |  是否显示总数 | boolean    |  -  |     false  |
| show-sizer     |  是否显示切换页数 | boolean    |  -  |     false  |
| transfer     |  是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | boolean    |  -  |     false  |
| size-options     |  自定义切换页数,当show-sizer开启时生效   | 	 array    |  -  |   [10, 20, 50, 100]    |
| prev-text     |  自定义上一页的文本   | 	string    |   -  |     -  |
| next-text     | 自定义下一页的文本   | 	string    |  -  |   -    |
| placement    | 页数选择框弹出位置 | string | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`,<br/>`bottom-end`, `left`,`left-start`, `left-end`, <br/>`right`, `right-start`, `right-end`| bottom-start |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-page-change     |  当页数改变时触发   |  page  |
| on-size-change     |  当切换每页条数时触发  |  size  |

### slot
| 名称	      | 说明	    |
|---------- |-------- |
|  total    |  自定义显示总数的内容 |