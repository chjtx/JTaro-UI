/* global Vue */
import html from './timepicker.html'
import picker from './timepicker.set.js'

(function (v) {
  v.component('j-timepicker', {
    props: {
      'value': String
    },
    template: html,
    mounted: function () {
      // 如果传过来的值为空，初始化为当天日期
      if (this.value === '') {
        this.$emit('input', this.format(new Date()))
      }
    },
    methods: {
      showTimePicker: function () {
        picker.show(this.value, this.setValue)
      },
      format: function (d) {
        return String(d.getHours()).replace(/^(\d)$/, '0$1') +
          ':' + String(d.getMinutes()).replace(/^(\d)$/, '0$1')
      },
      setValue: function (val) {
        this.$emit('input', val)
      }
    }
  })
})(Vue)
