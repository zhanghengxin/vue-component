# Carousel 级联选择框。
当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法

<div class='example'>
    <div class='example-box'>
        <b-cascader :data="data" v-model="value1"></b-cascader>
    </div>

::: code

```html
    <b-card title='我是卡片' icon='yonghuzhongxin'>
        <div>哈哈哈，我是 Body!</div>
    </b-card>
```
:::
</div>

<script>
    export default {
        data () {
            return {
               value1: [],
               data: [{
                   value: 'beijing',
                   label: '北京',
                   children: [
                       {
                           value: 'gugong',
                           label: '故宫'
                       },
                       {
                           value: 'tiantan',
                           label: '天坛'
                       },
                       {
                           value: 'wangfujing',
                           label: '王府井'
                       }
                   ]
               }, {
                   value: 'jiangsu',
                   label: '江苏',
                   children: [
                       {
                           value: 'nanjing',
                           label: '南京',
                           children: [
                               {
                                   value: 'fuzimiao',
                                   label: '夫子庙',
                               }
                           ]
                       },
                       {
                           value: 'suzhou',
                           label: '苏州',
                           children: [
                               {
                                   value: 'zhuozhengyuan',
                                   label: '拙政园',
                               },
                               {
                                   value: 'shizilin',
                                   label: '狮子林',
                               }
                           ]
                       }
                   ],
               }]
            }
        },
        methods: {
            handleChange(page) {
                alert('当前选中页数为'+ page)
            },
            sizeChange(size){
                alert('当前选中页数为'+ size)
            }
        }
    }
</script>