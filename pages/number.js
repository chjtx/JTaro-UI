import '../components/number/number.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './number.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      'value': 1,
      'value2': 0,
      'value3': 99
    }
  },
  methods: {
    action: function (value, sign) {
      console.log(value, sign)
    },
    calculate: function (value) {
      console.log(value)
    }
  }
}
