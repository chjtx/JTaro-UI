import '../components/input.js'
import header from './parts/sub-page-header.js'
import html from './input.html'
import 'node@jroll-fixedinput/jroll-fixedinput.min.js'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      value: '默认文字',
      valueLabel: '',
      valueFloat: '',
      valueMulti: '',
      valueLimit: '',
      valueDisabled: '已禁用'
    }
  },
  mounted: function () {
    this.$refs.jbody.jroll.fixedinput()
  }
}
