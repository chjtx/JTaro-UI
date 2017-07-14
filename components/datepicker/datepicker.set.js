/* global JRoll */
/**
 * 日期选择器
 */
import './datepicker.css'

// dom
var wrap = null
var mask = null
var select = null
var header = null
var confirm = null
var cancel = null

// jroll实例
var jrollYear = null
var jrollMonth = null
var jrollDate = null

var year = ''
var month = ''
var date = ''

// 特殊日期，保存29、30、31三日元素
var specialDate = []

// 回调
var callback = null

// 1位前面补0
function pad0 (s) {
  return String(s).replace(/^(\d)$/, '0$1')
}

function getYearsLi (yyyy) {
  var str = ''
  var cut = Number(yyyy) - 2000
  var i = 0
  var l = 0
  // 当前年大于2000
  if (cut >= 0) {
    l = 1950 + cut
  // 当前年小于2000
  } else {
    l = 2050 - Math.abs(cut) + 1
  }
  for (i = l + 1; i <= 2050; i++) {
    str += '<li>' + i + '</li>'
  }
  for (i = 1950; i <= l; i++) {
    str += '<li>' + i + '</li>'
  }
  return str
}

function getMonthsLi (mm) {
  var str = ''
  var i = 0
  var middle = Number(mm)
  // 前补位
  for (i = middle + 1; i <= 12; i++) {
    str += '<li>' + i + '</li>'
  }
  // 全12月
  for (i = 1; i <= 12; i++) {
    str += '<li>' + i + '</li>'
  }
  // 后补位
  for (i = 1; i <= middle; i++) {
    str += '<li>' + i + '</li>'
  }
  return str
}

function getDatesLi (dd) {
  var str = ''
  var cut = Number(dd) - 15
  var i = 0
  var l = 0
  // 当前日大于15
  if (cut >= 0) {
    l = 1 + cut
  // 当前日小于15
  } else {
    l = 31 - Math.abs(cut) + 1
  }
  for (i = l + 1; i <= 31; i++) {
    str += '<li>' + i + '</li>'
  }
  for (i = 1; i <= l; i++) {
    str += '<li>' + i + '</li>'
  }
  return str
}

// 设置不可用的日期
function setDateDisable (disDate) {
  for (var i = 0; i < 3; i++) {
    if (disDate.indexOf(specialDate[i].innerText) !== -1) {
      specialDate[i].classList.add('j-datepicker-disabled')
    } else {
      specialDate[i].classList.remove('j-datepicker-disabled')
    }
  }
  handleDate()
}

function setColor (scroller, index) {
  var li = scroller.querySelector('.j-color-primary')
  if (li) {
    li.classList.remove('j-color-primary')
  }
  scroller.children[index].classList.add('j-color-primary')
}

// 处理滑动年份
function handleYear () {
  // 如果是闰年2月，那么2月29号置为可选择，否则只有28号可选
  if (month === '02') {
    if ((year % 100 === 0 && year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) {
      setDateDisable(['30', '31'])
    } else {
      setDateDisable(['29', '30', '31'])
    }
  }
  setColor(jrollYear.scroller, 49)
}

// 处理滑动月份
function handleMonth () {
  var m30 = ['04', '06', '09', '11']
  if (month === '02') {
    handleYear()
  } else if (m30.indexOf(month) !== -1) {
    setDateDisable(['31'])
  } else {
    setDateDisable([])
  }
  setColor(jrollMonth.scroller, 11)
}

// 处理滑动日期
function handleDate () {
  var index = 13
  var thisDate = jrollDate.scroller.children[index]
  while (thisDate.classList.contains('j-datepicker-disabled')) {
    thisDate = jrollDate.scroller.children[--index]
  }
  if (index === 13) {
    setColor(jrollDate.scroller, 13)
    return
  }
  jrollDate.y = jrollDate.y + (13 - index) * 44
  date = thisDate.innerText
  infiniteLoop(jrollDate, -11 * 44, 'd')
}

// 移动元素位置实现无限循环
function infiniteLoop (me, pos, flag) {
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

    // 获取值
    switch (flag) {
      case 'y': year = me.scroller.children[49].innerText
        handleYear()
        break
      case 'm': month = pad0(me.scroller.children[11].innerText)
        handleMonth()
        break
      case 'd': date = pad0(me.scroller.children[13].innerText)
        handleDate()
    }
  })
}

var picker = {
  init: function (y, m, d) { // year, month, date
    var me = this

    // 整体
    wrap = document.createElement('div')
    mask = document.createElement('div')
    select = document.createElement('div')

    wrap.className = 'j-datepicker-wrap'
    mask.className = 'j-datepicker-mask'
    select.className = 'j-datepicker-select'

    mask.onclick = function () {
      me.hide()
    }

    // 按钮栏
    header = document.createElement('div')
    header.className = 'j-datepicker-header'
    header.innerHTML = '<div class="j-click-button j-datepicker-cancel">取消</div><div class="j-click-button j-datepicker-confirm j-bg-primary">确定</div>'
    confirm = header.querySelector('.j-datepicker-confirm')
    cancel = header.querySelector('.j-datepicker-cancel')

    cancel.onclick = function () {
      me.hide()
    }
    confirm.onclick = function () {
      me.set()
    }

    // 年月日选项
    select.innerHTML = '<div class="j-datepicker-bar"></div><div class="j-datepicker-year"><ul>' +
      getYearsLi(y) + '</ul></div><div class="j-datepicker-month"><ul>' +
      getMonthsLi(m) + '</ul></div><div class="j-datepicker-date"><ul>' +
      getDatesLi(d) + '</ul></div>'

    // 年月日jroll实例
    jrollYear = new JRoll(select.querySelector('.j-datepicker-year'), {
      bounce: false
    }).scrollTo(0, -47 * 44, 0, true)
    jrollMonth = new JRoll(select.querySelector('.j-datepicker-month'), {
      bounce: false
    }).scrollTo(0, -9 * 44, 0, true)
    jrollDate = new JRoll(select.querySelector('.j-datepicker-date'), {
      bounce: false
    }).scrollTo(0, -11 * 44, 0, true)

    Array.prototype.forEach.call(jrollDate.scroller.children, function (li) {
      if (li.innerText === '29' || li.innerText === '30' || li.innerText === '31') {
        specialDate.push(li)
      }
    })

    // 年
    jrollYear.on('scrollEnd', function () {
      infiniteLoop(this, -47 * 44, 'y')
    })

    // 月
    jrollMonth.on('scrollEnd', function () {
      infiniteLoop(this, -9 * 44, 'm')
    })

    // 日
    jrollDate.on('scrollEnd', function () {
      infiniteLoop(this, -11 * 44, 'd')
    })

    // 设置颜色
    setColor(jrollYear.scroller, 49)
    setColor(jrollMonth.scroller, 11)
    setColor(jrollDate.scroller, 13)

    select.appendChild(header)
    wrap.appendChild(mask)
    wrap.appendChild(select)
    document.body.appendChild(wrap)
  },
  set: function () {
    var me = this
    // 任何一个选项在滚动都不执行
    if (!jrollYear.moving && !jrollMonth.moving && !jrollDate.moving && typeof callback === 'function') {
      setTimeout(function () {
        callback(year + '-' + month + '-' + date)
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
      mask.classList.add('j-datepicker-mask-show')
      select.classList.add('j-datepicker-select-show')
      if (jrollYear) {
        jrollYear.refresh()
        jrollMonth.refresh()
        jrollDate.refresh()
      }
    }, 4)
  },
  hide: function () {
    mask.classList.remove('j-datepicker-mask-show')
    select.classList.remove('j-datepicker-select-show')
    setTimeout(function () {
      wrap.style.display = 'none'
    }, 200)
  }
}

export default picker