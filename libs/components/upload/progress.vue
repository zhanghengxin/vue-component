<template>
    <div class="bw-progress-inner">
        <div class="bw-progress-bg" :style="bgStyle"></div>
        <!-- <div class="bw-progress-sbg" style="`width:${file.precent}px,height:10px`"></div> -->
    </div>
</template>
<script>
export default {
    name: 'bwProgress',
    props: {
        percent: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: '#19be6b'
        }
    },
    computed: {
        bgStyle () {
            return {
                'width': `${this.percent}%`,
                'height': `2px`,
                'background-color': `${this.status}`
            }
        }
    }
}
</script>
<style>
.bw-progress-inner {
    display: inline-block;
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 100px;
    vertical-align: middle;
    position: relative;
}
.bw-progress-bg {
    background-color: #2d8cf0;
    position: relative;
    /* height: 2px; */
}
.bw-progress-sbg {
    background-color: #19be6b;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
