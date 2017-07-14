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
      getHoursLi(y) + '</ul></div><div class="j-timepicker-minute"><ul>' +
      getMinutesLi(m) + '</ul></div>'

    // 年月日jroll实例
    jrollHour = new JRoll(select.querySelector('.j-timepicker-hour'), {
      bounce: false
    }).scrollTo(0, -47 * 44, 0, true)
    jrollMinute = new JRoll(select.querySelector('.j-timepicker-minute'), {
      bounce: false
    }).scrollTo(0, -9 * 44, 0, true)

    // 时
    jrollHour.on('scrollEnd', function () {
      infiniteLoop(this, -47 * 44, 'y')
    })

    // 分
    jrollMinute.on('scrollEnd', function () {
      infiniteLoop(this, -9 * 44, 'm')
    })

    // 设置颜色
    setColor(jrollHour.scroller, 49)
    setColor(jrollMinute.scroller, 11)

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
    var val = /(\d+)-(\d+)-(\d+)/.exec(value)
    callback = cb
    if (!val) {
      console.error('Date format error! Use `yyyy-mm-dd`, please!')
      return
    }
    year = val[1]
    month = pad0(val[2])
    date = pad0(val[3])

    if (!wrap) {
      me.init(year, month, date)
    } else {
      // 年
      infiniteLoop(jrollYear, -47 * 44, 'y')
      // 月
      infiniteLoop(jrollMonth, -9 * 44, 'm')
      // 日
      infiniteLoop(jrollDate, -11 * 44, 'd')
    }
    wrap.style.display = 'block'
    setTimeout(function () {
      mask.classList.add('j-timepicker-mask-show')
      select.classList.add('j-timepicker-select-show')
      if (jrollYear) {
        jrollYear.refresh()
        jrollMonth.refresh()
        jrollDate.refresh()
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
