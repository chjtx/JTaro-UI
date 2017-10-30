# JTaro UI

为JTaro定做的UI库，依赖JRoll，但不依赖JTaro

## 先睹为快

<img width="160" height="160" src="http://www.chjtx.com/assets/images/jtaro-ui-qrcode.png">

http://www.chjtx.com/JTaro-UI/build/

## 开始使用

一个比较通用的`index.html`模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <title>JTaro UI</title>
    <link rel="stylesheet" href="./src/jtaro-ui.css">
    <link rel="stylesheet" href="./src/jtaro-ui-iconfont.css">
    <link rel="stylesheet" id="jtaro_ui_theme" href="./src/jtaro-ui-theme-default.css">
    <script src="./node_modules/jtaro-module/src/client.js"></script>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script src="./node_modules/jroll/src/jroll.js"></script>
    <script src="./src/jtaro-ui.js"></script>
</head>
<body>
    <div id="jtaro_app"></div>
    <script src="./node_modules/jtaro/dist/jtaro.js"></script>
    <script>
       Vue.use(JTaro, {
           default: 'pages/home'
       })
    </script>
</body>
</html>
```

- `jtaro-ui.js`依赖JRoll，因此需要放在`jroll.js`后面

## 主题颜色

参考 [material design color](https://material.io/guidelines/style/color.html#color-color-palette)

复制`src/jtaro-ui-theme-default.css`，将里面的主题颜色修改成自己的颜色

动态修改主题，只需要将主题样式的`link`的`href`修改为自己主题样式文件的路径

```js
document.getElementById('jtaro_ui_theme').href = './jtaro-ui-theme-yours.css'
```

## 字体图标

到[阿里巴巴矢量图标库](http://www.iconfont.cn/)下载图标

修改`src/jtaro-ui-iconfont.css`里的字体图标内容，例：

```css
.j-icon-menu:before { content: "\e601"; }
.j-icon-github:before { content: "\e6c5"; }
```

与阿里图标库写法有点区别

```css
/* icon */
[class*="j-icon-"],
.j-icon {
    font-family: "jtaro-ui" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

JTaro UI 使用了`[class*="j-icon-"]`对字体进行定义，因此只需要一个class

```html
<!-- 阿里图标库调用示例 -->
<i class="icon-font icon-font-xxx"></i>

<!-- JTaro UI 调用示例 -->
<i class="j-icon-xxx"></i>
```

## 栅格

分12列和10列两类，`j-row-[10/12]`表示行，`j-col-[1-10/1-12]`表示列

```html
<!-- 10 列 -->
<div class="j-row-10">
  <div class="j-col-1"></div>
  <div class="j-col-2"></div>
  <div class="j-col-3"></div>
  <div class="j-col-4"></div>
</div>
```

```html
<!-- 12 列 -->
<div class="j-row-12">
  <div class="j-col-3"></div>
  <div class="j-col-4"></div>
  <div class="j-col-5"></div>
</div>
```

## 点击涟漪效果

添加`.j-click-button`样式类，普通效果，扩散点在点击位置

添加`.j-click-round-button`样式类，圆形按钮效果，扩散点在元素中心

## 组件

### j-appbar

```html
<j-appbar title="居中标题">
  <j-button slot="left">菜单</j-button>
  <j-button slot="right">消息</j-button>
</j-appbar>
```

### j-button

```html
<j-button @action="bindMethodByYourself" width="42" height="42" type="theme" round>按钮</j-button>
```

属性

| 名称 | 默认值 | 说明 |
| :--: | :--: | :--- |
| @action | | 父作用域methods里的一个方法，点击该按钮时触发 |
| width | auto | 按钮宽度 |
| height | 36px | 按钮高度 |
| type | | 按钮类型，可选:<br>1、默认普通类型<br>2、`text` 文本类型<br>3、`theme` 与主题一致<br>4、`red` 红<br>5、`green` 绿<br>6、`blue` 蓝<br>7、`yellow` 黄<br>8、`disabled` 不可用 |
| round | false | 是否为圆形按钮，对应`.j-click-round-button` |

以上属性都可以使用`v-bind`动态修改

### j-body

自动提供JRoll滑动，默认top:44px，可自行通过style修改

```html
<j-body :options="jrollOptions">
  <div>文章内容</div>
</j-body>
```

属性

| 名称 | 默认值 | 说明 |
| :--: | :--: | :--- |
| :options | null | 提供给JRoll创建实例时使用的选项 |
| outer-bg |  | 外围div的背景色，即JRoll的wrapper元素的背景色 |
| inner-bg |  | 内围div的背景色，即JRoll的scroller元素的背景色 |

### j-mask

遮罩组件

```html
<j-mask :show="show" @action="bindMethodByYourself">
  <div>自定义内容</div>
</j-mask>
```

属性

| 名称 | 默认值 | 说明 |
| :--: | :--: | :--- |
| @action | null | 点击遮罩触发的动作 |
| :show | false | 是否显示 |

### j-sidebar

```html
<j-sidebar :show="show" @action="toggleSideBar" side="right">
  <div>内容</div>
</j-sidebar>
```

属性

| 名称 | 默认值 | 说明 |
| :--: | :--: | :--- |
| @action | null | 点击遮罩触发的动作 |
| :show | false | 是否显示 |
| side | left | 在哪边显示，左或右，可选`left`、`right` |
| width | 80% | 宽度 |
| bg | #FFF | 背景色 |

### j-dialog

```html
<j-dialog :show="show" @action="clickDialog" :buttons="buttons">
  <div slot="title">弹窗标题</div>
  <div slot="content">对话框内容对话框内容对话框内容对话框内容对话框内容</div>
</j-dialog>
```

属性

| 名称 | 默认值 | 说明 |
| :--: | :--: | :--- |
| @action | null | 点击按钮或遮罩触发的动作，按钮的索引值（从0开始）传进该动作方法，如果点击的是遮罩，则为`-1` |
| :show | false | 是否显示 |
| :buttons | [] | 按钮，最多允许三个，例：`['取消', '确定']` |

### Toast

```js
import Toast from './components/toast.js'

// 默认2000ms后自动消失
new Toast('默认2秒后消失')

// 设置1000ms后自动消失
new Toast('默认2秒后消失', 1000)

// 第二个参数为-1时不会自动消失
var toast = new Toast('不会自动消失', -1)

// 调用destroy方法手动消灭它
toast.destroy()
```

### Loader

```js
import Loader from './components/loader.js'

// 默认用法：
var loader = new Loader();

//可选参数（以下为默认值）
var loader = new Loader({
  "autoShow" : true,  //马上显示
  "target" : document.body, //在哪个dom里显示
  "text" : '载入中，请稍候...',  //显示的文字
  "cancel" : null,  //关闭按钮，为null时不显示，为function时显示，点击关闭即执行function
  "color" : 'rgba(255, 255, 255, 1)', //文本颜色
  "boxBg" : 'rgba(0, 0, 0, .75)', //loading框颜色
  "wrapBg": 'rgba(0, 0, 0, .2)',  //背景颜色
  "zIndex": 9999  //z-index属性
});

/* 提供三个方法
1、显示 loader.show();
2、隐藏 loader.hide();
3、销毁 loader.destroy();
*/
```

### j-input

默认宽度为100%

```html
<j-input v-model="value" placeholder="提示文字" label="多行输入"
  rows="3" rowsMax="6" labelFloat multiLine disabled
  @input="inputEvent"
  @change="changeEvent"
  @focus="focusEvent"
  @blur="blurEvent"/>
```

### j-switch

```html
<j-switch label="开关" v-model="value" disabled labelLeft/>
```

### j-select

支持单选、多选、可省略value

multiple 为多选标记，多选时value为数组，请保证数组里每一项都为字符串

```html
<!-- 单选 -->
<j-select v-model="value">
  <j-options value="1">选项一</j-options>
  <j-options value="2">选项二</j-options>
  <j-options value="3">选项三</j-options>
</j-select>

<script>
  return {
    value: '1'
  }
</script>
```

```html
<!-- 多选 -->
<j-select v-model="value" multiple>
  <j-options value="1">选项一</j-options>
  <j-options value="2">选项二</j-options>
  <j-options value="3">选项三</j-options>
</j-select>

<script>
  return {
    value: ['1']
  }
</script>
```

省略value

```html
<j-select v-model="value">
  <j-options>选项一</j-options>
  <j-options>选项二</j-options>
  <j-options>选项三</j-options>
</j-select>
```

### j-radio

相同`v-model`为一组

`v-model`的值为字符串

```html
<j-radio label="选项 1" v-model="value" val="1" disabled/>
<j-radio label="选项 2" v-model="value" val="2" />
```

### j-checkbox

相同`v-model`为一组

`v-model`的值为数组，数组元素为字符串

```html
<j-checkbox label="选项 1" v-model="value" val="1" disabled/>
<j-checkbox label="选项 2" v-model="value" val="2" />
```

### j-number

加减器

```html
<j-number v-model="value" max="20" min="10" throw-in="#shopping_car" @action="action" @calculate="calculate" no-calculate/>

<script>
export default {
  methods: {
    action(value, sign) {
      console.log(value, sign) // 1, '+'
    },
    calculate(value) {

    }
  }
}
</script>
```

属性

| 名称 | 默认值 | 必填 | 说明 |
| :--: | :--: | :--:| :--- |
| v-model | -- | Y | 相当于表单的value，不能为空数组|
| max | 99 | N | 最大值 |
| min | 0 | N | 最小值 |
| no-calculate | false | N | 设为`true`将不能调出计数器 |
| type | 0 | N | 按钮主题：<br>`0` 圆形，默认<br>`1` 圆角矩形 |
| throw-in | -- | N | 小圆点投进的目标（购物车），可以是字符串或dom元素 |
| @action | -- | N | 点击加减按钮触发，回传数值和操作符（-|+） |
| @calculate | -- | N | 在计数器输入值时触发 |

### j-picker

属性

| 名称 | 默认值 | 必填 | 说明 |
| :--: | :--: | :--:| :--- |
| v-model | -- | Y | 相当于表单的value，不能为空数组|
| :val | -- | Y | 数据 |
| :number | -- | Y | 要显示的列数 |
| show | false | N | 是否默认显示选择器 |

```html
<j-picker v-model="value" :val="address" :number="3"/>{{value[0] + '/' + value[1] + '/' + value[2]}}</j-picker>

<script>
export default {
  data: function () {
    return {
      value: ['广东', '广州', '天河'],
      address: [{
        name: '广东',
        children: [{
          name: '广州',
          children: [{
            name: '天河'
          }]
        }]
      }]
    }
  }
}
</script>
```

### j-slider

```html
<j-slider v-model="value" max="10"/>

<j-slider v-model="value" disabled/>
```

### j-sheet

```html
<j-sheet @action="fun" :show="show" :menus="menus"/>
```

```js
export default {
  data: function () {
    return {
      show: false,
      menus: ['操作一', '操作二']
    }
  },
  methods: {
    fun: function (index) {
      switch (index) {
        case -1: this.clickMask()
          break
        case 0: this.action1()
          break
        case 1: this.action2()
      }
    },
    clickMask: function () {
      // 点击了遮罩层
    },
    action1: function () {
      // 点击了按钮一
    },
    action2: function () {
      // 点击了按钮一
    }
  }
}
```

### j-datepicker

value的值为字符串，可为空字符串`''`或`yyyy-mm-dd`格式的字符串，例：`2017-07-13`

yyyy的值最小为1950，最大为2050

```html
<j-datepicker v-model="value" />
```

### j-timepicker

```html
<j-timepicker v-model="value" />
```

### 下拉刷新

[https://github.com/chjtx/JRoll/tree/master/extends/jroll-pulldown](https://github.com/chjtx/JRoll/tree/master/extends/jroll-pulldown)

### 上拉加载

[https://github.com/chjtx/JRoll/tree/master/extends/jroll-vue-infinite](https://github.com/chjtx/JRoll/tree/master/extends/jroll-vue-infinite)

