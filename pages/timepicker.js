import '../components/timepicker/timepicker.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './timepicker.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: '',
      value2: '00:39',
      value3: '06:00'
    }
  }
}
