/* global Vue, JRoll */
import '../mask/mask.js'
import './picker.css'
import html from './picker.html'

(function (v, JR) {
  v.component('j-picker', {
    props: {
      'value': {
        type: Array,
        required: true
      },
      'number': {
        type: Number,
        required: true
      },
      'val': {
        type: Array,
        required: true
      },
      'show': {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        showing: this.show
      }
    },
    template: html,
    mounted: function () {
      var me = this

      // 将组件稳到body下
      document.body.appendChild(this.$refs.mask)

      this.$refs.jroll.forEach(function (e) {
        // 创建jroll实例
        var j = new JR(e.parentNode, { scroller: e, preventDefault: false })
        j.on('refresh', function () {
          var l = this.scroller.children.length
          this.maxScrollY = l > 4 ? this.maxScrollY - 88 : 88 - (l - 1) * 44
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
            var pos = Math.abs((this.y - 88) / 44)
            var value = this.scroller.children[pos].innerText
            var newValue = me.value
            var index = Number(this.scroller.getAttribute('index'))
            var subValue = me.getSubValue(index, value)
            var selectedDom = this.scroller.querySelector('.j-color-primary')
            if (selectedDom) selectedDom.classList.remove('j-color-primary')
            this.scroller.children[pos].classList.add('j-color-primary')

            newValue.splice(index, newValue.length, value)
            me.$emit('input', newValue.concat(subValue))

            // 重置子项的位置
            me.$nextTick(function () {
              var jrolls = me.$refs.jroll
              for (var i = index + 1; i < jrolls.length; i++) {
                jrolls[i].jroll.refresh().scrollTo(0, 88)
                var selectedDom = jrolls[i].querySelector('.j-color-primary')
                if (selectedDom) selectedDom.classList.remove('j-color-primary')
                if (jrolls[i].children.length) {
                  jrolls[i].children[0].classList.add('j-color-primary')
                }
              }
            })
          }.bind(this))
        })
        j.refresh().scrollTo(0, 0)
      })

      // 初始数值位置
      for (var i = 0; i < me.number; i++) {
        var children = me.$refs.jroll[i].children
        for (var j = 0, k = children.length; j < k; j++) {
          if (me.value[i] === children[j].innerText) {
            children[j].classList.add('j-color-primary')
            me.$refs.jroll[i].jroll.scrollTo(0, 88 - j * 44, 0, true)
          }
        }
      }
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
          if (selected) {
            temp = selected.children
            if (!temp) break
          } else {
            break
          }
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

          // 视图渲染完成刷新jroll确保滑动正常
          setTimeout(function () {
            me.$refs.jroll.forEach(function (j) {
              j.jroll.refresh()
            })
          }, 100)
        }, 4)
      },
      hideOptions: function () {
        var me = this
        this.showing = false
        setTimeout(function () {
          me.$refs.mask.style.display = 'none'
        }, 350)
      },
      getSubValue: function (index, value) {
        var d = this.datas[index]
        var a = []
        var b = ''
        for (var i = 0, l = d.length; i < l; i++) {
          if (value === d[i].name) {
            b = d[i]
            break
          }
        }
        while (b.children) {
          a.push(b.children[0].name)
          b = b.children[0]
        }
        return a
      },
      findSelected: function (is, arr) {
        return arr.filter(function (i) {
          return i.name === is
        })[0]
      },
      styleObject: function (i) {
        return {
          width: (100 / this.number) + '%',
          left: i * (100 / this.number) + '%'
        }
      }
    }
  })
})(Vue, JRoll)
