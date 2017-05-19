var jtaroBundle = require('jtaro-bundle')
var uglify = require('rollup-plugin-uglify')
var alias = require('rollup-plugin-paths')

jtaroBundle.bundle({
  origin: 'index.html',  // 开发目录的index.html
  target: 'build/index.html',  // 生产目录的index.html
  copies: ['src/'],  // 直接拷贝的文件（夹）
  rollupPlugins: [alias({
    'node@': './node_modules/' // 以入口文件所在路径为基准
  }), uglify()],
  sourceMap: false
})

console.log('build complete!')
