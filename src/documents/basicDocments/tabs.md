# Tabs 标签页
-----
### 基础用法

<div class="example">
    <div class="example-box">
            <tabs value ="1">
                <tab-panel label="验证码登录" name="1">
                    验证码登录
                </tab-panel>
                <tab-panel label="密码登录" name="2">
                    密码登录
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="1">
                <tab-panel label="验证码登录" name="1">
                    验证码登录
                </tab-panel>
                <tab-panel label="密码登录" name="2">
                    密码登录
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 禁用某一项

<div class="example">
    <div class="example-box">
            <tabs value ="1">
                <tab-panel label="验证码登录" name="1">
                    验证码登录
                </tab-panel>
                <tab-panel label="密码登录" name="2" disabled>
                    密码登录
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="1">
                <tab-panel label="验证码登录" name="1" >
                    验证码登录
                </tab-panel>
                <tab-panel label="密码登录" name="2" disabled>
                    密码登录
                </tab-panel>
            </tabs>  
```
:::
</div>
-----
### 图标

<div class="example">
    <div class="example-box">
            <tabs value ="1">
                <tab-panel label="验证码登录" name="1"  icon="juanshi">
                    验证码登录
                </tab-panel>
                <tab-panel label="密码登录" name="2"icon="biaoqian" >
                    密码登录
                </tab-panel>
            </tabs>
    </div>

::: code
```html
         <tabs value ="1">
                <tab-panel label="验证码登录" name="1" icon="juanshi">
                    验证码登录
                </tab-panel>
                <tab-panel label="密码登录" name="2" icon="biaoqian">
                    密码登录
                </tab-panel>
            </tabs>  
```
:::
</div>
</div>


### Tabs Props
| 参数 | 说明 | 类型 | 可选值 |默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据  | String  | --- |默认为第一项的 name |


### TabPane Slots
| 参数 | 说明 | 类型 | 可选值 |默认值 |
| ---- | ---- | ---- | ---- | ---- |
| name | 用于标识当前面板，对应 value，默认为其索引值  | String  | --- |--|
| label | 选项卡头显示文字  | String  | --- |空|
| disabled | 是否禁用该选项卡  | Boolean  | --- |false|
| icon | 选项卡图标  | String  | --- |空|





