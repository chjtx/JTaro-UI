/* global Vue */
import './mask.js'
import html from './sidebar.html'

(function (v) {
  v.component('j-sidebar', {
    props: {
      'show': {
        type: Boolean,
        default: false
      },
      'side': String,
      'width': [String, Number],
      'bg': String
    },
    template: html,
    computed: {
      styleObject: function () {
        return {
          left: this.side !== 'right' ? 0 : 'auto',
          right: this.side === 'right' ? 0 : 'auto',
          width: this.width || '80%',
          background: this.bg || '#fff'
        }
      }
    },
    watch: {
      show: function () {
        var _this = this
        var sub = _this.$el.querySelector('.j-sidebar')
        if (this.show) {
          this.$el.style.display = 'block'
          setTimeout(function () {
            sub.style.transform = 'translateX(0px)'
          }, 4)
        } else {
          sub.style.transform = 'translateX(' + (this.side === 'right' ? '' : '-') + '100%)'
          setTimeout(function () {
            _this.$el.style.display = 'none'
          }, 300)
        }
      }
    },
    methods: {
      action: function () {
        this.$emit('action')
      }
    },
    mounted: function () {
      var sub = this.$el.querySelector('.j-sidebar')
      if (this.show) {
        this.$el.style.display = 'block'
        sub.style.transform = 'translateX(0px)'
      } else {
        this.$el.style.display = 'none'
        sub.style.transform = 'translateX(' + (this.side === 'right' ? '' : '-') + '100%)'
      }
    }
  })
})(Vue)
