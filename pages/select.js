import html from './select.html'
import '../components/select.js'
import '../components/body.js'
import header from './parts/sub-page-header.js'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: '1',
      valueMultiple: []
    }
  }
}
