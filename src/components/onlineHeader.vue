<template>
    <div class="ol-header">
        <div class="ol-header-action">
            <span class="ol-header-text">请在左边区域输入代码，点击查看结果按钮后在右边区域查看结果</span>
            <b-button class="ol-header-button" type="primary" @on-click="handleAction('run')">查看结果</b-button>
            <b-button class="ol-header-button" @on-click="handleAction('reset')">重置</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'onlineHeader',
    data () {
        return {}
    },
    methods: {
        handleAction (type) {
            this.$emit(type)
        }
    }
}
</script>

<style lang="scss">
    @import "../../libs/styles/common/color";

    .ol-header-action {
        padding: 10px;
    }

    .ol-header-action {
        text-align: center;
        font-size: 18px;
    }

    .ol-header-text {
        color: $Title;
        font-weight: bold;
    }

    .ol-header-button {
        float: left;
        margin-right: 10px;
    }
</style>