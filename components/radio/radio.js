/* global Vue */
import html from './radio.html'

(function (v) {
  v.component('j-radio', {
    props: {
      'label': String,
      'value': String,
      'val': String
    },
    template: html,
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
      'checked': function () {
        return this.val === this.value
      }
    },
    methods: {
      'click': function () {
        this.$emit('input', this.val)

        var div = document.createElement('div')
        div.className = 'j-radio-ripple'
        div.style.backgroundColor = this.color
        this.$el.appendChild(div)
        setTimeout(function () {
          div.parentNode.removeChild(div)
        }, 600)
      }
    }
  })
})(Vue)
