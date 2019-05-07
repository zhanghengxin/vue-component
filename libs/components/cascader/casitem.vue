<template>
    <li :class="classes">
        {{ data.label }}
        <Icon type="you" v-if="showArrow"/>
        <Icon :class="[prefixCls +'-loop']" type="chushihua" v-if="showLoading"/>
    </li>
</template>
<script>
import Icon from '../icon'

export default {
    name: 'Casitem',
    components: {Icon},
    props: {
        data: Object,
        prefixCls: String,
        tmpItem: Object
    },
    computed: {
        classes () {
            return [
                `${this.prefixCls}-menu-item`,
                {
                    [`${this.prefixCls}-menu-item-active`]: this.tmpItem.value === this.data.value,
                    [`${this.prefixCls}-menu-item-disabled`]: this.data.disabled
                }
            ]
        },
        showArrow () {
            return (this.data.children && this.data.children.length) || ('loading' in this.data && !this.data.loading)
        },
        showLoading () {
            return 'loading' in this.data && this.data.loading
        }
    }
}
</script>
