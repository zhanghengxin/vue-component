# Notice 通知
### 概述
###### 在界面右下角显示可关闭的全局通知，常用于以下场景
* ###### 系统主动推送
* ###### 通知内容带有描述信息

### 代码示例
<div class="example">
  <div class="example-box">
      <div>
          <b-button type="tynormal" @on-click="tynormal">默认通知</b-button>
          <b-button type="tysuccess" @on-click="tysuccess">成功通知</b-button>
          <b-button type="tywarning"
          @on-click="tywarning">警告警告</b-button>
          <b-button type="tyerror"
          @on-click="tyerror">失败通知</b-button>
      </div>
  </div>
  <script>
    export default {
        methods: {
          tynormal(){
            this.$notice({
              content: "默认通知，样式有点丑"
            });
          },
          tysuccess(){
            this.$notice({
              content: "通过修改border-left来控制样式",
              type: "success"
            });
          },
          tywarning(){
            this.$notice({
              content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试",
              type: "warning"
            });
          },
          tyerror(){
            this.$notice({
              content: "我是纯粹凑数的",
              type: "error"
            });
          }
        }
    }
  </script>

::: code
```html
    <div>
      <b-button type="tynormal" @on-click="tynormal">默认通知</b-button>
      <b-button type="tysuccess" @on-click="tysuccess">成功通知</b-button>
      <b-button type="tywarning" @on-click="tywarning">警告警告</b-button>
      <b-button type="tyerror" @on-click="tyerror">失败通知</b-button>
   </div>
   <script>
      export default {
        methods: {
          tynormal(){
            this.$notice({
              content: "默认通知，样式有点丑"
            });
          },
          tysuccess(){
            this.$notice({
              content: "通过修改border-left来控制样式",
              type: "success"
            });
          },
          tywarning(){
            this.$notice({
              content: "换行测试换成测试换成测试换成测试换成测试换行测试换成测试换成测试换成测试换成测试",
              type: "warning"
            });
          },
          tyerror(){
            this.$notice({
              content: "我是纯粹凑数的",
              type: "error"
            });
          }
        }
    }
   </script>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 是否必填      | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| content     | 文本内容   | string  |  否         |    默认为空   |
| type     |  类型  | string  |  否         |    默认default   |

