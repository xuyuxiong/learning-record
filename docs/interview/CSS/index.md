# css
## 盒模型
概念
>盒子模型的组成：content(元素内容) + padding(内边距) + border(边框) + margin(外边距)
CSS的和模型有两种：标准盒子模型和IE盒子模型
- 标准盒子模型：盒子实际总宽高=内容的宽高width\height（content）+ border + padding + margin
- IE盒子模型：盒子实际总宽高=内容的宽高width\height（content+border+padding）+ margin
如何设置盒模型
可以通过设置box-sizing的值来改变盒模型
- box-sizing: content-box为标准盒子模型
- box-sizing: border-box为IE盒模型
box-sizing的应用场景在于是否想让子元素因为padding和border溢出
## BFC&块级格式化上下文
概念
一个独立的渲染区域，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。
触发条件
- position: absolute/fixed
- display: inline-block / table / flex
- float 设置除none以外的值
- overflow ！== visible
规则
- 属于同一个BFC的相邻Box垂直排列
- 属于同一个BFC的相邻Box的margin会发生外边距重叠
- BFC在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然
- 计算BFC的高度时，浮动子元素也参与计算
特性和应用
- 阻止margin重叠
- 清除浮动：清除内部浮动
- 自适应两栏布局：左float + 右BFC，利用了BFC的区域不会与float的元素区域重叠的机制
外边距重叠
- z-index(层叠上下文)
触发条件
- 根层叠上下文(html)
- position非static
- CSS3新属性
flex、transform、opacity、filter、will-change、webkit-overflow-scrolling
- 层叠等级：层叠上下文在z轴上的排序
background/border < z-index为负值 < 块级元素 < 浮动元素 < 行内元素 < z-index: 0/auto < z-index为正值
## 浮动
浮动会造成什么
- 父元素高度塌陷
- 与浮动元素同级的非浮动元素会填补原有位置
如何清除浮动的影响
- 给父元素设置高度
- 在浮动元素后面添加clear：both 或者 br 标签
- 给父元素添加overflow：hidden
- 使用：after在父元素末尾加一个点：并添加clear：both属性
水平居中
- 行内元素，给其父元素设置text-align:center
- 定宽块级元素，该元素设置margin:0 auto
- 定宽块级元素，还可以用绝对定位设置和left:50%;加margin-left:-1/2宽度；
- 不定宽块级元素，设置父元素为flex布局，子元素设置margin:0 auto即可
- 不定宽块级元素，设置父元素为flex布局，且设置justify-content: center;
- 不定宽块级元素，设置父元素为position: relative;子元素position: absulote;left: 50%;transform: translateX(-50%);
## flex
[flex布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
[CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
- 通常被称为flexbox，flex是弹性布局，是CSS3的一种布局方式，给子元素提供了空间分布和对齐能力。它由（Flex Container容器/Flex item项目成员）构成。
- flex布局的元素称为Flex Container容器，它的所有子元素都是Flex item项目成员；
- 容器有两个轴线排列，水平轴和垂直轴，默认为水平轴排列；
## 伪类和伪元素
> css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素都是用来修饰不在文档树中的部分
伪类
> 伪类存在的意义是为了通过选择器找到那些不存在DOM树中的信息以及不能被常规CSS选择器获取到的信息
> 伪元素用于创建一些不在文档树中的元素，并为其添加样式。
比如说，我们可以通过:before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。
常见的伪元素有：::before，::after，::first-line，::first-letter，::selection、::placeholder等
## CSS选择器及其优先级
!important的优先级是最高的
id选择器（#myid）
类选择器（.myclassname）
标签选择器（div,h1,p）
子选择器（ul<li）
后代选择器（lia）
伪类选择（a:hover,li:nth-child）
## CSS中可继承与不可继承的属性有哪些
可继承：字体系列属性
不可继承：盒子模型的属性、背景属性、定位属性
## transition和animation的区别
1. transition强调过渡；animation强调流程与控制
2. 两者控制的粒度不一样。transition更加粗一些，比如过渡的速度进行了封装，animation提供的keyframe方法可以让你指定每个阶段的属性。
3. 动画状态：transition只有两个状态：开始和结束状态；animation有帧的概念
4. 触发方式：transition需要借助CSS状态选择器或JS来触发
5. animation控制动效上要比transition强
6. 动画实现的范围：并不是所有的CSS属性都具有transition过渡效果
7. 动画实现方式：animation离不开@keyframes
## 对requestAnimationframe的理解
requestAnimationframe是HTML5提供的一个叫做请求动画帧的API，它根据系统渲染屏幕的时间来调用回调函数，如果系统绘制频率是60Hz,那么回调函数就会16.7ms执行一次；在运行时浏览器会自动优化方法的调用，如果页面不是激活状态下，动画会自动暂停，有效节省了CPU开销。
## CSS实现一个正三角形
```css
.triangle {
  width: 0;
  height: 0;
  border-color: transparent;
  border-width: 0 50px 50px 50px;
  border-top-color: skyblue;
}
```
##  css div垂直居中，并完成div高度永远是宽度的一半(宽度可以不指定)
```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        width: 100%;
        height: 100%;
      }

      .outer {
        width: 400px;
        height: 100%;
        background: blue;
        margin: 0 auto;

        display: flex;
        align-items: center;
      }

      .inner {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 50%;
        background: red;
      }

      .box {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner">
        <div class="box">hello</div>
      </div>
    </div>
  </body>
</html>
```
## 两栏布局的方式
```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        height: 500px;
      }

      .aside {
        width: 300px;
        float: left;
        background: yellow;
      }

      .main {
        background: aqua;
        margin-left: 300px;
      }
    </style>
  </head>
  <body>
    <div class="aside"></div>
    <div class="main"></div>
  </body>
</html>

// flex实现
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* div {
        height: 500px;
      } */

      /* .box {
        overflow: hidden;
      } */

      /* .container {
        padding: 0 300px 0 200px;
        border: 1px solid black;
      } */

      html,
      body {
        height: 100%;
      }

      div {
        height: 100%;
      }

      .container {
        display: flex;
      }

      .content {
        flex: 1 1;
        order: 2;
        background: #f00;
      }

      .left {
        flex: 0 0 200px;
        background: #0f0;
      }

      .right {
        flex: 1 1;
        background: #00f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">你好</div>
      <div class="right">我好</div>
    </div>
  </body>
</html>
```
## BFC与IFC区别
- 内部的box会水平放置
- 水平的间距由margin、padding、border决定
## 如何画一条.5像素的边框
[链接](https://juejin.cn/post/6844903582370643975)
## BFC的原理和作用
[BFC](https://blog.csdn.net/DFF1993/article/details/80394150)
## parent元素宽高不定，实现scale固定宽高比始终为4：3

## CSS垂直居中的方案
[12中方式](https://juejin.cn/post/6844903550909153287)
## 伪元素和伪类的区别
[区别](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)
## 响应式布局
[响应式布局](https://juejin.cn/post/6844903814332432397)
## 三栏布局方案

## 如何提高动画的渲染性能
[这样使用GPU动画](https://www.w3cplus.com/animation/gpu-animation-doing-it-right.html)

## 两种以上方式实现已知或者未知宽度的垂直水平居中
```css
.wrapper {
  display: table;
  .box {
    display: table-cell;
    verticle-align: middle;
  }
}
.wrapper {
  position: relative;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .box {

  }
}
```

## css 的伪类和伪元素有哪些？有什么区别？
1）伪类(pseudo-classes)

其核⼼就是⽤来选择DOM树之外的信息,不能够被普通选择器选择的⽂档之外的元素，⽤来添加⼀些选择器的特殊效果。
⽐如:hover :active :visited :link :visited :first-child :focus :lang等
由于状态的变化是⾮静态的，所以元素达到⼀个特定状态时，它可能得到⼀个伪类的样式；当状态改变时，它⼜会失去这个样式。
由此可以看出，它的功能和class有些类似，但它是基于⽂档之外的抽象，所以叫 伪类。
2）伪元素(Pseudo-elements)

DOM树没有定义的虚拟元素
核⼼就是需要创建通常不存在于⽂档中的元素，
⽐如::before ::after 它选择的是元素指定内容，表示选择元素内容的之前内容或之后内容。
伪元素控制的内容和元素是没有差别的，但是它本身只是基于元素的抽象，并不存在于⽂档中，所以称为伪元素。⽤于将特殊的效果添加到某些选择器
2）伪类与伪元素的区别

表示⽅法

CSS2 中伪类、伪元素都是以单冒号:表示,
CSS2.1 后规定伪类⽤单冒号表示,伪元素⽤双冒号::表示，
浏览器同样接受 CSS2 时代已经存在的伪元素(:before, :after, :first�line, :first-letter 等)的单冒号写法。
CSS2 之后所有新增的伪元素(如::selection)，应该采⽤双冒号的写法。
CSS3中，伪类与伪元素在语法上也有所区别，伪元素修改为以::开头。浏览器对以:开头的伪元素也继续⽀持，但建议规范书写为::开头
定义不同

伪类即假的类，可以添加类来达到效果
伪元素即假元素，需要通过添加元素才能达到效果
总结:

伪类和伪元素都是⽤来表示⽂档树以外的"元素"。
伪类和伪元素分别⽤单冒号:和双冒号::来表示。
伪类和伪元素的区别，关键点在于如果没有伪元素(或伪类)，
是否需要添加元素才能达到效果，如果是则是伪元素，反之则是伪类。
4）相同之处：

伪类和伪元素都不出现在源⽂件和DOM树中。也就是说在html源⽂件中是看不到伪类和伪元素的。
不同之处：
伪类其实就是基于普通DOM元素⽽产⽣的不同状态，他是DOM元素的某⼀特征。
伪元素能够创建在DOM树中不存在的抽象对象，⽽且这些抽象对象是能够访问到的。
## 讲一下重绘和回流
[](https://juejin.cn/post/6844903779700047885)
## 怎么开启硬件加速
浏览器在处理下面的 css 的时候，会使用 GPU 渲染

transform（当 3D 变换的样式出现时会使用 GPU 加速）
opacity
filter
will-change

采用 transform: translateZ(0)
采用 transform: translate3d(0, 0, 0)
使用 CSS 的 will-change属性。 will-change 可以设置为opacity、transform、top、left、bottom、right。
## 如何让css元素左侧自动溢出
左侧宽度自动增长，右侧宽度自动增长并且不可溢出省略。当左侧文字长度超出的时候，左侧文字溢出省略。 在 css 有个 direction 属性，把文本方向设置为从右向左：direction: rtl
```css
/* css */
.footer {
  width: 300px;
  height: 20px;
  display: flex;
  overflow: hidden;
}
.left {
  background: #3cc8b4;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 50px;
}
.right {
  background: #9bc;
  max-width: 250px;
}
.right-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
```html
<div class="footer">
   <div class="left">
     leftleftleftleftleftleftleftleftleftleftleftleftleft
  </div>
  <div class="right">
    <div class="right-ellipsis">
      rightrightrightrightrightrightrightrightright
    </div>
  </div>
</div>
```