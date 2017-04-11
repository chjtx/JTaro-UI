/* global Vue */
import html from './button.html'

(function (v) {
  v.component('j-button', {
    props: ['action'],
    template: html
  })
})(Vue)
