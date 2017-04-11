var alias = require('rollup-plugin-paths')
// var babel = require('rollup-plugin-babel')

module.exports = {
  website: '../../../../dev/', // 站点目录，以server.js所在路径为基准
  entry: '../../../../dev/main.js', // 入口文件，以server.js所在路径为基准
  plugins: [alias({
    'node@': '../node_modules/' // 以入口文件所在路径为基准
  }
//   , babel({
//     include: '**/a.js',
//     'presets': [
//       [
//         'es2015',
//         {
//           'modules': false
//         }
//       ]
//     ]
//   }
  )]
}
