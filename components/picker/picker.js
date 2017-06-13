/* global Vue, JRoll */
import '../mask/mask.js'
import './picker.css'
import html from './picker.html'

(function (v, JR) {
  v.component('j-picker', {
    props: {
      'value': Array,
      'val': Array,
      'show': {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        showing: this.show,
        newValue: this.value
      }
    },
    template: html,
    mounted: function () {
      var me = this
      document.body.appendChild(this.$refs.mask)
      this.$refs.jroll.forEach(function (e) {
        var j = new JR(e.parentNode, { scroller: e, preventDefault: false })
        j.on('refresh', function () {
          var l = this.scroller.children.length
          this.maxScrollY = l > 4 ? -88 : 88
          this.minScrollY = 88
        })
        j.on('scrollEnd', function () {
          var p = this.y % 44
          var s = 0
          if (p) {
            if (p > 0) {
              s = this.y - p + (p > 22 ? 44 : 0)
            } else {
              s = this.y - p - (p < -22 ? 44 : 0)
            }
          } else {
            s = this.y
          }
          this.scrollTo(0, s, 100, false, function () {
            // 获取值
            var index = Math.abs((this.y - 88) / 44)
            var value = this.scroller.children[index].innerText
            me.newValue.splice(this.scroller.getAttribute('index'), 1, value)
            me.$emit('input', me.newValue)
          }.bind(this))
        })
        j.refresh()
      })
    },
    computed: {
      cssObject: function () {
        return {
          'j-picker-show': this.showing
        }
      },
      datas: function () {
        var l = this.value.length
        var arr = []
        var temp = this.val
        var selected = null
        for (var i = 0; i < l; i++) {
          arr.push(temp)
          selected = this.findSelected(this.value[i], temp)
          if (selected) temp = selected.children
        }
        return arr
      }
    },
    methods: {
      showOptions: function () {
        var me = this
        this.$refs.mask.style.display = 'block'
        setTimeout(function () {
          me.showing = true
        }, 4)
      },
      hideOptions: function () {
        var me = this
        this.showing = false
        setTimeout(function () {
          me.$refs.mask.style.display = 'none'
        }, 350)
      },
      findSelected: function (is, arr) {
        return arr.filter(function (i) {
          return i.name === is
        })[0]
      },
      styleObject: function (i) {
        return {
          width: (100 / this.value.length) + '%',
          left: i * (100 / this.value.length) + '%'
        }
      }
    }
  })
})(Vue, JRoll)
