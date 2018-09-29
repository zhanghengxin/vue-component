<template>
<div style="width:100%;height:100%">
  <div class='box'>
    <div class='left' :style='left'>
        <div class='progress' :style='progress'>
        </div>
    </div>
    <div class='right' v-if='showText'>
      <slot>
        <div v-if="status!='Success'&&status!='Exception'">{{value}}%</div>
        <div v-if="status=='Success'">
          <img class='statusPic' src='@/assets/image/gouM.png'>
        </div>
        <div v-if="status=='Exception'">
          <img class='statusPic' src='@/assets/image/cuoM.png'>
        </div>
      </slot>

    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'bwProgress',
    data () {
        return {
        }
    },
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        strokeWidth: {
            type: Number,
            default: 10
        },
        status: {
            type: String,
            default: ''
        },
        showText: {
            type: Boolean,
            default: true
        },
        percentage: {
            type: Number,
            default: 30,
            required: true
        },
        color: {
            type: String,
            default: 'blue'
        }
    },
    computed: {
        progress () {
            return {
                'width': this.vertical ? this.strokeWidth + 'px' : (this.value === 100 || this.status === 'Success' ? '100%' : this.percentage + '%'),
                'height': this.vertical ? (this.value === 100 || this.status === 'Success' ? '100%' : this.percentage + '%') : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px',
                'backgroundColor': this.status === 'Success' || this.value === 100 ? '#3CB371' : (this.status === 'Exception' ? 'red' : this.color)
            }
        },
        left () {
            return {
                'width': this.vertical ? this.strokeWidth + 'px' : '100%',
                'height': this.vertical ? '100%' : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px'
            }
        },
        value () {
            return this.percentage
        }
    }
}
</script>

<style scoped>
  .box{
    width:100%;
    height:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .left{
    background-color: rgb(238, 233, 233);
    display: flex;
    align-items: flex-end;
  }
  .right{
    width: 40px;
    height: 40px;
    line-height: 40px;
    padding-left:6px
  }
  .statusPic{
    width: 15px;
    height: 15px;
  }
  .progress{
    transition: all .2s linear;
  }
</style>
