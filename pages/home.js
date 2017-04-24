import '../components/appbar.js'
import '../components/button.js'
import '../components/body.js'
import '../components/sidebar.js'
import html from './home.html'

export default {
  template: html,
  data: function () {
    return {
      type: 'text',
      show: 0,
      menus: [{
        icon: 'github',
        text: '颜色',
        url: 'pages/button'
      }, {
        icon: 'github',
        text: '字体图标',
        url: 'pages/button'
      }, {
        icon: 'github',
        text: '栅格',
        url: 'pages/button'
      }, {
        icon: 'github',
        text: '涟漪效果',
        url: 'pages/button'
      }, {
        icon: 'github',
        text: '头部组件',
        url: 'pages/button'
      }, {
        icon: 'github',
        text: '按钮组件',
        url: 'pages/button'
      }, {
        icon: 'github',
        text: '遮罩组件',
        url: 'pages/button'
      }]
    }
  },
  methods: {
    toggleSideBar: function () {
      this.show = !this.show
    },
    gotoSubPage: function (url) {
      this.go(url)
    }
  }
}
