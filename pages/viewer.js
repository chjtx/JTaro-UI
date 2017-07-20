/* global JRollViewer */
import '../components/body/body.js'
import header from './parts/sub-page-header.js'
import html from './viewer.html'
import 'node@jroll-viewer/jroll-viewer.js'

export default {
  template: html,
  components: {
    'DemoHeader': header
  },
  data: function () {
    return {
      images: [
        'http://www.chjtx.com/assets/images/wz01.jpg',
        'http://www.chjtx.com/assets/images/wz02.jpg',
        'http://www.chjtx.com/assets/images/wz03.jpg',
        'http://www.chjtx.com/assets/images/wz04.jpg',
        'http://www.chjtx.com/assets/images/wz05.jpg',
        'http://www.chjtx.com/assets/images/wz06.jpg'
      ]
    }
  },
  mounted: function () {
    new JRollViewer('.j-row-12')
  }
}
