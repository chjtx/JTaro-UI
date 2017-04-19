/* global Vue */
import html from './appbar.html'

(function (v) {
  v.component('j-appbar', {
    props: ['title'],
    template: html
  })
})(Vue)
