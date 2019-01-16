/*
 * @Author: lijiahang
 * @Date: 2018-11-12 10:51:51
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-09 17:22:26
 */
<template>
    <div :class="[prefixCls+'-root']" ref='mask'>
        <div :class="mask" @click="maskclick"></div>
        <transition :name="drawer">
            <div v-show="isshow" :class="drawer">
                <div :class="[prefixCls+'-drawerTop']">
                    <p>{{title}}</p>
                </div>
                <div :class="[prefixCls+'-drawerbody']">
                    <slot/>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'drawer'
export default {
    name: prefixCls,
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        local: {
            type: String,
            default: 'right'
        },
        title: {
            type: String,
            default: '百望股份'
        },
        isshow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        drawer () {
            return `${prefixCls}-${this.local}`
        },
        mask () {
            return [this.isshow ? `${prefixCls}-maskshow` : `${prefixCls}-maskshid`]
        }
    },
    methods: {
        maskclick () {
            this.$emit('drawerchange')
        }
    },
    mounted () {
        document.body.appendChild(this.$refs.mask)
    }
}
</script>
