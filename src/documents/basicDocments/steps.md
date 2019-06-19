# Steps 步骤条

### 概述
拆分某项流程的步骤，引导用户按流程完成任务。

### 代码示例

### 基础版
&nbsp;&nbsp;&nbsp;

> 基本用法：组件会根据```current```自动判断各步骤状态。

<div class="example-box">
    <script>
    //| lineType     | 线条类型   | String    |  ```line```、 ```zonal```(带状的)   |     ```line```  |
     // | shapeType     | 布局的形状   | String    |  ```line```、 ```circle``` 、 ```curve```（弯曲的）  |     ```line```  |
     // | angle     | 距上一个节点的角度   | Number    |    |   0  |
         export default {
             methods: {
                 handleClick() {
                     this.size = this.changeSize();
                 },
                 changeSize(){
                    switch(this.size){
                        case 'small':
                            return 'normal';
                            break;
                        case 'normal':
                            return 'small';
                            break;
                    }
                 },
                 nextStep() {
                    this.step == 2?(this.step = 0):(this.step += 1)
                 }
             },
             data:function(){
                 return {
                    size:'small',
                    step:2,
                    content:'这里是该步骤的描述信息',
                    errorContent:'该步骤出现问题'
                 };
             },
             computed:{
                  afterChangeSize() {
                      return this.changeSize();
                  }
             }
         }
     </script>
</div>

<div class="example">
    <div class="example-box">
        <div>
            <b-steps current='1'>
                <b-step title='已完成' :content='content'></b-step>
                <b-step title='正进行' :content='content'></b-step>
                <b-step title='在等待' :content='content'></b-step>
            </b-steps>
        </div>
    </div>

::: code
```html
    <div>
        <b-steps current='1' >
            <b-step title='已完成' :content='content'></b-step>
            <b-step title='正进行' :content='content'></b-step>
            <b-step title='在等待' :content='content'></b-step>
        </b-steps>
    </div>
    <script>
        export default {
             data:function(){
                 return {
                    content:'这里是该步骤的描述信息'
                 };
             }
         }
    </script>
```
:::
</div>

> 设置属性```size```为```small```启用迷你版。

<div class="example">
    <div class="example-box">
        <div>
            <b-steps current='1' :size='size'>
                <b-step title='已完成' :content='content'></b-step>
                <b-step title='正进行' :content='content'></b-step>
                <b-step title='在等待' :content='content'></b-step>
            </b-steps>
        </div>
        <div>
           <b-button size="default" @on-click="handleClick">切换为{{afterChangeSize}}</b-button>
        </div>
    </div>

::: code
```html
    <div class="example-box">
        <div>
            <b-steps current='1' :size='size'>
                <b-step title='已完成' :content='content'></b-step>
                <b-step title='正进行' :content='content'></b-step>
                <b-step title='在等待' :content='content'></b-step>
            </b-steps>
        </div>
        <div>
           <b-button size="default" @on-click="handleClick">切换为{{afterChangeSize}}</b-button>
        </div>
         <script>
             export default {
                 methods: {
                     handleClick() {
                         this.size = this.changeSize();
                     },
                     changeSize(){
                        switch(this.size){
                            case 'small':
                                return 'normal';
                                break;
                            case 'normal':
                                return 'small';
                                break;
                        }
                     }
                 },
                 data:function(){
                     return {
                        size:'small'
                     };
                 },
                 computed:{
                      afterChangeSize() {
                          return this.changeSize();
                      }
                 }
             }
         </script>
    </div>
```
:::
</div>

> 通过设置```Step```的```icon```属性可以自定义图标。

<div class="example">
    <div class="example-box">
        <div>
            <div>
               <b-steps >
                   <b-step title='发送' :content='content' icon="fasong"></b-step>
                   <b-step title='导出' :content='content' icon="dayin"></b-step>
                   <b-step title='查看' :content='content' icon="chakan"></b-step>
               </b-steps>
           </div>
        </div>
    </div>

::: code
```html
    <div class="example-box">
       <div>
           <div>
              <b-steps >
                  <b-step title='发送' :content='content' icon="fasong"></b-step>
                  <b-step title='导出' :content='content' icon="dayin"></b-step>
                  <b-step title='查看' :content='content' icon="chakan"></b-step>
              </b-steps>
          </div>
       </div>
    </div>
```
:::
</div>

> 点击下一步按钮可以切换当前进度状态。

<div class="example">
    <div class="example-box">
       <div>
           <b-steps :current='step' >
               <b-step title='步骤1' :content='content'></b-step>
               <b-step title='步骤2' :content='content'></b-step>
               <b-step title='步骤3' :content='content'></b-step>
           </b-steps>
       </div>
        <div>
           <b-button size="default" @on-click="nextStep">下一步</b-button>
        </div>
    </div>

::: code
```html
    <div class="example-box">
        <div>
          <b-steps :current='step' >
             <b-step title='步骤1' :content='content'></b-step>
             <b-step title='步骤2' :content='content'></b-step>
             <b-step title='步骤3' :content='content'></b-step>
          </b-steps>
       </div>
        <div>
           <b-button size="default" @on-click="nextStep">下一步</b-button>
        </div>
         <script>
             export default {
                 methods: {
                     nextStep() {
                         this.step += 1;
                     }
                 },
                 data:function(){
                     return {
                        step:1
                     };
                 }
             }
         </script>
    </div>
```
:::
</div>

> 垂直方向

<div class="example">
    <div class="example-box">
        <div>
            <b-steps current="2" status="error" direction='vertical' length="500">
                <b-step title='步骤1' :content='content'></b-step>
                <b-step title='步骤2' :content='content'></b-step>
                <b-step title='步骤3' :content='content'></b-step>
            </b-steps>
        </div>
    </div>

::: code
```html
    <div class="example-box">
         <b-steps current="2" status="error" direction='vertical' >
             <b-step title='步骤1' :content='content'></b-step>
             <b-step title='步骤2' :content='content'></b-step>
             <b-step title='步骤3' :content='content'></b-step>
          </b-steps>
    </div>
```
:::
</div>

> 步骤运行错误：
设置Steps的属性```status```为```error```指定当前步骤状态。

<div class="example">
    <div class="example-box">
        <div>
            <b-steps current='1' status='error'>
                <b-step title='已完成' :content='content'></b-step>
                <b-step title='中断' :content='errorContent'></b-step>
                <b-step title='在等待' :content='content'></b-step>
            </b-steps>
        </div>
    </div>

::: code
```html
    <div class="example-box">
        <div>
             <b-steps current='1' status='error'>
                <b-step title='已完成' :content='content'></b-step>
                <b-step title='中断' :content='content'></b-step>
                <b-step title='在等待' :content='content'></b-step>
            </b-steps>
        </div>
    </div>
```
:::
</div>

> 单点（新增功能，只能是第一个点为单点，根据供应链模块中"已打回"状态的实际需求，添加的此功能）：
设置Steps的属性```status```为```single```指定第一个点为单点。

<div class="example">
    <div class="example-box">
        <div>
            <b-steps current='2' status='error'>
                <b-step title='单点（已打回）' :content='content' status="single"></b-step>
                <b-step title='已完成' :content='content'></b-step>
                <b-step title='中断' :content='errorContent'></b-step>
                <b-step title='在等待' :content='content'></b-step>
            </b-steps>
        </div>
    </div>

::: code
```html
    <div class="example-box">
       <div>
           <b-steps current='2' status='error'>
               <b-step title='单点（已打回）' :content='content' status="single"></b-step>
               <b-step title='已完成' :content='content'></b-step>
               <b-step title='中断' :content='errorContent'></b-step>
               <b-step title='在等待' :content='content'></b-step>
           </b-steps>
       </div>
    </div>
```
:::
</div>

### 扩展版

> 带状进度条

<div class="example">
    <div class="example-box">
        <div>
            这里会放置一个连接线为带状的steps组件
        </div>
    </div>

::: code
```html
    <div class="example-box">
        <div>
            这里会放置一个连接线为带状的steps组件
        </div>
    </div>
```
:::
</div>

> 环状进度条

<div class="example">
    <div class="example-box">
        <div>
            这里会放置一个环形的steps组件
        </div>
    </div>

::: code
```html
    <div class="example-box">
        <div>
            这里会放置一个环形的steps组件
        </div>
    </div>
```
:::
</div>

> 曲线进度条

<div class="example">
    <div class="example-box">
        <div>
            这里会放置一个形状为曲线的steps组件
        </div>
    </div>

::: code
```html
    <div class="example-box">
        <div>
            这里会放置一个形状为曲线的steps组件
        </div>
    </div>
```
:::
</div>

### Steps props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | String  |  ```normal```、```small```         |    ```normal```   |
| current     | 当前步骤，从 0 开始计数   | Number    |  0～n  |     0  |
| length     | steps组件的总长度   | Number    |    |     |
| status     | 当前步骤的状态   | String    |  可选值为```wait```、```process```、```finish```、```error```、```single```[孤立值]  |   ```process```  |
| direction     | 步骤条的方向   | String    |  可选值为```horizontal```或者```vertical```  |   ```horizontal```  |

### Step props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| status     | 当前步骤的状态   | String    |  可选值为```wait```、```process```、```finish```、```error```、```single```[孤立值]  |   ```process```  |
| title     | 标题   | String    |    |   -  |
| content     | 详细介绍   | String    |    |   -  |
| icon     | 图标   | String    |    |   -  |
| value     | 当前节点的value值   | String    |    |   -  |


### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | {```status```、```current```、```value```、```title```、```icon```、```content```、```size```} |
