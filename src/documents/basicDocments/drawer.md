# Drawer 抽屉

### 基础抽屉

<div class="example-box">
    <div>
        <b-button type="primary"  @on-click="value1 = true">默认抽屉</b-button>
        <b-drawer title="Basic Drawer" closable v-model="value1">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
    </div>

::: code
```html
    <div>
        <b-button type="primary"  @on-click="value1 = true" >默认抽屉</b-button>
        <b-drawer title="Basic Drawer" closable v-model="value1">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </b-drawer>
    </div>
    <script>
        export default {
            data () {
                return { 
                    value1 :false,
                }
            }
        }
    </script>
```
:::
</div>

### 左侧滑出

<div class="example-box">
    <div>
        <b-button type="primary"  @on-click="value2 = true" >左侧滑出</b-button>
        <b-drawer title="Basic Drawer" placement="left" closable v-model="value2">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </b-drawer>
    </div>

::: code
```html
    <div>
        <b-button type="primary"  @on-click="value2 = true" >左侧滑出</b-button>
        <b-drawer title="Basic Drawer" placement="left" closable v-model="value2">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </b-drawer>
    </div>
    <script>
        export default {
            data () {
                return { 
                    value2 :false,
                }
            }
        }
    </script>
```
:::
</div>

### 按钮关闭

<div class="example-box">
    <div>
        <b-button type="primary"  @on-click="value3 = true" >按钮关闭</b-button>
        <b-drawer title="Basic Drawer" :mask-closable="false" closable v-model="value3">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <div class='drawer-footer'>
                <b-button @on-click="value3 = false">取消</b-button>
            </div>
        </b-drawer>
    </div>

::: code
```html
    <div>
        <b-button type="primary"  @on-click="value3 = true" >按钮关闭</b-button>
        <b-drawer title="Basic Drawer" :mask-closable="false" closable v-model="value3">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <div class='drawer-footer'>
                <b-button @on-click="value3 = false">取消</b-button>
            </div>
        </b-drawer>
    </div>
    <script>
        export default {
            data () {
                return { 
                    value3 :false,
                }
            }
        }
    </script>
    <style>
        .drawer-footer {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            border-top: 1px solid #e8e8e8;
            padding: 10px 16px;
            text-align: right;
            background: #fff;
        }
    </style>
```
:::
</div>

### 多层抽屉

<div class="example-box">
    <div>
        <b-button type="primary" @on-click="value5 = true">多层抽屉</b-button>
        <b-drawer title="第一层" width="512" :closable="false" v-model="value5">
            <b-button @on-click="value6 = true" type="primary">第二层</b-button>
        </b-drawer>
        <b-drawer title="第二层" :closable="false" v-model="value6">
            这个是第二层 Drawer
        </b-drawer>
    </div>

::: code
```html
    <div>
        <b-button type="primary" @on-click="value5 = true">多层抽屉</b-button>
        <b-drawer title="第一层" width="512" :closable="false" v-model="value5">
            <b-button @on-click="value6 = true" type="primary">第二层</b-button>
        </b-drawer>
        <b-drawer title="第二层" :closable="false" v-model="value6">
            这个是第二层 Drawer
        </b-drawer>
    </div>
    <script>
        export default {
            data () {
                return { 
                    value5 :false,
                    value6: false
                }
            }
        }
    </script>
    <style>
        .drawer-footer {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            border-top: 1px solid #e8e8e8;
            padding: 10px 16px;
            text-align: right;
            background: #fff;
        }
    </style>
```
:::
</div>

### 拖拽

<div class="example-box">
    <div>
        <b-button type="primary"  @on-click="value7 = true">拖拽</b-button>
        <b-drawer title="Basic Drawer" draggable closable v-model="value7">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </b-drawer>
    </div>

::: code
```html
    <div>
        <b-button type="primary"  @on-click="value7 = true" >拖拽</b-button>
        <b-drawer title="Basic Drawer" draggable closable v-model="value7">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </b-drawer>
    </div>
    <script>
        export default {
            data () {
                return { 
                    value7 :false,
                }
            }
        }
    </script>
```
:::
</div>

<script>
    export default {
        data () {
            return { 
                value1: false,
                value2: false,
                value3: false,
                value5: false,
                value6: false,
                value7: false
            }
        },
    }
</script>
<style>
.drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    background: #fff;
}
</style>

### props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value   | 抽屉是否显示，可使用 v-model 双向绑定数据 | Boolean  | `true` `false` | false | 
| title  | 抽屉标题，如果使用 slot 自定义了页头，则 title 无效 | String |
| width   | 抽屉宽度。当其值不大于 100 时以百分比显示，大于 100 时为像素 | Number/String  | | 256 |
| closable  | 是否显示右上角的关闭按钮 | Boolean  |  `true` `false`   |   false   |
| mask-closable  | 是否允许点击遮罩层关闭    | Boolean   |    |  true     |
| mask  | 是否显示遮罩层   | Boolean  |  |  true    |
| mask-style  | 遮罩层样式 | Object  |
| styles    | 抽屉中间层的样式  | Object   |
| scrollable    | 页面是否可以滚动  | Boolean   |  |    false   |
| palcement    | 抽屉的方向，可选值为 left 或 right  | String   |  `left` `right`  |   right   |
| class-name    | 设置抽屉容器.b-drawer-wrap的类名  | String   |
| draggable | 是否开启拖拽调整宽度 | Boolean | `true` `false` | false |

### events

| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-close    | 关闭抽屉时触发    |   |
| on-visible-change  | 显示状态发生变化时触发 | true/false |

### slot
| name	      | 说明	    |
|-------------|---------|
| header    | 自定义标题栏   |
| close   | 自定义右上角关闭内容 |
| trigger   | 自定义调整宽度节点  | - |
| | 抽屉主体内容 |