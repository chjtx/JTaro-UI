import '../components/radio/radio.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './radio.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: '1',
      value2: '',
      value3: '1'
    }
  }
}
