import '../components/number/number.js'
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './number.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      'value': 1,
      'value2': 0,
      'value3': 9,
      'total': 19
    }
  },
  methods: {
    action: function (value, sign) {
      console.log(value, sign)
      if (sign === '-') {
        this.total = this.value + this.value2 + this.value3
      }
    },
    calculate: function (value) {
      this.total = this.value + this.value2 + this.value3
    },
    addShoppingCar: function () {
      this.total = this.value + this.value2 + this.value3
    }
  }
}
