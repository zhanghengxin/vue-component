# tabs 标签页

-----
### 基础用法
单独使用时有未选中 未选失效项 已选失效项 选中项四种使用方式。
<div class="example">
    <div class="example-box">
        <div>
            <tabs>
                <tab-panel label="验证码登录" name="1">
                <!-- 验证码登录 -->
                </tab-panel>
                 <tab-panel label="密码登录" name="2">
                <!-- 密码登录 -->
                </tab-panel>
            </tabs>
        </div>
</div>
::: code
```html
    <div>
       <tabs>
                <tab-panel label="验证码登录" name="1">
                <!-- 验证码登录 -->
                </tab-panel>
                 <tab-panel label="密码登录" name="2">
                <!-- 密码登录 -->
                </tab-panel>
            </tabs>
    </div>
```
:::
</div>

组合使用 使用RadioGroup实现一组互斥的选项组。在组合使用时，Radio 使用 label 来自动判断。每个 Radio 的内容可以自定义，如不填写则默认使用 label 的值。
<div class="example">
    <div class="example-box">
      <b-radio-group v-model="fruit">
        <b-radio label='apple' v-model="flagChecked"></b-radio>
        <b-radio label='banana'></b-radio>
        <b-radio label='orange'></b-radio>
      </b-radio-group>
</div>


::: code
```html
    <div>
      <b-radio-group v-model="fruit">
        <b-radio label='apple' v-model="flagChecked"></b-radio>
        <b-radio label='banana'></b-radio>
        <b-radio label='orange'></b-radio>
      </b-radio-group>
    </div>
```
:::
</div>

组合使用时可以设置属性type为 button 来应用按钮的样式。
<div class="example">
    <div class="example-box">
      <b-radio-group v-model="button1" type="button1">
        <b-radio label='兔子' v-model="flagChecked"></b-radio>
        <b-radio label='猴子'></b-radio>
        <b-radio label='泰迪'></b-radio>
      </b-radio-group>
      <br>
      <b-radio-group v-model="button1" type="button2">
        <b-radio label='兔子' v-model="flagChecked"></b-radio>
        <b-radio label='猴子' disabled></b-radio>
        <b-radio label='泰迪'></b-radio>
      </b-radio-group>
      <br>
      <b-radio-group v-model="button1" type="button3">
        <b-radio label='兔子' disabled v-model="flagChecked"></b-radio>
        <b-radio label='猴子' disabled></b-radio>
        <b-radio label='泰迪' disabled></b-radio>
      </b-radio-group>
</div>


::: code
```html
    <div>
      <b-radio-group v-model="button1" type="button1">
        <b-radio label='兔子' v-model="flagChecked"></b-radio>
        <b-radio label='猴子'></b-radio>
        <b-radio label='泰迪'></b-radio>
      </b-radio-group>
      <br>
      <b-radio-group v-model="button1" type="button2">
        <b-radio label='兔子' v-model="flagChecked"></b-radio>
        <b-radio label='猴子' disabled></b-radio>
        <b-radio label='泰迪'></b-radio>
      </b-radio-group>
      <br>
      <b-radio-group v-model="button1" type="button3">
        <b-radio label='兔子' disabled v-model="flagChecked"></b-radio>
        <b-radio label='猴子' disabled></b-radio>
        <b-radio label='泰迪' disabled></b-radio>
      </b-radio-group>
    </div>
```
:::
</div>

### Radio props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     |  只在单独使用时有效。可以使用 v-model 双向绑定数据   | Boolean  |  -    |    false   |
| label     |  只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目   | String    |  -|     -  |
| disabled     | 是否禁用当前项	   | Boolean    |  -  |     false  |


### Radio events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发   |  ...  |


### RadioGroup props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     |  只在单独使用时有效。可以使用 v-model 双向绑定数据   | Boolean  |  -    |    false   |
| type     |  可选值为 button 或不填，为 button 时使用按钮样式   | String    |  -|     -  |

### RadioGroup events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发   |  ...  |

