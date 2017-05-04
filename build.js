var jtaroBundle = require('jtaro-bundle')
var uglify = require('rollup-plugin-uglify')

jtaroBundle.bundle({
  origin: 'index.html',  // 开发目录的index.html
  target: 'build/index.html',  // 生产目录的index.html
  copies: ['src/'],  // 直接拷贝的文件（夹）
  rollupPlugins: [uglify()]
})

console.log('build complete!')
