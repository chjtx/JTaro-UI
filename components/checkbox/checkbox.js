/* global Vue */
import html from './checkbox.html'

(function (v) {
  v.component('j-checkbox', {
    props: {
      'label': String,
      'value': Array,
      'val': String,
      'disabled': Boolean
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
        return this.value && this.value.indexOf(this.val) > -1
      }
    },
    methods: {
      'click': function () {
        if (this.disabled) return

        var values = this.value
        var i = this.value.indexOf(this.val)
        if (i === -1) {
          values.push(this.val)
        } else {
          values.splice(i, 1)
        }

        this.$emit('input', values)

        var div = document.createElement('div')
        div.className = 'j-checkbox-ripple'
        if (this.checked) div.style.backgroundColor = this.color
        this.$el.appendChild(div)
        setTimeout(function () {
          div.parentNode.removeChild(div)
        }, 600)
      }
    }
  })
})(Vue)
