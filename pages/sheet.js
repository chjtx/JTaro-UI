import '../components/sheet/sheet.js'
import '../components/body/body.js'
import '../components/dialog/dialog.js'
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
      show1: false,
      show2: false,
      menus: ['操作一', '操作二'],
      buttons: ['确定']
    }
  },
  methods: {
    action: function () {
      this.show = true
    },
    fun: function (index) {
      switch (index) {
        case -1: this.clickMask()
          break
        case 0: this.clickButton1()
          break
        case 1: this.clickButton2()
      }
    },
    clickMask: function () {
      this.show = false
    },
    clickButton1: function () {
      this.show = false
      this.show1 = true
    },
    clickButton2: function () {
      this.show = false
      this.show2 = true
    },
    clickDialog: function (index) {
      if (index === 0 || index === -1) {
        this.show1 = false
        this.show2 = false
      }
    }
  }
}
