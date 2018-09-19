# Page 按钮
当数据过多时，配合 table 组件批量显示数据。
- 页数过多时会自动折叠。
- 可以切换每页显示的数量。
- 快速跳转到某一页。
- 显示总共多少条数据，接受 slot 来自定义内容。
- 支持键盘前进后退以及跳转确认
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <b-page></b-page>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal">默认按钮</bw-button>
        <bw-button type="typrimary">主要按钮</bw-button>
        <bw-button type="tysuccess">成功按钮</bw-button>
        <bw-button type="tywarning">警告按钮</bw-button>
        <bw-button type="tyerror">危险按钮</bw-button>
    </div>
```
:::
</div>