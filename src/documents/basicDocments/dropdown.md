<script>
export default {
	data () {
		return {
			show:false
		}
	},
	methods:{
		handClick(){
			this.show = !this.show
		}
	}
}
</script>

# Dropdown 下拉菜单
### 基础用法
需要配合 b-dropdown-menu 和 b-dropdown-item 两个组件来使用，并且给列表设置具名 slot 为 list。<br/>
触发对象可以是链接、按钮等各种元素、默认hover触发下拉事件<br/>
本例还展示了禁用项和分隔线。<br/>
<div class="example">
	<div class="example-box">
		<b-dropdown :transfer='true'>
			<span>别唐国顿 <b-icon type="xia" size="14" color="#52b7fc"></b-icon></span>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>海天龙战血玄黄</b-dropdown-item>
				<b-dropdown-item>披发长歌览大荒</b-dropdown-item>
				<b-dropdown-item>易水萧萧人去也</b-dropdown-item>
				<b-dropdown-item divided disabled>一天明月白如霜</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
	</div>
</div>

::: code
```html
	<b-dropdown>
		<span class=>别唐国顿 <b-icon type="xia" size="14" color="#52b7fc"></b-icon></span>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>海天龙战血玄黄</b-dropdown-item>
			<b-dropdown-item>披发长歌览大荒</b-dropdown-item>
			<b-dropdown-item>易水萧萧人去也</b-dropdown-item>
			<b-dropdown-item divided disabled>一天明月白如霜</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
```
:::


### 对齐方向
通过设置属性 placement 可以更改下拉菜单出现的方向。
<div class="example">
    <div class="example-box">
		<b-dropdown placement='bottom-start'>
			<b-button >菜单(左)</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
				<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
				<b-dropdown-item>试问卷帘人</b-dropdown-item>
				<b-dropdown-item>却道海棠依旧</b-dropdown-item>
				<b-dropdown-item>知否，知否？</b-dropdown-item>
				<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
		<b-dropdown placement='bottom' style='margin-left:20px;'>
			<b-button >菜单(居中)</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
				<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
				<b-dropdown-item>试问卷帘人</b-dropdown-item>
				<b-dropdown-item>却道海棠依旧</b-dropdown-item>
				<b-dropdown-item>知否，知否？</b-dropdown-item>
				<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
		<b-dropdown placement='bottom-end' style='margin-left:20px;'>
			<b-button >菜单(右)</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
				<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
				<b-dropdown-item>试问卷帘人</b-dropdown-item>
				<b-dropdown-item>却道海棠依旧</b-dropdown-item>
				<b-dropdown-item>知否，知否？</b-dropdown-item>
				<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
    </div>
</div>

::: code
```html
	<b-dropdown placement='bottom-start'>
		<b-button >菜单(左)</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
			<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
			<b-dropdown-item>试问卷帘人</b-dropdown-item>
			<b-dropdown-item>却道海棠依旧</b-dropdown-item>
			<b-dropdown-item>知否，知否？</b-dropdown-item>
			<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
	<b-dropdown placement='bottom' style='margin-left:20px;'>
		<b-button >菜单(居中)</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
			<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
			<b-dropdown-item>试问卷帘人</b-dropdown-item>
			<b-dropdown-item>却道海棠依旧</b-dropdown-item>
			<b-dropdown-item>知否，知否？</b-dropdown-item>
			<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
	<b-dropdown placement='bottom-end' style='margin-left:20px;'>
		<b-button >菜单(右)</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
			<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
			<b-dropdown-item>试问卷帘人</b-dropdown-item>
			<b-dropdown-item>却道海棠依旧</b-dropdown-item>
			<b-dropdown-item>知否，知否？</b-dropdown-item>
			<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
```
:::


### 触发方式
通过设置属性 trigger 可以更改触发方式，可选项为 click 、 hover(默认) 或 custom(自定义)。
<div class="example">
    <div class="example-box">
		<b-dropdown>
			<b-button >hover触发</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
				<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
				<b-dropdown-item>试问卷帘人</b-dropdown-item>
				<b-dropdown-item>却道海棠依旧</b-dropdown-item>
				<b-dropdown-item>知否，知否？</b-dropdown-item>
				<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
		<b-dropdown trigger="click" style='margin-left:20px;'>
			<b-button >click触发</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
				<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
				<b-dropdown-item>试问卷帘人</b-dropdown-item>
				<b-dropdown-item>却道海棠依旧</b-dropdown-item>
				<b-dropdown-item>知否，知否？</b-dropdown-item>
				<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
		<b-dropdown trigger="contextMenu" style='margin-left:20px;'>
			<b-button >右键触发</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
				<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
				<b-dropdown-item>试问卷帘人</b-dropdown-item>
				<b-dropdown-item>却道海棠依旧</b-dropdown-item>
				<b-dropdown-item>知否，知否？</b-dropdown-item>
				<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
			</b-dropdown-menu>
		</b-dropdown>
		<b-dropdown trigger="custom" :show='show' style='margin-left:20px;'>
			<b-button  @on-click='handClick'>custom触发</b-button>
			<b-dropdown-menu slot="list">
				<div style='padding:10px;'>
					<p style='padding:20px 0'>大诗人？</p>
					<b-button type="primary" size="small" style='float:right;' @on-click='handClick'>不是</b-button>
				</div>
			</b-dropdown-menu>
		</b-dropdown>
    </div>
</div>

::: code
```html
	<b-dropdown>
		<b-button >hover触发</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
			<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
			<b-dropdown-item>试问卷帘人</b-dropdown-item>
			<b-dropdown-item>却道海棠依旧</b-dropdown-item>
			<b-dropdown-item>知否，知否？</b-dropdown-item>
			<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
	<b-dropdown trigger="click" style='margin-left:20px;'>
		<b-button >click触发</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
			<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
			<b-dropdown-item>试问卷帘人</b-dropdown-item>
			<b-dropdown-item>却道海棠依旧</b-dropdown-item>
			<b-dropdown-item>知否，知否？</b-dropdown-item>
			<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
	<b-dropdown trigger="contextMenu" style='margin-left:20px;'>
		<b-button >右键触发</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>昨夜雨疏风骤</b-dropdown-item>
			<b-dropdown-item>浓睡不消残酒</b-dropdown-item>
			<b-dropdown-item>试问卷帘人</b-dropdown-item>
			<b-dropdown-item>却道海棠依旧</b-dropdown-item>
			<b-dropdown-item>知否，知否？</b-dropdown-item>
			<b-dropdown-item>应是绿肥红瘦</b-dropdown-item>
		</b-dropdown-menu>
	</b-dropdown>
	<b-dropdown trigger="custom" :show='show' style='margin-left:20px;'>
		<b-button  @on-click='handClick'>custom触发</b-button>
		<b-dropdown-menu slot="list">
			<div style='padding:10px;'>
				<p style='padding:20px 0'>大诗人？</p>
				<b-button 
					type="primary" 
					size="small" 
					style='float:right;' 
					@on-click='handClick'>不是
				</b-button>
			</div>
		</b-dropdown-menu>
	</b-dropdown>
```
:::


### 嵌套菜单
下拉菜单可以进行嵌套实现级联的效果，嵌套时注意设置 placement 来调整子集的位置。
<div class="example">
    <div class="example-box">
		<b-dropdown>
			<b-button >一剪梅</b-button>
			<b-dropdown-menu slot="list">
				<b-dropdown-item>红藕香残玉簟秋</b-dropdown-item>
				<b-dropdown-item>轻解罗裳，独上兰舟</b-dropdown-item>
				<b-dropdown-item>云中谁寄锦书来</b-dropdown-item>
				<b-dropdown placement="right-start">
					<b-dropdown-item>
						雁字回时，月满西楼
						<b-icon  type="you" size="14"></b-icon>
					</b-dropdown-item>
					<b-dropdown-menu slot="list">
						<b-dropdown-item>花自飘零水自流</b-dropdown-item>
						<b-dropdown-item>一种相思，两处闲愁</b-dropdown-item>
						<b-dropdown-item>此情无计可消除</b-dropdown-item>
						<b-dropdown-item>才下眉头，却上心头</b-dropdown-item>
					</b-dropdown-menu>
				</b-dropdown>
			</b-dropdown-menu>
		</b-dropdown>
	</div>
</div>


::: code
```html
	<b-dropdown>
		<b-button >一剪梅</b-button>
		<b-dropdown-menu slot="list">
			<b-dropdown-item>红藕香残玉簟秋</b-dropdown-item>
			<b-dropdown-item>轻解罗裳，独上兰舟</b-dropdown-item>
			<b-dropdown-item>云中谁寄锦书来</b-dropdown-item>
			<b-dropdown placement="right-start">
				<b-dropdown-item>
					雁字回时，月满西楼
					<b-icon  type="xia" size="14" color="#52b7fc"></b-icon>
				</b-dropdown-item>
				<b-dropdown-menu slot="list">
					<b-dropdown-item>花自飘零水自流</b-dropdown-item>
					<b-dropdown-item>一种相思，两处闲愁</b-dropdown-item>
					<b-dropdown-item>此情无计可消除</b-dropdown-item>
					<b-dropdown-item>才下眉头，却上心头</b-dropdown-item>
				</b-dropdown-menu>
			</b-dropdown>
		</b-dropdown-menu>
	</b-dropdown>
```
:::

### Dropdown Props

| 参数    |  说明  | 类型   | 可选值 | 默认值     |
| -----  | -----  | ---   | --- | ---     |
| placement    | 菜单弹出位置 | string | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`,<br/>`bottom-end`, `left`,`left-start`, `left-end`, `right`, `right-start`, `right-end`| bottom |
| trigger      | 触发下拉的方式  | string | `hover`、`click`、`contextMenu`、`custom` | hover   |
| show      | 显示与隐藏  | Boolean | `false`、`true` | false   |
| transfer     |  是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean    |  -  |     false  |
### Dropdown Slots

| name | 说明                                           |
| ---- | ---------------------------------------------- |
|      | 触发下拉列表的元素，可以是自定义的元素或者组件 |
| list | 下拉列表， 通常是 `<b-dropdown-menu>` 组件     |

### Dropdown Events

| 事件名称       | 说明                     | 回调参数说明                    |
| -------------- | ------------------------ | ------------------------------- |
| on-visible-change | 下拉框出现/隐藏时触发    |  `false`、`true`      |
| on-click | 点击菜单项时触发    |  b-dropdown-item 的 name      |
| on-clickoutside | 点击外部关闭下拉菜单时触发  |  event     |

### Dropdown-item Props

| 参数     | 说明           | 类型                   | 可选值 | 默认值 |
| -------- | -------------- | ---------------------- | ------ | ------ |
| name | 用来标识这一项       | String | - | -   |
| disabled | 禁用菜单       | Boolean | `false`、`true` | false   |
| divided  | 显示菜单分割线  | Boolean | `false`、`true` | false   |
