// import '../base/jtaro-ui.css'
import '../components/appbar.js'
import '../components/button.js'
import '../components/body.js'
import '../components/mask.js'
import html from './home.html'

export default {
  template: html,
  data: function () {
    return {
      type: 'text',
      show: 0,
      jrollOptions: {
        scrollBarY: true
      }
    }
  },
  methods: {
    toggleSideBar: function () {
      this.show = !this.show
    },
    gotoHaha: function () {
      this.go('pages/haha')
    },
    disabledPrev: function () {
      if (this.type !== 'disabled') {
        this.type = 'disabled'
      } else {
        this.type = 'theme'
      }
    }
  }
}
