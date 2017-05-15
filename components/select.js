/* global Vue JRoll */
import './mask.js'
import html from './select.html'

(function (v, Jro) {
  // 选项
  v.component('j-option', {
    props: {
      value: String
    },
    template: '<li :value="value"><slot></slot></li>'
  })

  // 选择器
  v.component('j-select', {
    props: {
      'multiple': {
        type: Boolean,
        default: false
      },
      'value': String,
      'show': {
        type: Boolean,
        default: false
      }
    },
    template: html,
    data: function () {
      return {
        inputValue: '',
        toShow: this.show
      }
    },
    mounted: function () {
      var children = this.$refs.options.children
      for (var i = 0, l = children.length; i < l; i++) {
        if (this.value === String(children[i].value)) {
          this.inputValue = children[i].innerText
        }
      }
      document.body.appendChild(this.$refs.mask)
    },
    methods: {
      showOptions: function () {
        var me = this
        this.$refs.mask.style.display = 'block'
        setTimeout(function () {
          me.toShow = true
        }, 4)
      },
      hideOptions: function () {
        var me = this
        this.toShow = false
        setTimeout(function () {
          me.$refs.mask.style.display = 'none'
        }, 250)
      }
    }
  })
})(Vue, JRoll)
