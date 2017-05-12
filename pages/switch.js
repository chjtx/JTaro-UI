import html from './switch.html'
import '../components/switch.js'
import '../components/body.js'
import header from './parts/sub-page-header.js'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: true
    }
  }
}
