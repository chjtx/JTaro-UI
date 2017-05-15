/* global Vue */
import html from './switch.html'

(function (v) {
  v.component('j-switch', {
    props: {
      'value': {
        type: Boolean,
        default: false
      },
      'label': String,
      'labelLeft': {
        type: Boolean,
        default: false
      },
      'disabled': {
        type: Boolean,
        default: false
      }
    },
    template: html,
    data: function () {
      return {
        result: this.value,
        color: 'rgba(0, 0, 0, .05)'
      }
    },
    mounted: function () {
      var color = window.getComputedStyle(this.$refs.bgColor)['background-color']
      if (color) {
        color = /rgb\(([^)]+)\)/.exec(color)
      }
      if (color && color[1]) {
        this.color = 'rgba(' + color[1] + ', .05)'
      }
    },
    computed: {
      barObject: function () {
        return {
          'j-switch-left': !this.labelLeft,
          'j-switch-right': this.labelLeft,
          'j-bg-weaken': this.result && !this.disabled
        }
      },
      ringObject: function () {
        return {
          'j-bg-primary': this.result && !this.disabled,
          'j-switch-on': this.result
        }
      },
      labelObject: function () {
        return {
          'j-switch-disabled': this.disabled
        }
      }
    },
    methods: {
      switchValue: function () {
        if (this.disabled) return

        this.result = !this.result
        var div = document.createElement('div')
        div.className = 'j-switch-ripple'
        if (this.result) {
          div.style.backgroundColor = this.color
        }
        this.$refs.ring.appendChild(div)
        setTimeout(function () {
          div.parentNode.removeChild(div)
        }, 600)
      }
    },
    watch: {
      result: function (val) {
        this.$emit('input', val)
      },
      value: function (val) {
        this.result = val
      }
    }
  })
})(Vue)
