/* global JRoll */
import header from './parts/sub-page-header.js'
import html from './infinite.html'
import 'node@jroll-vue-infinite/jroll-vue-infinite.js'

function ajax (options) {
  setTimeout(function () {
    var a = []
    var page = Number(options.url.replace('getData.do?page=', ''))
    var i = (page - 1) * 20
    var l = i + 20
    if (Math.random() > 0.5) {
      for (; i < l; i++) {
        a.push(i)
      }
      options.success(a)
    } else {
      options.error()
    }
  }, 800)
}

export default {
  template: html,
  components: {
    'DemoHeader': header,
    'j-infinite': JRoll.VueInfinite({
      total: 3,
      tip: '正在加载...',
      completeTip: '已全部加载完成',
      errorTip: '加载失败，上拉重试',
      bottomed: function () {
        var me = this
        ajax({
          url: 'getData.do?page=' + (me.page + 1),
          success: function (data) {
            me.$parent.$data.items = me.$parent.$data.items.concat(data)
            me.success()
          },
          error: function () {
            me.error()
          }
        })
      }
    }, {
      scrollBarY: true
    })
  },
  data: function () {
    return {
      items: []
    }
  }
}
