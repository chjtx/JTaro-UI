import html from './toast.html'

export default function (message, duration) {
  var id = 'j_toast_' + Math.random().toString().substr(2)
  var h = html.replace('{{message}}', message).replace('{{id}}', id)
  duration = duration || 2000

  document.body.insertAdjacentHTML('beforeend', h)

  var div = document.getElementById(id)

  setTimeout(function () {
    div.classList.add('j-toast-show')
  }, 4)
  setTimeout(function () {
    div.classList.add('j-toast-hide')
    setTimeout(function () {
      div.parentNode.removeChild(div)
    }, 1200)
  }, duration + 200)
}
