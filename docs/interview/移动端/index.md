# 移动端
## 移动端适配原理和方案
```js
// Media Queries
@media only screen and (max-width: 374px) {

}
@media only screen and(min-width: 375px) and (max-width: 413px) {

}
@media only screen and (min-width: 414px) {

}
// flex

// rem + viewport
// viewport是固定的<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
!(function (d) {
  var c = d.document;
  var a = c.documentElement;
  var b = d.devicePixelRatio;
  var f;
  function e() {
    var h = a.getBoundingClientRect().width,
      g;
    if (b === 1) {
      h = 720;
    }
    if (h > 720) h = 720; //设置基准值的极限值
    g = h / 7.2;
    a.style.fontSize = g + "px";
  }
  if (b > 2) {
    b = 3;
  } else {
    if (b > 1) {
      b = 2;
    } else {
      b = 1;
    }
  }
  a.setAttribute("data-dpr", b);
  d.addEventListener(
    "resize",
    function () {
      clearTimeout(f);
      f = setTimeout(e, 200);
    },
    false
  );
  e();
})(window);

```
## 做过离线包吗？H5 离线包的原理？客户端根据什么拦截静态资源请求？

## JS Bridge 的原理？

## 怎么判断webview是否加载完成

## 怎么实现 App 头部和页面的背景渐变
