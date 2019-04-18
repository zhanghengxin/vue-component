# Card 卡片

### 基础用法

<div class='example'>
    <div class='example-box'>
        <b-card title='我是卡片' icon='yonghuzhongxin'>
            <div>哈哈哈，我是 Body!</div>
        </b-card>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin'>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```

:::
</div>

### 自定义 Header

<div class='example'>
    <div class='example-box'>
        <b-card>
            <div slot='title'>
                <b-icon type='yonghuzhongxin'></b-icon>
                <span>我是 Title</span>
            </div>
            <div>哈哈哈，我是 Body!</div>
        </b-card>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin'>
        <div slot='title'>
            <b-icon type='yonghuzhongxin'></b-icon>
            <span>我是 Title</span>
        </div>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```

:::
</div>

### 额外显示的内容

<div class='example'>
    <div class='example-box'>
        <b-card title='我是卡片' icon='yonghuzhongxin'>
            <div slot='extra'>
                <b-icon type='xiayibu'></b-icon>
            </div>
            <div>哈哈哈，我是 Body!</div>
        </b-card>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin'>
        <div slot='extra'>
            <b-icon type='xiayibu'></b-icon>
        </div>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```

:::
</div>

### 无边框 

<div class='example' style='background: #ccc;'>
    <div class='example-box'>
        <b-card title='我是卡片' icon='yonghuzhongxin' :bordered='false'>
            <div>哈哈哈，我是 Body!</div>
        </b-card>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin' :bordered='false'>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```

:::
</div>

### 阴影 

<div class='example'>
    <div class='example-box'>
        <b-card title='我是卡片' icon='yonghuzhongxin' :shadow='true'>
            <div>哈哈哈，我是 Body!</div>
        </b-card>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin' :shadow='true'>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```

:::
</div>

### 禁用 hover 阴影 

<div class='example'>
    <div class='example-box'>
        <b-card title='我是卡片' icon='yonghuzhongxin' :disHover='true'>
            <div>哈哈哈，我是 Body!</div>
        </b-card>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin' :disHover='true'>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```

:::
</div>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| title | 标题 | string  |  |  |
| icon | 标题前的图标, 参考 icon 图标 | string |  |
| bordered | 是否显示border | boolean | `true`、`false` | true |
| shadow | 卡片阴影 | boolean | `true`、`false` | false |
| disHover | 禁用鼠标悬停显示阴影 | boolean | `true`、`false` | false |

### slot 

| 参数 | 说明 |
| ---- | ---- |
| title | 自定义卡片标题 |
| extra | 额外显示的内容，于右上角 |