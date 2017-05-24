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
    template: '<li :class="css" :value="value" @click="selectValue"><slot></slot></li>',
    computed: {
      css: function () {
        return {
          'j-color-primary': String(this.value) === this.$parent.value,
          'j-select-active': String(this.value) === this.$parent.value
        }
      }
    },
    methods: {
      selectValue: function () {
        this.$parent.setValue(this.value, this.$el.innerText)
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
        showing: this.show
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
      var showScrollBar = this.changeValue() > 6
      document.body.appendChild(this.$refs.mask)
      this.jroll = new Jro(this.$refs.jroll, {
        scrollBarY: showScrollBar,
        scrollBarFade: true
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
        for (var i = 0, l = children.length; i < l; i++) {
          if (this.value === String(children[i].value)) {
            this.inputValue = children[i].innerText
          }
        }
        return l
      },
      setValue: function (val, text) {
        this.inputValue = text
        this.$emit('input', val)
        this.hideOptions()
      }
    }
  })
})(Vue, JRoll)
