# Button 按钮
常用的操作按钮。【李佳航】
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <bw-button type="tynormal">默认按钮</bw-button>
            <bw-button type="typrimary">主要按钮</bw-button>
            <bw-button type="tysuccess">成功按钮</bw-button>
            <bw-button type="tywarning">警告按钮</bw-button>
            <bw-button type="tyerror">危险按钮</bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal">默认按钮</bw-button>
        <bw-button type="typrimary">主要按钮</bw-button>
        <bw-button type="tysuccess">成功按钮</bw-button>
        <bw-button type="tywarning">警告按钮</bw-button>
        <bw-button type="tyerror">危险按钮</bw-button>
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
         <bw-button size="small">主要按钮</bw-button>
         <bw-button size="normal">主要按钮</bw-button>
         <bw-button size="big">主要按钮</bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button size="small">危险按钮</bw-button>
        <bw-button size="normal">危险按钮</bw-button>
        <bw-button size="big">危险按钮</bw-button>
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
            <bw-button type="tynormal" :round="true">默认按钮</bw-button>
            <bw-button type="typrimary" :round="true">主要按钮</bw-button>
            <bw-button type="tysuccess" :round="true">成功按钮</bw-button>
            <bw-button type="tywarning" :round="true">警告按钮</bw-button>
            <bw-button type="tyerror" :round="true">危险按钮</bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal" :round="true">默认按钮</bw-button>
        <bw-button type="typrimary" :round="true">主要按钮</bw-button>
        <bw-button type="tysuccess" :round="true">成功按钮</bw-button>
        <bw-button type="tywarning" :round="true">警告按钮</bw-button>
        <bw-button type="tyerror" :round="true">危险按钮</bw-button>
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
            <bw-button type="tynormal" :plain="true">默认按钮</bw-button>
            <bw-button type="typrimary" :plain="true">主要按钮</bw-button>
            <bw-button type="tysuccess" :plain="true">成功按钮</bw-button>
            <bw-button type="tywarning" :plain="true">警告按钮</bw-button>
            <bw-button type="tyerror" :plain="true">危险按钮</bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal" :plain="true">默认按钮</bw-button>
        <bw-button type="typrimary" :plain="true">主要按钮</bw-button>
        <bw-button type="tysuccess" :plain="true">成功按钮</bw-button>
        <bw-button type="tywarning" :plain="true">警告按钮</bw-button>
        <bw-button type="tyerror" :plain="true">危险按钮</bw-button>
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
            <bw-button type="tynormal"  disabled="disabled">默认按钮</bw-button>
            <bw-button type="typrimary" disabled="disabled">主要按钮</bw-button>
            <bw-button type="tysuccess" disabled="disabled">成功按钮</bw-button>
            <bw-button type="tywarning" disabled="disabled">警告按钮</bw-button>
            <bw-button type="tyerror"   disabled="disabled">危险按钮</bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal"  disabled="disabled">默认按钮</bw-button>
        <bw-button type="typrimary"  disabled="disabled">主要按钮</bw-button>
        <bw-button type="tysuccess"  disabled="disabled">成功按钮</bw-button>
        <bw-button type="tywarning" disabled="disabled">警告按钮</bw-button>
        <bw-button type="tyerror"   disabled="disabled">危险按钮</bw-button>
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
            <bw-button type="tynormal"  :circle="true"></bw-button>
            <bw-button type="typrimary" :circle="true"></bw-button>
            <bw-button type="tysuccess" :circle="true"></bw-button>
            <bw-button type="tywarning" :circle="true"></bw-button>
            <bw-button type="tyerror"   :circle="true"></bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal"  :circle="true"></bw-button>
        <bw-button type="typrimary" :circle="true"></bw-button>
        <bw-button type="tysuccess" :circle="true"></bw-button>
        <bw-button type="tywarning" :circle="true"></bw-button>
        <bw-button type="tyerror"   :circle="true"></bw-button>
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
            <bw-button type="tynormal"  icon="daochukehuxinxi"></bw-button>
            <bw-button type="typrimary" icon="fapiaoshengcheng"></bw-button>
            <bw-button type="tysuccess" icon="pipeixinxi"></bw-button>
            <bw-button type="tywarning" icon="qianshouxinxi"></bw-button>
            <bw-button type="tyerror"   icon="chuangjianyonghu"></bw-button>
            <bw-button type="tyerror"   icon="shengchengdaikai"></bw-button>
            <bw-button type="tywarning" icon="daochuduanxinjilu"></bw-button>
            <bw-button type="tysuccess" icon="dayin"></bw-button>
            <bw-button type="typrimary" icon="daochuwordwendang"></bw-button>
            <bw-button type="tynormal"  icon="wangshangbaoshui"></bw-button> 
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="tynormal"  icon="daochukehuxinxi"></bw-button>
        <bw-button type="typrimary" icon="fapiaoshengcheng"></bw-button>
        <bw-button type="tysuccess" icon="pipeixinxi"></bw-button>
        <bw-button type="tywarning" icon="qianshouxinxi"></bw-button>
        <bw-button type="tyerror"   icon="chuangjianyonghu"></bw-button>
        <bw-button type="tyerror"   icon="shengchengdaikai"></bw-button>
        <bw-button type="tywarning" icon="daochuduanxinjilu"></bw-button>
        <bw-button type="tysuccess" icon="dayin"></bw-button>
        <bw-button type="typrimary" icon="daochuwordwendang"></bw-button>
        <bw-button type="tynormal"  icon="wangshangbaoshui"></bw-button> 
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
            <bw-button  type="typrimary" :loading="true">加载中</bw-button>
        </div>
    </div>

::: code
```html
    <div>
        <bw-button type="typrimary" :loading="true">加载中</bw-button>
    </div>
```
:::
</div>

### 事件
Button 支持click 事件

<div class="example">
    <div class="example-box">
        <div>
            <bw-button  @on-click="handleClick">点击事件</bw-button>
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
       <bw-button  @on-click="handleClick">点击事件</bw-button>
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
