<template>
    <div :class="classes" v-click-outside="handleClose">
        <div :class="[prefixCls + '-rel']" @click="toggleOpen" ref="reference">
            <b-input
                :element-id="elementId"
                ref="input"
                :readonly="!filterable"
                :disabled="disabled"
                :value="displayInputRender"
                @on-change="handleInput"
                :size="size"
                :placeholder="inputPlaceholder"></b-input>
            <div
                :class="[prefixCls + '-label']"
                v-show="filterable && query === ''"
                @click="handleFocus">{{ displayRender }}
            </div>
        </div>
    </div>
</template>

<script>
import { prefix, oneOf } from '../../utils/common'
import { directive as clickOutside } from 'v-click-outside-x'
import TransferDom from '../../utils/directives/transfer-dom'
import BInput from '../input'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'cascader'

export default {
    name: prefixCls,
    mixins: [Emitter],
    components: {BInput},
    directives: {clickOutside, TransferDom},
    props: {
        elementId: {
            type: String
        }
    },
    data () {
        return {
            isLoadedChildren: false    // #950
        }
    },
    computed: {
        arrowSize () {
            let size = ''

            if (this.$IVIEW) {
                if (this.$IVIEW.cascader.arrowSize) {
                    size = this.$IVIEW.cascader.arrowSize
                }
            }
            return size
        }
    },
    methods: {
        // 排除 loading 后的 data，避免重复触发 updateSelect
        getValidData (data) {
            function deleteData (item) {
                const new_item = Object.assign({}, item)
                if ('loading' in new_item) {
                    delete new_item.loading
                }
                if ('__value' in new_item) {
                    delete new_item.__value
                }
                if ('__label' in new_item) {
                    delete new_item.__label
                }
                if ('children' in new_item && new_item.children.length) {
                    new_item.children = new_item.children.map(i => deleteData(i))
                }
                return new_item
            }

            return data.map(item => deleteData(item))
        }
    },
    created () {

    },
    mounted () {

    }
}
</script>

<style scoped>

</style>
