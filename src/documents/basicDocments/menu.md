# Menu 导航菜单
&nbsp;
## 概述
<br>
导航菜单，可分为纵向和横向，纵向可设置【一级】、【二级】、【三级】菜单；横向只有【一级】、【二级】菜单；

### 基础用法

基本用法:纵向

<div class="example">
    <div class="example-box"  >
        <div style="width:400px;">
            <b-menu
                :router="false"
                :accordion="false"
                trigger="click"
                active-name="2-1"
            >
                <div>
                    <b-menu-item name="1" icon="chaobaoshuiguanli">处理中心1</b-menu-item>
                    <b-submenu name="2" icon="caiji">
                        <template slot="title">
                            处理中心2
                        </template>
                        <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                        <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                    </b-submenu>
                    <b-submenu name="3" icon="baobiao">
                        <template slot="title">
                            处理中心3
                        </template>
                        <b-submenu name="3-1" >
                            <template slot="title">
                                处理中心3-1
                            </template>
                            <b-menu-item name="3-1-1" >处理中心3-1-1</b-menu-item>
                            <b-menu-item name="3-1-2" icon="caiji" >处理中心3-1-2</b-menu-item>
                            <b-menu-item name="3-1-3" :disabled="true">处理中心3-1-3</b-menu-item>
                        </b-submenu>
                        <b-menu-item name="3-2" >处理中心3-2</b-menu-item>
                        <b-submenu name="3-3" >
                            <template slot="title">
                                处理中心3-3
                            </template>
                            <b-menu-item name="3-3-1" >处理中心3-3-1</b-menu-item>
                            <b-menu-item name="3-3-2" >处理中心3-3-2</b-menu-item>
                            <b-menu-item name="3-3-3" icon="caiji" :disabled="true">处理中心3-3-3</b-menu-item>
                        </b-submenu>
                        <b-menu-group title="处理中心3-4" >
                            <b-menu-item name="3-4-1" >处理中心3-4-1</b-menu-item>
                            <b-menu-item name="3-4-2" >处理中心3-4-2</b-menu-item>
                        </b-menu-group>
                        <b-menu-item name="3-5" :disabled="true" >处理中心3-5</b-menu-item>
                        <b-menu-group title="处理中心3-6" >
                              <b-menu-item name="3-6-1" :disabled="true">处理中心3-6-1</b-menu-item>
                              <b-menu-item name="3-6-2" >处理中心3-6-2</b-menu-item>
                          </b-menu-group>
                    </b-submenu>
                    <b-submenu name="4" icon="baobiao" :disabled="true">
                        <template slot="title">
                            处理中心4
                        </template>
                     </b-submenu>
                     <b-menu-group title="处理中心5" >
                         <b-menu-item name="5-1" >处理中心5-1</b-menu-item>
                         <b-menu-item name="5-2" >处理中心5-2</b-menu-item>
                     </b-menu-group>
                     <b-menu-group title="处理中心6" >
                          <b-menu-item name="6-1" :disabled="true">处理中心6-1</b-menu-item>
                          <b-menu-item name="6-2" >处理中心6-2</b-menu-item>
                      </b-menu-group>
                </div>
            </b-menu>
        </div>
    </div>

::: code
```html
   <div class="example-box">
       <div style="width:400px;">
           <b-menu
               :router="false"
               :accordion="false"
               trigger="click"
               active-name="2-1"
           >
               <div>
                   <b-menu-item name="1" icon="chaobaoshuiguanli">处理中心1</b-menu-item>
                   <b-submenu name="2" icon="caiji">
                       <template slot="title">
                           处理中心2
                       </template>
                       <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                       <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                   </b-submenu>
                   <b-submenu name="3" icon="baobiao">
                       <template slot="title">
                           处理中心3
                       </template>
                       <b-submenu name="3-1" >
                           <template slot="title">
                               处理中心3-1
                           </template>
                           <b-menu-item name="3-1-1" >处理中心3-1-1</b-menu-item>
                           <b-menu-item name="3-1-2" icon="caiji" >处理中心3-1-2</b-menu-item>
                           <b-menu-item name="3-1-3" :disabled="true">处理中心3-1-3</b-menu-item>
                       </b-submenu>
                       <b-menu-item name="3-2" >处理中心3-2</b-menu-item>
                       <b-submenu name="3-3" >
                           <template slot="title">
                               处理中心3-3
                           </template>
                           <b-menu-item name="3-3-1" >处理中心3-3-1</b-menu-item>
                           <b-menu-item name="3-3-2" >处理中心3-3-2</b-menu-item>
                           <b-menu-item name="3-3-3" icon="caiji" :disabled="true">处理中心3-3-3</b-menu-item>
                       </b-submenu>
                       <b-menu-group title="处理中心3-4" >
                           <b-menu-item name="3-4-1" >处理中心3-4-1</b-menu-item>
                           <b-menu-item name="3-4-2" >处理中心3-4-2</b-menu-item>
                       </b-menu-group>
                       <b-menu-item name="3-5" :disabled="true" >处理中心3-5</b-menu-item>
                       <b-menu-group title="处理中心3-6" >
                             <b-menu-item name="3-6-1" :disabled="true">处理中心3-6-1</b-menu-item>
                             <b-menu-item name="3-6-2" >处理中心3-6-2</b-menu-item>
                         </b-menu-group>
                   </b-submenu>
                   <b-submenu name="4" icon="baobiao" :disabled="true">
                       <template slot="title">
                           处理中心4
                       </template>
                    </b-submenu>
                    <b-menu-group title="处理中心5" >
                        <b-menu-item name="5-1" >处理中心5-1</b-menu-item>
                        <b-menu-item name="5-2" >处理中心5-2</b-menu-item>
                    </b-menu-group>
                    <b-menu-group title="处理中心6" >
                         <b-menu-item name="6-1" :disabled="true">处理中心6-1</b-menu-item>
                         <b-menu-item name="6-2" >处理中心6-2</b-menu-item>
                     </b-menu-group>
               </div>
           </b-menu>
       </div>
    </div>
```
:::
</div>

### 基础用法

基本用法:横向,以及路由跳转

<div class="example">
    <div class="example-box">
        <div style="width:700px;background:#000;">
            <b-menu
                mode="horizontal"
                :router="true"
                trigger="hover"
                :accordion="true"
            >
               <div>
                   <b-menu-item name="1" icon="chaobaoshuiguanli" route="guide">指向项目介绍页面</b-menu-item>
                   <b-submenu name="2" icon="caiji">
                       <template slot="title">
                           处理中心2
                       </template>
                       <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                       <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                   </b-submenu>
                   <b-submenu name="3" icon="baobiao">
                       <template slot="title">
                           处理中心3
                       </template>
                       <b-menu-item name="3-2">处理中心3-2</b-menu-item>
                       <b-menu-item name="3-5" :disabled="true">处理中心3-5</b-menu-item>
                   </b-submenu>
                   <b-menu-item name="4"  :disabled="true">测试disabled</b-menu-item>
                   <b-submenu name="5" icon="baobiao" :disabled="true">
                       <template slot="title">
                           处理中心5
                       </template>
                       <b-menu-item name="5-1">处理中心5-1</b-menu-item>
                       <b-menu-item name="5-2" :disabled="true">处理中心5-2</b-menu-item>
                   </b-submenu>
               </div>
            </b-menu>
        </div>
    </div>

::: code
```html
   <div class="example-box">
       <div style="width:700px;background:#000;">
           <b-menu
               mode="horizontal"
               :router="true"
               trigger="hover"
               :accordion="true"
           >
              <div>
                  <b-menu-item name="1" icon="chaobaoshuiguanli" route="guide">指向项目介绍页面</b-menu-item>
                  <b-submenu name="2" icon="caiji">
                      <template slot="title">
                          处理中心2
                      </template>
                      <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                      <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                  </b-submenu>
                  <b-submenu name="3" icon="baobiao">
                      <template slot="title">
                          处理中心3
                      </template>
                      <b-menu-item name="3-2">处理中心3-2</b-menu-item>
                      <b-menu-item name="3-5" :disabled="true">处理中心3-5</b-menu-item>
                  </b-submenu>
                  <b-menu-item name="4"  :disabled="true">测试disabled</b-menu-item>
                  <b-submenu name="5" icon="baobiao" :disabled="true">
                      <template slot="title">
                          处理中心5
                      </template>
                      <b-menu-item name="5-1">处理中心5-1</b-menu-item>
                      <b-menu-item name="5-2" :disabled="true">处理中心5-2</b-menu-item>
                  </b-submenu>
              </div>
           </b-menu>
       </div>
    </div>
```
:::
</div>

### 手风琴效果

手风琴效果

<div class="example">
    <div class="example-box">
        <div style="width:400px;">
            <b-menu
                :router="false"
                :accordion="true"
                trigger="click"
            >
                <b-menu-item name="1" icon="chaobaoshuiguanli">处理中心1</b-menu-item>
                <b-submenu name="2" icon="caiji">
                    <template slot="title">
                        处理中心2
                    </template>
                    <b-menu-item name="2-1">处理中心2-1</b-menu-item>
                    <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                </b-submenu>
                <b-submenu name="3" icon="baobiao">
                    <template slot="title">
                        处理中心3
                    </template>
                    <b-submenu name="3-1" >
                        <template slot="title">
                            处理中心3-1
                        </template>
                        <b-menu-item name="3-1-1" >处理中心3-1-1</b-menu-item>
                        <b-menu-item name="3-1-2" >处理中心3-1-2</b-menu-item>
                        <b-menu-item name="3-1-3" >处理中心3-1-3</b-menu-item>
                    </b-submenu>
                    <b-menu-item name="3-2" >处理中心3-2</b-menu-item>
                </b-submenu>
            </b-menu>
        </div>
    </div>

::: code
```html
   <div class="example-box">
      <div style="width:400px;">
          <b-menu
              :router="false"
              :accordion="true"
              trigger="click"
          >
              <b-menu-item name="1" icon="chaobaoshuiguanli">处理中心1</b-menu-item>
              <b-submenu name="2" icon="caiji">
                  <template slot="title">
                      处理中心2
                  </template>
                  <b-menu-item name="2-1">处理中心2-1</b-menu-item>
                  <b-menu-item name="2-2">处理中心2-2</b-menu-item>
              </b-submenu>
              <b-submenu name="3" icon="baobiao">
                  <template slot="title">
                      处理中心3
                  </template>
                  <b-submenu name="3-1" >
                      <template slot="title">
                          处理中心3-1
                      </template>
                      <b-menu-item name="3-1-1" >处理中心3-1-1</b-menu-item>
                      <b-menu-item name="3-1-2" >处理中心3-1-2</b-menu-item>
                      <b-menu-item name="3-1-3" >处理中心3-1-3</b-menu-item>
                  </b-submenu>
                  <b-menu-item name="3-2" >处理中心3-2</b-menu-item>
              </b-submenu>
          </b-menu>
      </div>
    </div>
```
:::
</div>

### 主题切换

```theme```默认为```light```，当 ```theme``` 为```dark```时，展示效果如下

<br/>

横向展示：

<br/>

<div class="example">
    <div class="example-box">
        <div style="width:700px;">
            <b-menu
                mode="horizontal"
                :router="true"
                trigger="hover"
                theme="dark"
                :accordion="true"
            >
                <div>
                    <b-menu-item name="1" icon="chaobaoshuiguanli" route="guide">指向项目介绍页面</b-menu-item>
                    <b-submenu name="2" icon="caiji">
                        <template slot="title">
                            处理中心2
                        </template>
                        <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                        <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                    </b-submenu>
                    <b-submenu name="3" icon="baobiao">
                        <template slot="title">
                            处理中心3
                        </template>
                        <b-menu-item name="3-2">处理中心3-2</b-menu-item>
                        <b-menu-item name="3-5" :disabled="true">处理中心3-5</b-menu-item>
                    </b-submenu>
                    <b-menu-item name="4"  :disabled="true">测试disabled</b-menu-item>
                    <b-submenu name="5" icon="baobiao" :disabled="true">
                        <template slot="title">
                            处理中心5
                        </template>
                        <b-menu-item name="5-1">处理中心5-1</b-menu-item>
                        <b-menu-item name="5-2" :disabled="true">处理中心5-2</b-menu-item>
                    </b-submenu>
                </div>
            </b-menu>
        </div>
    </div>

::: code
```html
   <div class="example-box">
       <div style="width:700px;">
           <b-menu
               mode="horizontal"
               :router="true"
               trigger="hover"
               theme="dark"
               :accordion="true"
           >
               <div>
                   <b-menu-item name="1" icon="chaobaoshuiguanli" route="guide">指向项目介绍页面</b-menu-item>
                   <b-submenu name="2" icon="caiji">
                       <template slot="title">
                           处理中心2
                       </template>
                       <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                       <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                   </b-submenu>
                   <b-submenu name="3" icon="baobiao">
                       <template slot="title">
                           处理中心3
                       </template>
                       <b-menu-item name="3-2">处理中心3-2</b-menu-item>
                       <b-menu-item name="3-5" :disabled="true">处理中心3-5</b-menu-item>
                   </b-submenu>
                   <b-menu-item name="4"  :disabled="true">测试disabled</b-menu-item>
                   <b-submenu name="5" icon="baobiao" :disabled="true">
                       <template slot="title">
                           处理中心5
                       </template>
                       <b-menu-item name="5-1">处理中心5-1</b-menu-item>
                       <b-menu-item name="5-2" :disabled="true">处理中心5-2</b-menu-item>
                   </b-submenu>
               </div>
           </b-menu>
       </div>
    </div>
```
:::
</div>

<br/>

纵向展示：

<br/>

<div class="example">
    <div class="example-box"  >
        <div style="width:400px;">
            <b-menu
                :router="false"
                :accordion="false"
                trigger="click"
                active-name="2-1"
                theme="dark"
            >
                <div>
                    <b-menu-item name="1" icon="chaobaoshuiguanli">处理中心1</b-menu-item>
                    <b-submenu name="2" icon="caiji">
                        <template slot="title">
                            处理中心2
                        </template>
                        <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                        <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                    </b-submenu>
                    <b-submenu name="3" icon="baobiao">
                        <template slot="title">
                            处理中心3
                        </template>
                        <b-submenu name="3-1" >
                            <template slot="title">
                                处理中心3-1
                            </template>
                            <b-menu-item name="3-1-1" >处理中心3-1-1</b-menu-item>
                            <b-menu-item name="3-1-2" icon="caiji" >处理中心3-1-2</b-menu-item>
                            <b-menu-item name="3-1-3" :disabled="true">处理中心3-1-3</b-menu-item>
                        </b-submenu>
                        <b-menu-item name="3-2" >处理中心3-2</b-menu-item>
                        <b-submenu name="3-3" >
                            <template slot="title">
                                处理中心3-3
                            </template>
                            <b-menu-item name="3-3-1" >处理中心3-3-1</b-menu-item>
                            <b-menu-item name="3-3-2" >处理中心3-3-2</b-menu-item>
                            <b-menu-item name="3-3-3" icon="caiji" :disabled="true">处理中心3-3-3</b-menu-item>
                        </b-submenu>
                        <b-menu-group title="处理中心3-4" >
                            <b-menu-item name="3-4-1" >处理中心3-4-1</b-menu-item>
                            <b-menu-item name="3-4-2" >处理中心3-4-2</b-menu-item>
                        </b-menu-group>
                        <b-menu-item name="3-5" :disabled="true" >处理中心3-5</b-menu-item>
                        <b-menu-group title="处理中心3-6" >
                              <b-menu-item name="3-6-1" :disabled="true">处理中心3-6-1</b-menu-item>
                              <b-menu-item name="3-6-2" >处理中心3-6-2</b-menu-item>
                          </b-menu-group>
                    </b-submenu>
                    <b-submenu name="4" icon="baobiao" :disabled="true">
                        <template slot="title">
                            处理中心4
                        </template>
                     </b-submenu>
                     <b-menu-group title="处理中心5" >
                         <b-menu-item name="5-1" >处理中心5-1</b-menu-item>
                         <b-menu-item name="5-2" >处理中心5-2</b-menu-item>
                     </b-menu-group>
                     <b-menu-group title="处理中心6" >
                          <b-menu-item name="6-1" :disabled="true">处理中心6-1</b-menu-item>
                          <b-menu-item name="6-2" >处理中心6-2</b-menu-item>
                      </b-menu-group>
                </div>
            </b-menu>
        </div>
    </div>

::: code
```html
   <div class="example-box">
       <div style="width:400px;">
           <b-menu
               :router="false"
               :accordion="false"
               trigger="click"
               active-name="2-1"
               theme="dark"
           >
               <div>
                   <b-menu-item name="1" icon="chaobaoshuiguanli">处理中心1</b-menu-item>
                   <b-submenu name="2" icon="caiji">
                       <template slot="title">
                           处理中心2
                       </template>
                       <b-menu-item name="2-1" :disabled="true">处理中心2-1</b-menu-item>
                       <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                   </b-submenu>
                   <b-submenu name="3" icon="baobiao">
                       <template slot="title">
                           处理中心3
                       </template>
                       <b-submenu name="3-1" >
                           <template slot="title">
                               处理中心3-1
                           </template>
                           <b-menu-item name="3-1-1" >处理中心3-1-1</b-menu-item>
                           <b-menu-item name="3-1-2" icon="caiji" >处理中心3-1-2</b-menu-item>
                           <b-menu-item name="3-1-3" :disabled="true">处理中心3-1-3</b-menu-item>
                       </b-submenu>
                       <b-menu-item name="3-2" >处理中心3-2</b-menu-item>
                       <b-submenu name="3-3" >
                           <template slot="title">
                               处理中心3-3
                           </template>
                           <b-menu-item name="3-3-1" >处理中心3-3-1</b-menu-item>
                           <b-menu-item name="3-3-2" >处理中心3-3-2</b-menu-item>
                           <b-menu-item name="3-3-3" icon="caiji" :disabled="true">处理中心3-3-3</b-menu-item>
                       </b-submenu>
                       <b-menu-group title="处理中心3-4" >
                           <b-menu-item name="3-4-1" >处理中心3-4-1</b-menu-item>
                           <b-menu-item name="3-4-2" >处理中心3-4-2</b-menu-item>
                       </b-menu-group>
                       <b-menu-item name="3-5" :disabled="true" >处理中心3-5</b-menu-item>
                       <b-menu-group title="处理中心3-6" >
                             <b-menu-item name="3-6-1" :disabled="true">处理中心3-6-1</b-menu-item>
                             <b-menu-item name="3-6-2" >处理中心3-6-2</b-menu-item>
                         </b-menu-group>
                   </b-submenu>
                   <b-submenu name="4" icon="baobiao" :disabled="true">
                       <template slot="title">
                           处理中心4
                       </template>
                    </b-submenu>
                    <b-menu-group title="处理中心5" >
                        <b-menu-item name="5-1" >处理中心5-1</b-menu-item>
                        <b-menu-item name="5-2" >处理中心5-2</b-menu-item>
                    </b-menu-group>
                    <b-menu-group title="处理中心6" >
                         <b-menu-item name="6-1" :disabled="true">处理中心6-1</b-menu-item>
                         <b-menu-item name="6-2" >处理中心6-2</b-menu-item>
                     </b-menu-group>
               </div>
           </b-menu>
       </div>
    </div>
```
:::
</div>

### Menu props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| theme   | menu主题   | String  |  ```primary```、```light```、```dark``` , ```primary```和```light``` 风格相同      |    ```primary```   |
| mode   | 菜单方向   | String  |  ```horizontal```、```vertical```         |    ```horizontal```   |
| active-name  | 激活菜单的 name 值   | String / Number  |          |      |
| open-names   | 展开的 Submenu 的 name 集合 | Array  |          |   []   |
| accordion     | 是否开启手风琴模式，开启后每次至多展开一个子菜单 | Boolean  |    ```true```、```false```      |   false   |
| width    | 导航菜单的宽度,垂直方向时可以使用 | String / Number  |          |   -   |
| router    | 是否使用 | Boolean  |          |   -   |
| trigger   | 子菜单打开的触发方式 | String |     ```hover``` / ```click```     |   click   |

### Menu events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-select     | 选择菜单（MenuItem）时触发  | menuItem 的信息 |
| on-open-change     | 当 展开/收起 子菜单时触发  | 当前展开的 Submenu 的 name 值数组 |

### Menu methods
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| updateOpened  | 手动更新展开的子目录，注意要在 $nextTick 里调用 | 无 |
| updateActiveName | 手动更新当前选择项，注意要在 $nextTick 里调用  | 无 |


### MenuItem props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 菜单项的唯一标识，必填   | String / Number    |    |   -  |
| icon     | 名称前面的icon类型   | String     |    |   -  |
| route     | 跳转的链接，支持 vue-router 对象  | String / Object    |    |   -  |
| disabled   | 是否禁用  | boolean    |  ```true```、```false```  |   false  |


### Submenu props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 子菜单的唯一标识，必填  | String / Number    |    |   -  |
| icon     | 名称前面的icon类型   | String     |    |   -  |
| disabled  | 是否禁用  | boolean    |  ```true```、```false```   |   false  |

### Submenu slot
| 名称	      | 说明	    |
|---------- |-------- |
| 无     | 菜单项 |
| title   | 子菜单标题  |

### MenuGroup props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title  | 分组标题  | String   |    |   -  |
| icon     | 名称前面的icon类型   | String     |    |   -  |
