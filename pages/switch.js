import html from './switch.html'
import '../components/switch/switch.js'
import '../components/body/body.js'
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
