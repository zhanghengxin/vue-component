# grid 栅格
使用栅格组件对网页进行布局，可以使页面排版有序、美观。

栅格组件借鉴了 bootsrap、iview 等 UI 库，使用行`row`和列`col`2个概念，采用24栅格布局，将区域进行24等分。
- 支持水平排列布局。
- 支持区间间隔。
- 支持栅格排序。
- 支持左右偏移。
- 支持flex栅格布局。
- 支持flex栅格排序。

### 基础用法
支持水平排列布局。

使用`span` 属性计算每个`col`组件的尺寸。
<div class="example">
    <div class="example-box grid-example">
        <b-row>
            <b-col span=6>col-6</b-col>
            <b-col span=6>col-6</b-col>
            <b-col span=6>col-6</b-col>
            <b-col span=6>col-6</b-col>
        </b-row>
        <b-row>
            <b-col span=8>col-8</b-col>
            <b-col span=10>col-10</b-col>
            <b-col span=6>col-6</b-col>
        </b-row>
        <b-row>
            <b-col span=10>col-10</b-col>
            <b-col span=14>col-14</b-col>
        </b-row>
    </div>

::: code
```html
    <div>
        <b-row>
            <b-col span=6>col-6</b-col>
            <b-col span=6>col-6</b-col>
            <b-col span=6>col-6</b-col>
            <b-col span=6>col-6</b-col>
        </b-row>
        <b-row>
            <b-col span=8>col-8</b-col>
            <b-col span=10>col-10</b-col>
            <b-col span=6>col-6</b-col>
        </b-row>
        <b-row>
            <b-col span=10>col-10</b-col>
            <b-col span=14>col-14</b-col>
        </b-row>
    </div>
```
:::
</div>

### 区间间隔
支持栅格之间添加区间间距。

使用`interval` 属性添加到`row`组件上，给子组件`col`添加间距。
<div class="example">
    <div class="example-box grid-example">
        <div class="example-box-row-interval">
            <b-row interval= 20 >
                <b-col span="6">
                   <div>col-6</div>
                </b-col>
                <b-col span="6">
                   <div>col-6</div>
                </b-col>
                <b-col span="6">
                   <div>col-6</div>
                </b-col>
                <b-col span="6">
                   <div>col-6</div>
                </b-col>
            </b-row>
            <b-row interval= 10>
                <b-col span="10">
                   <div>col-10</div>
                </b-col>
                <b-col span="14">
                   <div>col-14</div>
                </b-col>
            </b-row>
        </div>
    </div>

::: code
```html
    <div>
        <b-row interval=20>
           <b-col span=6>
              <div>col-6</div>
           </b-col>
           <b-col span=6>
              <div>col-6</div>
           </b-col>
           <b-col span=6>
              <div>col-6</div>
           </b-col>
           <b-col span=6>
              <div>col-6</div>
           </b-col>
        </b-row>
        <b-row interval=10>
           <b-col span=10>
              <div>col-10</div>
           </b-col>
           <b-col span=14>
              <div>col-14</div>
           </b-col>
        </b-row>
    </div>
```
:::
</div>

### 栅格排序
可以通过设置 `forward` 和 `back`属性在`col`组件上设置栅格顺序。
<div class="example">
    <div class="example-box grid-example">
        <b-row>
            <b-col span="11" forward=13>col-11 | push-13</b-col>
            <b-col span="13" back=11>col-13 | pull-11</b-col>
        </b-row>
    </div>

::: code
```html
    <div>
        <b-row>
            <b-col span="11" forward="13">col-11 | push-13</b-col>
            <b-col span="13" back="11">col-13 | pull-11</b-col>
        </b-row>
    </div>
```
:::
</div>

### 左右偏移
可以通过设置 `offset`在`col`组件上设置栅格左右偏移距离。
<div class="example">
    <div class="example-box grid-example">
        <b-row>
            <b-col span="10" offset="4">col-10 | offset-4</b-col>
            <b-col span="6" offset="4">col-6 | pull-4</b-col>
        </b-row>
    </div>

::: code
```html
    <div>
        <b-row>
            <b-col span="10" offset="4">col-10 | offset-4</b-col>
            <b-col span="6" offset="4">col-6 | pull-4</b-col>
        </b-row>
    </div>
```
:::
</div>

### flex栅格排列布局
可以通过设置 `order`在`col`组件上设置栅格顺序。
`暂不支持 ie9`
<div class="example">
    <div class="example-box grid-example">
        <p>子元素向左排列</p>
        <b-row type="flex" justify="start">
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素向右排列</p>
        <b-row type="flex" justify="end">
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素居中排列</p>
        <b-row type="flex" justify="center">
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素等宽排列</p>
        <b-row type="flex" justify="space-between">
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素分散排列</p>
        <b-row type="flex" justify="space-around">
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
            <b-col span="4">col-4</b-col>
        </b-row>
    </div>

::: code
```html
    <div>
        <p>子元素向左排列</p>
        <b-row type="flex" justify="start">
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素向右排列</p>
        <b-row type="flex" justify="end">
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素居中排列</p>
        <b-row type="flex" justify="center">
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素等宽排列</p>
        <b-row type="flex" justify="space-between">
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
        </b-row>
        <p>子元素分散排列</p>
        <b-row type="flex" justify="space-around">
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
           <b-col span="4">col-4</b-col>
        </b-row>
    </div>
```
:::
</div>

### flex栅格对齐排序
可以通过设置 `order`在`col`组件上设置栅格顺序。
`暂不支持 ie9`
<div class="example">
    <div class="example-box grid-example">
          <p>顶部对齐</p>
          <b-row type="flex" justify="center" align="top">
              <b-col span="6"><p style="height: 80px">col-4</p></b-col>
              <b-col span="6"><p style="height: 30px">col-4</p></b-col>
              <b-col span="6"><p style="height: 100px">col-4</p></b-col>
              <b-col span="6"><p style="height: 60px">col-4</p></b-col>
          </b-row>
          <p>底部对齐</p>
          <b-row type="flex" justify="center" align="bottom">
              <b-col span="6"><p style="height: 80px">col-4</p></b-col>
              <b-col span="6"><p style="height: 30px">col-4</p></b-col>
              <b-col span="6"><p style="height: 100px">col-4</p></b-col>
              <b-col span="6"><p style="height: 60px">col-4</p></b-col>
          </b-row>
          <p>居中对齐</p>
          <b-row type="flex" justify="center" align="middle">
              <b-col span="6"><p style="height: 80px">col-4</p></b-col>
              <b-col span="6"><p style="height: 30px">col-4</p></b-col>
              <b-col span="6"><p style="height: 100px">col-4</p></b-col>
              <b-col span="6"><p style="height: 60px">col-4</p></b-col>
          </b-row>
    </div>

::: code
```html
    <div>
        <p>顶部对齐</p>
        <b-row type="flex" justify="center" align="top">
            <b-col span="6"><p style="height: 80px">col-4</p></b-col>
            <b-col span="6"><p style="height: 30px">col-4</p></b-col>
            <b-col span="6"><p style="height: 100px">col-4</p></b-col>
            <b-col span="6"><p style="height: 60px">col-4</p></b-col>
        </b-row>
        <p>底部对齐</p>
        <b-row type="flex" justify="center" align="bottom">
            <b-col span="4"><p style="height: 80px">col-4</p></b-col>
            <b-col span="4"><p style="height: 30px">col-4</p></b-col>
            <b-col span="4"><p style="height: 100px">col-4</p></b-col>
            <b-col span="4"><p style="height: 60px">col-4</p></b-col>
        </b-row>
        <p>居中对齐</p>
        <b-row type="flex" justify="center" align="middle">
            <b-col span="4"><p style="height: 80px">col-4</p></b-col>
            <b-col span="4"><p style="height: 30px">col-4</p></b-col>
            <b-col span="4"><p style="height: 100px">col-4</p></b-col>
            <b-col span="4"><p style="height: 60px">col-4</p></b-col>
        </b-row>
    </div>
```
:::
</div>


### flex栅格排序
可以通过设置 `order`在`col`组件上设置栅格顺序。
`暂不支持 ie9`
<div class="example">
    <div class="example-box grid-example">
       <b-row type="flex">
           <b-col span="6" order="4">1 | order-4</b-col>
           <b-col span="6" order="3">2 | order-3</b-col>
           <b-col span="6" order="2">3 | order-2</b-col>
           <b-col span="6" order="1">4 | order-1</b-col>
       </b-row>
    </div>

::: code
```html
    <div>
        <b-row type="flex">
           <b-col span="6" order="4">1 | order-4</b-col>
           <b-col span="6" order="3">2 | order-3</b-col>
           <b-col span="6" order="2">3 | order-2</b-col>
           <b-col span="6" order="1">4 | order-1</b-col>
        </b-row>
    </div>
```
:::
</div>


### 响应式布局
参考 [Bootstrap](https://v4.bootcss.com/docs/4.0/layout/overview/) 的响应式设计，五个响应尺寸：xs sm md lg xl。<br>可以调整浏览器尺寸来查看效果。
<div class="example">
    <div class="example-box grid-example">
        <b-row>
           <b-col :xs="1" :sm="4" :md="6" :lg="8" :xl='3'>b-col</b-col>
           <b-col :xs="1" :sm="4" :md="12" :lg="8" :xl='3'>b-col</b-col>
           <b-col :xs="22" :sm="16" :md="6" :lg="8" :xl='18'>b-col</b-col>
        </b-row>
    </div>

::: code
```html
    <div>
        <b-row>
           <b-col :xs="1" :sm="4" :md="6" :lg="8" :xl='3'>b-col</b-col>
           <b-col :xs="1" :sm="4" :md="12" :lg="8" :xl='3'>b-col</b-col>
           <b-col :xs="22" :sm="16" :md="6" :lg="8" :xl='18'>b-col</b-col>
        </b-row>
    </div>
```
:::
</div>


### row props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| interval     | 栅格之间的间隔,单位为px  | Number    |   -  |     0  |
| type     |  布局模式，切换栅格布局和普通布局   |  flex    |   - |     '' |
| justify     |   flex 布局的垂直对齐方式，当 type 为 `flex`生效  | string   |   `start`、`end`、`center`、`space-around`、`space-between` |     - |
| align     |   flex 布局的水平排列方式 ，当 type 为 `flex`生效   | string   |   `top`、`middle`、`bottom` |     - |


### col props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| span     | 栅格的占位格数  | Number / String    |  0~24的整数 |     -  |
| forward     |  栅格向后移动格数   |  Number / String    |   - |     - |
| back     |  栅格向前移动格数   |  Number / String    |   - |     - |
| offset     |  栅格左侧的间隔格数	   |  Number / String    |   - |     - |
| xs     |  `<768px` 响应式栅格，可为栅格数或一个包含其他属性的对象	   |  Number / String / Object	    |   - |     - |
| sm     |  `>=768px` 响应式栅格，可为栅格数或一个包含其他属性的对象	   |  Number / String / Object	    |   - |     - |
| md     |  `>=992px` 响应式栅格，可为栅格数或一个包含其他属性的对象	   |  Number / String / Object	    |   - |     - |
| lg     |  `>=1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象	   |  Number / String / Object	    |   - |     - |
| xl     |  `>=1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象	   |  Number / String / Object	    |   - |     - |
