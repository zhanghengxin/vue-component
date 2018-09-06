<template>
    <div id="app">
        <main-header></main-header>
        <div class="content clearfix">
            <menu-nav class="nav"></menu-nav>
            <router-view class="doc"/>
        </div>
    </div>
</template>

<script>
import mainHeader from './components/Header'
import menuNav from './components/Nav'

export default {
    name: 'App',
    components: {
        mainHeader,
        menuNav
    }
}
</script>

<style lang="scss">
    #app {
        margin: 0 auto;
    }

    .content {
        width: 1400px;
        padding: 0;
        margin: 0 auto;
        box-shadow: rgba(223, 225, 230, 0.5) 0px 4px 30px 0px;
        height: auto;
    }

    .nav {
        float: left;
        width: 200px;
    }

    .doc {
        float: left;
        border-left: 1px solid #eaeefb;
        padding: 20px;
    }
</style>
