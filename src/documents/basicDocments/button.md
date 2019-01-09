# Button 按钮
常用的操作按钮。【李佳航】
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <b-button>默认按钮</b-button>
            <b-button type="primary">主要按钮</b-button>
            <b-button type="success">成功按钮</b-button>
            <b-button type="warning">警告按钮</b-button>
            <b-button type="error">危险按钮</b-button>
        </div>
    </div>

:::code
```html
    <div>
        <b-button>默认按钮</b-button>
        <b-button type="primary">主要按钮</b-button>
        <b-button type="success">成功按钮</b-button>
        <b-button type="warning">警告按钮</b-button>
        <b-button type="error">危险按钮</b-button>
    </div>
```
:::
</div>


### 不同尺寸
Button 组件可以在不同场景下选择合适的按钮尺寸。
尺寸选项：```normal```、```small```，通过设置```size```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
         <b-button size="small">主要按钮</b-button>
         <b-button size="normal">主要按钮</b-button>
         <b-button size="big">主要按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button size="small">危险按钮</b-button>
        <b-button size="normal">危险按钮</b-button>
        <b-button size="big">危险按钮</b-button>
    </div>
```
:::
</div>

### 圆角按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```round``` 属性来定义Button是否为圆角按钮。

<div class="example">
    <div class="example-box">
        <div>
            <b-button :round="true">默认按钮</b-button>
            <b-button type="primary" :round="true">主要按钮</b-button>
            <b-button type="success" :round="true">成功按钮</b-button>
            <b-button type="warning" :round="true">警告按钮</b-button>
            <b-button type="error" :round="true">危险按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button :round="true">默认按钮</b-button>
        <b-button type="primary" :round="true">主要按钮</b-button>
        <b-button type="success" :round="true">成功按钮</b-button>
        <b-button type="warning" :round="true">警告按钮</b-button>
        <b-button type="error" :round="true">危险按钮</b-button>
    </div>
```
:::
</div>

### 朴素按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```plain``` 属性来定义Button是否为朴素按钮。

<div class="example">
    <div class="example-box">
        <div>
            <b-button :plain="true">默认按钮</b-button>
            <b-button type="primary" :plain="true">主要按钮</b-button>
            <b-button type="success" :plain="true">成功按钮</b-button>
            <b-button type="warning" :plain="true">警告按钮</b-button>
            <b-button type="error" :plain="true">危险按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button :plain="true">默认按钮</b-button>
        <b-button type="primary" :plain="true">主要按钮</b-button>
        <b-button type="success" :plain="true">成功按钮</b-button>
        <b-button type="warning" :plain="true">警告按钮</b-button>
        <b-button type="error" :plain="true">危险按钮</b-button>
    </div>
```
:::
</div>


### 禁用状态
Button 组件可以在不同场景下选择是否可以点击。
使用```disable``` 属性来定义Button是否可点击


<div class="example">
    <div class="example-box">
        <div>
            <b-button  disabled="disabled">默认按钮</b-button>
            <b-button type="primary" disabled="disabled">主要按钮</b-button>
            <b-button type="success" disabled="disabled">成功按钮</b-button>
            <b-button type="warning" disabled="disabled">警告按钮</b-button>
            <b-button type="error"   disabled="disabled">危险按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button  disabled="disabled">默认按钮</b-button>
        <b-button type="primary"  disabled="disabled">主要按钮</b-button>
        <b-button type="success"  disabled="disabled">成功按钮</b-button>
        <b-button type="warning" disabled="disabled">警告按钮</b-button>
        <b-button type="error"   disabled="disabled">危险按钮</b-button>
    </div>
```
:::
</div>

### 圆形按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```circle``` 属性来定义圆形Button


<div class="example">
    <div class="example-box">
        <div>
            <b-button  :circle="true"></b-button>
            <b-button type="primary" :circle="true"></b-button>
            <b-button type="success" :circle="true"></b-button>
            <b-button type="warning" :circle="true"></b-button>
            <b-button type="error"   :circle="true"></b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button :circle="true"></b-button>
        <b-button type="primary" :circle="true"></b-button>
        <b-button type="success" :circle="true"></b-button>
        <b-button type="warning" :circle="true"></b-button>
        <b-button type="error"   :circle="true"></b-button>
    </div>
```
:::
</div>

### 图标按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```icon``` 属性来定义Button图标样式。
更多图标参考百望[Icon组件](http://localhost:8080/#/icon)



<div class="example">
    <div class="example-box">
        <div>
            <b-button icon="daochukehuxinxi"></b-button>
            <b-button type="primary" icon="fapiaoshengcheng"></b-button>
            <b-button type="success" icon="pipeixinxi"></b-button>
            <b-button type="warning" icon="qianshouxinxi"></b-button>
            <b-button type="error"   icon="chuangjianyonghu"></b-button>
            <b-button type="error"   icon="shengchengdaikai"></b-button>
            <b-button type="warning" icon="daochuduanxinjilu"></b-button>
            <b-button type="success" icon="dayin"></b-button>
            <b-button type="primary" icon="daochuwordwendang"></b-button>
            <b-button   icon="wangshangbaoshui"></b-button> 
        </div>
    </div>

::: code
```html
    <div>
        <b-button icon="daochukehuxinxi"></b-button>
        <b-button type="primary" icon="fapiaoshengcheng"></b-button>
        <b-button type="success" icon="pipeixinxi"></b-button>
        <b-button type="warning" icon="qianshouxinxi"></b-button>
        <b-button type="error"   icon="chuangjianyonghu"></b-button>
        <b-button type="error"   icon="shengchengdaikai"></b-button>
        <b-button type="warning" icon="daochuduanxinjilu"></b-button>
        <b-button type="success" icon="dayin"></b-button>
        <b-button type="primary" icon="daochuwordwendang"></b-button>
        <b-button   icon="wangshangbaoshui"></b-button> 
    </div>
```
:::
</div>

### 是否为加载状态
Button 组件可以在不同场景下选择是否可以点击。
使用```loading``` 属性来定义Button是否为正在加载状态


<div class="example">
    <div class="example-box">
        <div>
            <b-button  type="primary" :loading="true">加载中</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="primary" :loading="true">加载中</b-button>
    </div>
```
:::
</div>

### 事件
Button 支持click 事件

<div class="example">
    <div class="example-box">
        <div>
            <b-button  @on-click="handleClick">点击事件</b-button>
        </div>
    </div>

<script>
    export default {
        methods: {
            handleClick(event) {
                alert('点击事件！来自百望Button组件')
            }
        }
    }
</script>

::: code
```html
   <div>
       <b-button  @on-click="handleClick">点击事件</b-button>
   </div>
   <script>
       export default {
           methods: {
               handleClick(event) {
                   alert('点击事件！')
               }
           }
       }
   </script>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |  `default`、`small`  、`big`       |    normal   |
| type     | 类型   | string    |   `normal` 、`primary`、`success`  、`warning` 、`error`|     primary  |
| loading     | 是否圆角按钮   | boolean    |    |     false  |
| round     | 是否加载中状态   | boolean    |    |     false  |
| plain     | 是否朴素按钮   | boolean    |    |     false  |
| disabled     | 是否禁用状态   | 	boolean    |   `无`  |     false  |
| icon     | 图表类型   | 	string    |   `参考icon代码`  |       |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |
