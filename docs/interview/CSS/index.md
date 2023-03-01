# css
## 盒模型
概念
>盒子模型的组成：content(元素内容) + padding(内边距) + border(边框) + margin(外边距)
CSS的和模型有两种：标准盒子模型和IE盒子模型
- 标准盒子模型：盒子实际总宽高=内容的宽高width\height（content）+ border + padding + margin
- IE盒子模型：盒子实际总宽高=内容的宽高width\height（content+border+padding）+ margin
如何设置盒模型
可以通过设置box-sizing的值来改变盒模型
- box-sizing: border-box为标准盒子模型
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

## CSS中可继承与不可继承的属性有哪些

## transition和animation的区别

## 对requestAnimationframe的理解
