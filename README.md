# JTaro UI

## 颜色

## 字体图标

## 栅格

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
<j-button :action="bindMethodByYourself" width="42" height="42" type="theme" round="1">按钮</j-button>
```

属性

| 名称 | 默认值 | 说明 |
| :--: | :--: | :--- |
| :action | | 父作用域methods里的一个方法，点击该按钮时触发 |
| width | auto | 按钮宽度 |
| height | 36px | 按钮高度 |
| type | | 按钮类型，可选:<br>1、默认普通类型<br>2、`text` 文本类型<br>3、`theme` 与主题一致<br>4、`red` 红<br>5、`green` 绿<br>6、`blue` 蓝<br>7、`yellow` 黄<br>8、`disabled` 不可用 |
| round | | 是否为圆形按钮，对应`.j-click-round-button` |

以上属性都可以使用`v-bind`动态修改