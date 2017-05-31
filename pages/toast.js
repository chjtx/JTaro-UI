import header from './parts/sub-page-header.js'
import Toast from '../components/toast/toast.js'
import html from './toast.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  methods: {
    showToast: function () {
      new Toast('默认2秒后自动消失')
    },
    showToastForever: function () {
      // 判断this.toast是否存在再创建，避免创建出无法关闭的toast
      if (!this.toast) {
        this.toast = new Toast('不会自动消失', -1)
      }
    },
    destroyToast: function () {
      if (this.toast) {
        this.toast.destroy()
        this.toast = null
      }
    }
  }
}
