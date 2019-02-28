<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/logo.png">
            <span>百望 UI</span>
        </div>
        <b-button
            class="color-change"
            type="primary"
            @on-click="changeColor">
            一键换肤
        </b-button>
    </div>
</template>

<script>
export default {
    methods: {
        changeColor () {
            if (document.documentElement.getAttribute('data-theme') === 'theme1') {
                window.document.documentElement.setAttribute('data-theme', '')
            } else {
                window.document.documentElement.setAttribute('data-theme', 'theme1')
            }
        }
    }
}
</script>

<style lang="scss">
    .header {
        width: 100%;
        height: 70px;
    }

    .header .logo {
        float: left;
        margin-left: 60px;
    }

    .header .logo img {
        margin-top: 10px;
        width: 50px;
        height: 50px;
    }

    .color-change {
        margin: 10px 10px 0 0;
        float: right;
    }
</style>
