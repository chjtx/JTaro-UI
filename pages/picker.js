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
      value: ['广东1', '广州4', '天河4'],
      address: [{
        name: '广东1',
        children: [{
          name: '广州1',
          children: [{
            name: '天河1'
          }]
        }, {
          name: '广州2',
          children: [{
            name: '天河2'
          }]
        }, {
          name: '广州3',
          children: [{
            name: '天河3'
          }]
        }, {
          name: '广州4',
          children: [{
            name: '天河4'
          }]
        }, {
          name: '广州5',
          children: [{
            name: '天河5'
          }]
        }]
      }, {
        name: '广东2广东2广东2广东2广东2',
        children: [{
          name: '广州',
          children: [{
            name: '天河'
          }]
        }]
      }, {
        name: '广东3',
        children: [{
          name: '广州',
          children: [{
            name: '天河'
          }]
        }]
      }, {
        name: '广东4',
        children: [{
          name: '广州',
          children: [{
            name: '天河'
          }]
        }]
      }, {
        name: '广东5',
        children: [{
          name: '广州',
          children: [{
            name: '天河'
          }]
        }]
      }]
    }
  }
}
