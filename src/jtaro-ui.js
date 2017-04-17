/* global  MouseEvent */
(function (win, doc) {
  'use strict'
  /**
   * 微型fastclick
   * 忽略表单控件，只保证div等普通元素点击加速
   */
  var clickEvent
  var stopClick
  var clickTime
  doc.addEventListener('touchstart', function (e) {
    clickEvent = e
    clickTime = e.timeStamp
    if (/^AUDIO|BUTTON|VIDEO|SELECT|INPUT|TEXTAREA$/.test(e.target.tagName)) {
      stopClick = true
    } else {
      stopClick = false
    }
  }, true)
  doc.addEventListener('touchmove', function () {
    stopClick = true
  }, true)
  doc.addEventListener('touchend', function (e) {
    if (!stopClick && (e.timeStamp - clickTime < 300)) {
      e.preventDefault()
      var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
      doc.activeElement.blur()
      clickEvent.target.dispatchEvent(evt)
      return false
    }
  }, true)
})(window, document)
