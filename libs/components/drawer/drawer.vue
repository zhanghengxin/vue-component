/*
 * @Author: lijiahang
 */
<template style="position:relative">
    <transition :name="drawer">
        <div v-show="isshow" :class="drawer">
            <div class="drawerTop">
                <h2>{{title}}</h2>
            </div>
            <div class="drawerbody">
                <slot />
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'bDrawer',
    data () {
        return {
            //   isshow: ""
        }
    },
    props: {
        local: {
            type: String,
            default: 'right'
        },
        title: {
            type: String,
            default: '牛哥'
        },
        isshow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        drawer () {
            return `b-drawer-${this.local}`
        }
    }
}
</script>
<style scoped>
.b-drawer {
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #e8e8e8;
}
.b-drawer-top {
  min-height: 256px;
  width: 100%;
  position: absolute;
  top: 0;
  border-radius: 4px;
  background-color: gray;
  z-index: 100;
}
.b-drawer-left {
  min-width: 256px;
  height: 100%;
  position: absolute;
  left: 0;
  border-radius: 4px;
  background-color: gray;
  z-index: 100;
}
.b-drawer-bottom {
  min-height: 256px;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 4px;
  background-color: gray;
  z-index: 100;
}
.drawerTop {
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #e8e8e8;
}
.drawerbody {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.b-drawer-right {
  min-width: 256px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 4px;
  background-color: gray;
  z-index: 100;
}
.b-drawer-top-enter-active {
  animation-name: foldt-in;
  animation-duration: 0.3s;
}

.b-drawer-top-leave-active {
  animation-name: foldt-out;
  animation-duration: 0.3s;
}

.b-drawer-bottom-enter-active {
  animation-name: foldb-in;
  animation-duration: 0.3s;
}

.b-drawer-bottom-leave-active {
  animation-name: foldb-out;
  animation-duration: 0.3s;
}

.b-drawer-left-enter-active {
  animation-name: foldl-in;
  animation-duration: 0.3s;
}

.b-drawer-left-leave-active {
  animation-name: foldl-out;
  animation-duration: 0.3s;
}

.b-drawer-right-enter-active {
  animation-name: foldr-in;
  animation-duration: 0.3s;
}

.b-drawer-right-leave-active {
  animation-name: foldr-out;
  animation-duration: 0.3s;
}
@keyframes foldr-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}
@keyframes foldr-out {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes foldl-in {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}
@keyframes foldl-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes foldt-in {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0%);
  }
}
@keyframes foldt-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes foldb-in {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0%);
  }
}
@keyframes foldb-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
