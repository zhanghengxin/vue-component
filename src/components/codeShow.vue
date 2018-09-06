<template>
    <div class="code-box">
        <div :style="{height: isExpand ? 'auto' : '0'}"
                class="code-container">
            <slot name="highlight"></slot>
        </div>
        <span class="code-taggle"
              @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}
        </span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isExpand: false
        }
    },
    methods: {
        toggle () {
            this.isExpand = !this.isExpand
        }
    }
}
</script>

<style lang="scss">
    .code-container {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #f5f7fa;
        border: 1px solid #e2ecf4;
        border-top: none;
        border-radius: 4px;
        font-family: Source Code Pro, Monaco, Inconsolata, monospace;
        pre {
            padding: 10px 0;
        }
        code {
            line-height: 22px;
            border: none;
            .hljs-tag {
                color: #0079f3;
            }
            .hljs-attr {
                color: #e96900;
            }
            .hljs-string {
                color: #42b983;
            }

        }
    }

    .code-taggle {
        width: 100%;
        text-align: center;
        display: inline-block;
        color: #d3dce6;
        font-size: 14px;
        cursor: pointer;
        padding: 10px 0;
        background-color: #FAFBFC;
        &:hover {
            color: #0079f3
        }
    }
</style>
