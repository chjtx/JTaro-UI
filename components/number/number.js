/* global Vue */
import './number.css'
import calculator from './number.calculator.js'
import html from './number.html'

(function (v) {
  v.component('j-number', {
    props: {
      'value': Number,
      'max': {
        validator: function (v) {
          return /\d+/.test(v)
        }
      },
      'min': {
        validator: function (v) {
          return /\d+/.test(v)
        }
      }
    },
    template: html,
    data: function () {
      return {
        maxValue: this.max !== 0 && this.max !== '0' && !this.max ? 99999 : Number(this.max || 99999),
        minValue: Number(this.min || 0) < 0 ? 0 : Number(this.min || 0)
      }
    },
    mounted: function () {
      if (this.value < this.minValue) {
        this.$emit('input', this.minValue)
      }
      if (this.maxValue > this.maxValue) {
        this.$emit('input', this.maxValue)
      }
    },
    computed: {
      minType: function () {
        return this.value > this.minValue ? 'theme' : 'disabled'
      },
      maxType: function () {
        return this.value < this.maxValue ? 'theme' : 'disabled'
      }
    },
    methods: {
      calculator: function () {
        calculator.show(this.changeValue.bind(this), this.maxValue, this.minValue)
      },
      minus: function () {
        var val = this.value - 1
        if (val >= this.minValue) {
          this.$emit('input', val)
        }
      },
      plus: function () {
        var val = this.value + 1
        if (val <= this.maxValue) {
          this.$emit('input', val)
        }
      },
      changeValue: function (val) {
        this.$emit('input', val)
      }
    }
  })
})(Vue)
