# Breadcrumb 面包屑
显示网站的层级结构，告知用户当前所在位置，以及在需要向上级导航时使用。
-----
### 基础用法
最基础的用法，通过设置```to```属性添加链接。
<div class="example">
    <div class="example-box">
        <template>
            <b-breadcrumb>
                <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
                <b-breadcrumb-item to="/breadcrumb">Libs</b-breadcrumb-item>
                <b-breadcrumb-item>Breadcrumb</b-breadcrumb-item>
            </b-breadcrumb>
        </template>
        <script>
            export default {
            }
        </script>
    </div>

::: code
```html
    <template>
        <b-breadcrumb>
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/breadcrumb">Libs</b-breadcrumb-item>
            <b-breadcrumb-item>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
    </template>
    <script>
        export default {

        }
    </script>
```
:::
</div>

### 分隔符
通过设置```separator```属性来自定义分隔符，比如 > ，也可以接受自定义的HTML字符串。

<div class="example">
    <div class="example-box">
        <style>
            .demo-breadcrumb-separator{
                color: #ff5500;
                padding: 0 5px;
            }
        </style>
        <template>
            <b-breadcrumb separator=">">
                <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
                <b-breadcrumb-item to="/breadcrumb">Libs</b-breadcrumb-item>
                <b-breadcrumb-item>Breadcrumb</b-breadcrumb-item>
            </b-breadcrumb>
            <b-breadcrumb separator="<b class='demo-breadcrumb-separator'>\</b>">
                <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
                <b-breadcrumb-item to="/breadcrumb">Libs</b-breadcrumb-item>
                <b-breadcrumb-item>Breadcrumb</b-breadcrumb-item>
            </b-breadcrumb>
        </template>
        <script>
            export default {
            }
        </script>
    </div>

::: code
```html
    <style>
    .demo-breadcrumb-separator{
        color: #ff5500;
        padding: 0 5px;
    }
    </style>
    <template>
        <b-breadcrumb separator=">">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/breadcrumb">Libs</b-breadcrumb-item>
            <b-breadcrumb-item>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <b-breadcrumb separator="<b class='demo-breadcrumb-separator'>\</b>">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/breadcrumb">Libs</b-breadcrumb-item>
            <b-breadcrumb-item>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
    </template>
    <script>
        export default {

        }
    </script>
```
:::
</div>

### props

Breadcrumb props

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| separator     | 自定义分隔符   | String |    /   |

BreadcrumbItem props

| 属性      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |-------- |
| to     | 链接，不传则没有链接，支持 vue-router 对象   | String | Object  |    -   |
| replace     | 路由跳转时，开启 replace 将不会向 history 添加新记录   | Boolean    |     false  |
| target     | 相当于 a 链接的 target 属性   | String    |     _self  |
