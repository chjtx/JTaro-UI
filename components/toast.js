import html from './toast.html'

function Toast (message, duration) {
  var id = 'j_toast_' + Math.random().toString().substr(2)
  var h = html.replace('{{message}}', message).replace('{{id}}', id)
  var _this = this
  duration = duration || 2000

  document.body.insertAdjacentHTML('beforeend', h)

  this.div = document.getElementById(id)

  setTimeout(function () {
    _this.div.classList.add('j-toast-show')
  }, 4)

  if (duration > -1) {
    setTimeout(function () {
      _this.destroy()
    }, duration + 200)
  }
}

Toast.prototype.destroy = function () {
  var _this = this
  if (this.div) {
    this.div.classList.add('j-toast-hide')
    setTimeout(function () {
      _this.div.parentNode.removeChild(_this.div)
      _this.div = null
    }, 1200)
  }
}

export default Toast
