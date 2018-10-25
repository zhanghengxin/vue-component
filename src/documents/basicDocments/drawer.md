# Drawer 抽屉
常见的抽屉组件
### 概述
抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

#### 代码演示
<script>
        export default {
          data () {
            return { 
                // local:'right',
                local1:'bottom',
                local2:'left',
                local3:'top',
                isShow:false,
                isShowtwo:false,
                isShowthree:false,
                isShowfour:false,
                
            }
          },
          methods: {
            change () {
                this.isShow =!this.isShow
            },
            changetwo () {
                this.isShowtwo =!this.isShowtwo
            },
            changetwo () {
                this.isShowtwo =!this.isShowtwo
            },
            change1(){
                this.isShow= !this.isShow
            }
          }
        }
</script>

<div class="example-box">
        <div>
            <b-button type="tynormal"  @on-click="change" >默认抽屉</b-button>
               <b-drawer :isshow="isShow" @drawerchange='change1'>
                 <p>产品研发中心</p>
                 <p>移动前端技术部</p>
                 <p>业务一组</p>
                 <p>李佳航</p>
                </b-drawer>
        </div>
    </div>

::: code
```html
    <div>
        <b-button type="tynormal"  @on-click="change" >默认抽屉</b-button>
        <b-drawer :isshow="isShow" @drawerchange='change1'>
            <p>产品研发中心</p>
            <p>移动前端技术部</p>
            <p>业务一组</p>
            <p>李佳航</p>
        </b-drawer>
    </div>
    <script>
        export default {
          data () {
            return { 
                // local:'right',
                isShow:false,
            }
          },
          methods: {
            change () {
                this.isShow =!this.isShow
            },
            change1(){
                this.isShow= !this.isShow
            }
          }
        }
    </script>
:::

<div>
<b-button type="tynormal"  @on-click="changetwo" >底部抽屉</b-button>
<b-drawer :local='local1' :isshow="isShowtwo" @drawerchange='changetwo'>
    <p>产品研发中心</p>
    <p>移动前端技术部</p>
<p>业务一组</p>
<p>李佳航</p>
</b-drawer>
</div>

::: code
```html
    <div>
        <b-button type="tynormal"  @on-click="change" >默认抽屉</b-button>
        <b-drawer :isshow="isShow" @drawerchange='change1'>
            <p>产品研发中心</p>
            <p>移动前端技术部</p>
            <p>业务一组</p>
            <p>李佳航</p>
        </b-drawer>
    </div>
    <script>
        export default {
            data () {
            return { 
                local:'bottom',
                isShow:false,
            }
            },
            methods: {
            change () {
                this.isShow =!this.isShow
            },
            change1(){
                this.isShow= !this.isShow
            }
            }
        }
    </script>
:::


