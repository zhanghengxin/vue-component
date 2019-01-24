
<script>
    export default {
        data () {
            return {
                show:false,
                loading2:true
            }
        },
        methods:{
            showLoading(){
                 const loading = this.$Loading({
                    lock: true,
                    text: 'Loading',
                    body: true,
                    spinner: 'chushihua',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 1000);
            },
            openFullScreen() {
                this.show = true;
                setTimeout(() => {
                this.show = false;
                }, 2000);
            },
            changemal(e){
                
            }
        }
    }
</script>

# Input\Textarea 输入框
基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。
-----
### 基础用法
可使用 v-model 实现数据的双向绑定。<br/>
可直接设置 style 来改变输入框的宽度，默认 100%。<br/>
可直接设置 error 来改变输入框的hover focus样式
<div class="example">
    <div class="example-box">
        <div>
            <b-button @on-click='showLoading'>loading</b-button>
             <b-button
                type="primary"
                @on-click="openFullScreen"
                v-loading.fullscreen.lock="show">
                指令方式
            </b-button>
            <div 
                style='width:100%;height:200px;'
                v-loading="loading2"
                loading-text="拼命加载中"
                loading-background="rgba(0, 0, 0, 0.8)">
            </div>
        </div>
    </div>
</div>

::: code
```html

    <template>
        <b-input v-model="value" placeholder="请输入..." /></b-input>
        <b-input v-model="value0" placeholder="请输入..." :error='error' /></b-input>
        <span>{{value}}</div>
    </template>
    <script>
        export default {
            data () {
                return {
                    value: '',
                    value0: '',
                    error:true
                }
            }
        }
    </script>
```
:::

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| value    | 绑定的值，可使用 v-model 双向绑定   | String,Number  | - |   -  |
| type     | 输入框类型   | String  | `text`、`password`、`textarea`、`url`、`email` |   -  |
| placeholder | 占位文本   | String  | - |   请输入..  |
| disabled | 设置输入框为禁用状态   | Boolean  | `true`、`false` |   false  |
| readonly | 设置输入框为只读   | Boolean  | `true`、`false` |   false  |
| error | 设置输入框为error状态   | Boolean  | `true`、`false` |   false  |
| size | 设置输入框的尺寸   | String  | `small`、`default`、`large` |   default  |
| name | 设置输入框name   | String  | - |   -  |
| maxlength | 最大输入长度   | Number  | - |   -  |
| minlength | 最大输入长度   | Number  | - |   -  |
| clearable | 是否显示清空按钮   | Boolean  | `true`、`false` | false  |
| spellcheck | 是否拼写检查   | Boolean  | `true`、`false` | false  |
| autofocus | 自动获取焦点   | Boolean  | `true`、`false` |   false  |
| icon     | icon的名称class   | String  |  详见icon组件 |   -  |
| prefix     | icon的在前面   | Boolean  |  `true`、`false` |  false   |
| suffix     | icon的在后面   | Boolean  |  `true`、`false` |  false   |
| rows     | 文本域默认行数，仅在 textarea 类型下有效   | Number  |  - |   2  |
| autosize | 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }   | Boolean,Object  |  - |   false  |
| wrap     | 原生的 wrap 属性，仅在 textarea 下生效   | String  |  `soft`、`hard` |   soft  |
| label     | input前的说明文字   | String  |  - |   -  |
| labelWidth  | input前的说明文字的宽度 fixed为false时有效   | Number  |  -  |   36  |
| fixed     | input的搭配文字的两种样式类型   | Boolean  |  `true`、`false` |   false  |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-click    | 点击icon时触发    | -  |
| on-change   | 数据改变时触发 | event |
| on-focus   | 输入框聚焦时触发 | - |
| on-blur   | 输入框失去聚焦时触发 | - |
| on-keyup   | 原生的 keyup 事件 | event |
| on-keydown   | 原生的 keydown 事件 | event |
