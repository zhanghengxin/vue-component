# upload 组件

### 点击上传

<div class='example'>
    <div class='example-box'>
        <b-upload action="//jsonplaceholder.typicode.com/posts/">
            <b-button>
                <b-icon type="fasong" size='12'></b-icon>
                上传文件
            </b-button>
        </b-upload>
    </div>

::: code
```html
    <b-upload action="//jsonplaceholder.typicode.com/posts/">
        <b-button>
            <b-icon type="fasong" size='12'></b-icon>
            上传文件
        </b-button>
    </b-upload>
```
:::
</div>

### 多选

设置属性 `multiple`，可以选择多个文件

<div class='example'>
    <div class='example-box'>
        <b-upload multiple action="//jsonplaceholder.typicode.com/posts/">
            <b-button>
                <b-icon type="fasong" size='12'></b-icon>
                上传文件
            </b-button>
        </b-upload>
    </div>

::: code
```html
    <b-upload multiple action="//jsonplaceholder.typicode.com/posts/">
        <b-button>
            <b-icon type="fasong" size='12'></b-icon>
            上传文件
        </b-button>
    </b-upload>
```
:::
</div>

### 手动上传

绑定 `before-upload`，并返回false，可以阻止默认上传流程，手动控制文件上传

<div class='example'>
    <div class='example-box'>
        <b-upload 
            action="//jsonplaceholder.typicode.com/posts/"
            :before-upload="handleUpload">
            <b-button>
                <b-icon type="fasong" size='12'></b-icon>
                上传文件
            </b-button>
        </b-upload>
        <div v-if="file !== null">
            上传文件: {{ file.name }} 
            <b-button 
                type="text" 
                @on-click="upload" 
                :loading="loadingStatus">
                {{ loadingStatus ? '上传中' : '上传' }}
            </b-button>
        </div>
    </div>

::: code
```html
    <b-upload 
        action="//jsonplaceholder.typicode.com/posts/"
        :before-upload="handleUpload">
        <b-button>
            <b-icon type="fasong" size='12'></b-icon>
            上传文件
        </b-button>
    </b-upload>
    <div v-if="file !== null">
        上传文件: {{ file.name }} 
        <b-button 
            type="text" 
            @on-click="upload" 
            :loading="loadingStatus">
            {{ loadingStatus ? '上传中' : '上传' }}
        </b-button>
    </div>
    <script>
        export default {
            data () {
                return {
                    file: null,
                    loadingStatus: false
                }
            },
            methods: {
                handleUpload (file) {
                    this.file = file;
                    return false;
                },
                upload () {
                    this.loadingStatus = true;
                    setTimeout(() => {
                        this.file = null;
                        this.loadingStatus = false;
                        this.$Message({ message: '上传成功！' })
                    }, 1500);
                }
            }
        }
    </script>
```
:::
</div>

### 拖拽上传

<div class='example'>
    <div class='example-box'>
        <b-upload 
            multiple
            action="//jsonplaceholder.typicode.com/posts/" 
            type='drag'>
            <div style='padding: 20px 0'>
                <b-icon type="fasong" size='52' color='#3399ff'></b-icon>
                拖拽上传
            </div>
        </b-upload>
    </div>

::: code
```html
    <b-upload 
        multiple
        action="//jsonplaceholder.typicode.com/posts/" 
        type='drag'>
        <div style='padding: 20px 0'>
            <b-icon type="fasong" size='52' color='#3399ff'></b-icon>
            拖拽上传
        </div>
    </b-upload>
```
:::
</div>

<script>
    export default {
        data () {
            return {
                file: null,
                loadingStatus: false,
            }
        },
        methods: {
            handleUpload (file) {
                this.file = file
                return false
            },
            upload () {
                this.loadingStatus = true
                setTimeout(() => {
                    this.file = null
                    this.loadingStatus = false
                    this.$Message({ message: '上传成功!' })
                }, 1000)
            },
        }
    }
</script>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|----------|--------|---------- |-------------  |-------- |
| action |  上传地址	|String |
| headers | 设置上传的请求头部	|Object | |   {}  |
| multiple | 是否支持多选文件	|Boolean | `true`、`false` |   false  |
| paste | 是否支持粘贴上传文件	|Boolean | `true`、`false` |   true  |
| data | 上传时附带的额外参数	|Object |
| name | 上传的文件字段名	| String |
| with-credentials | 支持发送 cookie 凭证信息	| Boolean | `true`、`false` |   false  |
| show-upload-list | 是否显示已上传文件列表	 | Boolean | `true`、`false` |   true  |
| type | 上传控件的类型，可选值为 select（点击选择），drag（支持拖拽） | String | | select |
| accept | 接受上传的 <a style='color: #3399ff' href='https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#attr-accept'>文件类型</a>|String |
| format | 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 <br/>input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用	| Array |   |     []    |
| max-size      | 文件大小限制，单位 kb	| Number |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 | Function |
| on-progress | 文件上传时的钩子 	| Function |	| event, file, fileList |
| on-success | 文件上传成功时的钩子  	| Function | | response, file, fileList |
| on-error | 文件上传失败时的钩子  	| Function | | error, file, fileList |
| on-preview | 点击已上传的文件链接时的钩子 	|Function| |	file |
| on-remove	| 文件列表移除文件时的钩子  	| Function	| | file, fileList |
| on-format-error | 文件格式验证失败时的钩子  	| Function| |	file, fileList |
| on-exceeded-size | 文件超出指定大小限制时的钩子  	| Function | |	file, fileList |
| default-file-list | 默认已上传的文件列表，例如：[{ name: 'img1.jpg', url: 'http://www.xxx.com/img1.jpg' },{name: 'img2.jpg',url: 'http://www.xxx.com/img2.jpg'}] | Array | | [] |

### events 
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| clearFiles | 清空已上传的文件列表  |  |

### slot 

| 参数 | 说明 |
| ---- | ---- |
| | 触发上传组件的控件 |
| tip | 辅助提示内容 |
