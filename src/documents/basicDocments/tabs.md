# Tabs 标签页
-----
选项卡切换组件。

### 何时使用
提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
### 基础用法

<div class="example">
    <div class="example-box">
            <tabs value ="0" >
                <tab-panel label="标签一" name="0" >
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="0">
                <tab-panel label="标签一" name="0">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 禁用某一项

<div class="example">
    <div class="example-box">
            <tabs value ="0">
                <tab-panel label="标签一" name="0">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1" disabled>
                    标签二
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="0">
                <tab-panel label="标签一" name="0" >
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1" disabled>
                    标签二
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 图标

<div class="example">
    <div class="example-box">
            <tabs value ="0">
                <tab-panel label="标签一" name="0"  icon="zhushou_gw">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1"icon="biaoqian" >
                    标签二
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="0">
                <tab-panel label="标签一" name="0" icon="zhushou_gw">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1" icon="biaoqian">
                    标签二
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 样式

<div class="example">
    <div class="example-box">
            <tabs value ="0" type="line">
                <tab-panel label="标签一" name="0">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="0">
                <tab-panel label="标签一" name="0" type="line">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 迷你形

<div class="example">
    <div class="example-box">
            <tabs value ="0" type="line" size="small">
                <tab-panel label="标签一" name="0">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="0">
                <tab-panel label="标签一" name="0" type="line" size="small">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 可关闭

<div class="example">
    <div class="example-box">
            <tabs value ="0" closable @on-tab-remove="handleTabRemove">
                <tab-panel label="标签一" name="0" v-if="tab0">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1" v-if="tab1">
                    标签二
                </tab-panel>
            </tabs>
<script>
    export default {
        data () {
            return {
                tab0: true,
                tab1: true
            }
        },
        methods: {
            handleTabRemove (name) {
                this['tab' + name] = false;
                console.log(this['tab' + name])
            }
        }
    }
</script>
    </div>

::: code
```html
         <tabs value ="0" closable @on-tab-remove="handleTabRemove">
                <tab-panel label="标签一" name="0" >
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1">
                    标签二
                </tab-panel>
            </tabs>
            <script>
    export default {
        data () {
            return {
                tab0: true,
                tab1: true
            }
        },
        methods: {
            handleTabRemove (name) {
                this['tab' + name] = false;
            }
        }
    }
</script>  
```
:::
</div>



### Tabs Props
| 参数 | 说明 | 类型 | 可选值 |默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据  | String  | --- |默认为第一项的 name |
| type | 页签的基本样式，可选值为 line 和 card  | String  | --- |card |
| size | 尺寸，可选值为 default 和 small，仅在 type="line" 时有效  | String  | --- |default |
| closable | 是否可以关闭页签，仅在 type="card" 时有效  | Boolean  | --- |false |

### Tabs events
| 事件 | 说明 | 返回值 | 
| ---- | ---- | ---- | ---- | ---- |
|on-tab-remove|tab 被关闭时触发|name|
### TabPane Slots
| 参数 | 说明 | 类型 | 可选值 |默认值 |
| ---- | ---- | ---- | ---- | ---- |
| name | 用于标识当前面板，对应 value，默认为其索引值  | String  | --- |--|
| label | 选项卡头显示文字  | String  | --- |空|
| disabled | 是否禁用该选项卡  | Boolean  | --- |false|
| icon | 选项卡图标  | String  | --- |空|





