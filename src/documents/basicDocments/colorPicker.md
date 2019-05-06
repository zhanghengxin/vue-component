#  ColorPicker 颜色选择器

</br>

##  概述
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

<div class="example">
    <div class="example-box">
        <div>
            <div>
                无默认值:<ColorPicker v-model="color2" />
            </div>
            <div>
                有默认值:<ColorPicker v-model="color1" />
            </div>
        </div>
    </div>

::: code
```html
    <div>
    </div>
```
:::
</div>