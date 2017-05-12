/* global Vue */
import html from './input.html'

(function (v) {
  v.component('j-input', {
    props: {
      'placeholder': String,
      'value': String,
      'name': String,
      'type': String,
      'label': String,
      'multiLine': {
        type: Boolean,
        default: false
      },
      'disabled': {
        type: Boolean,
        default: false
      },
      'labelFloat': {
        type: Boolean,
        default: false
      },
      'rows': {
        type: [String, Number],
        default: 1
      },
      'rowsMax': [String, Number]
    },
    data: function () {
      return {
        focused: false,
        inputValue: this.value
      }
    },
    computed: {
      holderObject: function () {
        return {
          'j-input-label-disabled': this.disabled,
          'focus': this.inputValue || (this.labelFloat && !this.focused)
        }
      },
      inputObject: function () {
        return {
          'j-input-ios': this.disabled && /iphone|ipad|ipod|ios/.test(window.navigator.userAgent.toLowerCase())
        }
      },
      labelObject: function () {
        return {
          'j-color-primary': this.focused,
          'j-input-label-color': !this.focused,
          'j-input-label-disabled': this.disabled,
          'j-input-label-float': this.inputValue || (!this.labelFloat || (this.labelFloat && this.focused))
        }
      }
    },
    template: html,
    mounted: function () {
      if (this.multiLine) {
        this.resetHeight()
      }
    },
    methods: {
      onFocus: function (e) {
        this.focused = true
        this.$emit('focus', e)
      },
      onBlur: function (e) {
        this.focused = false
        this.$emit('blur', e)
      },
      onInput: function (val) {
        this.inputValue = val.target ? val.target.value : val
      },
      onChange: function (e) {
        this.$emit('change', e, e.target.value)
      },
      resetHeight: function () {
        var scrollHeight = this.$refs.hiddenTextArea.scrollHeight
        var h = 28 * this.rows
        var height = h > scrollHeight ? h : scrollHeight
        var maxHeight = 28 * (this.rowsMax || 0)
        this.$refs.textArea.style.height = (maxHeight > 0 ? (height > maxHeight ? maxHeight : height) : height) + 2 + 'px'
      }
    },
    watch: {
      value: function (val) {
        this.inputValue = val
      },
      inputValue: function (val, oldVal) {
        var me = this
        if (val !== oldVal && this.multiLine) {
          this.$nextTick(function () {
            me.resetHeight()
          })
        }
        this.$emit('input', val)
      }
    }
  })
})(Vue)
