import '../components/datepicker/datepicker.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './datepicker.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: '',
      value2: '2047-09-02',
      value3: '1966-08-31'
    }
  }
}
