import header from './parts/sub-page-header.js'
import Loader from '../components/loader.js'
import html from './loader.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
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
