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
  function ripple (el, touch) {
    var t = jro.utils.computeTranslate(el, doc.body)
    var p = jro.utils.computePosition(el, doc.body)
    var x = touch.clientX - t.x - p.left
    var y = touch.clientY - t.y - p.top
    var div = doc.createElement('div')

    if (win.getComputedStyle(el).position === 'static') {
      el.style.cssText = 'position:relative;left:0;top:0;overflow:hidden'
    }

    div.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px'
    div.classList.add('j-ripple')
    el.appendChild(div)
    setTimeout(function () {
      div.style.width = 2 * win.innerWidth + 'px'
      div.style.height = 2 * win.innerWidth + 'px'
      div.style.left = x - win.innerWidth + 'px'
      div.style.top = y - win.innerWidth + 'px'
      div.style.opacity = '0'

      setTimeout(function () {
        el.removeChild(div)
      }, 600)
    }, 0)
  }

  // 处理点击效果
  function handleClickEffect (e) {
    var el = e.target
    while (!el.classList.contains('j-click-button') && el !== doc.body) {
      el = el.parentElement
    }
    if (el.classList.contains('j-click-button')) {
      ripple(el, e.touches[0])
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
