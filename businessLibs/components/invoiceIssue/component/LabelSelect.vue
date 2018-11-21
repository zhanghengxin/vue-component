<template>
  <div class="selectground">
    <span class="select-name" v-if="inputLabel">{{inputLabel}}</span>
    <div class="select-input">
      <i-select v-model="currentValue" clearable :label-in-value="labelInValue" :disabled="disabled" :placeholder="placeholder" @on-change="handleChange">
        <Option v-for="(item,index) in dataList" :value="item.value" :key="index + item.value">{{item.label}}</Option>
      </i-select>
    </div>
  </div>
</template>

<script>
export default {
    name: 'label-select',
    props: {
        inputLabel: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inputValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        dataList: {
            type: Array,
            default: () => {
                return []
            }
        },
        labelInValue: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentValue: this.inputValue

        }
    },
    watch: {
        inputValue: function () {
            this.currentValue = this.inputValue
        }
    },
    methods: {
        handleChange: function (event) {
            this.$emit('change', event, this.currentValue)
        }
    }
}
</script>

<style lang="scss">

</style>
