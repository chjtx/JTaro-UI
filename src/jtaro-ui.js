/* global JRoll MouseEvent */
(function (win, doc, jro) {
  'use strict'
  /**
   * 微型fastclick
   * 忽略表单控件，只保证div等普通元素点击加速
   */
  var clickEvent
  var stopClick
  var clickTime

  // 荡起涟漪
  function ripple (el, touch, isRound) {
    var t = jro.utils.computeTranslate(el, doc.body)
    var p = jro.utils.computePosition(el, doc.body)
    var x = touch.clientX - t.x - p.left
    var y = touch.clientY - t.y - p.top
    var div = doc.createElement('div')
    var w = el.offsetWidth > el.offsetHeight ? el.offsetWidth : el.offsetHeight
    var timing = isRound ? 'cubic-bezier(0,1,.38,.91)' : 'cubic-bezier(.04,.13,.23,.6)'

    if (win.getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
      el.style.left = '0px'
      el.style.top = '0px'
    }
    if (!isRound) {
      el.style.overflow = 'hidden'
    }

    div.style.cssText = 'position:absolute;left:' + (isRound ? el.offsetWidth / 2 : x) + 'px;top:' + (isRound ? el.offsetHeight / 2 : y) + 'px;width: 1px;height: 1px;background: #000;opacity:0.18;border-radius: 100%;-webkit-transition-duration: 400ms;transition-duration: 400ms;-webkit-transition-timing-function:' + timing + ';transition-timing-function:' + timing + ';'

    el.appendChild(div)
    setTimeout(function () {
      if (isRound) {
        div.style.width = w + 'px'
        div.style.height = w + 'px'
        div.style.left = (el.offsetWidth - w) / 2 + 'px'
        div.style.top = (el.offsetHeight - w) / 2 + 'px'
      } else {
        div.style.width = w * 2 + 'px'
        div.style.height = w * 2 + 'px'
        div.style.left = x - w + 'px'
        div.style.top = y - w + 'px'
      }
      div.style.opacity = '0'

      setTimeout(function () {
        el.removeChild(div)
      }, 400)
    }, 50)
  }

  // 处理点击效果
  function handleClickEffect (e) {
    var el = e.target
    var reg = /j-click-button|j-click-round-button/
    while (!reg.test(el.className) && el !== doc.body) {
      el = el.parentElement
    }
    if (reg.test(el.className)) {
      ripple(el, e.touches[0], /j-click-round-button/.test(el.className))
    }
  }

  // TouchStart
  doc.addEventListener('touchstart', function (e) {
    // 处理300ms延迟
    clickEvent = e
    clickTime = e.timeStamp
    if (/^AUDIO|BUTTON|VIDEO|SELECT|INPUT|TEXTAREA$/.test(e.target.tagName)) {
      stopClick = true
    } else {
      stopClick = false
    }
  }, true)

  // TouchMove
  doc.addEventListener('touchmove', function () {
    stopClick = true
  }, true)

  // TouchEnd
  doc.addEventListener('touchend', function (e) {
    if (!stopClick && (e.timeStamp - clickTime < 300)) {
      e.preventDefault()

      // 处理点击效果
      handleClickEffect(clickEvent)

      // 处理300ms延迟
      var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
      doc.activeElement.blur()
      clickEvent.target.dispatchEvent(evt)
      return false
    }
  }, true)
})(window, document, JRoll)
