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
        type: '辅佐类',
        children: [{
          name: '颜色（Color）',
          url: ''
        }, {
          name: '图标（Icon）',
          url: ''
        }, {
          name: '涟漪效果（Ripples）',
          url: ''
        }, {
          name: '栅格布局（Grid Layout）',
          url: ''
        }]
      }, {
        type: '常用组件',
        children: [{
          name: '按钮（Button）',
          url: 'pages/button'
        }, {
          name: '弹窗（Alert）',
          url: ''
        }, {
          name: '提示（Toast）',
          url: ''
        }, {
          name: '加载器（Loader）',
          url: ''
        }]
      }, {
        type: '表单组件',
        children: [{
          name: '开关（Switch）',
          url: ''
        }, {
          name: '选择器（Selector）',
          url: ''
        }, {
          name: '单选（Radio）',
          url: ''
        }, {
          name: '复选（Checkbox）',
          url: ''
        }]
      }, {
        type: '高级组件',
        children: [{
          name: '下拉刷新（Pulldown Refresh）',
          url: ''
        }, {
          name: '图片轮播（Swiper）',
          url: ''
        }, {
          name: '省市区联动菜单（City Picker）',
          url: ''
        }, {
          name: '字母索引（Letter Index）',
          url: ''
        }]
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
