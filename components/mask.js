/* global Vue */
import html from './mask.html'

(function (v) {
  var m = document.getElementById('__jtaro_ui_mask__')
  if (!m) {
    m = document.createElement('div')
    m.id = '__jtaro_ui_mask__'
    document.body.appendChild(m)
  }

  new Vue({
    el: m,
    template: html
  })
  v.component('j-mask', {
    props: ['title'],
    template: html
  })
})(Vue)
