import '../components/dialog.js'
import header from './parts/sub-page-header.js'
import html from './dialog.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      show: false,
      buttons: ['取消', '确定']
    }
  },
  methods: {
    showDialog: function () {
      this.show = true
    },
    clickDialog: function (index) {
      if (index === -1 || index === 0) {
        this.show = false
      }
    }
  }
}
