/**
 * 一键创建pages页面、components页面
 * 用法 node ./tools/new.js yourpagename
 */

const fs = require('fs')
const path = require('path')
const name = process.argv[2]

if (!name) {
  console.error('请提供文件（夹）名称')
  process.exit()
}

// page页面html模板内容
var pHtml = `<style>
  .demo-body {
    padding: 15px;
  }
</style>
<div>
  <DemoHeader title="选择器" />

  <j-body class="demo-body">

  </j-body>
</div>
`

// page页面js模板内容
var pJs = `import '../components/${name}/${name}.js'
import '../components/body.js'
import header from './parts/sub-page-header.js'
import html from './${name}.html'

export default {
  template: html,
  components: {
    'DemoHeader': header
  }
}
`

var cHtml = `<style>
this {

}
</style>
<div>

</div>
`

var cJs = `/* global Vue */
import html from './${name}.html'

(function (v) {
  v.component('j-${name}', {
    props: {},
    template: html
  })
})(Vue)
`

function writeFileAsync (dir, filename, content, ext) {
  var dirname = path.resolve(__dirname, dir)
  // 如果目录不存在，先创建
  try {
    if (!fs.statSync(dirname).isDirectory()) {
      fs.mkdirSync(dirname)
    }
  } catch (e) {
    fs.mkdirSync(dirname)
  }

  fs.writeFile(path.resolve(dirname, filename), content, (err) => {
    if (err) throw err
    console.log(`已生成 ${dir}/${name}.${ext}`)
  })
}

// 创建page html页面
writeFileAsync(`../pages`, `./${name}.html`, pHtml, 'html')

// 创建page js页面
writeFileAsync(`../pages`, `./${name}.js`, pJs, 'js')

// 创建component html页面
writeFileAsync(`../components/${name}`, `./${name}.html`, cHtml, 'html')

// 创建component js页面
writeFileAsync(`../components/${name}`, `./${name}.js`, cJs, 'js')
