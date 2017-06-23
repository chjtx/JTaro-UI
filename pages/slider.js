import '../components/slider/slider.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './slider.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: 50,
      value2: 0,
      value3: 20
    }
  }
}
