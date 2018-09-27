<template>
<div style='width:500px;height:500px'>
  <div class='box'>
    <div class='left' :style='left'>
        <div class='progress' :style='progress'>

        </div>
    </div>
    <div class='right' v-if='showText'>
      <slot>
        <div v-if="status!='Success'&&status!='Exception'">{{value}}%</div>
        <div v-if="status=='Success'">
          <!-- <img class='statusPic' src='../assets/gouM.png'> -->
        </div>
        <div v-if="status=='Exception'">
          <!-- <img class='statusPic' src='../assets/cuoM.png'> -->
        </div>
      </slot>

    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'progress',
    data () {
        return {
            progress: {width: this.percentage + '%', height: this.strokeWidth + 'px', borderRadius: this.strokeWidth / 2 + 'px'},
            left: {width: '100%', height: this.strokeWidth + 'px', borderRadius: this.strokeWidth / 2 + 'px'},
            bClass: {},
            value: this.percentage
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
        textInside: {
            type: Boolean,
            default: true
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
    created () {
        if (this.value < 0 || this.value > 100) {
            this.value = 0
            return false
        }
        if (this.status === 'Success') {
            // this.value=100
            this.$set(this.progress, 'width', '100%')
            this.$set(this.progress, 'backgroundColor', '#3CB371')
        } else if (this.status === 'Exception') {
            this.$set(this.progress, 'backgroundColor', 'red')
        } else {
            this.$set(this.progress, 'backgroundColor', this.color)
        }
        if (this.vertical) {
            this.$set(this.progress, 'height', this.value + '%')
            this.$set(this.progress, 'width', this.strokeWidth + 'px')
            this.$set(this.left, 'height', '100%')
            this.$set(this.left, 'width', this.strokeWidth + 'px')
        }
        if (this.value === 100) {
            this.$set(this.progress, 'backgroundColor', '#3CB371')
            this.status = 'Success'
        }
    },
    watch: {
        color () {
            this.$set(this.progress, 'backgroundColor', this.color)
        },
        percentage () {
            if (this.percentage < 0 || this.percentage > 100) {
                return false
            }
            this.value = this.percentage
            if (this.vertical) {
                this.$set(this.progress, 'height', this.value + '%')
            } else {
                this.$set(this.progress, 'width', this.value + '%')
            }
            this.$set(this.progress, 'backgroundColor', this.color)
            if (this.value === 100) {
                this.$set(this.progress, 'backgroundColor', '#3CB371')
                this.status = 'Success'
            } else {
                this.status = ''
            }
        },
        status () {
            if (this.status === 'Success') {
                if (this.vertical) {
                    this.$set(this.progress, 'height', '100%')
                } else {
                    this.$set(this.progress, 'width', '100%')
                }
                this.$set(this.progress, 'backgroundColor', '#3CB371')
            } else if (this.status === 'Exception') {
                this.$set(this.progress, 'backgroundColor', 'red')
                if (this.vertical) {
                    this.$set(this.progress, 'height', this.value + '%')
                } else {
                    this.$set(this.progress, 'width', this.value + '%')
                }
            } else {
                if (this.vertical) {
                    this.$set(this.progress, 'height', this.value + '%')
                } else {
                    this.$set(this.progress, 'width', this.value + '%')
                }
                this.$set(this.progress, 'backgroundColor', this.color)
            }
        }
    }
}
</script>

<style lang="" scoped>
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
    padding-top:6px
  }
  .statusPic{
    width: 15px;
    height: 15px;
  }
  .progress{
    transition: all .2s linear;
  }
</style>
