<script>
    export default {
        data () {
            return {
                maxSize1: 10,
                format1: ['mobi', 'pdf']
            }
        },
        computed:{
            url () {
                return window.location.host
            }
        },
        methods: {
            onFormatError: function(file, fileList){
                window.alert(file.name + "格式错误")
            },
            onExceededSize: function(file, fileList){
                window.alert(file.file + "超过最大限制")
            }
        }
    }
</script>
<style>
    h2{
        font-weight: 400;
        color: #1c2438;
        font-size: 24px;
        margin: 25px 0 15px;
    }
</style>
# upload 组件

  <!-- *author \&& hkk* <br>
  *edition \&& 1* -->

## 一、功能列表

- [x] 支持下载模板
- [x] 支持粘贴、拖动上传
- [x] 支持大小限制、类型限制
- [x] 支持多文件上传
- [x] 支持进度条
- [x] 支持删除
- [x] 支持重复文件名过滤
- [x] 对上传状态进一步支持，体现上传状态
- [x] 失败再次上传

## 二、示例
### 2.1直接调用组件
值得一提的是，当你上传失败的时候，你可以点击“失败提示” 重新上传
action指的是上传路径，上传方式默认为post，无法修改 <br>
在上传组件中，有三个插槽，分别为 <br>
    “template”（用来存放下载模板按钮）， <br>
    “uploadTitle”（存放上传显示标签，比如button）， <br>
    “tip”（存放提示）<br>
<div class='example'>
    <div class='example-box'>
        <bw-upload
            action="//jsonplaceholder.typicode.com/posts/"
            >
            <b-button  size="small" slot="uploadTitle" type="default">
            <b-icon type="fasong" size=12></b-icon>
            上传文件
            </b-button>
            <div slot="tip">这里可以写你的提醒事项：请上传 hkk</div>
        </bw-upload>
    </div>
</div>

::: code
```html
    <bw-upload
        action="//jsonplaceholder.typicode.com/posts/"
        >
        <b-button  size="small" slot="uploadTitle" type="default">
        <b-icon type="fasong" size=12></b-icon>
        上传文件
        </b-button>
    </bw-upload>
```
:::


### 2.2支持多文件上传
使用 “multiple=true” 即可支持多文件上传
<div class='example'>
    <div class='example-box'>
        <bw-upload
            :multiple=true
            action="//jsonplaceholder.typicode.com/posts/"
            >
            <b-button size="small" slot="uploadTitle" type="default">
            <b-icon type="fasong" size=12></b-icon>
            上传文件
            </b-button>
        </bw-upload>
    </div>
</div>

::: code
```html
    <bw-upload
        :multiple=true
        action="//jsonplaceholder.typicode.com/posts/"
        >
        <b-button size="small" slot="uploadTitle" type="default">
        <b-icon type="fasong" size=12></b-icon>
        上传文件
        </b-button>
    </bw-upload>
```
:::


### 2.3支持成功异常接口
值得一提的还有，当你上传失败了，它会提醒你是后台问题，还是前端设置问题 <br>
其中，“status=0” 是未上传。
<div class='example'>
    <div class='example-box'>
        <bw-upload
            action="//jsonplaceholder.typicode.com/posts/"
        >
            <b-button size="small" slot="uploadTitle" type="default">上传文件</b-button>
            <b-icon type="fasong" size=12></b-icon>
        </bw-uplad>
    </div>
</div>

::: code
```html
    <bw-upload
        action="//jsonplaceholder.typicode.com/posts/"
    >
        <b-button size="small" slot="uploadTitle" type="default">上传文件</b-button>
        <b-icon type="fasong" size=12></b-icon>
    </bw-uplad>
```
:::


### 2.4支持多文件限制上传
格式限制请使用数组 “format” <br>
最大限制请使用整数 “maxSize” <br>
需要注意的是，当你使用他们的时候，为了更友好的用户体验，请声明相对应的方法【“format”: onFormatError, “maxSize”: onExceededSize】，示例如下：
<div class='example'>
    <div class='example-box'>
        <bw-upload
            :multiple=true
            action="//jsonplaceholder.typicode.com/posts/"
            :format="format1"
            :maxSize="maxSize1"
            :onExceededSize='onExceededSize'
            :onFormatError='onFormatError'
            >
            <b-button size="small" slot="uploadTitle" type="default">
            <b-icon type="fasong" size=12></b-icon>
            上传文件
            </b-button>
        </bw-upload>
    </div>
</div>
    
::: code
```html
    <bw-upload
        :multiple=true
        action="//jsonplaceholder.typicode.com/posts/"
        :format="format1"
        :maxSize="maxSize1"
        :onExceededSize='onExceededSize'
        :onFormatError='onFormatError'
        >
        <b-button size="small" slot="uploadTitle" type="default">
        <b-icon type="fasong" size=12></b-icon>
        上传文件
        </b-button>
    </bw-upload>
    <script>
        export default {
            data () {
                return {
                    maxSize1: 1000,
                    format1: ['mobi', 'pdf']
                }
            },
            methods: {
                onFormatError: function(file, fileList){
                    window.alert(file.name + "格式错误")
                },
                onExceededSize: function(file, fileList){
                    window.alert(file.name + "超过最大限制")
                }
            }
        }
    </script>
```
:::


### 2.5input输入框拖拽展示
通过“href” 指定地址， “download” 指定下载名字
<div class='example'>
    <div class='example-box'>
        <bw-upload
            :multiple=true
            action="//jsonplaceholder.typicode.com/posts/"
            :onExceededSize='onExceededSize'
            :onFormatError='onFormatError'
            >
            <a slot='template' :href="url + 'http://localhost:8081/app.js'" download='index'>点击下载模板</a>
        </bw-upload>
    </div>
</div>

::: code
```html
    <bw-upload
        :multiple=true
        action="//jsonplaceholder.typicode.com/posts/"
        :onExceededSize='onExceededSize'
        :onFormatError='onFormatError'
        >
        <a slot='template' :href="url + 'http://localhost:8081/app.js'" download='index'>点击下载模板</a>
    </bw-upload>
    <script>
        export default {
            data () {
                return {}
            },
            computed:{
                url () {
                    return window.location.host
                }
            },
            methods: {
                onFormatError: function(file, fileList){
                    window.alert(file.name + "格式错误")
                },
                onExceededSize: function(file, fileList){
                    window.alert(file.name + "超过最大限制")
                }
            }
        }
    </script>
```
:::

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| action |  上传地址	|String | - |   -  |
| headers | 设置上传的请求头部	|Object | - |   {}  |
| multiple | 是否支持多选文件	|Boolean | `true`、`false` |   false  |
| parse | 是否支持粘贴上传文件	|Boolean | `true`、`false` |   true  |
| data | 上传时附带的额外参数	|Object | - |   -  |
| name | 上传的文件字段名	| String | - |   -  |
| with-credentials | 支持发送 cookie 凭证信息	| Boolean | `true`、`false` |   false  |
| show-upload-list | 是否显示已上传文件列表	 | Boolean | `true`、`false` |   true  |
| accept | 接受上传的 <a href='https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#attr-accept'>文件类型</a>|String |	-   |     -    |
| format | 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 <br/>input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用	| Array |	-   |     []    |
| max-size      | 文件大小限制，单位 kb	| Number |	-   |     -    |
| drag-over      | 是否支持拖拽上传	|Boolean | `true`、`false` |   false  |

### 回调钩子
| 回调钩子	      |  说明	    |  	 类型   |  返回值 |
|----------|--------|---------- |-------------  |
| on-progress | 文件上传时的钩子 	| Function	| event, file, fileList |
| on-success | 文件上传成功时的钩子  	| Function | response, file, fileList |
| on-error | 文件上传失败时的钩子  	| Function | error, file, fileList |
| on-preview | 点击已上传的文件链接时的钩子 	|Function|	file |
| on-remove	| 文件列表移除文件时的钩子  	| Function	| file, fileList |
| on-format-error | 文件格式验证失败时的钩子  	| Function|	file, fileList |
| on-exceeded-size | 文件超出指定大小限制时的钩子  	| Function |	file, fileList |
