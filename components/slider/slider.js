/* global Vue, JRoll */
import html from './slider.html'

(function (v, JR) {
  v.component('j-slider', {
    props: {
      'value': Number,
      'max': {
        validator: function (v) {
          return /\d+/.test(v)
        },
        default: 100
      }
    },
    template: html,
    data: function () {
      return {
        maxValue: Number(this.max)
      }
    },
    mounted: function () {
      var me = this
      this.percent100 = this.$refs.axis.clientWidth
      var jroll = new JR(this.$el, {
        autoStyle: false,
        scroller: this.$refs.jroll,
        scrollX: true,
        scrollY: false,
        minX: this.percent100,
        bounce: false,
        momentum: false
      })
      jroll.on('scroll', function () {
        var value = Math.round(this.x / me.percent100 * me.maxValue)
        me.$refs.real.style.width = this.x + 'px'
        me.$emit('input', value)
      })

      var pos = me.percent100 / me.maxValue * me.value
      jroll.scrollTo(pos, 0)
      me.$refs.real.style.width = pos + 'px'
    },
    computed: {
      'cssObject': function () {
        return {
          'j-bg-primary': !!this.value
        }
      }
    }
  })
})(Vue, JRoll)
