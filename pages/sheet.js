import '../components/sheet/sheet.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './sheet.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      show: false,
      menus: ['操作一', '操作二']
    }
  },
  methods: {
    action: function () {
      this.show = true
    },
    fun: function (index) {
      switch (index) {
        case 0: this.action1()
          break
        case 1: this.action2()
      }
    },
    action1: function () {},
    action2: function () {}
  }
}
