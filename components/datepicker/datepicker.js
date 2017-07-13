/* global Vue */
import html from './datepicker.html'
import picker from './datepicker.set.js'

(function (v) {
  v.component('j-datepicker', {
    props: {
      'value': String
    },
    template: html,
    mounted: function () {
      // 如果传过来的值为空，初始化为当天日期
      if (this.value === '') {
        this.$emit('input', this.format(new Date()))
      }
      this.$nextTick(function () {
        picker.show(this.value, this.setValue)
      })
    },
    methods: {
      showDatePicker: function () {
        picker.show(this.value, this.setValue)
      },
      format: function (d) {
        return d.getFullYear() + '-' + String(d.getMonth() + 1).replace(/^(\d)$/, '0$1') +
          '-' + String(d.getDate()).replace(/^(\d)$/, '0$1')
      },
      setValue: function (val) {
        this.$emit('input', val)
      }
    }
  })
})(Vue)
