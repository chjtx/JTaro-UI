import '../components/picker/picker.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './picker.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: ['广东', '广州', '天河'],
      address: {
        name: '广东',
        children: [{
          name: '广州',
          children: [{
            name: '天河'
          }]
        }]
      }
    }
  }
}
