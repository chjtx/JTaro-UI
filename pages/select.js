import html from './select.html'
import '../components/select/select.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: '1',
      noValue: '',
      valueMultiple: ['1', '2']
    }
  }
}
