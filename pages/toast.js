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
      new Toast('默认2秒后消失')
    },
    showToastForever: function () {
      this.toast = new Toast('不会自动消失', -1)
    },
    destroyToast: function () {
      this.toast.destroy()
    }
  }
}
