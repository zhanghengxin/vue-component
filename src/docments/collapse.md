# Collapse 折叠面板
可折叠收纳面板内容
-----
### 基础用法
可以同时展开多个面板，可设置默认展开的 ```name``` 或 ```index```

<template>
  <div>
    <Collapse @change="handle" v-model="show">
      <CollapseItem name='one'>
        <span slot="title">This is Title1</span>
        <p slot="content">This is Content1</p>
      </CollapseItem>
      <CollapseItem name='two'>
        <span slot="title">This Title2</span>
        <p slot="content">This is Content2</p>
      </CollapseItem>
       <CollapseItem name='three'>
        <span slot="title">This Title3</span>
        <p slot="content">This is Content3</p>
      </CollapseItem>
      <CollapseItem>
        <span slot="title">This Title4</span>
        <p slot="content">This is Content4</p>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: ['two','3']
    }
  },
  methods: {
    handle (val) {
      console.log(val)
    }
  }
}
</script>
::: code

```html
    <template>
        <div>
            <Collapse @change="handle" v-model="show">
                <CollapseItem name='one'>
                    <span slot="title">This is Title1</span>
                    <p slot="content">This is Content1</p>
                </CollapseItem>
                <CollapseItem name='two'>
                    <span slot="title">This Title2</span>
                    <p slot="content">This is Content2</p>
                </CollapseItem>
                <CollapseItem name='three'>
                    <span slot="title">This Title3</span>
                    <p slot="content">This is Content3</p>
                </CollapseItem>
                <CollapseItem>
                    <span slot="title">This Title4</span>
                     <p slot="content">This is Content4</p>
                </CollapseItem>
             </Collapse>
        </div>
    </template>

    <script>
        export default {
          data () {
            return {
              show: ['two', '3']
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
    <Collapse @change="handle" v-model="show" accordion>
      <CollapseItem name='one'>
        <span slot="title">This is Title1</span>
        <p slot="content">This is Content1</p>
      </CollapseItem>
      <CollapseItem name='two'>
        <span slot="title">This Title2</span>
        <p slot="content">This is Content2</p>
      </CollapseItem>
       <CollapseItem name='three'>
        <span slot="title">This Title3</span>
        <p slot="content">This is Content3</p>
      </CollapseItem>
      <CollapseItem>
        <span slot="title">This Title4</span>
        <p slot="content">This is Content4</p>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: ['two','3']
    }
  },
  methods: {
    handle (val) {
      console.log(val)
    }
  }
}
</script>
::: code

```html
    <template>
        <div>
            <Collapse @change="handle" v-model="show" accordion>
                <CollapseItem name='one' >
                    <span slot="title">This is Title1</span>
                    <p slot="content">This is Content1</p>
                </CollapseItem>
                <CollapseItem name='two'>
                    <span slot="title">This Title2</span>
                    <p slot="content">This is Content2</p>
                </CollapseItem>
                <CollapseItem name='three'>
                    <span slot="title">This Title3</span>
                    <p slot="content">This is Content3</p>
                </CollapseItem>
                <CollapseItem>
                    <span slot="title">This Title4</span>
                     <p slot="content">This is Content4</p>
                </CollapseItem>
             </Collapse>
        </div>
    </template>

    <script>
        export default {
          data () {
            return {
              show: ['one', 'two']
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


# 待更新