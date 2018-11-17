# Button 按钮
常用的操作按钮。【李佳航】
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <b-button type="tynormal">默认按钮</b-button>
            <b-button type="typrimary">主要按钮</b-button>
            <b-button type="tysuccess">成功按钮</b-button>
            <b-button type="tywarning">警告按钮</b-button>
            <b-button type="tyerror">危险按钮</b-button>
        </div>
    </div>

:::code
```html
    <div>
        <b-button type="tynormal">默认按钮</b-button>
        <b-button type="typrimary">主要按钮</b-button>
        <b-button type="tysuccess">成功按钮</b-button>
        <b-button type="tywarning">警告按钮</b-button>
        <b-button type="tyerror">危险按钮</b-button>
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
            <b-button type="tynormal" :round="true">默认按钮</b-button>
            <b-button type="typrimary" :round="true">主要按钮</b-button>
            <b-button type="tysuccess" :round="true">成功按钮</b-button>
            <b-button type="tywarning" :round="true">警告按钮</b-button>
            <b-button type="tyerror" :round="true">危险按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal" :round="true">默认按钮</b-button>
        <b-button type="typrimary" :round="true">主要按钮</b-button>
        <b-button type="tysuccess" :round="true">成功按钮</b-button>
        <b-button type="tywarning" :round="true">警告按钮</b-button>
        <b-button type="tyerror" :round="true">危险按钮</b-button>
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
            <b-button type="tynormal" :plain="true">默认按钮</b-button>
            <b-button type="typrimary" :plain="true">主要按钮</b-button>
            <b-button type="tysuccess" :plain="true">成功按钮</b-button>
            <b-button type="tywarning" :plain="true">警告按钮</b-button>
            <b-button type="tyerror" :plain="true">危险按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal" :plain="true">默认按钮</b-button>
        <b-button type="typrimary" :plain="true">主要按钮</b-button>
        <b-button type="tysuccess" :plain="true">成功按钮</b-button>
        <b-button type="tywarning" :plain="true">警告按钮</b-button>
        <b-button type="tyerror" :plain="true">危险按钮</b-button>
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
            <b-button type="tynormal"  disabled="disabled">默认按钮</b-button>
            <b-button type="typrimary" disabled="disabled">主要按钮</b-button>
            <b-button type="tysuccess" disabled="disabled">成功按钮</b-button>
            <b-button type="tywarning" disabled="disabled">警告按钮</b-button>
            <b-button type="tyerror"   disabled="disabled">危险按钮</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal"  disabled="disabled">默认按钮</b-button>
        <b-button type="typrimary"  disabled="disabled">主要按钮</b-button>
        <b-button type="tysuccess"  disabled="disabled">成功按钮</b-button>
        <b-button type="tywarning" disabled="disabled">警告按钮</b-button>
        <b-button type="tyerror"   disabled="disabled">危险按钮</b-button>
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
            <b-button type="tynormal"  :circle="true"></b-button>
            <b-button type="typrimary" :circle="true"></b-button>
            <b-button type="tysuccess" :circle="true"></b-button>
            <b-button type="tywarning" :circle="true"></b-button>
            <b-button type="tyerror"   :circle="true"></b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal"  :circle="true"></b-button>
        <b-button type="typrimary" :circle="true"></b-button>
        <b-button type="tysuccess" :circle="true"></b-button>
        <b-button type="tywarning" :circle="true"></b-button>
        <b-button type="tyerror"   :circle="true"></b-button>
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
            <b-button type="tynormal"  icon="daochukehuxinxi"></b-button>
            <b-button type="typrimary" icon="fapiaoshengcheng"></b-button>
            <b-button type="tysuccess" icon="pipeixinxi"></b-button>
            <b-button type="tywarning" icon="qianshouxinxi"></b-button>
            <b-button type="tyerror"   icon="chuangjianyonghu"></b-button>
            <b-button type="tyerror"   icon="shengchengdaikai"></b-button>
            <b-button type="tywarning" icon="daochuduanxinjilu"></b-button>
            <b-button type="tysuccess" icon="dayin"></b-button>
            <b-button type="typrimary" icon="daochuwordwendang"></b-button>
            <b-button type="tynormal"  icon="wangshangbaoshui"></b-button> 
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal"  icon="daochukehuxinxi"></b-button>
        <b-button type="typrimary" icon="fapiaoshengcheng"></b-button>
        <b-button type="tysuccess" icon="pipeixinxi"></b-button>
        <b-button type="tywarning" icon="qianshouxinxi"></b-button>
        <b-button type="tyerror"   icon="chuangjianyonghu"></b-button>
        <b-button type="tyerror"   icon="shengchengdaikai"></b-button>
        <b-button type="tywarning" icon="daochuduanxinjilu"></b-button>
        <b-button type="tysuccess" icon="dayin"></b-button>
        <b-button type="typrimary" icon="daochuwordwendang"></b-button>
        <b-button type="tynormal"  icon="wangshangbaoshui"></b-button> 
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
            <b-button  type="typrimary" :loading="true">加载中</b-button>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="typrimary" :loading="true">加载中</b-button>
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
| size     | 尺寸   | string  |  `normal`、`small`  、`big`       |    normal   |
| type     | 类型   | string    |   `tynormal` 、`typrimary`、`tysuccess`  、`tywarning` 、`tyerror`|     typrimary  |
| loading     | 是否圆角按钮   | boolean    |    |     false  |
| round     | 是否加载中状态   | boolean    |    |     false  |
| plain     | 是否朴素按钮   | boolean    |    |     false  |
| disabled     | 是否禁用状态   | 	boolean    |   `无`  |     false  |
| icon     | 图表类型   | 	string    |   `参考icon代码`  |       |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |
