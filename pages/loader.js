import header from './parts/sub-page-header.js'
import Loader from '../components/loader.js'
import html from './loader.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  mounted: function () {
    new Loader({
      target: this.$el.querySelector('#pages_loader_1'),
      color: '#000',
      boxBg: 'transparent',
      wrapBg: 'transparent',
      text: '自定义文字、颜色、背景色、挂载点'
    })
  },
  methods: {
    showLoader: function () {
      new Loader({
        cancel: function () {
          this.destroy()
        }
      })
    }
  }
}
