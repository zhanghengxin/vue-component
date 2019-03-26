<script>
    var iconList = require('../../utils/icon.json')
    require('./affix.md')
    export default {
        data () {
            return {
                iconList: iconList
            }
        }
    }
</script>


# Icon 图标
bwUI使用的所有图标均来自公司内部[icon库](http://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=402308&keyword=)
-----
### 基础用法
使用```type``` 属性来定义 icon 的类型
<div class="example">
    <div class="example-box">
        <div>
            <b-icon type="juanshi"></b-icon>
            <b-icon type="biaoqian"></b-icon>
        </div>
    </div>

::: code
```html
    <div>
        <b-icon type="juanshi"></b-icon>
        <b-icon type="biaoqian"></b-icon>
    </div>
```
:::
</div>

### 不同尺寸
Icon 组件可以在不同场景下选择合适的按钮尺寸。
通过设置```size```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
            <b-icon type="juanshi" size=12></b-icon>
            <b-icon type="juanshi" size=40></b-icon>
        </div>
    </div>

::: code
```html
    <div>
        <b-icon type="juanshi" size=12></b-icon>
        <b-icon type="juanshi" size=40></b-icon>
    </div>
```
:::
</div>

### 颜色选择
Icon 组件设置不同的颜色
通过设置```color```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
            <b-icon type="juanshi" color="red"></b-icon>
            <b-icon type="juanshi" color="#fff000"></b-icon>
        </div>
    </div>

::: code
```html
    <div>
       <b-icon type="juanshi" color="red"></b-icon>
       <b-icon type="juanshi" color="#fff000"></b-icon>
   </div>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string    |   略，详见最下面列表 |     ''  |
| size     |  尺寸   | string/number    |   - |     12 |
| color     |   颜色   | string   |   - |     - |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击图标时触发   | -  |

### 所有图标列表
<div class="example">
    <div class="example-box">
        <ul class="icon-list">
            <li v-for="(item, index) in iconList" :key="index">
                <b-icon :type="item.className" size=24></b-icon>
                <div class="name">{{item.name}}</div>
                <div class="fontclass">{{item.className}}</div>
            </li>
        </ul>
    </div>
</div>
