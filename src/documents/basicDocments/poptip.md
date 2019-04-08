<style scoped>
    .top,.bottom{
        text-align: center;
    }
    .center{
        width: 420px;
        margin: 10px auto;
        overflow: hidden;
    }
    .center-left{
        float: left;
    }
    .center-right{
        float: right;
    }
</style>
<script>
    export default {
        data () {
            return {
                show: false
            }
        },
        methods: {
            close () {
                this.show = false;
            },
            ok () {
                this.$Message.success('点击确认');
            },
            cancel () {
                this.$Message.error('点击取消');
            }
        }
    }
</script>

# Poptip 气泡提示

### 基础用法
支持三种触发方式：鼠标悬停、点击、聚焦。默认是点击。

<div class="example">
    <div class="example-box">
        <div>
              <b-poptip title="标题" trigger="hover"  content="内容">
                  <b-button>Hover</b-button>
              </b-poptip>
              <b-poptip title="标题"  content="内容">
                  <b-button>Click</b-button>
              </b-poptip>
              <b-poptip title="标题" trigger="focus"  content="内容">
                  <b-input placeholder="focus" />
              </b-poptip>
        </div>
    </div>
</div>

::: code
```html

    <template>
       <div>
             <b-poptip title="标题" trigger="hover"  content="内容">
                 <b-button>Hover</b-button>
             </b-poptip>
             <b-poptip title="标题"  content="内容">
                 <b-button>Click</b-button>
             </b-poptip>
             <b-poptip title="标题" trigger="focus"  content="内容">
                 <b-button>Focus</b-button>
             </b-poptip>
             <b-poptip title="标题" trigger="focus"  content="内容">
                 <Input placeholder="Input focus" />
             </b-poptip>
       </div>
    </template>
```
:::

### 气泡控制
通过v-model来控制提示框的显示和隐藏。

<div class="example">
    <div class="example-box">
        <div>
            <b-poptip v-model="show">
                <b-button type="success">激活气泡</b-button>
                <div slot="content">
                    <b-button type="error" @on-click="close">关闭气泡</b-button>
                </div>
            </b-poptip>
        </div>
    </div>
</div>

::: code
```html
    <template>
       <div>
            <b-poptip v-model="show">
                <b-button type="success">激活气泡</b-button>
                <div slot="content">
                    <b-button type="error" @on-click="close">关闭气泡</b-button>
                </div>
            </b-poptip>
       </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    show: false
                }
            },
            methods: {
                close () {
                    this.show = false;
                }
            }
        }
    </script>
```
:::

### 位置
可以通过修改 `placement` 设置12个不同的方向显示气泡效果,效果如下：

<div class="example">
    <div class="example-box">
        <div>
             <div class="top">
                 <b-poptip content="内容" placement="top-start">
                     <b-button>Top Left</b-button>
                 </b-poptip>
                 <b-poptip  content="内容" placement="top">
                     <b-button>Top Center</b-button>
                 </b-poptip>
                 <b-poptip  content="内容" placement="top-end">
                     <b-button>Top Right</b-button>
                 </b-poptip>
             </div>
             <div class="center">
                 <div class="center-left">
                     <b-poptip  content="内容" placement="left-start">
                         <b-button>Left Top</b-button>
                     </b-poptip><br><br>
                     <b-poptip  content="内容" placement="left">
                         <b-button>Left Center</b-button>
                     </b-poptip><br><br>
                     <b-poptip  content="内容" placement="left-end">
                         <b-button>Left Bottom</b-button>
                     </b-poptip>
                 </div>
                 <div class="center-right">
                     <b-poptip  content="内容" placement="right-start">
                         <b-button>Right Top</b-button>
                     </b-poptip><br><br>
                     <b-poptip  content="内容" placement="right">
                         <b-button>Right Center</b-button>
                     </b-poptip><br><br>
                     <b-poptip  content="内容" placement="right-end">
                         <b-button>Right Bottom</b-button>
                     </b-poptip>
                 </div>
             </div>
             <div class="bottom">
                 <b-poptip  content="内容" placement="bottom-start">
                     <b-button>Bottom Left</b-button>
                 </b-poptip>
                 <b-poptip  content="内容" placement="bottom">
                     <b-button>Bottom Center</b-button>
                 </b-poptip>
                 <b-poptip  content="内容" placement="bottom-end">
                     <b-button>Bottom Right</b-button>
                 </b-poptip>
             </div>
        </div>
    </div>
</div>

::: code
```html

    <template>
       <div>
         <div class="top">
             <b-poptip content="内容" placement="top-start">
                 <b-button>Top Left</b-button>
             </b-poptip>
             <b-poptip  content="内容" placement="top">
                 <b-button>Top Center</b-button>
             </b-poptip>
             <b-poptip  content="内容" placement="top-end">
                 <b-button>Top Right</b-button>
             </b-poptip>
         </div>
         <div class="center">
             <div class="center-left">
                 <b-poptip  content="内容" placement="left-start">
                     <b-button>Left Top</b-button>
                 </b-poptip><br><br>
                 <b-poptip  content="内容" placement="left">
                     <b-button>Left Center</b-button>
                 </b-poptip><br><br>
                 <b-poptip  content="内容" placement="left-end">
                     <b-button>Left Bottom</b-button>
                 </b-poptip>
             </div>
             <div class="center-right">
                 <b-poptip  content="内容" placement="right-start">
                     <b-button>Right Top</b-button>
                 </b-poptip><br><br>
                 <b-poptip  content="内容" placement="right">
                     <b-button>Right Center</b-button>
                 </b-poptip><br><br>
                 <b-poptip  content="内容" placement="right-end">
                     <b-button>Right Bottom</b-button>
                 </b-poptip>
             </div>
         </div>
         <div class="bottom">
             <b-poptip  content="内容" placement="bottom-start">
                 <b-button>Bottom Left</b-button>
             </b-poptip>
             <b-poptip  content="内容" placement="bottom">
                 <b-button>Bottom Center</b-button>
             </b-poptip>
             <b-poptip  content="内容" placement="bottom-end">
                 <b-button>Bottom Right</b-button>
             </b-poptip>
         </div>
       </div>
    </template>
    <style scoped>
        .top,.bottom{
            text-align: center;
        }
        .center{
            width: 420px;
            margin: 10px auto;
            overflow: hidden;
        }
        .center-left{
            float: left;
        }
        .center-right{
            float: right;
        }
    </style>
```
:::

### 确认框
通过设置属性confirm开启确认框模式。确认框只会以 click 的形式激活，并且只会显示 title 的内容，忽略 content。

<div class="example">
    <div class="example-box">
        <div>
          <b-poptip
              confirm
              title="我是一个标题"
              ok-text="确认"
              cancel-text="取消"
              @on-ok="ok"
              @on-cancel="cancel">
              <b-button type='primary'>确认</b-button>
          </b-poptip>
        </div>
    </div>
</div>

::: code
```html
    <template>
       <div>
           <b-poptip
                confirm
                title="我是一个标题"
                ok-text="确认"
                cancel-text="取消"
                @on-ok="ok"
                @on-cancel="cancel">
                <b-button type='primary'>确认</b-button>
            </b-poptip>
       </div>
    </template>
    <script>
        export default {
            methods: {
                ok () {
                    this.$Message.success('点击确认');
                },
                cancel () {
                    this.$Message.error('点击取消');
                }
            }
        }
    </script>
```
:::

### 自行换行
设置属性 word-wrap，当超出宽度后，文本将自动换行，并两端对齐。

<div class="example">
    <div class="example-box">
        <div>
            <b-poptip word-wrap width="300" content="百望云隶属于百望股份，为企业提供集税控设备 、发票管理系统、电子发票服务平台、发票供应链协同、发票金融服务于一体的智慧解决方案及发票云生态服务。">
                <b-button type='primary'>超长文本</b-button>
            </b-poptip>
        </div>
    </div>
</div>

::: code
```html
    <template>
       <div>
           <b-poptip word-wrap width="300" content="百望云隶属于百望股份，为企业提供集税控设备 、发票管理系统、电子发票服务平台、发票供应链协同、发票金融服务于一体的智慧解决方案及发票云生态服务。">
               <b-button type='primary'>超长文本</b-button>
           </b-poptip>
       </div>
    </template>
```
:::



### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| trigger    | 触发方式，可选值为`hover` , `click`, `focus` ,在 `confirm` 模式下，只有 `click` 有效   | String  | - |   -  |
| title    | 标题   | String,Number  | - |   -  |
| content     | 正文   | String,Number  | - |   -  |
| placement | 提示框出现的位置    | String  | `top` `top-start` `top-end` <br/> `bottom` `bottom-start` `bottom-end` <br/> `left` `left-start` `left-end` <br/> `right` `right-start` `right-end` |   'bottom'  |
| width     | 宽度，最小宽度为 150px，在 confirm 模式下，默认最大宽度为 300px   | String,Number  | - |   -  |
| confirm     | 是否开启对话框模式	   | Boolean  | - |   false  |
| ok-text     | 确定按钮的文字，只在 confirm 模式下有效		   | String	  | - |   'ok'  |
| cancel-text     | 取消按钮的文字，只在 confirm 模式下有效	   | String	  | - |   false  |
| word-wrap	     | 开启后，超出指定宽度文本将自动换行，并两端对齐	   | Boolean  | - |   false  |
| padding	     | 自定义间距值		   | String  | - |   8px 16px  |
| offset	     | 出现位置的偏移量			   | Number  | - |   0 |

### events
| 事件名	      | 说明	    | 返回值 |
|-------------|---------|----------|
| on-popper-show | 在提示框显示时触发	    | -  |
| on-popper-hide   | 在提示框消失时触发	 | - |
| on-ok   | 点击确定的回调，只在 confirm 模式下有效 | - |
| on-cancel   | 点击取消的回调，只在 confirm 模式下有效 | - |

### slot
| name	      | 说明	    |
|-------------|---------|
| 无    | 主体内容    | -  |
| title    | 提示框标题，定义此 slot 时，会覆盖 props title    |
| content   | 提示框内容，定义此 slot 时，会覆盖 props content，只在非 confirm 模式下有效  |