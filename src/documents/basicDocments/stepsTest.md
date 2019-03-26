
 <div class="example-box" style="width:1150px">
        <b-steps current='2' :size='size' status="error">
            <b-step title='单点' :content='content' icon="chaxun" status='single'></b-step>
            <b-step title='已完成' :content='content'></b-step>
            <b-step title='正进行' :content='content'></b-step>
            <b-step title='在等待' :content='content'></b-step>
        </b-steps>
       <div>
          <b-steps  current='1' status="finish">
              <b-step title='发送' :content='content' icon="fasong"></b-step>
              <b-step title='导出' :content='content' icon="dayin"></b-step>
              <b-step title='查看' :content='content' icon="chakan"></b-step>
          </b-steps>
      </div>
       <b-button size="normal" @on-click="handleClick">切换为{{afterChangeSize}}</b-button>
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
                      },
                      nextStep() {
                         this.step == 3?(this.step = 1):(this.step += 1)
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

