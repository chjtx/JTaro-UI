/* global Vue */
import html from './mask.html'

(function (v) {
  v.component('j-mask', {
    props: {
      'show': {
        type: Boolean,
        default: false
      }
    },
    template: html,
    watch: {
      show: function () {
        var _this = this
        if (this.show) {
          this.$el.style.display = 'block'
          setTimeout(function () {
            _this.$el.style.opacity = 1
          }, 4)
        } else {
          this.$el.style.opacity = 0
          setTimeout(function () {
            _this.$el.style.display = 'none'
          }, 200)
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
      } else {
        this.$el.style.display = 'none'
      }
    }
  })
})(Vue)
