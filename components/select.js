/* global Vue JRoll */
import './mask.js'
import './select.css'
import html from './select.html'

(function (v, Jro) {
  // 选项
  v.component('j-option', {
    props: {
      value: String
    },
    data: function () {
      return {
        thisValue: this.value
      }
    },
    template: '<li class="j-click-button" :class="css" :value="value" @click="selectValue"><slot></slot></li>',
    computed: {
      css: function () {
        var selected = this.$parent.multiple
          ? this.$parent.findIndex(this.value, this.$parent.value) > -1
          : String(this.thisValue) === String(this.$parent.value)
        return {
          'j-color-primary': selected,
          'j-select-active': selected
        }
      }
    },
    mounted: function () {
      this.thisValue = this.value || this.$el.innerText
    },
    methods: {
      selectValue: function () {
        this.$parent.setValue(this.thisValue, this.$el.innerText)
      }
    }
  })

  // 选择器
  v.component('j-select', {
    props: {
      'multiple': {
        type: Boolean,
        default: false
      },
      'value': [String, Array],
      'show': {
        type: Boolean,
        default: false
      }
    },
    template: html,
    data: function () {
      return {
        inputValue: '',
        showing: this.show,
        showMoreUp: false,
        showMoreDown: false
      }
    },
    computed: {
      cssObject: function () {
        return {
          'j-select-show': this.showing
        }
      },
      boxObject: function () {
        return {
          'j-border-primary': this.showing
        }
      }
    },
    mounted: function () {
      var me = this
      var showScrollBar = this.changeValue() > 6
      document.body.appendChild(this.$refs.mask)
      this.jroll = new Jro(this.$refs.jroll, {
        scrollBarY: showScrollBar,
        scrollBarFade: true
      })

      // 显示更多小箭头
      this.jroll.on('scrollEnd', function () {
        me.showMore(this.y, this.maxScrollY)
      })
    },
    updated: function () {
      if (this.jroll) this.jroll.refresh()
    },
    watch: {
      value: function () {
        this.changeValue()
      }
    },
    methods: {
      showOptions: function () {
        var me = this
        this.$refs.mask.style.display = 'block'
        setTimeout(function () {
          me.showing = true
          setTimeout(function () {
            me.showMore(me.jroll.y, me.jroll.maxScrollY)
          }, 300)
        }, 4)
      },
      hideOptions: function () {
        var me = this
        this.showing = false
        setTimeout(function () {
          me.$refs.mask.style.display = 'none'
        }, 350)
      },
      changeValue: function () {
        var children = this.$refs.options.children
        var tempArr = []
        var i = 0
        var l = children.length

        // 多项
        if (this.multiple) {
          this.value.forEach(function (v) {
            for (i = 0; i < l; i++) {
              if (String(v) === String(children[i].value)) {
                tempArr.push(children[i].innerText)
              }
            }
          })
          this.inputValue = tempArr.join(',')

        // 单项
        } else {
          for (i = 0; i < l; i++) {
            if (this.value === String(children[i].value)) {
              this.inputValue = children[i].innerText
              break
            }
          }
        }
        return l
      },
      setValue: function (val, text) {
        // 多项
        var i = -1
        var values = this.value
        if (this.multiple) {
          i = this.findIndex(val, values)
          if (i > -1) {
            values.splice(i, 1)
          } else {
            values.push(val)
          }
          val = values
        // 单项
        } else {
          this.inputValue = text
          this.hideOptions()
        }

        this.$emit('input', val)
      },
      showMore: function (y, max) {
        var me = this
        if (max === 0) {
          me.showMoreUp = me.showMoreDown = false
        } else if (y === 0) {
          me.showMoreUp = false
          me.showMoreDown = true
        } else if (y === max) {
          me.showMoreUp = true
          me.showMoreDown = false
        } else {
          me.showMoreUp = true
          me.showMoreDown = true
        }
      },
      findIndex: function (val, arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          if (String(val) === String(arr[i])) {
            return i
          }
        }
        return -1
      }
    }
  })
})(Vue, JRoll)
