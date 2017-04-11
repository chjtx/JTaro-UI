// import '../base/jtaro-ui.css'
import '../components/appbar.js'
import '../components/button.js'
import html from './home.html'

export default {
  template: html,
  methods: {
    gotoHaha: function () {
      this.go('pages/haha')
    }
  }
}
