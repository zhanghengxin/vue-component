<template>
  <div :class="[visible?'':'hide','switch-wrapper']" >
    <ul class="switch-container">
      <li :class="['switch-item',currentValue == item.value?'selected':'']" v-for="(item,index) in dataList" :key="item.value" :data-index="index" @click="changeValue(item.value)">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'check-switch',
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        dataList: {
            type: Array,
            required: true
        },
        selectedValue: {
            type: [String, Number],
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        },
        onChange: {
            type: Function
        },
        styleConfig: {
            type: Object,
            default: () => {}
        },
        labelKey: {
            type: String,
            default: 'label'
        },
        valueKey: {
            type: String,
            default: 'value'
        }
    },
    data () {
        return {
            currentValue: this.selectedValue,
            currentData: {}
        }
    },
    mounted () {
        this.setCurrentIndex(this.currentValue)
    },
    methods: {
        changeValue (value) {
            this.setCurrentIndex(value)
        },
        setCurrentIndex (value) {
            const dataList = this.dataList || []
            const index = dataList.findIndex((item, index, arr) => {
                return item[this.valueKey] === value
            })
            if (index < 0) {
                return
            }
            this.currentValue = value
            this.currentData = dataList[index] || {}
            this.$emit('update:value', this.currentData.value)
            this.$emit('change', this.currentData.value, this.currentData, index)
        }
    },
    watch: {
        selectedValue (newValue) {
            const dataList = this.dataList || []
            const [filterData] = dataList.filter(item => item.value === newValue)
            this.currentData = filterData || {}
            this.currentValue = newValue
            this.setCurrentIndex(this.currentValue)
        },
        value (newValue) {
            this.setCurrentIndex(newValue)
        }
    }
}
</script>

<style lang="scss">
  .switch-wrapper{
    display: inline-block;
  }
.switch-container{
  display:inline-block;
  margin-right:10px;
  margin-bottom: 16px;
  vertical-align: middle;
  .switch-item{
    width: 70px;
    height:32px;
    display:inline-block;
    cursor:pointer;
    border: solid 1px #dddee1;
    line-height: 32px;
    text-align: center;
    font-size:12px;
    color: #495060;
    &:hover{
      color:#0079cc;
    }
    &:first-of-type{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-of-type{
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &.selected{
      border: solid 1px #0079cc;
      color:#0079cc;
    }
  }
}
</style>
