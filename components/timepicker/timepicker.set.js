/* global JRoll */
/**
 * 日期选择器
 */
import './timepicker.css'

// dom
var wrap = null
var mask = null
var select = null
var header = null
var confirm = null
var cancel = null

// jroll实例
var jrollHour = null
var jrollMinute = null

var hour = ''
var minute = ''

// 回调
var callback = null

// 1位前面补0
function pad0 (s) {
  return String(s).replace(/^(\d)$/, '0$1')
}

function getLi (current, middle, max) {
  var str = ''
  var cut = Number(current) - middle
  var i = 0
  var l = 0
  // 当前时大于中间值
  if (cut >= 0) {
    l = cut
  // 当前时小于中间值
  } else {
    l = max - Math.abs(cut) + 1
  }
  for (i = l + 1; i <= max; i++) {
    str += '<li>' + pad0(i) + '</li>'
  }
  for (i = 0; i <= l; i++) {
    str += '<li>' + pad0(i) + '</li>'
  }
  return str
}

function setColor (scroller, index) {
  var li = scroller.querySelector('.j-color-primary')
  if (li) {
    li.classList.remove('j-color-primary')
  }
  scroller.children[index].classList.add('j-color-primary')
}

// 获取当前值的位置，提供给jroll对象（负数）
function getCurrentPosition (children, val) {
  for (var i = 0, l = children.length; i < l; i++) {
    if (children[i].innerText === val) {
      return (i - 2) * -44
    }
  }
  return 0
}

function infiniteLoop (me, pos, isHour) {
  var y = Math.round(me.y / 44) * 44
  me.scrollTo(0, y, 100, true, function () {
    var cut = (me.y - pos) / 44
    var i = 0
    var l = 0

    // 从下向上滑动，将顶部子元素移到底部
    if (cut < 0) {
      l = Math.abs(cut)
      for (i = 0; i < l; i++) {
        me.scroller.appendChild(me.scroller.children[0])
      }

    // 从上往下滑动，将底部子元素移到顶部
    } else {
      for (i = 0; i < cut; i++) {
        me.scroller.insertBefore(me.scroller.lastChild, me.scroller.children[0])
      }
    }
    me.scrollTo(0, pos, 0, true)
    if (isHour) {
      hour = me.scroller.children[11].innerText
      setColor(jrollHour.scroller, 11)
    } else {
      minute = me.scroller.children[29].innerText
      setColor(jrollMinute.scroller, 29)
    }
  })
}

var picker = {
  init: function (h, m) { // hour, minute
    var me = this

    // 整体
    wrap = document.createElement('div')
    mask = document.createElement('div')
    select = document.createElement('div')

    wrap.className = 'j-timepicker-wrap'
    mask.className = 'j-timepicker-mask'
    select.className = 'j-timepicker-select'

    mask.onclick = function () {
      me.hide()
    }

    // 按钮栏
    header = document.createElement('div')
    header.className = 'j-timepicker-header'
    header.innerHTML = '<div class="j-click-button j-timepicker-cancel">取消</div><div class="j-click-button j-timepicker-confirm j-bg-primary">确定</div>'
    confirm = header.querySelector('.j-timepicker-confirm')
    cancel = header.querySelector('.j-timepicker-cancel')

    cancel.onclick = function () {
      me.hide()
    }
    confirm.onclick = function () {
      me.set()
    }

    // 时分选项
    select.innerHTML = '<div class="j-timepicker-bar"></div><div class="j-timepicker-hour"><ul>' +
      getLi(h, 12, 23) + '</ul></div><div class="j-timepicker-minute"><ul>' +
      getLi(m, 30, 59) + '</ul></div>'

    // 时分jroll实例
    jrollHour = new JRoll(select.querySelector('.j-timepicker-hour'), {
      bounce: false
    }).scrollTo(0, -9 * 44, 0, true)
    jrollMinute = new JRoll(select.querySelector('.j-timepicker-minute'), {
      bounce: false
    }).scrollTo(0, -27 * 44, 0, true)

    // 时
    jrollHour.on('scrollEnd', function () {
      infiniteLoop(this, -9 * 44, true)
    })

    // 分
    jrollMinute.on('scrollEnd', function () {
      infiniteLoop(this, -27 * 44)
    })

    // 设置颜色
    setColor(jrollHour.scroller, 11)
    setColor(jrollMinute.scroller, 29)

    select.appendChild(header)
    wrap.appendChild(mask)
    wrap.appendChild(select)
    document.body.appendChild(wrap)
  },
  set: function () {
    var me = this
    // 任何一个选项在滚动都不执行
    if (!jrollHour.moving && !jrollMinute.moving && typeof callback === 'function') {
      setTimeout(function () {
        callback(hour + ':' + minute)
        me.hide()
      }, 4)
    }
  },
  show: function (value, cb) {
    var me = this
    var val = /(\d+):(\d+)/.exec(value)
    callback = cb
    if (!val) {
      console.error('Time format error! Use `hh:mm`, please!')
      return
    }
    hour = val[1]
    minute = pad0(val[2])

    if (!wrap) {
      me.init(hour, minute)
    } else {
      // 时
      jrollHour.y = getCurrentPosition(jrollHour.scroller.children, hour)
      infiniteLoop(jrollHour, -9 * 44, true)
      // 分
      jrollMinute.y = getCurrentPosition(jrollMinute.scroller.children, minute)
      infiniteLoop(jrollMinute, -27 * 44)
    }
    wrap.style.display = 'block'
    setTimeout(function () {
      mask.classList.add('j-timepicker-mask-show')
      select.classList.add('j-timepicker-select-show')
      if (jrollHour) {
        jrollHour.refresh()
        jrollMinute.refresh()
      }
    }, 4)
  },
  hide: function () {
    mask.classList.remove('j-timepicker-mask-show')
    select.classList.remove('j-timepicker-select-show')
    setTimeout(function () {
      wrap.style.display = 'none'
    }, 200)
  }
}

export default picker
