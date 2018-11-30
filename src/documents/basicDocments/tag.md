### Tag标签

<div class="example">
   <div class="example-box">
<div>
    <b-tag backcolor="primary" >标签</b-tag>
    <b-tag backcolor="success" >标签</b-tag>
    <b-tag backcolor="warning" >标签</b-tag>
    <b-tag backcolor="error" >标签</b-tag>
    <b-tag >标签</b-tag>
</div>
</div> 

::: code
```html

<div>
    <b-tag backcolor="primary">标签</b-tag>
    <b-tag backcolor="success">标签</b-tag>
    <b-tag backcolor="warning">标签</b-tag>
    <b-tag backcolor="error">标签</b-tag>
    <b-tag >标签</b-tag>
</div>

```
:::
</div>




<div class="example">
   <div class="example-box">
<div>
    <b-tag backcolor="primary" closeable>标签</b-tag>
    <b-tag backcolor="success" closeable>标签</b-tag>
    <b-tag backcolor="warning" closeable>标签</b-tag>
    <b-tag backcolor="error" closeable>标签</b-tag>
    <b-tag closeable>标签</b-tag>
</div>
</div>

::: code
```html
<div>
    <b-tag backcolor="primary" closeable>标签</b-tag>
    <b-tag backcolor="success" closeable>标签</b-tag>
    <b-tag backcolor="warning" closeable>标签</b-tag>
    <b-tag backcolor="error" closeable>标签</b-tag>
    <b-tag closeable>标签</b-tag>
</div>
 
```
:::
</div>

<div class="example">
   <div class="example-box">
<div>
    <b-tag type="dots" color="primary" closeable>标签</b-tag>
    <b-tag type="dots" color="success" closeable>标签</b-tag>
    <b-tag type="dots" color="warning" closeable>标签</b-tag>
    <b-tag type="dots" color="error" closeable>标签</b-tag>
    <b-tag type="dots" closeable>标签</b-tag>
</div>
</div>

::: code
```html
<div>
    <b-tag type="dots" color="primary" closeable>标签</b-tag>
    <b-tag type="dots" color="success" closeable>标签</b-tag>
    <b-tag type="dots" color="warning" closeable>标签</b-tag>
    <b-tag type="dots" color="error" closeable>标签</b-tag>
    <b-tag type="dots" closeable>标签</b-tag>
</div>
```
:::
 </div>


 <div class="example" style="width:1000px">
   <div class="example-box">
<div>
    <b-tag v-for="item in list" :key="item.name" :backcolor="item.color"  closeable @on-close="close">{{item.name}}</b-tag>
    <b-button size="small" @on-click="click"><b-icon type="tianjia-chuangjian"></b-icon> 标签添加</b-button>
</div>
</div>

::: code
```html
<div>
    <b-tag v-for="item in list" :key="item.name" :backcolor="item.color" closeable @on-close="close">{{item.name}}</b-tag>
    <b-button size="small" @on-click="click"><b-icon type="tianjia-chuangjian"></b-icon> 标签添加</b-button>
      <script>
    export default {
        data () {
            return {
                list:[
                {name:'标签1',color:'primary'},
                {name:'标签2',color:'success'},
                {name:'标签3',color:'warning'},
                {name:'标签4',color:'error'}]
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
                color1:'warning',
                backcolor1:"primary",
                backcolor2:"success",
                backcolor3:"warning",
                backcolor4:"error",
                list:[{name:'标签1',color:'primary'},
                {name:'标签2',color:'success'},
                {name:'标签3',color:'warning'},
                {name:'标签4',color:'error'}],
            }
        },
        methods: {
            click(){
                list.push({name:'新增标签'})
            },
            close(e){
                console.log(e)
            }
        }
    }
</script> 

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| backcolor  | 标签颜色   | string  |  `primary`、`success`  、`warning` 、`error`       |       |
| color     | 圆点颜色   | string    |   `primary`、`success`  、`warning` 、`error` |       |
| closeable     | 是否可以关闭   | boolean    |    |     false  |
| type     | 标签带圆点   | string    |  `dots`  |       |


### events 
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-close     | 关闭时触发   |event
