/*
 * create by BarZu 2017-04-28
 *
 * 默认用法：var loader = new Loader();
 *
 * 可选参数
 * var loader = new Loader({
 *			"autoShow" : true,					//马上显示
 *			"target" : document.body,			//在哪个dom里显示
 *			"text" : '载入中，请稍候...',			//显示的文字
 *			"cancel" : null,					//关闭按钮，为null时不显示，为function时显示，点击关闭即执行function
 *			"color" : 'rgba(255, 255, 255, 1)',	//文本颜色
 *			"boxBg" : 'rgba(0, 0, 0, .75)',		//loading框颜色
 *			"wrapBg": 'rgba(0, 0, 0, .2)',		//背景颜色
 *			"zIndex": 9999						//z-index属性
 * });
 *
 * 提供三个方法
 * 1、显示 loader.show();
 * 2、隐藏 loader.hide();
 * 3、销毁 loader.destroy();
 */

// import './loader.html'

function Loader (options) {
  // 默认配置
  this.options = {
    'autoShow': true,
    'target': document.body,
    'text': '载入中，请稍候...',
    'cancel': null,
    'color': 'rgba(255, 255, 255, 1)',
    'boxBg': 'rgba(0, 0, 0, .75)',
    'wrapBg': 'rgba(0, 0, 0, .2)',
    'zIndex': 9999
  }

  if (options === Object(options)) {
    for (var i in options) {
      this.options[i] = options[i]
    }
  }

  if (typeof this.options.target === 'string') {
    this.options.target = document.querySelector(this.options.target)
  }

  this._setStyle()
  this._init()
}

// 添加样式
Loader.prototype._setStyle = function () {
  if (!document.getElementById('__j_loader_style')) {
    var s = document.createElement('style')
    s.id = '__j_loader_style'
    s.innerHTML = '.j-loader-hidden{display:none!important;}.j-loader-wrap{position:absolute;top:0;left:0;right:0;bottom:0;z-index:9999}.j-loader-box{background:rgba(0,0,0,.8);border-radius:4px;padding:15px;position:absolute;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);top:50%;max-width:60%}.j-loader-box p{text-align:center;color:#fff;padding-top:10px;margin:0;font-size:14px}.j-loader-loading{width:32px;height:32px;margin:0 auto;position:relative;color:#fff;-webkit-animation:j-loader 1.1s infinite step-start;animation:j-loader 1.1s infinite step-start}.j-loader-loading span{width:3px;height:8px;display:block;position:absolute;top:0;left:15px;background:#fff;border-radius:3px;-webkit-transform-origin:1px 16px;transform-origin:1px 16px}@-webkit-keyframes j-loader{0%,100%{-webkit-transform:rotateZ(0deg)}91.6%{-webkit-transform:rotateZ(-30deg)}83.3%{-webkit-transform:rotateZ(-60deg)}75%{-webkit-transform:rotateZ(-90deg)}66.6%{-webkit-transform:rotateZ(-120deg)}58.3%{-webkit-transform:rotateZ(-150deg)}50%{-webkit-transform:rotateZ(-180deg)}41.6%{-webkit-transform:rotateZ(-210deg)}33.3%{-webkit-transform:rotateZ(-240deg)}25%{-webkit-transform:rotateZ(-270deg)}16.6%{-webkit-transform:rotateZ(-300deg)}8.3%{-webkit-transform:rotateZ(-330deg)}}@keyframes j-loader{0%,100%{transform:rotateZ(0deg)}91.6%{transform:rotateZ(-30deg)}83.3%{transform:rotateZ(-60deg)}75%{transform:rotateZ(-90deg)}66.6%{transform:rotateZ(-120deg)}58.3%{transform:rotateZ(-150deg)}50%{transform:rotateZ(-180deg)}41.6%{transform:rotateZ(-210deg)}33.3%{transform:rotateZ(-240deg)}25%{transform:rotateZ(-270deg)}16.6%{transform:rotateZ(-300deg)}8.3%{transform:rotateZ(-330deg)}}.j-loader-close{box-sizing:border-box;position:absolute;width:24px;height:24px;background:rgba(0,0,0,.75);border:5px solid transparent;border-radius:100%;right:-12px;top:-12px;-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.j-loader-close:before{content:"";height:2px;width:100%;background:#fff;display:block;position:absolute;top:6px;left:0;border-radius:2px}.j-loader-close:after{content:"";height:100%;width:2px;background:#fff;display:block;position:absolute;top:0;left:6px;border-radius:2px}'

    document.head.appendChild(s)
  }
}

Loader.prototype._init = function () {
  this.loader = document.createElement('div')
  var box = document.createElement('div')
  var close = document.createElement('div')
  var target = this.options.target
  var span = ''
  var color = /rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/.exec(this.options.color)
  var rgb
  var style
  var html
  var css = [{
    opacity: 1,
    rotate: 0
  }, {
    opacity: 0.4,
    rotate: 30
  }, {
    opacity: 0.4,
    rotate: 60
  }, {
    opacity: 0.4,
    rotate: 90
  }, {
    opacity: 0.4,
    rotate: 120
  }, {
    opacity: 0.4,
    rotate: 150
  }, {
    opacity: 0.4,
    rotate: 180
  }, {
    opacity: 0.5,
    rotate: 210
  }, {
    opacity: 0.6,
    rotate: 240
  }, {
    opacity: 0.7,
    rotate: 270
  }, {
    opacity: 0.8,
    rotate: 300
  }, {
    opacity: 0.9,
    rotate: 330
  }]

  if (color) {
    rgb = color[1] + ',' + color[2] + ',' + color[3]
  } else {
    rgb = this.options.color
  }

  for (var i = 0; i < 12; i++) {
    if (color) {
      style = 'background: rgba(' + rgb + ', ' + css[i].opacity + ');'
    } else {
      style = 'background: ' + rgb + ';opacity: ' + css[i].opacity + ';'
    }
    style += '-webkit-transform:rotateZ(' + css[i].rotate + 'deg);transform:rotateZ(' + css[i].rotate + 'deg);'
    span += "<span style='" + style + "'></span>"
  }

  // box div
  box.className = 'j-loader-box'
  box.style.background = this.options.boxBg

  html = "<div class='j-loader-loading'>"
  html += span
  html += '</div>'
  if (this.options.text !== '') {
    html += "<p style='color:" + this.options.color + "'>" + this.options.text + '</p>'
  }
  box.innerHTML = html

  // 关闭按钮 close div
  if (typeof this.options.cancel === 'function') {
    close.className = 'j-loader-close'
    close.onclick = this.options.cancel.bind(this)
    box.appendChild(close)
  }

  // loader div
  this.loader.className = 'j-loader-wrap j-loader-hidden'
  this.loader.style.background = this.options.wrapBg
  this.loader.style.zIndex = this.options.zIndex
  this.loader.appendChild(box)

  // 如果目标窗口为body，position设置为fixed
  if (target.tagName === 'BODY') {
    this.loader.style.position = 'fixed'
  }

  // 如果目标窗口的position为static修改为relative
  if (window.getComputedStyle(target).position === 'static') {
    target.style.position = 'relative'
  }

  if (target.children[0]) {
    target.insertBefore(this.loader, target.children[0])
  } else {
    target.appendChild(this.loader)
  }

  if (this.options.autoShow) {
    this.show()
  }
}

// 显示
Loader.prototype.show = function () {
  if (this.loader) {
    this.loader.classList.remove('j-loader-hidden')
  }
}

// 隐藏
Loader.prototype.hide = function () {
  if (this.loader) {
    this.loader.classList.add('j-loader-hidden')
  }
}

// 销毁
Loader.prototype.destroy = function () {
  if (this.loader) {
    this.options.target.removeChild(this.loader)
    this.loader = null
  }
}

export default Loader
