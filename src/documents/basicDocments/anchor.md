# Archor 锚点

### 基础用法

<div class='example'>
    <div class='example-box'>
        <b-anchor show-ink>
            <b-anchor-link href="#card" title="Card 卡片"></b-anchor-link>
            <b-anchor-link href="#split" title="Split 面板分割"></b-anchor-link>
            <b-anchor-link href="#transfer" title="Transfer 穿梭框"></b-anchor-link>
            <b-anchor-link href="#carousel" title="Carousel 走马灯"></b-anchor-link>
            <b-anchor-link href="#timeline" title="Timeline 时间轴"></b-anchor-link>
            <b-anchor-link href="#picker" title="Picker 选择器">
                <b-anchor-link href="#datepicker" title="Datepicker 日期选择器"></b-anchor-link>
                <b-anchor-link href="#timepicker" title="Timepicker 时间选择器"></b-anchor-link>
                <b-anchor-link href="#datetimepicker" title="Datetimepicker 日期时间选择器"></b-anchor-link>
            </b-anchor-link>
        </b-anchor>
    </div>

::: code

```html
    <b-anchor show-ink>
        <b-anchor-link href="#card" title="Card 卡片"></b-anchor-link>
        <b-anchor-link href="#split" title="Split 面板分割"></b-anchor-link>
        <b-anchor-link href="#transfer" title="Transfer 穿梭框"></b-anchor-link>
        <b-anchor-link href="#carousel" title="Carousel 走马灯"></b-anchor-link>
        <b-anchor-link href="#timeline" title="Timeline 时间轴"></b-anchor-link>
        <b-anchor-link href="#picker" title="Picker 选择器">
            <b-anchor-link href="#datepicker" title="Datepicker 日期选择器"></b-anchor-link>
            <b-anchor-link href="#timepicker" title="Timepicker 时间选择器"></b-anchor-link>
            <b-anchor-link href="#datetimepicker" title="Datetimepicker 日期时间选择器"></b-anchor-link>
        </b-anchor-link>
    </b-anchor>
```

:::
</div>

### Anchor props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| affix | 固定模式 | Boolean  | `true` `false`  | false |
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number |  | 0 |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | Number | | |
| bounds | 锚点区域边界，单位：px | Number | | 5 |
| scroll-offset | 点击滚动的额外距离 | Number | | 0 |
| container | 指定滚动的容器 | String | | |
| show-ink | 是否显示左侧小圆点 | Boolean | `true`、`false` | false |

### AnchorLink props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| href | 锚点链接 | String  | | |
| title | 文字内容 | String |  | |
| scroll-offset | 点击滚动的额外距离 | Number | | 0 |

### Anchor events

| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-select | 点击锚点时触发，返回链接 | href |
| on-change | 链接改变时触发，返回新链接和旧链接 | newHref、oldHref |
