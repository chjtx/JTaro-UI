/* global Vue */
import './mask.js'
import html from './sidebar.html'

(function (v) {
  v.component('j-sidebar', {
    props: ['show', 'side', 'width', 'bg'],
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
        if (this.show) {
          this.$el.style.display = 'block'
          setTimeout(function () {
            _this.$el.querySelector('.j-sidebar').style.transform = 'translateX(0px)'
          }, 4)
        } else {
          _this.$el.querySelector('.j-sidebar').style.transform = 'translateX(' + (this.side === 'right' ? '' : '-') + '100%)'
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
      if (this.show) {
        this.$el.style.display = 'block'
        this.$el.querySelector('.j-sidebar').style.transform = 'translateX(0px)'
      } else {
        this.$el.style.display = 'none'
        this.$el.querySelector('.j-sidebar').style.transform = 'translateX(' + (this.side === 'right' ? '' : '-') + '100%)'
      }
    }
  })
})(Vue)
