# Dropdown下拉菜单
-----
### 基础用法

<div class="example">
    <div class="example-box">
            <b-dropdown>
                <div>
                    <span class=>下拉菜单</span>
                    <b-icon type="xia" size="14" color="#52b7fc"></b-icon>
                </div>
                <b-dropdown-menu slot="list">
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                </b-dropdown-menu>
            </b-dropdown>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b-dropdown>
                <b-button size="large">下拉菜单</b-button>
                <b-dropdown-menu slot="list">
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                </b-dropdown-menu>
            </b-dropdown>
    </div>

::: code
```html
           <b-dropdown>
                 <div>
                       <span class=>下拉菜单</span>
                       <b-icon type="xia" size="14" color="#52b7fc"></b-icon>
                 </div>
                 <b-dropdown-menu slot="list">
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                 </b-dropdown-menu>
           </b-dropdown>

           <b-dropdown>
                 <b-button size="large">下拉菜单</b-button>
                 <b-dropdown-menu slot="list">
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                 </b-dropdown-menu>
           </b-dropdown>
```
:::
</div>
-----
### 指令事件

<div class="example">
    <div class="example-box">
            <b-dropdown @command="handleCommand">
                <b-button size="large">下拉菜单</b-button>
                <b-dropdown-menu slot="list">
                    <b-dropdown-item command="hello">1111</b-dropdown-item>
                    <b-dropdown-item command="world">1111</b-dropdown-item>
                    <b-dropdown-item command="bye-bye">1111</b-dropdown-item>
                    <b-dropdown-item command="6+1">1111</b-dropdown-item>
                </b-dropdown-menu>
            </b-dropdown>
    </div>

::: code
```html
           <b-dropdown @command="handleCommand">
                        <b-button size="large">下拉菜单</b-button>
                        <b-dropdown-menu slot="list">
                             <b-dropdown-item command="hello">1111</b-dropdown-item>
                             <b-dropdown-item command="world">1111</b-dropdown-item>
                             <b-dropdown-item command="bye-bye">1111</b-dropdown-item>
                             <b-dropdown-item command="6+1">1111</b-dropdown-item>
                       </b-dropdown-menu>
           </b-dropdown>
           <script>
                   export default {
                       methods: {
                            handleCommand (command) {
                                  alert(command)
                                  }
                       }
                   }
           </script>
```
:::
</div>
-----
### 触发菜单行为方式（click，hover）

<div class="example">
    <div class="example-box">
            <b-dropdown>
                <b-button size="large">下拉菜单(hover)</b-button>
                <b-dropdown-menu slot="list">
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                    <b-dropdown-item>1111</b-dropdown-item>
                </b-dropdown-menu>
            </b-dropdown>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b-dropdown trigger="click">
                  <b-button size="large">下拉菜单(click)</b-button>
                       <b-dropdown-menu slot="list">
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                  </b-dropdown-menu>
            </b-dropdown>
    </div>

::: code
```html
           <b-dropdown>
                 <b-button size="large">下拉菜单</b-button>
                 <b-dropdown-menu slot="list">
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                 </b-dropdown-menu>
           </b-dropdown>

           <b-dropdown trigger="click">
                 <b-button size="large">下拉菜单</b-button>
                 <b-dropdown-menu slot="list">
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                       <b-dropdown-item>1111</b-dropdown-item>
                 </b-dropdown-menu>
           </b-dropdown>
```
:::
</div>
-----
### 嵌套菜单

<div class="example">
    <div class="example-box">
            <b-dropdown>
                  <b-button size="large">下拉菜单</b-button>
                  <b-dropdown-menu slot="list">
                       <b-dropdown-item>红藕香残玉簟秋</b-dropdown-item>
                       <b-dropdown-item>轻解罗裳，独上兰舟</b-dropdown-item>
                       <b-dropdown-item>云中谁寄锦书来</b-dropdown-item>
                       <b-dropdown placement="right-start">
                            <b-dropdown-item>
                                  雁字回时，月满西楼
                                  <b-icon  type="shujukanban" size="14" color="#52b7fc"></b-icon>
                            </b-dropdown-item>
                            <b-dropdown-menu slot="list">
                                  <b-dropdown-item>花自飘零水自流</b-dropdown-item>
                                  <b-dropdown-item>一种相思，两处闲愁</b-dropdown-item>
                                  <b-dropdown-item>此情无计可消除</b-dropdown-item>
                                  <b-dropdown-item>才下眉头，却上心头</b-dropdown-item>
                            </b-dropdown-menu>
                       </b-dropdown>
                  </b-dropdown-menu>
            </b-dropdown>
    </div>

::: code
```html
           <b-dropdown>
                 <b-button size="large">下拉菜单</b-button>
                 <b-dropdown-menu slot="list">
                       <b-dropdown-item>红藕香残玉簟秋</b-dropdown-item>
                       <b-dropdown-item>轻解罗裳，独上兰舟</b-dropdown-item>
                       <b-dropdown-item>云中谁寄锦书来</b-dropdown-item>
                       <b-dropdown placement="right-start">
                              <b-dropdown-item>
                                   雁字回时，月满西楼
                                   <b-icon  type="shujukanban" size="14" color="#52b7fc"></b-icon>
                              </b-dropdown-item>
                              <b-dropdown-menu slot="list">
                                     <b-dropdown-item>花自飘零水自流</b-dropdown-item>
                                     <b-dropdown-item>一种相思，两处闲愁</b-dropdown-item>
                                     <b-dropdown-item>此情无计可消除</b-dropdown-item>
                                     <b-dropdown-item>才下眉头，却上心头</b-dropdown-item>
                              </b-dropdown-menu>
                       </b-dropdown>
                 </b-dropdown-menu>
           </b-dropdown>
```
:::
</div>

### b-dropdown Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| placement | 菜单弹出位置   | string  | `top-start`、`top-end`、`bottom-start`、`bottom-end`、`left-start` | bottom-end |
| trigger | 触发下拉的方式 | string | `hover`、`click` | click |
| show-timeout    | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）| number|    | 300 |
| hide-timeout    | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）| number|    |200   |

### b-dropdown Slots
| name | 说明 |
| ---- | ---- |
|      | 触发下拉列表的元素，可以是自定义的元素或者组件   |
| list | 下拉列表， 通常是 `<b-dropdown-menu>` 组件 |

### b-dropdown Events
| 事件名称 | 说明 |   回调参数说明  |
| ---- | ---- |   ---- |
|  command | 点击菜单项触发的事件回调 |  b-dropdown-item的command指令   |
|  visible-change | 下拉框出现/隐藏时触发 |     |

### b-dropdown-item Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| command | 指令  | string、number、object  |  |  |
| disabled | 禁用菜单 | boolean |  | false |
| divided  | 显示菜单分割线| boolean|    | false |

