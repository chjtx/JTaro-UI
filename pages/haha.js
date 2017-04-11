import '../components/button.js'
export default {
  template: '<div><j-button :action="gotoHome">haha按钮</j-button></div>',
  methods: {
    gotoHome: function () {
      this.go('pages/home')
    }
  }
}
