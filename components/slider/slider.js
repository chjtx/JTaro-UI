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
      },
      'disabled': {
        type: Boolean,
        default: false
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
      this.jroll = new JR(this.$el, {
        autoStyle: false,
        scroller: this.$refs.jroll,
        scrollX: true,
        scrollY: false,
        minX: this.percent100,
        bounce: false,
        momentum: false
      })
      this.jroll.on('scroll', function () {
        var value = Math.round(this.x / me.percent100 * me.maxValue)
        me.$refs.real.style.width = this.x + 'px'
        me.$emit('input', value)
      })

      var pos = me.percent100 / me.maxValue * me.value
      this.jroll.scrollTo(pos, 0)
      me.$refs.real.style.width = pos + 'px'

      if (this.disabled) {
        this.jroll.disable()
      }
    },
    computed: {
      'cssObject': function () {
        return {
          'j-bg-primary': !!this.value && !this.disabled,
          'j-border-primary': !this.disabled,
          'j-slider-disabled': !!this.value && this.disabled,
          'j-slider-disabled-border': this.disabled
        }
      },
      'realObject': function () {
        return {
          'j-bg-primary': !this.disabled,
          'j-slider-disabled': this.disabled
        }
      },
      'axisObject': function () {
        return {
          'j-bg-weaken': !this.disabled,
          'j-slider-disabled-weaken': this.disabled
        }
      }
    },
    watch: {
      'disabled': function (val) {
        if (this.jroll) {
          if (val) {
            this.jroll.disable()
          } else {
            this.jroll.enable()
          }
        }
      }
    }
  })
})(Vue, JRoll)
