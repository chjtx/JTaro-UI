/* global Vue */
import html from './input.html'

(function (v) {
  v.component('j-input', {
    props: ['placeholder', 'value', 'name', 'type', 'disabled', 'label'],
    data: function () {
      return {
        focused: false,
        inputValue: this.value
      }
    },
    computed: {
      labelObject: function () {
        return {
          'j-color-primary': this.focused,
          'j-input-label-color': !this.focused
        }
      }
    },
    template: html,
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
