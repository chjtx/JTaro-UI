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
      }
    },
    template: html,
    data: function () {
      return {
        result: this.value
      }
    },
    computed: {
      barObject: function () {
        return {
          'j-switch-left': !this.labelLeft,
          'j-switch-right': this.labelLeft,
          'j-bg-weaken': this.result
        }
      },
      ringObject: function () {
        return {
          'j-bg-primary': this.result
        }
      }
      // ,
      // rippleObject: function () {
      //   return {
      //     'j-switch-ripple-show': this.result
      //   }
      // }
    },
    methods: {
      switchValue: function () {
        this.result = !this.result
        var div = document.createElement('div')
        div.className = 'j-switch-ripple'
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
