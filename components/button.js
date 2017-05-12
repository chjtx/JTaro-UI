/* global Vue */
import html from './button.html'

(function (v) {
  v.component('j-button', {
    props: {
      'type': String,
      'width': [String, Number],
      'height': [String, Number],
      'round': {
        type: Boolean,
        default: false
      }
    },
    template: html,
    computed: {
      classObject: function () {
        return {
          'j-border-primary': !this.type || this.type === 'theme',
          'j-text-primary': !this.type,
          'j-bg-primary': this.type === 'theme',
          'j-font-primary': this.type === 'theme',
          'j-button-text': this.type === 'text',
          'j-click-button': !this.round && this.type !== 'disabled',
          'j-click-round-button': this.round && this.type !== 'disabled',
          'j-button-red': this.type === 'red',
          'j-button-green': this.type === 'green',
          'j-button-blue': this.type === 'blue',
          'j-button-yellow': this.type === 'yellow',
          'j-button-disabled': this.type === 'disabled'
        }
      },
      w: function () {
        return isNaN(Number(this.width)) ? this.width : Number(this.width) + 'px'
      },
      h: function () {
        return isNaN(Number(this.height)) ? this.width : Number(this.height) + 'px'
      },
      l: function () {
        return this.height ? Number(this.height) - 2 + 'px' : null
      }
    },
    methods: {
      a: function () {
        if (this.type !== 'disabled') this.$emit('action')
      }
    }
  })
})(Vue)
