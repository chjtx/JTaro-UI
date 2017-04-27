import header from './parts/sub-page-header.js'
import Toast from '../components/toast.js'
import html from './toast.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  methods: {
    showToast: function () {
      new Toast('默认2秒后自动消失')
    }
  }
}
