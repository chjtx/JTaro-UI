/* global Vue, HTMLElement, JRoll */
import './number.css'
import calculator from './number.calculator.js'
import html from './number.html'

(function (v) {
  v.component('j-number', {
    props: {
      'value': Number,
      'noCalculate': Boolean,
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
      'type': [Number, String],
      'throwIn': [HTMLElement, String],
      'throwCallback': Function
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
      },
      shoppingcar: function () {
        if (typeof this.throwIn === 'string') {
          return document.querySelector(this.throwIn)
        } else if (this.throwIn instanceof HTMLElement) {
          return this.throwIn
        } else {
          return null
        }
      }
    },
    methods: {
      calculator: function () {
        if (!this.noCalculate) {
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
      plus: function (e) {
        var val = this.value + 1
        if (val <= this.maxValue) {
          this.$emit('input', val)
          this.$emit('action', val, '+')
        }
        if (this.shoppingcar) {
          this.throwInShoppingCar(e.target)
        }
      },
      changeValue: function (val, old) {
        this.$emit('input', val)
        this.$emit('calculate', val)
      },
      // 投进购物车
      throwInShoppingCar: function (target) {
        var pos = JRoll.utils.computePosition(target, document.body)
        var trs = JRoll.utils.computeTranslate(target, document.body)
        var pos2 = JRoll.utils.computePosition(this.shoppingcar, document.body)
        var trs2 = JRoll.utils.computeTranslate(this.shoppingcar, document.body)

        var ball = document.createElement('div')
        ball.className = 'j-number-ball j-bg-primary'
        ball.style.left = (pos.left + trs.x + 7) + 'px'
        ball.style.top = (pos.top + trs.y + 7) + 'px'
        document.body.appendChild(ball)
        this.animation(ball, pos.left + trs.x, pos.top + trs.y, pos2.left + trs2.x, pos2.top + trs2.y)
      },
      animation: function (el, startX, startY, endX, endY) {
        var me = this
        var s = endX - startX
        var p = [
          [s / 4 - 20, -30],
          [s / 2 - 20, -40],
          [s / 4 * 3 - 20, -30],
          [endX - startX - 20, 50],
          [endX - startX + 12, endY - startY + 12]
        ]
        var i = 0
        function translate (o) {
          el.style.transform = 'translate(' + o[0] + 'px,' + o[1] + 'px)'
          setTimeout(function () {
            i++
            if (p[i]) {
              translate(p[i])
            } else {
              document.body.removeChild(el)
              if (me.throwCallback) {
                me.throwCallback()
              }
            }
          }, 80)
        }
        setTimeout(function () {
          translate(p[i])
        }, 0)
      }
    }
  })
})(Vue)
