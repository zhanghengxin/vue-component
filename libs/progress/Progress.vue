<template>
<div :style="outbox">
  <div :class='boxStyle'>
    <div :class='leftStyle' :style='left'>
        <div :class='progressStyle' :style='progress'>
        </div>
    </div>
    <div :class='rightStyle' v-if='ishowText'>
      <slot>
        <div v-if="percent">{{value}}%</div>
        <div v-if="complete">
          <img :class='statusPicStyle' src='@/assets/image/gouM.png'>
        </div>
        <div v-if="error">
          <img :class='statusPicStyle' src='@/assets/image/cuoM.png'>
        </div>
      </slot>

    </div>
  </div>
</div>
</template>

<script>

const styleHead = 'bw-progress'

export default {
    name: 'bwProgress',
    data () {
        return {
            styleHead
        }
    },
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        strokeWidth: {
            type: Number,
            default: 10
        },
        status: {
            type: String,
            default: ''
        },
        showText: {
            type: Boolean,
            default: true
        },
        percentage: {
            type: Number,
            default: 0,
            required: true
        },
        color: {
            type: String,
            default: '#0079CC'
        }
    },
    computed: {
        value () {
            return this.percentage
        },
        ishowText () {
            return this.showText
        },
        error () {
            return this.status === 'Exception'
        },
        complete () {
            return this.status === 'Success' || this.value === 100
        },
        percent () {
            return this.status !== 'Success' && this.status !== 'Exception' && this.value !== 100
        },
        outbox () {
            return this.vertical ? {height: '100%', display: 'inline-block'} : {width: '100%', display: 'inline-block'}
        },
        leftStyle () {
            return `${styleHead}-left`
        },
        rightStyle () {
            return `${styleHead}-right`
        },
        progressStyle () {
            return `${styleHead}-progress`
        },
        statusPicStyle () {
            return `${styleHead}-statusPic`
        },
        boxStyle () {
            return `${styleHead}-box`
        },
        progress () {
            return {
                'width': this.vertical ? this.strokeWidth + 'px' : (this.value === 100 || this.status === 'Success' ? '100%' : this.percentage + '%'),
                'height': this.vertical ? (this.value === 100 || this.status === 'Success' ? '100%' : this.percentage + '%') : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px',
                'backgroundColor': this.status === 'Success' || this.value === 100 ? '#1fca74' : (this.status === 'Exception' ? '#f44336' : this.color)
            }
        },
        left () {
            return {
                'width': this.vertical ? this.strokeWidth + 'px' : '100%',
                'height': this.vertical ? '100%' : this.strokeWidth + 'px',
                'borderRadius': this.strokeWidth / 2 + 'px'
            }
        }
    }
}
</script>]
