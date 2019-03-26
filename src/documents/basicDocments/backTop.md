# BackTop 返回顶部
当页面内容冗长，需要快捷返回顶部时使用，一般放置在页面右下角位置。
-----
### 基础用法
默认位置距离页面右部和底部 30px，滚动至距顶端 400px 时显示。

<b-back-top :height='200' :right='20' :bottom='20' :duration='200' :show='true'>
	        <div>返回顶端</div>
</b-back-top>

::: code
```html
<style scoped>
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>

<template>
    <BackTop :height="50" :bottom="200">
        <div class="top">返回顶端</div>
    </BackTop>
</template>
```
:::
###
### API
## BackTop props
###
属性|说明|类型|默认值
---|:--:|---:|---:
show|一直显示BackTop组件|Boolean|false
height|页面滚动高度达到该值时才显示BackTop组件|Number|400
bottom|组件距离底部的距离|Number|30
right|组件距离右部的距离|Number|30
duration|滚动动画持续时间，单位 毫秒|Number|1000
## BackTop events
###
事件名|说明|返回值
---|:--:|---:
on-click|点击按钮时触发|无


