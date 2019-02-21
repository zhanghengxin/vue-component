<template>
    <li :class="menuGroupClass">
        <div :class="menuGroupTitleClass" :style="{paddingLeft: levelPadding + 'px'}">
            <template v-if="!$slots.title">
                <Icon :type="icon" size="12" class="menu-pre-icon" v-show="icon"></Icon>
                {{title}}
            </template>
            <slot v-else name="title"></slot>
        </div>
        <ul>
            <slot></slot>
        </ul>
    </li>
</template>
<script>
import { MENUGROUP } from './base'
import Icon from '../icon/Icon.vue'
import { prefix } from '../../utils/common'
import mixin from './menu-mixin'
import Emitter from '../../mixins/emitter'

const menuGroupPrefixCls = `${prefix}menu-item-group`
export default {
    name: MENUGROUP,

    componentName: MENUGROUP,

    inject: ['rootMenu'],
    props: {
        title: {
            type: String
        },
        icon: {
            type: String
        }
    },
    computed: {
        menuGroupClass () {
            return menuGroupPrefixCls
        },
        menuGroupTitleClass () {
            return menuGroupPrefixCls + '-title'
        }
    },
    components: {
        Icon
    },
    mixins: [Emitter, mixin],
    data () {
        return {
            paddingLeft: 20
        }
    }
}
</script>
