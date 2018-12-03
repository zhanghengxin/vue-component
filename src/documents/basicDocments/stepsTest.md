
 <div class="example-box" style="width:1150px">
        <b-steps current='2' :size='size' >
            <b-step title='单点' :content='content' icon="chaxun" status='single'></b-step>
            <b-step title='已完成' :content='content'></b-step>
            <b-step title='正进行' :content='content'></b-step>
            <b-step title='在等待' :content='content'></b-step>
        </b-steps>
        <b-steps current='2' >
            <b-step title='单点' :content='content' icon="chaxun" status='single'></b-step>
            <b-step title='已完成' :content='content'></b-step>
            <b-step title='正进行' :content='content'></b-step>
            <b-step title='在等待' :content='content'></b-step>
        </b-steps>
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

