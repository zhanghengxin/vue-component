<script>
    export default {
        methods: {
            handleClick(event) {
                alert('点击事件！来自百望Button组件')
            }
        }
    }
</script>

# Button 按钮
常用的操作按钮。
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <b-button>Default</b-button>
            <b-button type="primary">Primary</b-button>
            <b-button type="info">Info</b-button>
            <b-button type="success">Success</b-button>
            <b-button type="warning">Warning</b-button>
            <b-button type="error">Error</b-button>
            <b-button type="text">Text</b-button>
        </div>
    </div>
</div>

:::code
```html
    <div>
        <b-button>default</b-button>
        <b-button type="primary">primary</b-button>
        <b-button type="info">info</b-button>
        <b-button type="success">success</b-button>
        <b-button type="warning">warning</b-button>
        <b-button type="error">error</b-button>
        <b-button type="text">text</b-button>
    </div>
```
:::


### 不同尺寸
Button 组件可以在不同场景下选择合适的按钮尺寸。
尺寸选项：```default```、```small```，通过设置```size```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
         <b-button size="small">small</b-button>
         <b-button size="default">default</b-button>
         <b-button size="large">large</b-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <b-button size="small">危险按钮</b-button>
        <b-button size="default">危险按钮</b-button>
        <b-button size="large">危险按钮</b-button>
    </div>
```
:::

### 圆角按钮
通过设置```shape```属性为circle，可将按钮置为圆的形状。
<div class="example">
    <div class="example-box">
        <div>
            <b-button shape="circle">default</b-button>
            <b-button type="primary" shape="circle">primary</b-button>
            <b-button type="info" shape="circle">info</b-button>
            <b-button type="success" shape="circle">success</b-button>
            <b-button type="warning" shape="circle">warning</b-button>
            <b-button type="error" shape="circle">error</b-button>
            <b-button type="text" shape="circle">text</b-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <b-button shape="circle">default</b-button>
        <b-button type="primary" shape="circle">primary</b-button>
        <b-button type="info" shape="circle">info</b-button>
        <b-button type="success" shape="circle">success</b-button>
        <b-button type="warning" shape="circle">warning</b-button>
        <b-button type="error" shape="circle">error</b-button>
        <b-button type="text" shape="circle">text</b-button>
    </div>
```
:::

### 禁用状态
Button 组件可以在不同场景下选择是否可以点击。
使用```disable``` 属性来定义Button是否可点击


<div class="example">
    <div class="example-box">
        <div>
            <b-button disabled>default</b-button>
            <b-button disabled type="primary">primary</b-button>
            <b-button disabled type="info">info</b-button>
            <b-button disabled type="success">success</b-button>
            <b-button disabled type="warning">warning</b-button>
            <b-button disabled type="error">error</b-button>
            <b-button disabled type="text">text</b-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <b-button disabled>default</b-button>
        <b-button disabled type="primary">primary</b-button>
        <b-button disabled type="info">info</b-button>
        <b-button disabled type="success">success</b-button>
        <b-button disabled type="warning">warning</b-button>
        <b-button disabled type="error">error</b-button>
        <b-button disabled type="text">text</b-button>
    </div>
```
:::

### 长按钮
通过设置属性 long 可将按钮宽度设置为 100%，常用于弹窗内操作按钮。

<div class="example">
    <div class="example-box">
        <div>
            <div style='width:200px'><b-button type="primary" long>primary</b-button></div>
            <br>
            <div style='width:200px'><b-button type="warning" long>warning</b-button></div>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <div style='width:200px'><b-button type="primary" long></b-button></div>
        <br>
        <div style='width:200px'><b-button type="warning" long></b-button></div>
    </div>
```
:::

### 图标按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```icon``` 属性来定义Button图标样式。

<div class="example">
    <div class="example-box">
        <div>
            <b-button icon='dayin'>default</b-button>
            <b-button icon='dayin' type="primary">primary</b-button>
            <b-button icon='dayin' type="info">info</b-button>
            <b-button icon='dayin' type="success">success</b-button>
            <b-button icon='dayin' type="warning">warning</b-button>
            <b-button icon='dayin' type="error">error</b-button>
            <b-button icon='dayin' type="text">text</b-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <b-button icon='dayin'>default</b-button>
        <b-button icon='dayin' type="primary">primary</b-button>
        <b-button icon='dayin' type="info">info</b-button>
        <b-button icon='dayin' type="success">success</b-button>
        <b-button icon='dayin' type="warning">warning</b-button>
        <b-button icon='dayin' type="error">error</b-button>
        <b-button icon='dayin' type="text">text</b-button>
    </div>
```
:::

### 是否为加载状态
Button 组件可以在不同场景下选择是否可以点击。
使用```loading``` 属性来定义Button是否为正在加载状态

<div class="example">
    <div class="example-box">
        <div>
            <b-button loading>加载中</b-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <b-button loading>加载中</b-button>
    </div>
```
:::


### 按钮组合
将多个Button放入ButtonGroup内，可实现按钮组合的效果。<br>
通过设置ButtonGroup的属性size为large和small，可将按钮组尺寸设置为大和小，不设置size，则为默认（中）尺寸。<br>
通过设置ButtonGroup的属性shape为circle，可将按钮组形状设置为圆角。<br>

<div class="example">
    <div class="example-box">
        <div>
            <b-button-group>
                <b-button type="primary">L</b-button>
                <b-button>M</b-button>
                <b-button>M</b-button>
                <b-button>R</b-button>
            </b-button-group>
            <br><br>
            <b-button-group size="large">
                <b-button>Large</b-button>
                <b-button>Large</b-button>
            </b-button-group>
            <b-button-group>
                <b-button>Default</b-button>
                <b-button>Default</b-button>
            </b-button-group>
            <b-button-group size="small">
                <b-button>Small</b-button>
                <b-button>Small</b-button>
            </b-button-group>
            <br><br>
            <b-button-group size="large" shape="circle">
                <b-button>Large</b-button>
                <b-button>Large</b-button>
            </b-button-group>
            <b-button-group shape="circle">
                <b-button>Default</b-button>
                <b-button>Default</b-button>
            </b-button-group>
            <b-button-group size="small" shape="circle">
                <b-button>Small</b-button>
                <b-button>Small</b-button>
            </b-button-group>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <b-button-group>
            <b-button type="primary">L</b-button>
            <b-button>M</b-button>
            <b-button>M</b-button>
            <b-button>R</b-button>
        </b-button-group>
        <br><br>
        <b-button-group size="large">
            <b-button>Large</b-button>
            <b-button>Large</b-button>
        </b-button-group>
        <b-button-group>
            <b-button>Default</b-button>
            <b-button>Default</b-button>
        </b-button-group>
        <b-button-group size="small">
            <b-button>Small</b-button>
            <b-button>Small</b-button>
        </b-button-group>
        <br><br>
        <b-button-group size="large" shape="circle">
            <b-button>Large</b-button>
            <b-button>Large</b-button>
        </b-button-group>
        <b-button-group shape="circle">
            <b-button>Default</b-button>
            <b-button>Default</b-button>
        </b-button-group>
        <b-button-group size="small" shape="circle">
            <b-button>Small</b-button>
            <b-button>Small</b-button>
        </b-button-group>
    </div>
```
:::

### 按钮组纵向排列
通过设置ButtonGroup的属性vertical，可以使按钮组纵向排列。
<div class="example">
    <div class="example-box">
        <div>
            <b-button-group vertical>
                <b-button >好</b-button>
                <b-button >好</b-button>
                <b-button >学</b-button>
                <b-button >习</b-button>
            </b-button-group>
        </div>
    </div>
</div>

::: code
```html
   <div>
        <b-button-group vertical>
            <b-button >好</b-button>
            <b-button >好</b-button>
            <b-button >学</b-button>
            <b-button >习</b-button>
        </b-button-group>
   </div>
```
:::

### 跳转 
通过设置 to 可以实现点击按钮直接跳转，支持传入 vue-router 对象。<br>
设置 replace 则不会保存历史记录。<br>
设置 target，会跟 a 标签一样的行为。<br>
<div class="example">
    <div class="example-box">
        <div>
            <b-button to="/icon">普通跳转</b-button>
            <b-button to="/input" replace>不保存历史的跳转</b-button>
            <b-button to="/" target="_blank">新窗口打开</b-button>
        </div>
    </div>
</div>

::: code
```html
   <div>
        <b-button to="/icon">普通跳转</b-button>
        <b-button to="/input" replace>不保存历史的跳转</b-button>
        <b-button to="/" target="_blank">新窗口打开</b-button>
   </div>
```
:::

### Button props
| 参数      | 说明    | 类型           | 默认值   |
|---------- |-------- |---------- |-------- |
|type|	按钮类型，可选值为 ```default```、```primary```、```text```、```info```、```success```、```warning```、```error```|	String	|default|
|size|	按钮大小，可选值为large、small、default或者不设置	|String|	default|
|shape|	按钮形状，可选值为circle或者不设置|	String|	-|
|long	|开启后，按钮的长度为 100%|	Boolean	|false|
|html-type|	设置button原生的type，可选值为button、submit、reset	|String|	button|
|disabled|	设置按钮为禁用状态	|Boolean|	false|
|loading|	设置按钮为加载中状态|	Boolean|	false|
|icon|	设置按钮的图标类型|	String	|-|
|to	|跳转的链接，支持 vue-router 对象	|String | Object|	-|
|replace|	路由跳转时，开启 replace 将不会向 history 添加新记录	|Boolean|	false|
|target|	相当于 a 链接的 target 属性 `_blank`、 `_self`、 `_parent`、 `_top`	|String|	_self|

### ButtonGroup props
| 参数      | 说明    | 类型           | 默认值   |
|---------- |-------- |---------- |-------- |
| size	| 按钮组合大小，可选值为large、small、default或者不设置| 	String| 	default| 
| shape	| 按钮组合形状，可选值为circle或者不设置| 	String| 	-| 
| vertical| 	是否纵向排列按钮组| 	Boolean| 	false| 

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |
