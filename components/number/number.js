/* global Vue */
import './number.css'
import calculator from './number.calculator.js'
import html from './number.html'

(function (v) {
  v.component('j-number', {
    props: {
      'value': Number,
      'nocalculate': Boolean,
      'max': {
        validator: function (v) {
          return /\d+/.test(v)
        }
      },
      'min': {
        validator: function (v) {
          return /\d+/.test(v)
        }
      },
      'type': [Number, String]
    },
    template: html,
    data: function () {
      return {
        maxValue: this.max !== 0 && this.max !== '0' && !this.max ? 99 : Number(this.max || 99),
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
      },
      valueCss: function () {
        switch (Number(this.type)) {
          case 1 : return 'value-rectangle'
          default : return ''
        }
      },
      lBtnCss: function () {
        switch (Number(this.type)) {
          case 1 : return 'lbtn-rectangle'
          default : return 'btn-default'
        }
      },
      rBtnCss: function () {
        switch (Number(this.type)) {
          case 1 : return 'rbtn-rectangle'
          default : return 'btn-default'
        }
      }
    },
    methods: {
      calculator: function () {
        if (!this.nocalculate) {
          calculator.show(this.changeValue.bind(this), this.maxValue, this.minValue)
        }
      },
      minus: function () {
        var val = this.value - 1
        if (val >= this.minValue) {
          this.$emit('input', val)
          this.$emit('action', val, '-')
        }
      },
      plus: function () {
        var val = this.value + 1
        if (val <= this.maxValue) {
          this.$emit('input', val)
          this.$emit('action', val, '+')
        }
      },
      changeValue: function (val, old) {
        this.$emit('input', val)
        this.$emit('calculate', val)
      }
    }
  })
})(Vue)
