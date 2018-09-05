<template>
    <button type="button"
            class="b-btn"
            :class='[typeClass,sizeClass,fixedClass]'
            :style="bodyStyles"
            @click="handleClick">
        <span>
            <slot>按钮</slot>
        </span>
    </button>

</template>

<script>
    export default {
        name: 'b-button',
        methods: {
            handleClick(event) {
                this.$emit('click', event)
            }
        },
        props: {
            type: {
                type: String,
                default: 'info'
            },
            fixed: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'normal'
            }
        },
        computed: {
            typeClass() {
                return {
                    'b-btn-info': this.type === 'info',
                    'b-btn-success': this.type === 'success',
                    'b-btn-warning': this.type === 'warning',
                    'b-btn-error': this.type === 'error',
                    'b-btn-white': this.type === 'white'
                }
            },
            sizeClass() {
                return {
                    'b-btn-small': this.size === 'small',
                    'b-btn-normal': this.size === 'normal'
                }
            },
            fixedClass() {
                return {
                    'b-btn-fixed': !this.fixed
                }
            },
            bodyStyles() {
                if (this.fixed) {
                    return {
                        width: `${this.fixed}px`
                    }
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style lang="scss">
    .b-btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        user-select: none;
        font-size: 12px;
        border-radius: 2px;
        transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;
    }

    .b-btn-fixed {
        padding: 0 15px;
    }

    .b-btn-info {
        color: $white;
        background-color: $lightBlue;
        border-color: $lightBlue;
    }

    .b-btn-white {
        color: $lightBlue;
        background-color: $white;
        border-color: $border;
    }

    .b-btn-small {
        height: 25px;
    }

    .b-btn-normal {
        height: 32px;
    }
</style>