
<script>
    export default {
        data () {
            return {
                show:false,
                show1:false,
                loading2:true
            }
        },
        methods:{
            showLoading(){
                 const loading = this.$Loading()
                setTimeout(() => {
                    loading.close()
                }, 1000)
            },
            openFullScreen() {
                this.show = true
                setTimeout(() => {
                    this.show = false
                }, 2000)
            },
            openFullScreen1() {
                this.show1 = true
                setTimeout(() => {
                    this.show1 = false
                }, 2000)
            },
            showLoading(){
                 const loading = this.$Loading({
                    lock: true,
                    text: 'Loading',
                    body: true,
                    spinner: 'chushihua',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    loading.close()
                }, 1000);
            },
        }
    }
</script>

# Loading 加载动画
在请求的时候使用，加载数据时显示动画效果。
-----
### 基础用法
可直接使用API调用方式或指令调用方式
<div class="example">
    <div class="example-box">
        <div>
            <b-button @on-click='showLoading'>函数调用</b-button>
            <b-button
                type="primary"
                @on-click="openFullScreen"
                v-loading="show">
                指令方式
            </b-button>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-button @on-click='showLoading'>函数调用</b-button>
        <b-button
            type="primary"
            @on-click="openFullScreen"
            v-loading="show">
            指令方式
        </b-button>
    </template>
    <script>
        export default {
            data () {
                return {
                    show:false
                }
            },
             methods:{
                showLoading(){
                    const loading = this.$Loading()
                    setTimeout(() => {
                        loading.close()
                    }, 1000)
                },
                openFullScreen() {
                    this.show = true
                    setTimeout(() => {
                        this.show = false
                    }, 2000)
                }
            }
        }
    </script>
```
:::


### 指令用法 在全屏显示加载动画
设置```loading-background```、```loading-text```来自定义加载文字与加载的背景颜色
<div class="example">
    <div class="example-box">
        <div>
            <b-button
                type="primary"
                @on-click="openFullScreen1"
                v-loading.fullscreen.lock="show1">
                指令方式
            </b-button>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <b-button
            type="primary"
            @on-click="openFullScreen1"
            v-loading.fullscreen.lock="show1">
            指令方式
        </b-button>
    </template>
    <script>
        export default {
            data () {
                return {
                    show:false
                }
            },
             methods:{
                openFullScreen1() {
                    this.show1 = true
                    setTimeout(() => {
                        this.show1 = false
                    }, 2000)
                }
            }
        }
    </script>
```
:::

### 指令用法 在当前元素中显示加载动画
设置```loading-background```、```loading-text```来自定义加载文字与加载的背景颜色<br>
设置```loading-spinner```、```loading-custom-class```来自定义加载动画与自定义的class<br>
<div class="example">
    <div class="example-box">
        <div>
            <div 
                style='width:100%;height:200px;'
                v-loading="loading2"
                loading-text="拼命加载中.."
                loading-background="rgba(0, 0, 0, 0.8)">
            </div>
        </div>
    </div>
</div>

::: code
```html
    <template>
        <div 
            style='width:100%;height:200px;'
            v-loading="loading2"
            loading-text="拼命加载中.."
            loading-background="rgba(0, 0, 0, 0.8)">
        </div>
    </template>
```
:::



### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| target    | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，<br/>则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点   | Object/String  | - |   document.body  |
| text     | 加载动画的文字 指令的时候在绑定元素上用 loading-text设置  | String  | - |   -  |
| background | 加载动画的背景的颜色 指令的时候在绑定元素上用 loading-background设置  | String  | - |     |
| spinner | 自定义加载图标类名  指令的时候在绑定元素上用 loading-spinner设置 | String  | - |   -  |
| body | 是否加载动画在body上   | Boolean  | `true`、`false` |   true  |
| fullscreen | 是否全屏   | Boolean  | `true`、`false` |   true  |
| lock | 锁定当前滚动条   | Boolean  | `true`、`false` |   false  |
| customClass | Loading 的自定义类名 指令的时候在绑定元素上用 loading-custom-class设置  | String  | - |   -  |