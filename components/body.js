/* global Vue JRoll */
import html from './body.html'

(function (v, Jro) {
  v.component('j-body', {
    props: {
      'outer-bg': String,
      'inner-bg': String,
      'options': {
        type: Object,
        default: null
      }
    },
    template: html,
    data: function () {
      return {
        obg: this.outerBg,
        ibg: this.innerBg
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.jroll = new Jro(this.$el, this.options)
      })
    },
    updated: function () {
      if (this.jroll) this.jroll.refresh()
    }
  })
})(Vue, JRoll)
