# Breadcrumb 面包屑
显示网站的层级结构，告知用户当前所在位置，以及在需要向上级导航时使用。
-----
### 基础用法
最基础的用法，通过设置```to```属性添加链接。

<template>
    <Breadcrumb>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/libs/breadcrumb">libs</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
    export default {
    }
</script>

::: code

```html
    <template>
        <bw-breadcrumb>
            <bw-breadcrumbItem to="/">Home</bw-breadcrumbItem>
            <bw-breadcrumbItem to="/libs/breadcrumb">libs</bw-breadcrumbItem>
            <bw-breadcrumbItem>Breadcrumb</bw-breadcrumbItem>
        </bw-breadcrumb>
    </template>
    <script>
        export default {

        }
    </script>
```
:::