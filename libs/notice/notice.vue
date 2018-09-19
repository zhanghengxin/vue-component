<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div :class="['notice',type]"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{content}}</span>
      <img class="btn" src="./close.png" @click="handleClose" />
    </div>
  </transition>
</template>
<script>
export default {
    name: 'Notice',
    props: {
        content: {
            type: String,
            required: true
        },
        btn: {
            type: String,
            default: '关闭'
        },
        type: {
            type: String,
            default: 'default'
        }
    },
    data () {
        return {
            visible: true
        }
    },
    computed: {
        style () {
            return {}
        }
    },
    methods: {
        handleClose (e) {
            e.preventDefault()
            this.$emit('close')
        },
        afterLeave () {
            this.$emit('closed')
        },
        afterEnter () {},
        clearTimer () {},
        createTimer () {}
    }
}
</script>
<style>
.notice {
  position: fixed;
  width: 280px;
  background-color: white;
  color: black;
  align-items: center;
  padding: 20px;
  padding-right: 30px;
  border-radius: 5px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  display: flex;
}
.content {
  padding: 0;
  word-wrap:break-word;
}
.btn {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.fade{
  position: absolute;left:0;right: 0;
}
.fade-enter-active {
  transition: all 1.2s ease;
}
.fade-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to{
  left:0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
.default{
  border-left: none;
}
.success{
  border-left: solid 8px #1fca74;
}
.warning{
  border-left: solid 8px #ff8f00;
}
.error{
  border-left: solid 8px #f44336;
}
</style>
