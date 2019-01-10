
<div class="example-box">
    <script>
         export default {
             methods: {
                 updateOpened(){
                    this.$refs.menu.updateOpened(['2','3','3-3'])
                 },
                 updateActiveName(name){
                    this.$refs.menu.updateActiveName(name)
                    //this.activeName = name
                 },
                 goToNextPage(name,namePath,item){
                    console.log('name','namePath','item');
                    console.log(name,namePath,item);
                    window.open(item.route)
                 }
             },
             data:function(){
                 return {
                    size:'small',
                    activeName:'3-4-1',
                    openName:['3-1']
                 };
             },
             mounted(){
                let that = this;
                setTimeout(function(){
                    //that.updateOpened()
                },1000)
                setTimeout(function(){
                    //that.updateActiveName('3-4-2')
                },2000)
                setTimeout(function(){
                    //that.updateActiveName('3-2')
                },3000)
             }
         }
     </script>
</div>

<div class="example">
    <div class="example-box">
        <div style="width:400px;height:800px">
            <b-menu
                theme="light"
                width="300px"
                ref="menu"
                :activeName="activeName"
                :openNames="openName"
                :router="false"
                :accordion="false"
                trigger="click"
            >
                <b-menu-item name="1" iconType="juanshi">处理中心1</b-menu-item>
                <b-submenu name="2" >
                    <template slot="title">
                        处理中心2
                    </template>
                    <b-menu-item name="2-1" iconType="juanshi">处理中心2-1</b-menu-item>
                    <b-menu-item name="2-2" iconType="juanshi">处理中心2-2</b-menu-item>
                </b-submenu>
                <b-submenu name="3" iconType="juanshi">
                    <template slot="title">
                        处理中心3
                    </template>
                    <b-submenu name="3-1" iconType="juanshi">
                        <template slot="title">
                            处理中心3-1
                        </template>
                        <b-menu-item name="3-1-1" iconType="juanshi">处理中心3-1-1</b-menu-item>
                        <b-menu-item name="3-1-2" iconType="juanshi">处理中心3-1-2</b-menu-item>
                        <b-menu-item name="3-1-3" >处理中心3-1-3</b-menu-item>
                    </b-submenu>
                    <b-menu-item name="3-2" iconType="juanshi">处理中心3-2</b-menu-item>
                    <b-menu-group title="处理中心3-4" iconType="juanshi">
                        <b-menu-item name="3-4-1" iconType="juanshi">处理中心3-4-1</b-menu-item>
                        <b-menu-item name="3-4-2" iconType="juanshi">处理中心3-4-2</b-menu-item>
                    </b-menu-group>
                    <b-menu-item name="3-5" :disabled="true" iconType="juanshi">处理中心3-5</b-menu-item>
                </b-submenu>
            </b-menu>
        </div>
    </div>
</div>

<div class="example">
    <div class="example-box">
        <div style="width:400px;height:800px">
            <b-menu
                theme="light"
                ref="menu"
                width="500px"
                mode="horizontal"
                :router="true"
                trigger="hover"
                :accordion="true"
            >
                <b-menu-item name="1" iconType="juanshi" route="menu">处理中心1</b-menu-item>
                <b-submenu name="2" iconType="juanshi">
                    <template slot="title">
                        处理中心2
                    </template>
                    <b-menu-item name="2-1">处理中心2-1</b-menu-item>
                    <b-menu-item name="2-2">处理中心2-2</b-menu-item>
                </b-submenu>
                <b-submenu name="3" iconType="juanshi">
                    <template slot="title">
                        处理中心3
                    </template>
                    <b-menu-item name="3-2">处理中心3-2</b-menu-item>
                    <b-menu-item name="3-5" :disabled="true">处理中心3-5</b-menu-item>
                </b-submenu>
            </b-menu>
        </div>
    </div>
</div>