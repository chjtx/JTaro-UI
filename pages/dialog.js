import '../components/dialog.js'
import html from './dialog.html'

export default {
  template: html,
  data: function () {
    return {
      show: 0,
      buttons: ['取消', '确定']
    }
  },
  methods: {
    goback: function () {
      window.history.back()
    },
    showDialog: function () {
      this.show = 1
    },
    clickDialog: function (index) {
      if (index === -1 || index === 0) {
        this.show = 0
      }
    }
  }
}
