/* global Vue */
import './mask.js'
import './button.js'
import html from './dialog.html'

(function (v) {
  v.component('j-dialog', {
    props: {
      'show': {
        type: Boolean,
        default: false
      },
      'buttons': {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    template: html,
    computed: {
      btns: function () {
        return this.buttons
      }
    },
    watch: {
      show: function () {
        var _this = this
        var sub = this.$el.querySelector('.j-dialog')
        if (this.show) {
          this.$el.style.display = 'block'
          setTimeout(function () {
            sub.style.transform = 'translate(-50%, -60%)'
          }, 4)
        } else {
          sub.style.transform = 'translate(-50%, -' + window.innerHeight + 'px)'
          setTimeout(function () {
            _this.$el.style.display = 'none'
          }, 300)
        }
      }
    },
    methods: {
      action: function (index) {
        this.$emit('action', index)
      },
      styleObject: function (i) {
        return {
          width: '33.33%',
          fontSize: '16px',
          marginLeft: i === 0 ? ((3 - this.btns.length) * 33.33) + '%' : 0
        }
      }
    },
    mounted: function () {
      var sub = this.$el.querySelector('.j-dialog')
      if (this.show) {
        this.$el.style.display = 'block'
        sub.style.transform = 'translate(-50%, -60%)'
      } else {
        this.$el.style.display = 'none'
        sub.style.transform = 'translate(-50%, -' + window.innerHeight + 'px)'
      }
    }
  })
})(Vue)
