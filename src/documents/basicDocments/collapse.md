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
      created(){
        console.log(this)
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
    <b-collapse @change="handle" v-model="showList1">
      <b-collapse-item name='one'>
        <span slot="title">This is Title1</span>
        <div slot="content">
          <div>This is Content1</div>
        </div>
      </b-collapse-item>
      <b-collapse-item >
        <span slot="title">This Title2</span>
        <div slot="content">This is Content2</div>
      </b-collapse-item>
      <b-collapse-item>
        <span slot="title">This Title3</span>
        <div slot="content">This is Content3</div>
      </b-collapse-item>
      <b-collapse-item>
        <span slot="title">This Title4</span>
        <div slot="content">This is Content4</div>
      </b-collapse-item>
    </b-collapse>
  </div>
</template>

::: code
```html
    <template>
        <div>
            <b-collapse @change="handle" v-model="showList1">
                <b-collapse-item name='one'>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This Title2</span>
                    <div slot="content">This is Content2</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This Title4</span>
                    <div slot="content">This is Content4</div>
                </b-collapse-item>
             </b-collapse>
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
    <b-collapse @change="handle" v-model="showList2" accordion >
      <b-collapse-item name='one'>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </b-collapse-item>
      <b-collapse-item name='two'>
        <span slot="title">This Title2</span>
        <div slot="content">This is Content2</div>
      </b-collapse-item>
       <b-collapse-item name='three'>
        <span slot="title">This Title3</span>
        <div slot="content">This is Content3</div>
      </b-collapse-item>
      <b-collapse-item>
        <span slot="title">This Title4</span>
        <div slot="content">This is Content4</div>
      </b-collapse-item>
    </b-collapse>
  </div>
</template>

::: code
```html
    <template>
        <div>
            <b-collapse @change="handle" v-model="showList2" accordion >
                <b-collapse-item name='one' >
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item name='two'>
                    <span slot="title">This Title2</span>
                    <div slot="content">This is Content2</div>
                </b-collapse-item>
                <b-collapse-item name='three'>
                    <span slot="title">This Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This Title4</span>
                    <div slot="content">This is Content4</div>
                </b-collapse-item>
             </b-collapse>
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
    <b-collapse v-model="nestingList" >
        <b-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">
            <b-collapse v-model="childList">
              <b-collapse-item>
                <span slot="title">1-----</span>
                <div slot="content">1-----</div>
              </b-collapse-item>
              <b-collapse-item>
                <span slot="title">2-----</span>
                <div slot="content">2-----</div>
              </b-collapse-item>
            </b-collapse>
          </div>
        </b-collapse-item>
        <b-collapse-item>
          <span slot="title">This Title2</span>
          <div slot="content">This is Content2</div>
        </b-collapse-item>
    </b-collapse>
  </div>
</template>


::: code

```html
  <template>
    <div>
      <b-collapse v-model="nestingList">
          <b-collapse-item>
            <span slot="title">This is Title1</span>
            <div slot="content">
              <b-collapse v-model="childList">
                <b-collapse-item>
                  <span slot="title">1-----</span>
                  <div slot="content">1-----</div>
                </b-collapse-item>
                <b-collapse-item>
                  <span slot="title">2-----</span>
                  <div slot="content">2-----</div>
                </b-collapse-item>
              </b-collapse>
            </p>
          </b-collapse-item>
          <b-collapse-item>
            <span slot="title">This Title2</span>
            <div slot="content">This is Content2</div>
          </b-collapse-item>
      </b-collapse>
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
    <b-collapse @change="handle" simple>
      <b-collapse-item name='one' >
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </b-collapse-item>
      <b-collapse-item name='two'>
        <span slot="title">This Title2</span>
        <div slot="content">This is Content2</div>
      </b-collapse-item>
       <b-collapse-item name='three'>
        <span slot="title">This Title3</span>
        <div slot="content">This is Content3</div>
      </b-collapse-item>
      <b-collapse-item>
        <span slot="title">This Title4</span>
        <div slot="content">This is Content4</div>
      </b-collapse-item>
    </b-collapse>
  </div>
</template>

::: code
```html
    <template>
        <div>
            <b-collapse @change="handle"  simple>
                <b-collapse-item name='one'>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item name='two'>
                    <span slot="title">This Title2</span>
                    <div slot="content">This is Content2</div>
                </b-collapse-item>
                <b-collapse-item name='three'>
                    <span slot="title">This Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This Title4</span>
                     <div slot="content">This is Content4</div>
                </b-collapse-item>
             </b-collapse>
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
    <b-collapse positionArrow="left">
      <b-collapse-item>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </b-collapse-item>
    </b-collapse>
    <b-collapse positionArrow='right' style="margin-top:10px">
      <b-collapse-item>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </b-collapse-item>
    </b-collapse>
    <b-collapse positionArrow='hidden' style="margin-top:10px">
      <b-collapse-item>
        <span slot="title">This is Title1</span>
        <div slot="content">This is Content1</div>
      </b-collapse-item>
    </b-collapse>
  </div>
</template>

::: code
```html
  <template>
    <div>
      <b-collapse  positionArrow="left">
        <b-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">This is Content1</div>
        </b-collapse-item>
      </b-collapse>
      <b-collapse positionArrow='right'>
        <b-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">This is Content1</div>
        </b-collapse-item>
      </b-collapse>
      <b-collapse positionArrow='hidden'>
        <b-collapse-item>
          <span slot="title">This is Title1</span>
          <div slot="content">This is Content1</div>
        </b-collapse-item>
      </b-collapse>
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