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
      'disabled': {
        type: Boolean,
        default: false
      },
      'labelFloat': {
        type: Boolean,
        default: false
      }
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
          'focus': this.inputValue || (this.labelFloat && !this.focused)
        }
      },
      labelObject: function () {
        return {
          'j-color-primary': this.focused,
          'j-input-label-color': !this.focused,
          'j-input-label-float': this.inputValue || (!this.labelFloat || (this.labelFloat && this.focused))
        }
      }
    },
    template: html,
    mounted: function () {
      console.log(this.labelFloat)
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
      }
    },
    watch: {
      value: function (val) {
        this.inputValue = val
      },
      inputValue: function (val) {
        this.$emit('input', val)
      }
    }
  })
})(Vue)
