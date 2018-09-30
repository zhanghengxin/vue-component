<script>
    export default {
      data () {
        return {
          showList1: ['one', '1'],
          showList2: ['three'],
          nestingList: ['0','1'],
          childList: ['1']
        }
      },
      methods: {
        handle (val) {
          console.log(val)
        },
      }
    }
</script>
    
# Collapse 折叠面板
可折叠收纳面板内容

### 基础用法
可以同时展开多个面板，可设置默认展开的 ```name``` 或 ```index```

<template>
  <div>
    <bw-collapse @change="handle" v-model="showList1">
      <bw-collapse-item name='one'>
        <span slot="title">This is Title1</span>
        <div slot="content">
          <div>This is Content1</div>
        </div>
      </bw-collapse-item>
      <bw-collapse-item >
        <span slot="title">This Title2</span>
        <div slot="content">This is Content2</div>
      </bw-collapse-item>
      <bw-collapse-item>
        <span slot="title">This Title3</span>
        <div slot="content">This is Content3</div>
      </bw-collapse-item>
      <bw-collapse-item>
        <span slot="title">This Title4</span>
        <div slot="content">This is Content4</div>
      </bw-collapse-item>
    </bw-collapse>
  </div>
</template>

::: code
```html
    <template>
        <div>
            <bw-collapse @change="handle" v-model="showList1">
                <bw-collapse-item name='one'>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </bw-collapse-item>
                <bw-collapse-item>
                    <span slot="title">This Title2</span>
                    <div slot="content">This is Content2</div>
                </bw-collapse-item>
                <bw-collapse-item>
                    <span slot="title">This Title3</span>
                    <div slot="content">This is Content3</div>
                </bw-collapse-item>
                <bw-collapse-item>
                    <span slot="title">This Title4</span>
                    <div slot="content">This is Content4</div>
                </bw-collapse-item>
             </bw-collapse>
        </div>
    </template>

    <script>
        export default {
          data () {
            return {
              showList1: ['one', '1']
            }
          },
          methods: {
            handle (val) {
              console.log(val)
            }
          }
        }
    </script>
```
:::

#

### 手风琴效果
使用```accordion``` 属性来开启手风琴模式,每次只能展开一个面板

<template>
  <div>
    <bw-collapse @change="handle" v-model="showList2" accordion >
      <bw-collapse-item name='one'>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </bw-collapse-item>
      <bw-collapse-item name='two'>
        <span slot="title">This Title2</span>
        <div slot="content">This is Content2</div>
      </bw-collapse-item>
       <bw-collapse-item name='three'>
        <span slot="title">This Title3</span>
        <div slot="content">This is Content3</div>
      </bw-collapse-item>
      <bw-collapse-item>
        <span slot="title">This Title4</span>
        <div slot="content">This is Content4</div>
      </bw-collapse-item>
    </bw-collapse>
  </div>
</template>

::: code
```html
    <template>
        <div>
            <bw-collapse @change="handle" v-model="showList2" accordion >
                <bw-collapse-item name='one' >
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </bw-collapse-item>
                <bw-collapse-item name='two'>
                    <span slot="title">This Title2</span>
                    <div slot="content">This is Content2</div>
                </bw-collapse-item>
                <bw-collapse-item name='three'>
                    <span slot="title">This Title3</span>
                    <div slot="content">This is Content3</div>
                </bw-collapse-item>
                <bw-collapse-item>
                    <span slot="title">This Title4</span>
                    <div slot="content">This is Content4</div>
                </bw-collapse-item>
             </bw-collapse>
        </div>
    </template>

    <script>
        export default {
          data () {
            return {
              showList2: ['three']
            }
          },
          methods: {
            handle (val) {
              console.log(val)
            }
          }
        }
    </script>
```
::: 

#

### 面板嵌套
嵌套折叠面板

<template>
  <div>
    <bw-collapse v-model="nestingList" >
        <bw-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">
            <bw-collapse v-model="childList">
              <bw-collapse-item>
                <span slot="title">1-----</span>
                <div slot="content">1-----</div>
              </bw-collapse-item>
              <bw-collapse-item>
                <span slot="title">2-----</span>
                <div slot="content">2-----</div>
              </bw-collapse-item>
            </bw-collapse>
          </div>
        </bw-collapse-item>
        <bw-collapse-item>
          <span slot="title">This Title2</span>
          <div slot="content">This is Content2</div>
        </bw-collapse-item>
    </bw-collapse>
  </div>
</template>


::: code

```html
  <template>
    <div>
      <bw-collapse v-model="nestingList">
          <bw-collapse-item>
            <span slot="title">This is Title1</span>
            <div slot="content">
              <bw-collapse v-model="childList">
                <bw-collapse-item>
                  <span slot="title">1-----</span>
                  <div slot="content">1-----</div>
                </bw-collapse-item>
                <bw-collapse-item>
                  <span slot="title">2-----</span>
                  <div slot="content">2-----</div>
                </bw-collapse-item>
              </bw-collapse>
            </p>
          </bw-collapse-item>
          <bw-collapse-item>
            <span slot="title">This Title2</span>
            <div slot="content">This is Content2</div>
          </bw-collapse-item>
      </bw-collapse>
    </div>
  </template>

  <script>
      export default {
        data() {
          return {
            nestingList: ['0','1'],
            childList: ['1',]
          }
        }
      }
  </script>
```
:::

#

###  简洁模式
```simple``` 属性来开启简洁模式

<template>
  <div>
    <bw-collapse @change="handle" simple>
      <bw-collapse-item name='one' >
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </bw-collapse-item>
      <bw-collapse-item name='two'>
        <span slot="title">This Title2</span>
        <div slot="content">This is Content2</div>
      </bw-collapse-item>
       <bw-collapse-item name='three'>
        <span slot="title">This Title3</span>
        <div slot="content">This is Content3</div>
      </bw-collapse-item>
      <bw-collapse-item>
        <span slot="title">This Title4</span>
        <div slot="content">This is Content4</div>
      </bw-collapse-item>
    </bw-collapse>
  </div>
</template>

::: code
```html
    <template>
        <div>
            <bw-collapse @change="handle"  simple>
                <bw-collapse-item name='one'>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </bw-collapse-item>
                <bw-collapse-item name='two'>
                    <span slot="title">This Title2</span>
                    <div slot="content">This is Content2</div>
                </bw-collapse-item>
                <bw-collapse-item name='three'>
                    <span slot="title">This Title3</span>
                    <div slot="content">This is Content3</div>
                </bw-collapse-item>
                <bw-collapse-item>
                    <span slot="title">This Title4</span>
                     <div slot="content">This is Content4</div>
                </bw-collapse-item>
             </bw-collapse>
        </div>
    </template>

    <script>
        export default {
          methods: {
            handle (val) {
              console.log(val)
            }
          }
        }
    </script>
```
::: 

#

###  箭头位置
positionArrow:```left``` ```right``` ```hidden```  确定箭头位置，默认为左箭头

<template>
  <div>
    <bw-collapse positionArrow="left">
      <bw-collapse-item>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </bw-collapse-item>
    </bw-collapse>
    <bw-collapse positionArrow='right' style="margin-top:10px">
      <bw-collapse-item>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </bw-collapse-item>
    </bw-collapse>
    <bw-collapse positionArrow='hidden' style="margin-top:10px">
      <bw-collapse-item>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </bw-collapse-item>
    </bw-collapse>
  </div>
</template>

::: code
```html
  <template>
    <div>
      <bw-collapse  positionArrow="left">
        <bw-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">This is Content1</div>
        </bw-collapse-item>
      </bw-collapse>
      <bw-collapse positionArrow='right'>
        <bw-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">This is Content1</div>
        </bw-collapse-item>
      </bw-collapse>
      <bw-collapse positionArrow='hidden'>
        <bw-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">This is Content1</div>
        </bw-collapse-item>
      </bw-collapse>
    </div>
  </template>
```
::: 

#

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 面板可自定义name，与v-model配合使用，可设置展示面板   | String    |   自定义 |     ''  |
| accordion   |  开启手风琴模式   | Boolean    |   true/false |    false |
| simple     |   开启简洁模式   | Boolean   |   true/false|     false |
| positionArrow     |  展示箭头位置   | String   |   left / right / hidden| left |
### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| change    | 切换面板触发，返回当前展开的key  | [] |
### slot
| 名称	      | 说明	    | 
|---------- |-------- |
| title    | 面板头内容title |
| content  | 面板描述内容content |