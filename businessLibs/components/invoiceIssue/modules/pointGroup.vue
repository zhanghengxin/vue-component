<!--
  ** 发票开具 左右两边的 圈圈组
  ** @props pointNum 圈圈的数量
  ** @example ⬇
  ** <point-group :point-num="pointNum"></point-group>
-->
<template>
    <div :class="wrapCls">
        <ul :class="prefixCls">
            <li v-for="(point, index) in points" :key="index"></li>
        </ul>
    </div>
</template>

<script>
const prefixCls = 'point-group'
export default {
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        pointNum: {
            type: [String, Number],
            default: 10
        }
    },
    computed: {
        wrapCls () {
            return `${prefixCls}-container`
        },
        points () {
            let length = Number(this.pointNum)
            return Array.from({ length }, () => 'point')
        }
    }
}
</script>

<style lang="scss" scoped>
.point-group{
    // &-container {}
    width: 55px;
    // height: 727px;
    border: 1px solid #E9EAEC;
    li{
        width: 25px;
        height: 25px;
        margin: 25px 15px;
        border-radius: 50%;
        background: #f8f8f9;
        border: 1px solid #e7e8ea;
        box-shadow: 0px 0px 4px #e7e8ea inset;
    }
}
</style>
