#  ColorPicker 颜色选择器
<br>

### __概述__

<br>
用于颜色选择，支持多种颜色格式，支持颜色预设。

<br>
<script>
    export default {
        data () {
            return {
                color1: '#19be6b',
                color2: '',
                color3:'rgba(25, 190,107, 0.5)',
                color4:'#19be6b',
                color5:'#19be6b',
                color6: '#19be6b',
                color7: '#19be6b',
                colors: ['#311B92', '#512DA8', '#673AB7', '#9575CD', '#D1C4E9']
            }
        }
    }
</script>

### **基础用法**

可以使用 `v-model` 实现数据的双向绑定。

<div class="example">
    <div class="example-box">
        <b-row>
            <b-col span="12">
                无默认值: <b-color-picker v-model="color2" />
            </b-col>
            <b-col span="12">
                有默认值: <b-color-picker v-model="color1" />
            </b-col>
        </b-row>
    </div>

::: code
```html
    <b-row>
        <b-col span="12">
            无默认值: <b-color-picker v-model="color2" />
        </b-col>
        <b-col span="12">
            有默认值: <b-color-picker v-model="color1" />
        </b-col>
    </b-row>
    <script>
        export default {
            data () {
                return {
                    color1: '#19be6b',
                    color2: ''
                }
            }
        }
    </script>
```
:::
</div>

### **透明度**

开启属性 `alpha`，可以选择带 Alpha 通道的颜色。

<div class="example">
    <div class="example-box">
        <b-color-picker v-model="color3" alpha />
    </div>

::: code
```html
   <b-color-picker v-model="color3" alpha />
    <script>
        export default {
            data () {
                return {
                    color3:'rgba(25, 190,107, 0.5)'
                }
            }
        }
    </script>
```
:::
</div>

### **色彩**

设置属性 `hue` 为 `false`，可以禁用色彩选项。

<div class="example">
    <div class="example-box">
        <b-color-picker v-model="color7" :hue="false" />
    </div>

::: code
```html
   <b-color-picker v-model="color7" :hue="false" />
    <script>
        export default {
            data () {
                return {
                    color7: '#19be6b'
                }
            }
        }
    </script>
```
:::
</div>

### **颜色预设**

开启属性 `recommend` 可以显示推荐的颜色预设，或设置属性 `colors` 来自定义预设颜色。

<div class="example">
    <div class="example-box">
        <b-row>
            <b-col span="12">
                 <b-color-picker v-model="color4" recommend/>
            </b-col>
            <b-col span="12">
                 <b-color-picker v-model="color5" :colors="colors"/>
            </b-col>
        </b-row>
    </div>

::: code
```html
   <b-row>
       <b-col span="12">
            <b-color-picker v-model="color4" recommend/>
       </b-col>
       <b-col span="12">
            <b-color-picker v-model="color5" :colors="colors"/>
       </b-col>
   </b-row>
    <script>
        export default {
            data () {
                return {
                   color4:'#19be6b' ,
                   color5:'#19be6b',
                   colors: ['#311B92', '#512DA8', '#673AB7', '#9575CD', '#D1C4E9']
                }
            }
        }
    </script>
```
:::
</div>

### **尺寸**

选择器有三种尺寸：大、默认（中）、小。

<div class="example">
    <div class="example-box">
        <b-row>
            <b-col span="8">
                 <b-color-picker v-model="color6" size="large" />
            </b-col>
            <b-col span="8">
                 <b-color-picker v-model="color6" />
            </b-col>
            <b-col span="8">
                 <b-color-picker v-model="color6" size="small"/>
            </b-col>
        </b-row>
    </div>

::: code
```html
   <b-row>
      <b-col span="8">
           <b-color-picker v-model="color6" size="large" />
      </b-col>
      <b-col span="8">
           <b-color-picker v-model="color6" />
      </b-col>
      <b-col span="8">
           <b-color-picker v-model="color6" size="small"/>
      </b-col>
  </b-row>
    <script>
        export default {
            data () {
                return {
                    color6: '#19be6b'
                }
            }
        }
    </script>
```
:::
</div>

### API

### ColorPicker props

| 属性 | 说明 | 类型 | 默认值|
| ---- | ---- | ---- | ---- |
|value|	绑定的值，可使用 v-model 双向绑定|	String|	-|
|disabled|	是否禁用|	Boolean	|false|
|editable|	是否可以输入色值|	Boolean|true|
|alpha|	是否支持透明度选择	|Boolean	|false|
|hue	|是否支持色彩选择|	Boolean	|true|
|recommend|	是否显示推荐的颜色预设	|Boolean	|false|
|colors|	自定义颜色预设|	Array|	[ ]|
|format	|颜色的格式，可选值为 hsl、hsv、hex、rgb|	String|	开启 alpha 时为 rgb，其它为 hex|
|size|	尺寸，可选值为large、small、default或者不设置|	String|	-|

### ColorPicker events

|事件名|	说明|	返回值|
| ---- | ---- | ---- |
|on-change|	当绑定值变化时触发	|当前值|
|on-active-change	|面板中当前显示的颜色发生改变时触发|	当前显示的颜色值|
|on-open-change|	下拉框展开或收起时触发|	true / false|
