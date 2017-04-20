/* global Vue JRoll */
import html from './body.html'

(function (v, Jro) {
  v.component('j-body', {
    props: ['outer-bg', 'inner-bg', 'options'],
    template: html,
    data: function () {
      return {
        obg: this.outerBg,
        ibg: this.innerBg
      }
    },
    mounted: function () {
      this.jroll = new Jro(this.$el, this.options)
    },
    updated: function () {
      this.jroll.refresh()
    }
  })
})(Vue, JRoll)
