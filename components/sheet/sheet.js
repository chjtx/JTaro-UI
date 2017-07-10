/* global Vue */
import html from './sheet.html'

(function (v) {
  v.component('j-sheet', {
    props: {
      'show': {
        type: Boolean,
        default: false
      },
      'menus': Array
    },
    template: html,
    data: function () {
      return {
        'showing': this.show
      }
    },
    mounted: function () {
      if (this.show) {
        this.$el.style.display = 'block'
      }
    },
    computed: {
      cssObject: function () {
        return {
          'j-sheet-show': this.showing
        }
      }
    },
    methods: {
      action: function (index) {
        this.$emit('action', index)
      },
      showOptions: function () {
        var me = this
        this.$el.style.display = 'block'
        setTimeout(function () {
          me.showing = true
        }, 4)
      },
      hideOptions: function () {
        var me = this
        this.showing = false
        setTimeout(function () {
          me.$el.style.display = 'none'
        }, 350)
      }
    },
    watch: {
      show: function (val) {
        if (val) {
          this.showOptions()
        } else {
          this.hideOptions()
        }
      }
    }
  })
})(Vue)
