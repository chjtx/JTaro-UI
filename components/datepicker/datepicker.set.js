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

function getYearsLi () {
  var str = ''
  for (var i = 1900; i <= 2100; i++) {
    str += '<li>' + i + '</li>'
  }
  return str
}

function getMonthsLi () {
  var str = ''
  for (var i = 1; i <= 12; i++) {
    str += '<li>' + String(i).replace(/^(\d)$/, '0$1') + '</li>'
  }
  return str
}

var picker = {
  init: function () {
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
    select.innerHTML = '<div class="j-datepicker-year"><ul>' +
      getYearsLi() + '</ul></div><div class="j-datepicker-month"><ul>' +
      getMonthsLi() + '</ul></div><div class="j-datepicker-date"><ul></ul></div>'

    jrollYear = new JRoll(select.querySelector('.j-datepicker-year'))
    jrollMonth = new JRoll(select.querySelector('.j-datepicker-month'))
    jrollDate = new JRoll(select.querySelector('.j-datepicker-date'))

    select.appendChild(header)
    wrap.appendChild(mask)
    wrap.appendChild(select)
    document.body.appendChild(wrap)
  },
  set: function () {

  },
  show: function () {
    var me = this
    if (!wrap) {
      me.init()
    }
    wrap.style.display = 'block'
    setTimeout(function () {
      if (jrollYear) {
        jrollYear.refresh()
        jrollMonth.refresh()
        jrollDate.refresh()
      }
    }, 4)
  },
  hide: function () {

  }
}

export default picker
