<script>
    export default {
        methods:{
            spinShow () {
                this.$Spin.show()
                setTimeout(() => {
                    this.$Spin.hide()
                }, 3000)
            },
            spinCustom () {
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('b-icon', {
                                'class': 'spin-icon-loading',
                                props: {
                                    type: 'loading',
                                    size: 18
                                }
                            })
                        ])
                    }
                })
                setTimeout(() => {
                    this.$Spin.hide()
                }, 3000)
            }
        }
    }
</script>

# Spin 加载中
在请求的时候使用，加载数据时显示动画效果。`适配标签引用方式和 Loading 区分`

### 基础用法
标签直接引用
<div class="example">
    <div class="example-box">
        <div>
            <b-spin></b-spin>
        </div>
    </div>

::: code
```html
    <div>
        <b-spin></b-spin>
    </div>
```
:::
</div>

### 居中固定
在容器内部垂直居中固定，需要父级有relative或absolute。

<div class="example">
    <div class="example-box">
        <div>
            <div class="demo-spin-vertical">
                <b-spin fix></b-spin>
            </div>
        </div>
    </div>

::: code
```html
    <div>
       <div class="demo-spin-vertical">
           <b-spin fix></b-spin>
       </div>
    </div>
    <style>
        .demo-spin-vertical{
            width: 100%;
            height: 100px;
            position: relative;
            border: 1px solid #ccc;
        }
    </style>
```
:::
</div>

### 不同尺寸
通过设置`size`属性为`large`和`small`将 `Spin` 设置为大和小尺寸，不设置为默认（中）尺寸。

<div class="example">
    <div class="example-box">
        <div>
            <b-row>
                <b-col span='8'><b-spin size="small"></b-spin></b-col>
                <b-col span='8'><b-spin></b-spin></b-col>
                <b-col span='8'><b-spin size="large"></b-spin></b-col>
            </b-row>
        </div>
    </div>

::: code
```html
    <div>
        <b-spin size="small"></b-spin>
        <b-spin></b-spin>
        <b-spin size="large"></b-spin>
    </div>
```
:::
</div>

### 自定义内容
自定义 `Spin` 的内容，可以是简单的文字，也可以是很复杂的动画。

<div class="example">
    <div class="example-box">
        <div>
            <b-row>
                <b-col class="demo-spin-col" span="12">
                    <b-spin fix>Loding...</b-spin>
                </b-col>
                <b-col class="demo-spin-col" span="12">
                    <b-spin fix>
                        <b-icon type="loading" size=18 class="spin-icon-loading"></b-icon>
                        <div>Loding</div>
                    </b-spin>
                </b-col>
            </b-row>
        </div>
    </div>

::: code
```html
    <div>
       <b-row>
          <b-col class="demo-spin-col" span="12">
              <b-spin fix>Loding...</b-spin>
          </b-col>
          <b-col class="demo-spin-col" span="12">
              <b-spin fix>
                  <b-icon type="loading" size=18 class="spin-icon-loading"></b-icon>
                  <div>Loading</div>
              </b-spin>
          </b-col>
      </b-row>
    </div>
    <style>
       .demo-spin-col{
           height: 100px;
           position: relative;
           border: 1px solid #eee;
       }
       .spin-icon-loading{
           animation: ani-demo-spin 1s linear infinite;
       }
       @keyframes ani-demo-spin {
           from { transform: rotate(0deg);}
           50%  { transform: rotate(180deg);}
           to   { transform: rotate(360deg);}
       }
    </style>
```
:::
</div>

### 全局加载
使用内置的 `$Spin` 方法可以全局加载。

可以使用 `Render` 函数自定义显示内容。

<div class="example">
    <div class="example-box">
        <div>
            <b-button type="primary" @on-click="spinShow">全局引入，3秒后关闭</b-button>
            <b-button type="primary" @on-click="spinCustom">自定义显示</b-button>
        </div>
    </div>

::: code
```html
    <div>
      <b-button type="primary" @on-click="spinShow">全局引入，3秒后关闭</b-button>
      <b-button type="primary" @on-click="spinCustom">自定义显示</b-button>
    </div>
    <script>
        export default {
            methods:{
                spinShow () {
                    this.$Spin.show()
                    setTimeout(() => {
                        this.$Spin.hide()
                    }, 3000)
                },
                spinCustom () {
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('b-icon', {
                                    'class': 'spin-icon-loading',
                                    props: {
                                        type: 'loading',
                                        size: 18
                                    }
                                })
                            ])
                        }
                    })
                    setTimeout(() => {
                        this.$Spin.hide()
                    }, 3000)
                }
            }
        }
    </script>
     <style>
          .spin-icon-loading{
              animation: ani-demo-spin 1s linear infinite;
          }
          @keyframes ani-demo-spin {
              from { transform: rotate(0deg);}
              50%  { transform: rotate(180deg);}
              to   { transform: rotate(360deg);}
          }
    </style>
```
:::
</div>

### props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| size | 可选择的尺寸 | String  | `large`,`small`或者不填 |  |
| fix | 是否固定，需要父级有relative或absolute | Boolean | `false`,`true` | false|

### slot
| 参数 | 说明 |
| ---- | ---- |
| 无 | 自定义 Spin 的内容，设置slot后，默认的样式不生效 |
