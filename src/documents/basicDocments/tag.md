### Tag标签

<div class="example">
   <div class="example-box">
<div>
    <b-tag backcolor="blue" @on-click='handleClick'>标签</b-tag>
    <b-tag backcolor="green" >标签</b-tag>
    <b-tag backcolor="orange" >标签</b-tag>
    <b-tag backcolor="red" >标签</b-tag>
    <b-tag >标签</b-tag>
</div>
</div> 

::: code
```html

<div>
    <b-tag backcolor="blue">标签</b-tag>
    <b-tag backcolor="green">标签</b-tag>
    <b-tag backcolor="orange">标签</b-tag>
    <b-tag backcolor="red">标签</b-tag>
    <b-tag >标签</b-tag>
</div>

```
:::
</div>




<div class="example">
   <div class="example-box">
<div>
    <b-tag backcolor="blue" closeable>标签</b-tag>
    <b-tag backcolor="green" closeable>标签</b-tag>
    <b-tag backcolor="orange" closeable>标签</b-tag>
    <b-tag backcolor="red" closeable>标签</b-tag>
    <b-tag closeable>标签</b-tag>
</div>
</div>

::: code
```html
<div>
    <b-tag backcolor="blue" closeable>标签</b-tag>
    <b-tag backcolor="green" closeable>标签</b-tag>
    <b-tag backcolor="orange" closeable>标签</b-tag>
    <b-tag backcolor="red" closeable>标签</b-tag>
    <b-tag closeable>标签</b-tag>
</div>
 
```
:::
</div>

<div class="example">
   <div class="example-box">
<div>
    <b-tag type="dots" color="blue" closeable>标签</b-tag>
    <b-tag type="dots" color="green" closeable>标签</b-tag>
    <b-tag type="dots" color="orange" closeable>标签</b-tag>
    <b-tag type="dots" color="red" closeable>标签</b-tag>
    <b-tag type="dots" closeable>标签</b-tag>
</div>
</div>

::: code
```html
<div>
    <b-tag type="dots" color="blue" closeable>标签</b-tag>
    <b-tag type="dots" color="green" closeable>标签</b-tag>
    <b-tag type="dots" color="orange" closeable>标签</b-tag>
    <b-tag type="dots" color="red" closeable>标签</b-tag>
    <b-tag type="dots" closeable>标签</b-tag>
</div>
```
:::
 </div>
 <div class="example" style="width:1000px">
   <div class="example-box">
<div>
    <b-tag v-for="(item, index) in list" :key="index" :backcolor="item.color"  closeable @on-close="close">{{item.name}}</b-tag>
    <b-button size="small" @on-click="click"><b-icon type="tianjia-chuangjian"></b-icon> 标签添加</b-button>
</div>
</div>

::: code
```html
<div>
    <b-tag v-for="(item, index) in list" :key="index" :backcolor="item.color" closeable @on-close="close">{{item.name}}</b-tag>
    <b-button size="small" @on-click="click"><b-icon type="tianjia-chuangjian"></b-icon> 标签添加</b-button>
      <script>
    export default {
        data () {
            return {
                list:[
                {name:'标签1',color:'blue'},
                {name:'标签2',color:'green'},
                {name:'标签3',color:'orange'},
                {name:'标签4',color:'red'}]
            }
        },
        methods: {
            click(){
                this.list.push({name:'新增标签'})
            }
        }
    }
</script>

</div>
```
:::
 </div>
  <script>
    export default {
        data () {
            return {
                color1:'orange',
                backcolor1:"blue",
                backcolor2:"green",
                backcolor3:"orange",
                backcolor4:"red",
                list:[{name:'标签1',color:'blue'},
                {name:'标签2',color:'green'},
                {name:'标签3',color:'orange'},
                {name:'标签4',color:'red'}],
            }
        },
        methods: {
            click(){
                this.list.push({name:'新增标签'})
            },
            close(e){
                console.log(e)
            },
            handleClick(e) {
                console.log('e', e)
            }
        }
    }
</script> 

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| backcolor  | 标签颜色   | string  |  `blue`、`green`  、`orange` 、`red`       |       |
| color     | 圆点颜色   | string    |   `blue`、`green`  、`orange` 、`red` |       |
| closeable     | 是否可以关闭   | boolean    |    |     false  |
| type     | 标签带圆点   | string    |  `dots`  |       |
| name     |  当前标签的名称，使用 v-for，并支持关闭时，会比较有用	   | string、number    |    |       |


### events 
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-close     | 关闭时触发   |event , name
| on-click | 点击标签触发 | event , name
