import html from './sub-page-header.html'
import '../../components/appbar.js'
import '../../components/button.js'

export default {
  props: ['title'],
  template: html,
  methods: {
    goback: function () {
      window.history.back()
    }
  }
}
