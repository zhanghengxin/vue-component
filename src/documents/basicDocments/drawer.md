# Drawer 抽屉
常见的抽屉组件
### 概述
抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

#### 代码演示
<script>
        export default {
          data () {
            return { 
                local1:'bottom',
                local2:'left',
                localt:'top',
                localw:'left',
                isShow:false,
                isShowtwo:false,
                isShoww:false,
                isShowt:false,
                
            }
          },
          methods: {
            change () {
                this.isShow =!this.isShow
            },
            changetwo () {
                this.isShowtwo =!this.isShowtwo
            },
            change1(){
                this.isShow= !this.isShow
            },
            changew () {
                   this.isShoww =!this.isShoww
            },
            changebw(){
                this.isShoww =!this.isShoww
            },
            changet(){
                this.isShowt =!this.isShowt
            },
            changebt(){
                 this.isShowt =!this.isShowt
            }
          }
        }
</script>

<div class="example-box">
        <div>
            <b-button type="typrimary"  @on-click="change" >默认抽屉</b-button>
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
        <b-drawer :isshow="isShow" @drawerchange='close'>
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
                isShow:false,
            }
          },
          methods: {
            change () {
                this.isShow =!this.isShow
            },
            close(){
                this.isShow= !this.isShow
            }
          }
        }
    </script>
:::

<div>
<b-button type="tysuccess"  @on-click="changetwo" >底部抽屉</b-button>
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
        <b-button type="tynormal" @on-click="change">默认抽屉</b-button>
        <b-drawer :local='local' :isshow="isShow" @drawerchange='close'>
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
            close(){
                this.isShow= !this.isShow
            }
            }
        }
    </script>
:::
<div>
<b-button type="tywarning"  @on-click="changew" >左边抽屉</b-button>
<b-drawer :local='localw' :isshow="isShoww" @drawerchange='changebw'>
    <p>产品研发中心</p>
    <p>移动前端技术部</p>
<p>业务一组</p>
<p>李佳航</p>
</b-drawer>
</div>

::: code
```html
    <div>
        <b-button type="tywarning" @on-click="change">左边抽屉</b-button>
        <b-drawer :local='local' :isshow="isShow" @drawerchange='close'>
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
                local:'left',
                isShow:false,
            }
            },
            methods: {
            change () {
                this.isShow =!this.isShow
            },
            close(){
                this.isShow= !this.isShow
            }
            }
        }
    </script>

:::
<div>
    <b-button type="tyerror"  @on-click="changet" >上边抽屉</b-button>
    <b-drawer :local='localt' :isshow="isShowt" @drawerchange='changebt'>
        <p>产品研发中心</p>
        <p>移动前端技术部</p>
        <p>业务一组</p>
        <p>李佳航</p>
    </b-drawer>
</div>

::: code
```html
    <div>
        <b-button type="tywarning" @on-click="change">左边抽屉</b-button>
        <b-drawer :local='local' :isshow="isShow" @drawerchange='close'>
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
                local:'top',
                isShow:false,
            }
            },
            methods: {
            change () {
                this.isShow =!this.isShow
            },
            close(){
                this.isShow= !this.isShow
            }
            }
        }
    </script>


