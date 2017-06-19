/* global Vue */
import './number.css'
import calculator from './number.calculator.js'
import html from './number.html'

(function (v) {
  v.component('j-number', {
    props: {
      'value': Number
    },
    template: html,
    mounted: function () {
      calculator.show(this.value)
    },
    methods: {
      plus: function () {
        calculator.show(this.value)
      }
    }
  })
})(Vue)
