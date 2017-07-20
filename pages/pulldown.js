/* global JRoll */
import header from './parts/sub-page-header.js'
import html from './pulldown.html'
import 'node@jroll-pulldown/jroll-pulldown.js'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      items: (function () {
        var a = []
        var i = 0
        for (; i < 50; i++) {
          a.push(i)
        }
        return a
      })()
    }
  },
  mounted: function () {
    this.jroll = new JRoll(this.$el.querySelector('.pulldown-body'))
    this.jroll.pulldown({
      refresh: function (complete) {
        setTimeout(function () {
          complete()
        }, 1000)
      }
    })
  }
}
