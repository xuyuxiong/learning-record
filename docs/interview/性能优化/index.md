# 性能优化

## CDN的概念
[](http://bk.ynfyd.com/?id=290)
## CDN的作用/原理

## CDN的使用场景

## 懒加载的概念、特点

## 懒加载的实现原理

## 懒加载与预加载的区别

## 如何避免回流与重绘

## 如何优化动画
- will-change 属性：在浏览器执行动画之前，提前告诉浏览器，此处需要 GPU 加速，提高显示效果，但动画结束后要及时去除这个属性。
- translate3d 进行 GPU 加速。
- requestAnimationFrame API
## 如何提高webpack的打包速度

## 如何减少webpack打包体积

## 如何提高webpack构建速度

## 优化途径
- 重定向优化
避免重定向
- DNS、TCP优化
预解析、使用preconnect时，同时也使用dns-prefetch作为兼容手段，或者凸显关键资源
- 请求优化
减少HTTP请求数量、多个压缩成一个；使用HTTP2，头部压缩；减少cookie大小，http请求会携带cookie
- DOM、CSS解析优化
CSS放在头部、优化CSS的选择器结构；JS放在尾部，或者标注defer、async避免阻塞解析；精简DOM结构；
- 渲染优化
减少DOM操作的次数，减少重绘、减少重排；减少DOM数量，大数据量分野，虚拟列表；使用GPU加速，比如transforms和opacity两个属性；尽量使用requestAnimationFrame来实现视觉变化；使用
loading图
- 三方资源、图片优化
第三方资源、库使用CDN；压缩图片体积，减少图片大小；图片懒加载，使用IntersectionObserver或者监听scroll滚动的距离；图片使用webp格式，体积jpg小； 去掉图片中metadata；使用preload预先加载CSS文件或者JS文件；HTTP2服务端推送
- 其余的性能优化
合理使用协商缓存；善于使用事件委托；避免死循环；慎用闭包、全局状态；使用Web Workers处理纯数据，或者与浏览器UI无关的长时间运行脚本；灵活使用防抖节流