<script>
    export default {
        methods: {
			normal(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试"
				});
			},
			success(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "通过修改border-left来控制样式",
					type: "success"
				});
			},
			warning(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试",
					type: "warning"
				});
			},
			error(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "我是纯粹凑数的",
					type: "error"
				});
			}
		},
		data(){
			return {
				size:{
					size:'small'
				},
				iconVisible:{
					iconVisible: false
				},
				autoClose:{
					autoClose: false
				},
				duration:{
					duration: 10000
				}
			}
		}
    }
</script>
# Notice 通知
### 概述
###### 在界面右下角显示可关闭的全局通知，常用于以下场景
* ###### 系统主动推送
* ###### 通知内容带有描述信息
### 默认使用方式
设置 title、content 为显示的文字
<div class="example">
	<div class="example-box">
		<div>
			<b-button type='primary' @on-click="normal">默认通知</b-button>
			<b-button type="success" @on-click="success">成功通知</b-button>
			<b-button type="warning" @on-click="warning">警告警告</b-button>
			<b-button type="error" @on-click="error">失败通知</b-button>
		</div>
	</div>
</div>

::: code
```html
    <div>
      <b-button @on-click="normal">默认通知</b-button>
      <b-button type="success" @on-click="success">成功通知</b-button>
      <b-button type="warning" @on-click="warning">警告警告</b-button>
      <b-button type="error" @on-click="error">失败通知</b-button>
   </div>
   <script>
    export default {
		methods: {
			normal(){
				this.$Notice({
					title: "我是大标题",
					content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试"
				});
			},
			success(){
				this.$Notice({
					title: "我是大标题",
					content: "通过修改border-left来控制样式",
					type: "success"
				});
			},
			warning(){
				this.$Notice({
					title: "我是大标题",
					content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试",
					type: "warning"
				});
			},
			error(){
				this.$Notice({
					title: "我是大标题",
					content: "我是纯粹凑数的",
					type: "error"
				});
			}
		}
    }
   </script>
```
:::

### 小图标
设置 size 为 ```small``` 显示前面为小图标
<div class="example">
	<div class="example-box">
		<div>
			<b-button type='primary' @on-click="normal(size)">默认通知</b-button>
			<b-button type="success" @on-click="success(size)">成功通知</b-button>
			<b-button type="warning" @on-click="warning(size)">警告警告</b-button>
			<b-button type="error" @on-click="error(size)">失败通知</b-button>
		</div>
	</div>
</div>

::: code
```html
    <div>
      	<b-button type='primary' @on-click="normal(size)">默认通知</b-button>
		<b-button type="success" @on-click="success(size)">成功通知</b-button>
		<b-button type="warning" @on-click="warning(size)">警告警告</b-button>
		<b-button type="error" @on-click="error(size)">失败通知</b-button>
   </div>
   <script>
		export default {
			methods: {
				normal(n){
					this.$Notice({
						...n,
						title: "我是大标题",
						content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试"
					});
				},
				success(n){
					this.$Notice({
						...n,
						title: "我是大标题",
						content: "通过修改border-left来控制样式",
						type: "success"
					});
				},
				warning(n){
					this.$Notice({
						...n,
						title: "我是大标题",
						content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试",
						type: "warning"
					});
				},
				error(n){
					this.$Notice({
						...n,
						title: "我是大标题",
						content: "我是纯粹凑数的",
						type: "error"
					});
				}
			},
			data(){
				return {
					size:{
						size:'small'
					}
				}
			}
		}
   </script>
```
:::


### 图标不显示
设置 iconVisible 为 ```false``` 隐藏前面为小图标
<div class="example">
	<div class="example-box">
		<div>
			<b-button type='primary' @on-click="normal(iconVisible)">默认通知</b-button>
			<b-button type="success" @on-click="success(iconVisible)">成功通知</b-button>
			<b-button type="warning" @on-click="warning(iconVisible)">警告警告</b-button>
			<b-button type="error" @on-click="error(iconVisible)">失败通知</b-button>
		</div>
	</div>
</div>

::: code
```html
	<div>
		<b-button type='primary' @on-click="normal(iconVisible)">默认通知</b-button>
		<b-button type="success" @on-click="success(iconVisible)">成功通知</b-button>
		<b-button type="warning" @on-click="warning(iconVisible)">警告警告</b-button>
		<b-button type="error" @on-click="error(iconVisible)">失败通知</b-button>
	</div>
	<script>
	export default {
		methods: {
			normal(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试"
				});
			},
			success(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "通过修改border-left来控制样式",
					type: "success"
				});
			},
			warning(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试",
					type: "warning"
				});
			},
			error(n){
				this.$Notice({
					...n,
					title: "我是大标题",
					content: "我是纯粹凑数的",
					type: "error"
				});
			}
		},
		data(){
			return {
				iconVisible:{
					iconVisible: false
				}
			}
		}
	}
	</script>
```
:::

### 手动关闭、自定义时间关闭
鼠标移入后，去掉自动关闭功能，移出后启动自动关闭功能
设置 autoClose 为 ```false``` 手动关闭 设置 duration(单位：ms)自定义关闭时间
<div class="example">
	<div class="example-box">
		<div>
			<b-button type='primary' @on-click="normal(autoClose)">手动关闭</b-button>
			<b-button type='success' @on-click="success(duration)">自定义时间</b-button>
		</div>
	</div>
</div>

::: code
```html
    <div>
      	<b-button type='primary' @on-click="normal(autoClose)">手动关闭</b-button>
		<b-button type='success' @on-click="success(duration)">自定义时间</b-button>
   </div>
   <script>
		export default {
			methods: {
				normal(n){
					this.$Notice({
						...n,
						title: "我是大标题",
						content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试"
					});
				},
				success(n){
					this.$Notice({
						...n,
						title: "我是大标题",
						content: "通过修改border-left来控制样式",
						type: "success"
					});
				}
			},
			data(){
				return {
					autoClose:{
						autoClose: false
					},
					duration:{
						duration: 10000
					}
				}
			}
		}
   </script>
```
:::

### props
| 参数      | 说明    | 类型      | 可选项      | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 文本内容   | string  |  -         |    默认为空   |
| content     | 文本内容   | string  |  -         |    默认为空   |
| type     |  类型  | string  |     `normal`、`success`、`warning`、`error`    |    默认`normal`   |
| size     |  是否自动关闭  |  String |    `large`、`small`      |    默认`large`   |
| duration     |  自动关闭时间  | String/Number  |  -       |    默认`3000`   |
| autoClose     |  是否自动关闭  |  Boolean |   `false`、`true`      |    默认`true`   |
| iconVisible     |  是否显示前面的图标  |  Boolean |    `false`、`true`      |    默认`true`   |

