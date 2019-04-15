# Badge 徽标

### 基本用法

<div class='example'>
    <div class='example-box'>
        <b-badge :count='3'>
            <span class='badge'></span>
        </b-badge>
    </div>

::: code
```html
    <div class='example-box'>
        <b-badge :count='3'>
            <span class='badge'></span>
        </b-badge>
    </div>
    <style>
    .badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        cursor: pointer;
    }
    </style>
```
:::
</div>

### 小红点

设置属性 `dot` 为 true 显示红点

<div class='example'>
    <div class='example-box'>
        <b-badge dot>
            <span class='badge'></span>
        </b-badge>
    </div>

::: code
```html
    <div class='example-box'>
        <b-badge dot>
            <span class='badge'></span>
        </b-badge>
    </div>
    <style>
    .badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        cursor: pointer;
    }
    </style>
```
:::
</div>

### 封顶数字

设置属性 `overflow-count` 设置封顶值，超过该数值时，显示 Number +

<div class='example'>
    <div class='example-box'>
        <b-badge :count="1000" overflow-count="999">
            <span class='badge'></span>
        </b-badge>
    </div>

::: code
```html
    <div class='example-box'>
        <b-badge :count="1000" overflow-count="999">
            <span class='badge'></span>
        </b-badge>
    </div>
    <style>
    .badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        cursor: pointer;
    }
    </style>
```
:::
</div>

### 自定义内容

设置属性 `text` 设置自定义内容

<div class='example'>
    <div class='example-box'>
        <b-badge text='hot'>
            <span class='badge'></span>
        </b-badge>
    </div>

::: code
```html
    <div class='example-box'>
        <b-badge text='hot'>
            <span class='badge'></span>
        </b-badge>
    </div>
    <style>
    .badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        cursor: pointer;
    }
    </style>
```
:::
</div>

### 状态点

设置属性 `status` 用于表示状态点

<div class='example'>
    <div class='example-box'>
        <b-badge status='success' text='success'></b-badge>
        <br>
        <b-badge status='error' text='error'></b-badge>
        <br>
        <b-badge status='default' text='default'></b-badge>
        <br>
        <b-badge status='warning' text='warning'></b-badge>
        <br>
        <b-badge status='processing' text='processing'></b-badge>
    </div>

::: code
```html
    <div class='example-box'>
        <div class='example-box'>
            <b-badge status='success' text='success'></b-badge>
            <br>
            <b-badge status='error' text='error'></b-badge>
            <br>
            <b-badge status='default' text='default'></b-badge>
            <br>
            <b-badge status='warning' text='warning'></b-badge>
            <br>
            <b-badge status='processing' text='processing'></b-badge>
        </div>
    </div>
    <style>
    .badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        cursor: pointer;
    }
    </style>
```
:::
</div>

### 预设颜色 

<div class='example'>
    <div class='example-box'>
        <b-badge type='primary' :count='999'>
            <span class='badge'></span>
        </b-badge>
        &nbsp;&nbsp;&nbsp;
        <b-badge type='success' :count='999'>
            <span class='badge'></span>
        </b-badge>
        &nbsp;&nbsp;&nbsp;
        <b-badge type='normal' :count='999'>
            <span class='badge'></span>
        </b-badge>
        &nbsp;&nbsp;&nbsp;
        <b-badge type='error' :count='999'>
            <span class='badge'></span>
        </b-badge>
        &nbsp;&nbsp;&nbsp;
        <b-badge type='info' :count='999'>
            <span class='badge'></span>
        </b-badge>
        &nbsp;&nbsp;&nbsp;
        <b-badge type='warning' :count='999'>
            <span class='badge'></span>
        </b-badge>
    </div>

::: code
```html
    <div class='example-box'>
        <b-badge type='primary' :count='999'>
            <span class='badge'></span>
        </b-badge>
        <b-badge type='success' :count='999'>
            <span class='badge'></span>
        </b-badge>
        <b-badge type='normal' :count='999'>
            <span class='badge'></span>
        </b-badge>
        <b-badge type='error' :count='999'>
            <span class='badge'></span>
        </b-badge>
        <b-badge type='info' :count='999'>
            <span class='badge'></span>
        </b-badge>
        <b-badge type='warning' :count='999'>
            <span class='badge'></span>
        </b-badge>
    </div>
    <style>
    .badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
        cursor: pointer;
    }
    </style>
```
:::
</div>

<style>
.badge {
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
    cursor: pointer;
}
</style>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| count | 显示的数字，大于overflowCount时，显示${overflowCount}+，为 0 时隐藏 | Number  |  | 0 |
| overflow-count | 展示封顶的数字值 | Number/String | | 99 |
| dot | 不展示数字，只有一个小红点，如需隐藏 dot ，需要设置count为 0 | Boolean | `true` `false` | false  |
| class-name | 自定义的class名称，dot 模式下无效 | String |
| type | 使用预设的颜色，可选值为 success、primary、normal、error、warning、info | String |
| show-zero | 展示封顶的数字值 | Number/String | | 99 |
| overflow-count | 当数值为 0 时，是否展示 Badge | Boolean | `true` `false` | false  |
| status | 设置 Badge 为状态点，可选值为 success、processing、default、error、warning | String |
| text | 自定义内容，如果设置了 status，则为状态点的文本 | String |
| offset | 设置状态点的位置偏移，格式为 [x, y] | Array |
