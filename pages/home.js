import '../components/appbar/appbar.js'
import '../components/button/button.js'
import '../components/body/body.js'
import '../components/sidebar/sidebar.js'
import html from './home.html'

export default {
  template: html,
  data: function () {
    return {
      type: 'text',
      show: false,
      menus: [{
        type: '辅佐类',
        children: [{
          name: '主题颜色（Theme Color）',
          url: 'pages/theme'
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
          name: '弹窗（Dialog）',
          url: 'pages/dialog'
        }, {
          name: '提示（Toast）',
          url: 'pages/toast'
        }, {
          name: '加载器（Loader）',
          url: 'pages/loader'
        }]
      }, {
        type: '表单组件',
        children: [{
          name: '输入框（Input）',
          url: 'pages/input'
        }, {
          name: '开关（Switch）',
          url: 'pages/switch'
        }, {
          name: '选择器（Selector）',
          url: 'pages/select'
        }, {
          name: '单选（Radio）',
          url: 'pages/radio'
        }, {
          name: '复选（Checkbox）',
          url: 'pages/checkbox'
        }, {
          name: '加减器（Number Box）',
          url: ''
        }, {
          name: '捡选器（Picker）',
          url: 'pages/picker'
        }, {
          name: '范围滑块（Range）',
          url: ''
        }, {
          name: '搜索框（Search Box）',
          url: ''
        }, {
          name: '操作表（Action Sheet）',
          url: ''
        }, {
          name: '日期选择器（Datetime）',
          url: ''
        }]
      }, {
        type: '其它组件',
        children: [{
          name: '下拉刷新（Pulldown Refresh）',
          url: ''
        }, {
          name: '无限加载（Infinite）',
          url: ''
        }, {
          name: '图片轮播（Swiper）',
          url: ''
        }, {
          name: '省市区联动菜单（City Picker）',
          url: ''
        }, {
          name: '日历（Calendar）',
          url: ''
        }, {
          name: '字母索引（Letter Index）',
          url: ''
        }, {
          name: '图片浏览器（Photo Browser）',
          url: ''
        }, {
          name: '通知（Notification）',
          url: ''
        }, {
          name: '侧滑菜单（SideBar）',
          url: 'pages/sidebar'
        }, {
          name: 'TAB选项卡（Tab）',
          url: ''
        }, {
          name: '表头固定的表格（Table Viewer）',
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
