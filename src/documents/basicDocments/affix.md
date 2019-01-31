# Affix 图钉

### 基本用法

<div class='example'>
    <div class='example-box'>
        <b-affix>
            <b-button>固定在最顶部</b-button>
        </b-affix>
    </div>

::: code
```html
    <div class='example-box'>
        <b-affix>
            <b-button>固定在最顶部</b-button>
        </b-affix>
    </div>
```
:::
</div>

### 偏移

<div class='example'>
    <div class='example-box'>
        <b-affix :offset-top='200'>
            <b-button>固定在最顶部 200 px</b-button>
        </b-affix>
    </div>

::: code
```html
    <div class='example-box'>
        <b-affix :offset-top='200'>
            <b-button>固定在最顶部 200 px</b-button>
        </b-affix>
    </div>
```
:::
</div>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number  |  | 0 |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | Number | | 0 |

### events 
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change | 在固定状态发生改变时触发  | true、false |