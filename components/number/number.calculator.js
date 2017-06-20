/**
 * 加减器的计算键盘
 */

import Toast from '../toast/toast.js'

var wrap = null
var mask = null
var keyboard = null

var c1 = null
var c2 = null
var operator = null
var equal = null
var result = null

var callfunction = null
var max = 99999
var min = 0

var calculator = {
  init: function () {
    var me = this
    wrap = document.createElement('div')
    mask = document.createElement('div')
    keyboard = document.createElement('div')

    wrap.className = 'j-number-wrap'
    mask.className = 'j-number-mask'
    keyboard.className = 'j-number-keyboard'

    mask.onclick = function () {
      me.hide()
    }

    keyboard.innerHTML = '<div class="j-number-row1">' +
        '<span id="j-number-c1"></span> ' +
        '<span id="j-number-operator"></span> ' +
        '<span id="j-number-c2"></span> ' +
        '<span id="j-number-equal"></span> <span id="j-number-result"></span></div>' +
      '<div class="j-number-cell j-click-button">7</div>' +
      '<div class="j-number-cell j-click-button">8</div>' +
      '<div class="j-number-cell j-click-button">9</div>' +
      '<div class="j-number-cell j-click-button j-number-noborderright">+</div>' +
      '<div class="j-number-cell j-click-button">4</div>' +
      '<div class="j-number-cell j-click-button">5</div>' +
      '<div class="j-number-cell j-click-button">6</div>' +
      '<div class="j-number-cell j-click-button j-number-noborderright">-</div>' +
      '<div class="j-number-cell j-click-button">1</div>' +
      '<div class="j-number-cell j-click-button">2</div>' +
      '<div class="j-number-cell j-click-button">3</div>' +
      '<div class="j-number-cell j-click-button j-number-noborderright">=</div>' +
      '<div class="j-number-cell j-click-button j-number-red j-number-noborderbottom">C</div>' +
      '<div class="j-number-cell j-click-button j-number-noborderbottom">0</div>' +
      '<div class="j-number-cell j-click-button j-number-red j-number-noborderbottom">back</div>' +
      '<div class="j-number-cell j-click-button j-bg-primary j-font-primary j-number-noborderright j-number-noborderbottom">确定</div>'

    c1 = keyboard.querySelector('#j-number-c1')
    operator = keyboard.querySelector('#j-number-operator')
    c2 = keyboard.querySelector('#j-number-c2')
    equal = keyboard.querySelector('#j-number-equal')
    result = keyboard.querySelector('#j-number-result')

    keyboard.addEventListener('click', function (e) {
      var txt = e.target.innerText

      // 防止点击到涟漪div造成txt为空
      if (txt === '') {
        txt = e.target.parentNode.innerText
      }

      switch (txt) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          me.operateNumber(txt)
          break
        case '-':
        case '+':
          me.operateCalculation(txt)
          break
        case '=':
          me.operateEqual()
          break
        case 'back':
          me.operateBack()
          break
        case 'C':
          me.reset()
          break
        case '确定':
          me.submit()
      }
    }, false)

    wrap.appendChild(mask)
    wrap.appendChild(keyboard)

    document.body.appendChild(wrap)
  },
  // 数字按钮
  operateNumber: function (num) {
    var c = ''
    equal.innerText = ''
    result.innerText = ''
    // 去除首零和限制5位数
    c = ((operator.innerText === '' ? c1 : c2).innerText + num).replace(/^0(?=\d)/, '')
    if (c.length > 5) {
      c = c.substr(0, 5)
      new Toast('加/减数最多5位', 1000)
    }
    (operator.innerText === '' ? c1 : c2).innerText = c
  },
  // 按钮 + 或 - 符号
  operateCalculation: function (cal) {
    if (c1.innerText !== '') {
      operator.innerText = cal
    }
  },
  // 按钮 =
  operateEqual: function () {
    var a1 = Number(c1.innerText)
    var a2 = Number(c2.innerText)
    var a = 0
    switch (operator.innerText) {
      case '+':
        a = (a1 + a2)
        if (a > max) {
          a = max
          new Toast('最大值为 ' + max, 1000)
        }
        equal.innerText = '='
        result.innerText = a
        break
      case '-':
        a = (a1 - a2)
        if (a < min) {
          a = min
          new Toast('最小值为 ' + min, 1000)
        }
        equal.innerText = '='
        result.innerText = a
    }
  },
  // 后退
  operateBack: function () {
    var c = operator.innerText === '' ? c1 : c2
    c.innerText = c.innerText.substr(0, c.innerText.length - 1)
  },
  // 重置
  reset: function () {
    c1.innerText = ''
    c2.innerText = ''
    operator.innerText = ''
    equal.innerText = ''
    result.innerText = ''
  },
  filterValue: function (f) {
    var val = Number(f)
    if (val < min) {
      new Toast('不能小于 ' + min, 1000)
    } else if (val > max) {
      new Toast('不能大于 ' + max, 1000)
    } else {
      callfunction(val)
      this.hide()
    }
  },
  submit: function () {
    // 有结果值
    if (result.innerText !== '') {
      this.filterValue(result.innerText)

    // 没有运算符
    } else if (c1.innerText !== '' && c2.innerText === '' && operator.innerText === '') {
      this.filterValue(c1.innerText)

    // 有操作符
    } else if (operator.innerText !== '' && result.innerText === '') {
      this.operateEqual()

    // 不作任何处理
    } else {
      this.hide()
    }
  },
  show: function (callback, maxValue, minValue) {
    if (!wrap) {
      this.init()
    }
    max = maxValue
    min = minValue
    this.reset()
    wrap.style.display = 'block'
    setTimeout(function () {
      mask.classList.add('j-number-mask-show')
      keyboard.classList.add('j-number-keyboard-show')
    }, 4)

    callfunction = callback
  },
  hide: function () {
    mask.classList.remove('j-number-mask-show')
    keyboard.classList.remove('j-number-keyboard-show')
    setTimeout(function () {
      wrap.style.display = 'none'
    }, 250)
  }
}

export default calculator
