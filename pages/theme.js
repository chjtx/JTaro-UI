import header from './parts/sub-page-header.js'
import html from './theme.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  methods: {
    modifyTheme: function (theme) {
      document.getElementById('jtaro_ui_theme').href = './src/jtaro-ui-theme-' + theme + '.css'
    }
  }
}
