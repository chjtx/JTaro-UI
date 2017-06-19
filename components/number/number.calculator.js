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
var result = null

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
        '<span id="j-number-c2"></span>' +
        ' = <span id="j-number-result"></span></div>' +
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
      '<div class="j-number-cell j-click-button j-number-noborderright">C</div>' +
      '<div class="j-number-cell j-number-gray j-number-noborderbottom">&nbsp;</div>' +
      '<div class="j-number-cell j-click-button j-number-noborderbottom">0</div>' +
      '<div class="j-number-cell j-number-gray j-number-noborderbottom">&nbsp;</div>' +
      '<div class="j-number-cell j-click-button j-bg-primary j-font-primary j-number-noborderright j-number-noborderbottom">确定</div>'

    c1 = keyboard.querySelector('#j-number-c1')
    operator = keyboard.querySelector('#j-number-operator')
    c2 = keyboard.querySelector('#j-number-c2')
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
  operateNumber: function (num) {
    var c = ''
    // 去除首零和限制5位数
    c = ((operator.innerText === '' ? c1 : c2).innerText + num).replace(/^0(?=\d)/, '')
    if (c.length > 5) {
      c = c.substr(0, 5)
      new Toast('最多5位数', 1000)
    }
    (operator.innerText === '' ? c1 : c2).innerText = c
  },
  operateCalculation: function (cal) {
    operator.innerText = cal
  },
  reset: function () {
    c1.innerText = ''
    c2.innerText = ''
    operator.innerText = ''
    result.innerText = ''
  },
  submit: function () {
  },
  show: function () {
    if (!wrap) {
      this.init()
    }
    wrap.style.display = 'block'
    setTimeout(function () {
      mask.classList.add('j-number-mask-show')
      keyboard.classList.add('j-number-keyboard-show')
    }, 4)
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
