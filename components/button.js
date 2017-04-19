/* global Vue */
import html from './button.html'

(function (v) {
  v.component('j-button', {
    props: ['action', 'type', 'width', 'height'],
    template: html,
    computed: {
      classObject: function () {
        return {
          'j-border-primary': !this.type || this.type === 'theme',
          'j-text-primary': !this.type,
          'j-bg-primary': this.type === 'theme',
          'j-font-primary': this.type === 'theme',
          'j-button-text': this.type === 'text'
        }
      },
      a: function () {
        return this.action || function () { return false }
      },
      w: function () {
        return this.width ? Number(this.width) + 'px' : 'auto'
      },
      h: function () {
        return this.height ? Number(this.height) + 'px' : '36px'
      },
      l: function () {
        return this.height ? Number(this.height) - 2 + 'px' : '34px'
      }
    }
  })
})(Vue)
