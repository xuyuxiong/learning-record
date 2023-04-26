# HTML
## src和href的区别
- 作用结果不同：href用于在当前文档和引用资源之间确立联系；src用于替换当前内容；
- 浏览器解析方式不同：文档中添加href会识别该文档为CSS文件，会并行下载并且不会停止对当前文档的处理。当解析道src会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕。
- 请求资源类型不同：href表示超文本引用，用来建立当前元素和文档之间的链接，常用的有link、a；在请求 src 资源时会将其指向的资源下载并应用到文档中，常用的标签有img、script、iframe
## 对HTML语义化的理解
去掉页面样式或者加载失败的时候能够让页面呈现出清晰的结构。
语义化的好处
1. 没有CSS的情况下，页面也能够呈现出很好的内容结构、代码结构
2. 有利于SEO。利于被搜索引擎收录，便于爬虫程序来识别
3. 方便其他设备解析
4. 便于项目的开发维护，代码更具可读性。
## DOCTYPE(文档类型)的作用
它的目的是告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。
## script标签中defer和async的区别
script标签存在两个属性，defer和async，因此script标签的使用分为三种情况：
1. 没有async和defer属性，浏览器会立即加载和执行相应的脚本。也就是说读到就开始加载和执行，此举会阻塞后续文档的加载
2. 后续文档的加载和JS脚本的加载和执行是并行的。
3. 后续文档的加载和JS脚本的加载是并行的，执行要等到文档所有元素解析完成之后，DOMContentLoaded事件触发执行之前。
## 常用的meta标签有哪些
1. charset 用来描述HTML文档的编码类型
2. keywords 关键字
3. description 页面描述
4. refresh 页面重定向和刷新
5. 适配移动端
## 行内元素有哪些？块级元素有哪些？
行内元素：b、big、i、small、strong、a、span、sub、sup、button
块级元素：address、article、aside、audio、blockquote、canvas、dd、div、dl、fieldset、figcaption、figure、footer、form、h1、header、hgroup、hr、noscript、ol output p pre section table tfoot、ul video 
## 说一下Web Worker
Web Worker专门处理复杂计算的，从此让前端拥有后端的计算能力
离屏canvas绘图，提升绘图的渲染性能和使用体验
Web Worker限制:
1. Worker线程的运行环境中没有window全局对象，无法访问DOM对象
2. Worker只能获取到部分浏览器提供的API，如定时器、navigator、location、XMLHttpRequest
3. 每个线程运行在独立的环境中，需要通过postMessage、message事件机制来实现线程之间的通信
## HTML5的离线缓存怎么使用，它的工作原理
离线缓存指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在哟筽那个户与因特网连接时，更新用户机器上的缓存文件。
原理：HTML5的离线存储是一个基于一个新建的.appcache文件的缓存机制，通过这个文件上的解析清单离线存储资源，这些资源就会想cookie一样被存储下来，当网络处在离线状态时，浏览器会通过离线存储的数据进行页面展示。
使用方法：
1. 创建一个同名的mainfest文件，在页面头部加入mainfest属性< html lang="en" manifest="index.manifest"> </ html>
2. 在cache.manifest文件中编写需要离线存储的资源
CACHE MANIFEST #v0.11 CACHE: js//app.js css/style.css NETWORK: resourse/logo.png FALLBACK://offline.html
## iframe的优点和缺点
优点：
1. iframe能够原封不动的把嵌入的网页展现出来。
2. 如果有多个网页引入iframe，那么只需要修改iframe的内容，就可以实现调用每一个页面内容的更改。
3. 如果遇到加载缓慢的第三方内容如图标和广告，可以由iframe来解决。
缺点：
1. 会产生很多页面，不容易管理
2. iframe框架结构优势会让人感到迷惑，可能会出现上下左右滚动条，用户体验差
3. 代码复杂无法被搜索引擎搜索到
4. 移动设备无法完全现实框架，设备兼容性差
5. 会增加服务器的http请求，对于大型网站不可取
## canvas和svg的区别

区别：
1. Canvas: 通过JS来绘制2D图形，是逐像素进行渲染的，位置发生改变，会重新进行绘制。
SVG：使用XML描述的2D图形的语言，DOM中的每个元素都是可用的。
2. SVG支持事件处理程序，canvas不支持
3. SVG属性改变时，浏览器可以重新呈现它
4. canvas可以很好的绘制像素，用于保存结果为png
5. canvas取决于像素，SVG与分辨率无关
6. SVg具有更好的文本渲染，而Canvas不能很好的渲染
7. 画布更适合渲染较小的区域，SVG渲染更好的更大区域