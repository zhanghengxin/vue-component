# grid 栅格
使用栅格组件对网页进行布局，可以使页面排版有序、美观。

栅格组件借鉴了 bootsrap、iview 等 UI 库，使用行`row`和列`col`2个概念，采用24栅格布局，将区域进行24等分。
- 支持水平排列布局。
- 支持区间间隔。
- 支持栅格排序。
- 支持左右偏移。
- 支持flex栅格布局。
- 支持flex栅格排序。
- 支持响应式布局。

### 基础用法
支持水平排列布局。

使用`span` 属性计算每个`col`组件的尺寸。
<div class="example">
    <div class="example-box">
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
    <div class="example-box">
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
    <div class="example-box">
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
    <div class="example-box">
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