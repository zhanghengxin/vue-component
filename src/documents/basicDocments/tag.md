### Tag标签

<div>
    <b-tag :backcolor="backcolor1" >标签</b-tag>
    <b-tag :backcolor="backcolor2" >标签</b-tag>
    <b-tag :backcolor="backcolor3" >标签</b-tag>
    <b-tag :backcolor="backcolor4" >标签</b-tag>
    <b-tag >标签</b-tag>
</div>

::: code
```html
<div>
    <b-tag>标签</b-tag>
</div>
 
```
:::


<div>
    <b-tag :backcolor="backcolor1" closeable>标签</b-tag>
    <b-tag :backcolor="backcolor2" closeable>标签</b-tag>
    <b-tag :backcolor="backcolor3" closeable>标签</b-tag>
    <b-tag :backcolor="backcolor4" closeable>标签</b-tag>
    <b-tag closeable>标签</b-tag>
</div>

::: code
```html
<div>
    <b-tag>标签</b-tag>
</div>
 
```
:::


<div>
    <b-tag type="dots" :color="backcolor1" closeable>标签</b-tag>
     <b-tag type="dots" :color="backcolor2"  closeable>标签</b-tag>
    <b-tag type="dots" :color="backcolor3" closeable>标签</b-tag>
    <b-tag type="dots" :color="backcolor4" closeable>标签</b-tag>
    <b-tag type="dots" closeable>标签</b-tag>
</div>

::: code
```html
<div>
    <b-tag>标签</b-tag>
</div>
 
```
:::



  <script>
    export default {
        data () {
            return {
                color1:'warning',
                backcolor1:"primary",
                backcolor2:"success",
                backcolor3:"warning",
                backcolor4:"error"
            }
        },
        methods: {
        }
    }
</script>
