import '../components/button.js'
import html from './button.html'

export default {
  template: html,
  methods: {
    goback: function () {
      window.history.back()
    }
  }
}
