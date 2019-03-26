<script>
  export default {
      data () {
        return {
            test: false,
            flagChecked: true,
            fruit: 'orange',
            button1: '兔子',
            button2: '猴子',
            button3: '泰迪',
            button4: '兔子',
            button5: '猴子',
            button6: '泰迪',
            type:false
        }
      },
      methods: {
          change(data){
              console.log('change',data)
          },
          changeGroup(data){
            console.log('changegroup',data)
          },
          handleClick(data){
            console.log('clickValue',data)
          }
      }
  }
</script>

# Radio 单选
基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。
-----
### 基础用法
可使用 v-model 实现数据的双向绑定。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-radio label='banana' v-model='test' @on-change="change"></b-radio>
            <p>{{test}}</p>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-radio label='banana' v-model='test' @on-change="change"></b-radio>
        <p>{{test}}</p>
    </template>
    <script>
        export default {
            data () {
                return {
                    test: ''
                }
            }
        }
    </script>
```
:::

### 组合使用
使用RadioGroup实现一组互斥的选项组。在组合使用时，Radio 使用 label 来自动判断。每个 Radio 的内容可以自定义，如不填写则默认使用 label 的值。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-radio label='已选失效项' v-model="flagChecked" disabled></b-radio>
            <b-radio-group v-model="fruit">
                <b-radio label='apple' disabled></b-radio>
                <b-radio label='banana'></b-radio>
                <b-radio label='orange'></b-radio>
            </b-radio-group>
            <p>{{fruit}}</p>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-radio label='已选失效项' v-model="flagChecked" disabled></b-radio>
        <b-radio-group v-model="fruit">
            <b-radio label='apple' disabled></b-radio>
            <b-radio label='banana'></b-radio>
            <b-radio label='orange'></b-radio>
        </b-radio-group>
        <p>{{fruit}}</p>
    </template>
    <script>
        export default {
            data () {
                return {
                    fruit: 'orange'
                }
            }
        }
    </script>
```
:::

<br/>
组合使用时可以设置属性type为 false 来应用按钮的样式。
<br/>
<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-radio-group v-model="button1" :type="type" @on-change="changeGroup">
                <b-radio label='兔子'></b-radio>
                <b-radio label='猴子'></b-radio>
                <b-radio label='泰迪'></b-radio>
            </b-radio-group>
            <p>{{button1}}</p>
            <br>
            <b-radio-group v-model="button2" :type="type" @on-change="changeGroup">
                <b-radio label='兔子'></b-radio>
                <b-radio label='猴子' disabled></b-radio>
                <b-radio label='泰迪'></b-radio>
            </b-radio-group>
            <p>{{button2}}</p>
            <br>
            <b-radio-group v-model="button3" :type="type" @on-change="changeGroup">
                <b-radio label='兔子' disabled></b-radio>
                <b-radio label='猴子' disabled></b-radio>
                <b-radio label='泰迪' disabled></b-radio>
            </b-radio-group>
            <p>{{button3}}</p>
        </div>
    </div>
</div>

::: code
```html
    <template>
         <b-radio-group v-model="button1" :type="type" @on-change="changeGroup">
            <b-radio label='兔子'></b-radio>
            <b-radio label='猴子'></b-radio>
            <b-radio label='泰迪'></b-radio>
        </b-radio-group>
        <p>{{button1}}</p>
        <br>
        <b-radio-group v-model="button2" :type="type" @on-change="changeGroup">
            <b-radio label='兔子'></b-radio>
            <b-radio label='猴子' disabled></b-radio>
            <b-radio label='泰迪'></b-radio>
        </b-radio-group>
        <p>{{button2}}</p>
        <br>
        <b-radio-group v-model="button3" :type="type" @on-change="changeGroup">
            <b-radio label='兔子' disabled></b-radio>
            <b-radio label='猴子' disabled></b-radio>
            <b-radio label='泰迪' disabled></b-radio>
        </b-radio-group>
        <p>{{button3}}</p>
    </template>
    <script>
        export default {
            data () {
                return {
                    type:false,
                    button1: '兔子',
                    button2: '猴子',
                    button3: '泰迪'
                }
            }
        }
    </script>
```
:::

### 尺寸
通过设置属性size为large或small将按钮样式设置为大和小尺寸，不设置为默认(中)尺寸。<br/>
<div class="example">
    <div class="example-box">
        <div>
            <b-radio-group v-model="button4" :type="type" size="large" @on-change="changeGroup">
                <b-radio label='兔子'></b-radio>
                <b-radio label='猴子'></b-radio>
                <b-radio label='泰迪'></b-radio>
            </b-radio-group>
            <p>{{button4}}</p>
            <br>
            <b-radio-group v-model="button5" :type="type" @on-change="changeGroup">
                <b-radio label='兔子'></b-radio>
                <b-radio label='猴子'></b-radio>
                <b-radio label='泰迪'></b-radio>
            </b-radio-group>
            <p>{{button5}}</p>
            <br>
            <b-radio-group v-model="button6"  size="small" :type="type" @on-change="changeGroup" @on-click="handleClick">
                <b-radio label='兔子'></b-radio>
                <b-radio label='猴子'></b-radio>
                <b-radio label='泰迪'></b-radio>
            </b-radio-group>
            <p>{{button6}}</p>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-radio-group v-model="button4" :type="type" size="large" @on-change="changeGroup">
            <b-radio label='兔子'></b-radio>
            <b-radio label='猴子'></b-radio>
            <b-radio label='泰迪'></b-radio>
        </b-radio-group>
        <p>{{button4}}</p>
        <br>
        <b-radio-group v-model="button5" :type="type" @on-change="changeGroup">
            <b-radio label='兔子'></b-radio>
            <b-radio label='猴子'></b-radio>
            <b-radio label='泰迪'></b-radio>
        </b-radio-group>
        <p>{{button5}}</p>
        <br>
        <b-radio-group v-model="button6"  size="small" :type="type" @on-change="changeGroup" @on-click="handleClick">
            <b-radio label='兔子'></b-radio>
            <b-radio label='猴子'></b-radio>
            <b-radio label='泰迪'></b-radio>
        </b-radio-group>
        <p>{{button6}}</p>
    </template>
    <script>
        export default {
            data () {
                return {
                    button4: '兔子',
                    button5: '猴子',
                    button6: '泰迪',
                }
            }
        }
    </script>
```
:::

### Radio props
| 参数      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
|value	|只在单独使用时有效。可以使用 v-model 双向绑定数据|	Boolean|false|
|label	|只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目|	String,Number|	-|
|disabled|	是否禁用当前项	|Boolean|	false
|size	|单选框的尺寸，可选值为 large、small、default 或者不设置|	String	|-|
|true-value|	选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用	|String, Number, Boolean|	true|
|false-value|	没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用|	String, Number, Boolean|	false|

### Radio events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发   |  ...  |


### RadioGroup props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|value	|指定当前选中的项目数据。可以使用 v-model 双向绑定数据|	String,Number|-|
|type	|可选值为false，为 button 时使用按钮样式|	Boolean|true|
|size	|尺寸，可选值为large、small、default或者不设置|	String|	-|
|vertical	|是否垂直排列，按钮样式下无效|Boolean|false|

### RadioGroup events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发   |  ...  |

