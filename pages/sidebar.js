import '../components/sidebar.js'
import header from './parts/sub-page-header.js'
import html from './sidebar.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      show: 0,
      buttons: ['取消', '确定']
    }
  },
  methods: {
    toggleSideBar: function () {
      this.show = !this.show
    }
  }
}
