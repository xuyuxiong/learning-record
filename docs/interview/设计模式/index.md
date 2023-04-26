# 设计模式
[图解设计模式](https://mp.weixin.qq.com/s/v8QRqjDrc7m0P3npigG_4Q)
## 发布/订阅和观察模式的区别是什么
[](https://blog.csdn.net/weixin_44786530/article/details/127091896)
观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新
## 装饰器模式一般会在什么场合使用

## 面向对象编程
通过this添加的属性、方法是在当前对象上添加的，然而JavaScript是基于prototype的语言，每创建一个对象时,它都有一个原型protoype指向其继承的属性方法
prototype继承的方法并不是自身的，通过一级一级查找得到的
constructor是一个属性，当创建一个函数或者对象时都会为其创建一个原型对象，该属性指向拥有整个原型对象的函数或对象
```js
// 私有属性和私有方法、特权方法、对象共有属性和对象共有方法 构造器
var Book = function(id, name, price) {
  var num = 1;
  function checkId() {

  }
  this.getName = function() {}
  this.getPrice = function() {}
  this.setName = function() {

  }
  this.id = id;
  this.copy = function() {}
  // 构造器
  this.setName(name)
}

// 闭包实现
var Book = (function() {
  // 静态私有变量
  var bookNum = 0;
  // 静态私有方法
  function checkBook(name) {}
  return function(newId, newName, newPrice) {
    // 私有变量
    var name, price;
    function checkId(id) {}
    // 共有方法
    this.getName = function(){}
    this.getPrice = function(){}
  }
})

var Book = function(title, time, type) {
  if (this instanceof Book) {
    this.title = title;
    this.time= time;
    this.type = type;
  } else {
    return new Book(title, time, type)
  }
}

// 类式继承缺点：1.一个子类的实例更改子类原型从父类构造函数继承来的共有属性就会影响到其他子类。2.无法向父类传递参数
function SuperClass() {
  this.superValue = true;
}

SuperClass.prototype.getSuperValue = function() {
  return this.superValue;
}

function SubClass() {
  this.subValue = false
}

SubClass.prototype = new SuperClass()
SubClass.prototype.getValue = function() {
  return this.subValue;
}

// 构造函数继承
function SuperClass(id) {
  this.books = []
  this.id = id;
}

SuperClass.prototype.showBooks = function() {

}

function Subclass(id) {
  SuperClass.call(this, id)
}

var instancel = new SubClass(10)
var instance2 = new SubClass(11)

// 原型式继承
function inheritObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 寄生式继承
var book = {
  name: 'js book',
  alikeBook: ['css book', 'html book']
}

function createBook(obj) {
  var o = new inheritObject(obj)
  o.getName = function() {
    console.log(name)
  }
  return o;
}

// 寄生组合式继承
function inheritPrototype(subClass, superClass) {
  var p = inheritObject(superClass.prototype)
  p.Constructor = subClass;
  subClass.prototype = p
}

var extend = function(target, source) {
  for(var property in source) {
    target[property] = source[property]
  }
  return target
}

// 多继承
Object.prototype.mix = function() {
  var i, arg, len = arguments.length
  for(; i < len; i++) {
    arg = arguments[i]
    for(var property in arg) {
      this[property] = arg[property]
    }
  }
}
```
## 创建型设计模式
### 简单工厂模式
```js
function createPop(type, text) {
  var o = new Object()
  o.content = text;
  o.show = function() {}
  if (type === 'alert') {
    // 差异部分
  }
  if (type === 'prompt') {
    // 差异部分
  }
  return o
}
```
### 工厂方法模式
```js
var Factory = function(type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}
Factory.prototype = {

}
```
### 抽象工厂模式
抽象工厂模式是设计模式中最抽象的一种，也是创建抽象模式中唯一一种抽象化创建模式。该模式创建出来的结果不是一个真实的对象实例，而是一个类簇，它制定了类的结构。
```js
var VehicleFactory = function(subType, superType) {
  if (typeof VecicleFactory[superType] === 'function') {
    function F(){}
    F.prototype = new VehicleFactory[superType]()
    subType.construtor = subType;
    subType.prototype = new F()
  } else {
    throw new Error('未创建该抽象类')
  }
}
VehicleFactory.Car = function(){
  this.type = 'car'
}
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用')
  }
}
VehicleFactory.Bus = function() {
  this.type = 'bus'
}
VehicleFactory.Bus.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用')
  },
  getPassengerNum: function() {
    return new Error('抽象方法不能调用')
  }
}

// 创建子类
var BMW = function(price, speed) {
  this.price = price;
  this.speed = speed;
}
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function() {
  return this.price
}
BMW.prototype.getSpeed = function() {
  return this.speed;
}

var bmw = new BMW(10000, 100)
```

### 建造者模式
将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示
```js
var Human = function(param) {
  this.skill = param && param.skill || '保密'
  this.hobby = param && param.hobby || '保密'
}
Human.prototype = {
  getSkill: function() {
    return this.skill
  },
  getHobby: function() {
    return this.hobby;
  }
}
var Named = function(name) {
  var that = this;
  (function(name, that) {
    that.wholeName = name;
    if (name.indexOf(' ') > -1) {
      that.firstName = name.slice(0, name.indexOf(' '))
      that.secondName = name.slice(name.indexOf(' '))
    }
  })(name, that)
}

var Work = function(work) {
  var that = this;
  (function(work, that) {
    switch(work) {
      case 'code':
        that.work = '工程师'
        that.workDescript = '每天沉醉于编程'
        break;
      case 'UI':
      case 'UE':
        that.work = '设计师'
        that.workDescript = '设计更似一种艺术'
        break;
    }
  })(work, that)
}
Work.prototype.changeWork = function(work) {
  this.work = work;
}
Work.prototype.changeDescript = function(setence) {
  this.workDesctript = setence
}

var Person = function(name, work) {
  var _person = new Human()
  _person.name = new Named(name)
  _person.work = new Work(work)
  return _person
}
```
### 原型模式
用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法
```js
var LoopImages = function(imgArr, container) {
  this.imagesArray = imgArr
  this.container = container
}
LoopImages.prototype = {
  crateImage: function(){ 
    console.log('loop images createImage function')
  },
  changeImage: function() {
    console.log('Loop images changeImage function')
  }
}
var SlideLoopImg = function(imgArr, container) {
  LoopImages.call(this, imgArr, container)
}
SlideLoopImg.prototype.changeImage = function() {
  console.log('slideLoopImg changeImage function')
}
```
### 单例模式
又被称为单体模式，是只允许实例化一次的对象类
```js
// 惰性单例
var LazySingle = (function() {
  var _instance = null
  function Single() {
    // 这里定义私有属性和方法
    return {
      publicMethod: function(){},
      publicProperty: 1
    }
  }
  return function() {
    if (!_instance) {
      _instance = Single()
    }
    return _instance;
  }
})
```
## 结构性设计模式
关注于如何将类或对象组合成更大、更复杂的结构，以简化设计
### 套餐服务-外观模式
为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易
```js
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}
```
### 水管弯弯-适配器模式
将一个类(对象)的接口(方法或者属性)转化成另外一个接口,以满足用户需求，使类之间接口的不兼容问题通过适配器得以解决
```js
// 参数适配器
function doSomeThing(obj) {
  var _adapter = {
    name: '雨夜庆贺',
    title: '设计模式',
    age: 11,
    color: 'pink'
  }
  for(var i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i]
  }
}

// 服务器端数据适配
function ajaxAdapter(data) {
  return [data['key1'], data['key2'], data['key3']]
}
```
### 牛郎织女-代理模式
由于一个对象不能直接引用另一个对象，所以需要代理对象在这两个对象之间起到中介的作用
```js
// 统计代理
var Count = (function() {
  var _img = new Image()
  return function(param) {
    var str = 'http://www.count.com/a.gif?'
    for(var i in param) {
      str += i + '=' + param[i]
    }
    _img.src = str
  }
})()
```
### 房子装修-装饰者模式
在不改变原对象的基础上，通过对其进行包装拓展使原有对象可以满足用户的更复杂需求
```js
var decorator = function(input, fn) {
  var input = document.getElementById(input)
  if (typeof input.onclick === 'function') {
    var oldClickFn = input.onclick
    input.onclick = function() {
      oldClickFn()
      fn()
    }
  } else {
    input.onclick = fn;
  }
}
```
### 城市间的公路-桥接模式
在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦
```js
// 运动单元
function Speed(x, y) {
  this.x = x;
  this.y = y;
}
Speed.prototype.run = function() {
  console.log('运动起来')
}
function Color(cl) {
  this.color = cl
}
Color.prototype.draw = function() {
  console.log('draw')
}
function Shape(sp) {
  this.shape = sp
}
Shape.prototype.change = function() {
  console.log('改变形状')
}
function Speek(wd) {
  this.word = wd
}
Speek.prototype.say = function() {
  console.log('书写字体')
}
function Ball(x, y, c) {
  this.speed = new Speed(x, y)
  this.color = new Color(c)
}
Ball.prototype.init = function() {
  this.speed.run()
  this.color.draw()
}
function People(x, y, f) {
  this.speed = new Speed(x, y)
  this.font = new Speek(f)
}
People.prototype.init = function() {
  this.speed.run()
  this.font.say()
}
function Sprite(x, y, c, s) {
  this.speed = new Speed(x, y)
  this.color = new Color(c)
  this.shape = new Shape(s)
}
Sprite.prototype.init = function() {
  this.speed.run()
  this.color.draw()
  this.shape.change()
}
```
### 超值午餐-组合模式
又称部分-整体模式，将对象组合成树形结构以表示部分整体的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。
```js
// 虚拟父类
var News = function() {
  // 为了简化子类可以将这些共有的变量提前声明在父类中
  this.children = []
  this.element = null
}
News.prototype = {
  init: function() {
    throw new Error('请重写你的方法')
  },
  add: function() {
    throw new Error('请重写你的方法')
  },
  getElement: function() {
    throw new Error('请重写你的方法')
  }
}

var Container = function(id, parent) {
  News.call(this)
  this.id = id;
  this.parent = parent;
  this.init()
}

inheritPrototype(Container, News)
Container.prototype.init = function() {
  this.element = document.createElement('ul')
  this.element.id = this.id;
  this.element.className = 'new-container'
}

Container.prototype.add = function(child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this;
}

Container.prototype.getElement = function() {
  return this.element;
}

Container.prototype.show = function() {
  this.parent.appendChild(this.element)
}
// 同样下一层级的行成员集合类以及后面的新闻组合体类实现的方式与之类似
var Item = function(classname) {
  News.call(this)
  this.classname = classname || ''
  this.init()
}
inhertiprototype(Item, News)
Item.prototype.init = function() {
  this.element = document.createElement('li')
  this.element.className = this.classname;
}
Item.prototype.add = function(child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this;
}
Item.prototype.getElement = function() {
  return this.element
}
vare NewsGroup = function(classname){
  News.call(this)
  this.classname = classname || ''
  this.init()
}
NewsGroup.prototype.init = function() {
  this.element = document.createElement('div')
  this.element.appendChild(child.getElement())
  return this;
}
NewsGroup.prototype.getElement = function() {
  return this.element;
}
// 图片新闻类
var ImageNews = function(url, href, classname) {
  News.call(this)
  this.url = url || ''
  this.href = href || '#'
  this.classname = classname || 'normal'
  this.init()
}
inheritPrototype(ImageNews, News)
ImageNews.prototype.init = function() {
  this.element = document.createElement('a')
  var img = new Image()
  img.src = this.url;
  this.element.appendChild(img)
  this.element.className = 'image-news ' + this.classname;
  this.element.href = this.href;
}
ImageNews.prototype.add = function() {}
ImageNews.prototype.getElement = function() {
  return this.element;
}

var IConNews = function(text, href, type) {
  News.call(this)
  this.text = text || ''
  this.href = href || '#'
  this.type = type || 'video'
  this.init()
}
inheritPrototype(IconNews, News)
IconNews.prototype.init = function() {
  this.element = document.createElement('a')
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = 'icon' + this.type
}
IconNews.prototype.add = function() {}
IconNews.prototype.getElement = function() {
  return this.element;
}

var EasyNews = function(text, href) {
  News.call(this)
  this.text = text;
  this.href= href;
  this.init()
}
inheritPrototype(EasyNews, News)
EasyNews.prototype.init = function() {
  this.element = document.createElement('a')
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = 'text'
}

// 通过add方法像一棵树一样一层一层建新闻就可以了
var news1 = new Container('news', document.body)
news1.add(new Item('normal').add(new IconNews('梅西', '#', 'video')).add(new Item('normal').add(new IconNews('保护', '#', 'live'))).add(new Item('normal').add(new NewsGroup('has-img').add(new ImageNews('img/1.jpg', '#', 'small')).add(new EasyNews('成功', '#')))))
```
### 城市公交车-享元模式
运用共享技术有效地支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销
```js
var Flyweight = function() {
  var created = []
  function create() {
    var dom = document.createElement('div')
    document.getElementById('container').appendChild(dom)
    created.push(dom)
    return dom;
  }
  return {
    getDiv: function() {
      if (created.length < 5) {
        return create()
      } else {
        var div = created.shift()
        created.push(div)
        return div
      }
    }
  }
}

var paper = 0, num = 5, len = article.length;
for(var i = 0; i < 5; i++) {
  if (article[i]) {
    Flyweight.getDiv.innterHTML = article[i]
  }
}
document.getElementById('next_page').onclick = function() {
  if (article.length < 5) {
    return;
  }
  var n = ++pager * num % len, j = 0;
  for(; j < 5; j++) {
    if (article[n + j]) {
      Flyweight.getDiv().innerHTML = article[n + j]
    } else if (article[n + j] - len) {
      Flyweight.getDiv().innerHTML = article[n + j - len]
    } else {
      Flyweight.getDiv().innerHTML = ''
    }
  }
}
```
## 行为型设计模式
行为型设计模式用于不同对象之间职责划分或算法抽象，行为型设计模式不仅仅涉及类及对象，还涉及类或对象之间的交流模式并加以实现
### 照猫画虎-模版方法模式
父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新定义算法中某些实现步骤
```js
// 提示框基类
var Alert = function(data) {
  if (!data) return;
  this.content = data.content;
  this.panel = document.createElement('div')
  this.contentNode = document.createElement('p')
  this.confirmBtn = document.createElement('span')
  this.closeBtn = document.createElement('b')
  this.panel.className = 'alert'
  this.closeBtn.className = 'a-close'
  this.confirmBtn.innerHTML = data.confirm || '确认'
  this.contentNode.innerHTML = this.content;
  this.success = data.success || function() {}
  this.fail = data.fail || function(){}
}
Alert.prototype = {
  init: function() {
    this.panel.appendChild(this.closeBtn)
    this.panel.appendChild(this.contentNode)
    document.body.appendChild(this.panel)
    this.bindEvent()
    this.show()
  },
  bindEvent: function() {
    var me = this
    this.clsoeBtn.onclick = function() {
      me.fail()
      me.hide()
    }
    this.confirmBtn.onclick = function() {
      me.success()
      me.hide()
    }
  },
  hide: function() {
    this.panel.style.display = 'none'
  },
  show: function() {
    this.panel.style.dispaly = 'block'
  }
}
// 右侧提示框
var RightAlert = function(data) {
  Alert.call(this, data)
  this.confirmBtn.className = this.confirmBtn.className + ' right'
}
RightAlert.prototype = new Alert()
// 标题提示框
var TitleAlert = function(data) {
  Alert.call(this, data)
  this.title = data.title
  this.titleNode = document.createElement('h3')
  this.titleNode.innerHTML = this.title
}
TitleAlert.prototype = new Alert()
TitleAlert.prototype.init = function() {
  this.panel.insertBefore(this.titleNode, this.panel.firstChild)
  Alert.prototype.init.call(this)
}
```
### 通信卫星-观察者模式
发布-订阅模式或消息机制，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合
```js
// 把观察者对象创建出来，他有一个消息容器和三个方法：分别是订阅消息方法、取消订阅的消息方法、发送订阅的消息方法
var Observer = (function() {
  var _messages = {}
  return {
    regist: function(type, fn) {
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn]
      } else {
        _message[type].push(fn)
      }
    },
    fire: function(type, args) {
      if (!_messages[type]) {
        return
      }
      var events = {
        type: type,
        args: args || {}
      },
      i = 0, len = _messages[type].length
      for(; i < len; i++) {
        _message[type][i].call(this, events)
      }
    },
    remove: function(type, fn) {
      if (__messages[type] instanceof Array) {
        var i = _message[type].length - 1
        for(; i >= 0; i--) {
          _messages[type][i] === fn && _messages[type].splice(i, 1)
        }
      }
    }
  }
})()

Observer.regist('test', function(e) {

})
Observer.fire('test', {msg: '传递参数'})
```
### 超级玛丽-状态模式
当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象
```js
var MarryState = function() {
  var _currentState = {},
  states = {
    jump: function() {
      console.log('jump')
    },
    move: function() {
      console.log('move')
    },
    shoot: function() {
      console.log('shoot')
    },
    squat: function() {
      console.log('squat')
    }
  }
  var Action = {
    changeState: function() {
      var arg = arguments
      _currentState = {}
      if (arg.length) {
        for(var i = 0, len = arg.length; i < len; i++) {
          _currentState[arg[i]] = true;
        }
      }
      return this;
    },
    goes: function() {
      for(var i in _currentState) {
        states[i] && states[i]()
      }
      return this;
    }
  }
  return {
    change: Action.changeState,
    goes: Action.goes
  }
}

var marry = new MarryState()
marry.change('jump', 'shoot').goes().goes().change('shoot').goes()
```
### 活诸葛-策略模式
将定义的一组的算法封装起来，使其互相之间可以替换。封装的算法具有一定独立性，不会随客户端变化而变化。
```js
var PriceStrategy = function() {
  var stragtegy = {
    return30 : function(price) {
      return price + parseInt(price / 100) * 30
    },
    return50: function(price) {
      return price + parseInt(price / 100) * 50
    }
    percent80: function(price) {
      return price * 100 * 80 / 10000
    }
  }
  return function(algorithm, price) {
    return stragtegy[algorithm] && stragte[algorithm](price)
  }
}
var price = PriceStrategy('return50', '314.67')
```
### 有序车站-职责链模式
解决请求的发送者与请求的接收者之间的耦合，通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，直到最后一个对象完成请求的处理
```js
// 请求模块
var sendData = function(data, dealType, dom) {
  // 简化版
  var xhr = new XMLHttpRequest(),
  url = 'getData.php?mod=userInfo'
  xhr.onload = function(event) {
    if (xhr.status >= 200 && xhr.status < 300) {
      dealData(xhr.responseText, dealType, dom)
    } else {

    }
    for(var i in data) {
      url += '&' +i + '=' + data[i]
    }
    xhr.open('get', url, true)
    xhr.send(null)
  }
}
// 响应数据适配模块
var dealData = function(data, dealType, dom) {
  var dataType = Object.prototype.toString.call(data)
  switch(dealType) {
    case 'sug':
      if (dataType === '[object Array]') {
        return createSug(data, dom)
      }
      if (dataType === '[object Object]') {
        var newData = []
        for(var i in data) {
          newData.push(data[i])
        }
        return createSug(newData, dom)
      }
      return createSug([data], dom)
      break;
    case 'validate': 
      return createValidataResult(data, dom)
      break;
  }
}
// 创建提示框组件模块
var createSug = function(data, dom) {
  var i = 0, len = data.length, html = ''
  for(; i < len; i++) {
    html += '<li>' + data[i] + '</li>'
  }
  dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html
}
// 创建校验组件
var createValidataResult = function(data, dom) {
  dom.parentNode.getElementsByTagName('span')[0].innerHTML = data
}
// 单元测试
dealData(123, 'sug', input[1])

// 方案确定后：
var input = document.getElementsByTagName('input')
input[0].onchange = function(e) {
  sendData({value: input[0].value}, 'validate', input[0])
}
input[1].onkeydown = function(e) {
  sendData({value: input[1].value}, 'sug', input[1])
}
```
### 命令模式
将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化
```js
var viewCommand = (function() {
  var tpl = {
    product: [],
    title: []
  },
  html = ''
  function formateString(str, obj) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
      return obj[key]
    })
  }
  var Action = {
    create: function(data, view) {
      if (data.length) {
        for(var i = 0, len = data.length; i < len; i++) {
          html += formatString(tpl[view], data[i])
        }
      } else {
        html += formateString(tpl[view], data)
      }
    },
    display: function(container, data, view) {
      if (data) {
        this.create(data, view)
      }
      document.getElementById(container).innerHTML = html
      html = ''
    }
  }
  return function execute(msg){
    msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ? msg.param : [msg.param]
    Action[msg.command].appley(Action, msg.param)
  }
})()

viewCommand({
  command: 'display'
  param: ['title', titleData, 'title']
})
```
### 驻华大使-访问者模式
针对于对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法
```js
var Visitor = (function() {
  return {
    splice: function() {
      var args = Array.prototype.splice.call(arguments, 1)
      return Array.prototype.splice.apply(arguments[0], args)
    },
    push: function() {
      var len = arguments[0].length || 0
      var args = this.splice(argumetns, 1)
      arguments[0].length = len + arguments.length - 1
      return Array.prototype.push.apply(arguments[0], args)
    },
    pop: function() {
      return Array.prototype.pop.apply(arguments[0])
    }
  }
})()
```
### 媒婆-中介者模式
通过中介者对象封装一系列对象之间的交互，使对象之间不再相互引用，降低他们之间的耦合
```js
var Mediator = function() {
  var _msg = {}
  return {
    register: function(type, action) {
      if (_msg[type]) {
        _msg[type].push(action)
      } else {
        _msg[type] = []
        _msg[type].push(action)
      }
    },
    send: function(type) {
      if (_msg[type]) {
        for(var i = 0, len = _msg[type].length; i < len; i++) {
          _msg[type][i] && _msg[type][i]()
        }
      }
    }
  }
}
```
### 做好笔录-备忘录模式
在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复以前的某个状态
```js
var Page = function() {
  var cache = {}
  return function(page, fn) {
    if (cache[page]) {
      showPage(page, cache[page])
      fn && fn()
    } else {
      $.post('/api/getList', {page}, function(res) {
        if (res.errNo == 0) {
          showPage(page, res.data)
          cache[page] = res.data
          fn && fn()
        }
      })
    }
  }
}
```
### 点钞机-迭代器模式
在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素
```js
var Iterator = function(items, container) {
  var container = container && document.getElementById(container) || document
  var items = container.getElementsByTagName(items), length = items.length, index = 0
  var splice = [].splice
  return {
    first: function() {
      index = 0,
      return items[index]
    },
    second: function() {
      index = length - 1
      return items[index]
    },
    pre: function() {
      if (--index > 0) {
        return items[index]
      } else {
        index = 0
        return null
      }
    },
    next: function() {
      if (++index < length) {
        return items[index]
      } else {
        index = length - 1
        return null
      }
    },
    get: function(num) {
      index = num >= 0- ? num % length : num % length + length
      return items[index]
    },
    dealEach: function(fn) {
      var args = splice.call(arguments, 1)
      for(var i = 0; i < length; i++) {
        fn.apply(items[i], args)
      }
    },
    dealItem: function(num, fn) {
      fn.apply(this.get(num), splice.call(arguments, 2))
    },
    exclusive: function(num, allFn, numFn) {
      this.dealEach(allFn)
      if (Object.prototype.toString.call(num) === '[object Array]') {
        for(var i = 0, len = num.length; i < len; i++) {
          this.dealItem(num[i], numFn)
        }
      } else {
        this.dealItem(num, numFn)
      }
    }
  }
}
```
### 语言翻译-解释器模式
对于一种语言，给出其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子
```js
// 获取兄弟元素名称
function getSublingName(node) {
  if (node.previousSibling) {
    var name = '', count = 1, nodeName = node.nodename, sibling = node.previousSibling
    while(sibling) {
      if(sibling.nodeType === 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
        if (nodeName === sibling.nodeName) {
          name += ++count
        } else {
          count = 1
          name += '|' + sibling.nodeName.toUpperCase()
        }
      }
      sibling = sibling.previousSibling
    }
    return name
  } else {
    return ''
  }
}
// Xpath解释器
var Interpreter = (function() {
  function getSublingName(node) {

  }
  return function(node, wrap) {
    var path = [],
    wrap = wrap || document;
    if (node === wrap) {
      if (wrap.nodeType === 1) {
        path.push(wrap.nodeName.toUpperCase())
      }
      return path
    }
    if (node.parentNode !== wrap) {
      path. = arguments.callee(node.parentNode, wrap)
    } else {
      if (wrap.nodeType === 1) {
        path.push(wrap.nodeName.toUpperCase())
      }
    }
    var sublingNames = getSublingName(node)
    if (node.nodeType === 1) {
      path.push(node.nodeName.toUpperCase() + sublingsNames)
    }
    return path;
  }
})()
```
## 技巧型设计模式
### 永无尽头-链模式
通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。从而简化对该对象的多个方法的多次调用，对该对象的多次引用。
```js
var A = function(selector) {
  return new A.fn.init(selector)
}
A.fn = A.prototype = {
  constructor: A,
  init: function(selector, context) {
    this.length = 0
    context = context || document
    if (~selector.indexOf('#')) {
      this[0] = document.getElementById(selector)
      this.length = 1
    } else {
      var doms = context.getElementsByTagName(selector), i = 0, len = doms.length;
      for(; i < len; i++) {
        this[i] = doms[i]
      }
      this.length = len;
    }
    this.context = context;
    this.selector = selector;
    return this;
  },
  length: 2,
  size: function() {
    return this.length;
  },
  push: [].push,
  sort: [].sort,
  splice: [].splice
}
A.fn.extend = A.fn.extend = function() {
  var i = 1, len = arguments.length, target = arguments[0], j;
  if (i == len) {
    target = this;
    i --
  }
  for(; i < len; i++) {
    for(j in arguments[i]) {
      target[j] = arguments[i][j]
    }
  }
  return target
}
A.fn.extend({
  on: (function() {
    if (document.addEventListender) {
      var i = this.length - 1;
      for(; i >= 0; i--) {

      }
      return this
    } else if (document.attachEvent) {
      return function(type, fn) {
        var i = this.length - 1;
        for(; i >= 0; i --) {
          this[i].addEventListener(type, fn, false)
        }
        return this;
      }
    } else {
      return function(type, fn) {
        var i = this.length - 1;
        for(; i >= 0; i--) {
          this[i]['on' + type] = fn
        }
        return this;
      }
    }
  })()
})
A.extend({
  camelCase: function(str) {
    return str.replace(/\-(\w)/g, function(all, letter) {
      return letter.toUpperCase()
    })
  }
})
A.extend({
  css: function() {
    var arg = arguments, len = arg.length;
    if (this.length  < 1) {
      return this
      if (len === 1) {
        if (typeof arg[0] === 'string') {
          // IE
          if (this[0].currentStyle) {
            return this[0].currentStyle[name]
          } else {
            return getComputedStyle(this[0], false)[name]
          }
        } else if (typeof arg[0] === 'object') {
          for(var i in arg[0]) {
            for(var j = this.length - 1; i>= 0; j --) {
              this[j].style[A.camelCase(i)] = arg[0][i]
            }
          }
        } 
      } else if (len === 2) {
        for(var j = this.length - 1; j >= 0; j--) {
          this[j].style[A.camelCase(arg[0])] = arg[1]
        }
      }
      return this;
    }
  }
})
A.fn.extend({
  attr: function() {
    var arg = arguments, len = arg.length;
    if (this.length < 1) {
      return this
    }
    if (len === 1) {
      if (typeof arg[0] === 'stirng') {
        return this[0].getAttribute(arg[0])
      } else if (typeof arg[0] === 'object') {
        for(var i in arg[0]) {
          for(var j = this.length - 1; j >= 0; j--) {
            this[j].setAttribute(i, arg[0][i])
          }
         }
      }
    } else if (len === 2) {
      for(var j = this.length - 1; j >= 0; j--) {
        this[j].setAttribute(arg[0], arg[1])
      }
    }
    return this;
  }
})
A.fn.extend({
  html: function() {
    var arg = arguments,
    len = arg.length;
    if (len === 0) {
      return this[0] && this[0].innerHTML;
    } else {
      for(var i = this.length - 1; i >= 0; i--) {
        this[i].innerHTML = arg[0]
      }
    }
    return this;
  }
})
A('div').css({
  height: '30px',
  border: '1px solid #000',
}).attr('class', 'demo')
.html('add demo text')
.on('click', function() {
  console.log('clicked')
})
```
### 未来预言家-委托模式
多个对象接收并处理同一请求，他们将请求委托给另一个对象统一处理请求。
```js
var Deal = {
  banner: function() {

  },
  aside: function(res) {

  },
  message: function() {}
}
$.get('./get/info', function(res) {
  for(var i in res) {
    Deal[i] && Deal[i](res[i])
  }
})
```
### 数据管理器-数据访问对象模式
抽象和封装对数据源的访问与存储，DAO通过对数据源链接的管理方便对数据的访问与存储。
```js
/**
 * 本地存储类
 * @param preId 本地存储数据库前缀
 * @param timeSign 时间戳与存储数据之间的的拼接符
 */
var BaseLocalStorage = function(preId, timeSign) {
  this.preId = preId
  this.timeSign = timeSign || '|-|'

}
// 数据操作状态
BaseLocalStorage.prototype = {
  status: {
    SUCCESS: 0,
    FAILURE: 1,
    OVERFLOW: 2, // 溢出
    TIMEOUT : 3
  },
  storage: localStorage || widow.localStorage,
  getKey: function(key) {
    return this.preId + key;
  },
  /**
   * 添加数据
   * @param key 数据字段标识
   * @param value 数据值
   * @param callback 回调函数
   * @param time 添加时间
   */
  set: function(key, value, callback, time) {
    var status = this.status.SUCCESS,
    key = this.getKey(key)
    try {
      time = new Date(time).getTime() || tim.getTime()
    } catch(e) {
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }
    try {
      this.storage.setItem(key, time + this.timeSign + value)
    } catch(e) {
      status = this.status.OVERFLOW
    }
    callback && callback.call(this, status, key, value)
  },
  // 获取数据
  get: function(key, callback) {
    var status = this.status.SUCCESS,
    key = this.getKey(key),
    value = null, timeSignLen = this.timeSign.length, that = this, index, time, result
    try {
      value = that.storage.getItem(key)
    } catch(e) {
      return = {
        status: that.status.FAILURE,
        value: null
      }
      callback && callback.call(this, result.status, result.value)
      return result;
    }
    if (value) {
      index = value.indexof(that.timeSign)
      time = +value.slice(0, index)
      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        value = value.slice(index + timeSignLen)
      } else {
        value = null,
        status = that.status.TIMEOUT
        that.remove(key)
      }
    } else {
      status = that.status.FAILURE
    }
    result = {
      statu: status,
      value: value
    }
    callback && callback.call(this, result.status, result.value)
    return result
  },
  // 删除数据
  remove: function(key, callback) {
    var status = this.status.FAILURE,
    key = this.getKey(key),
    value = null;
    try {
      value = this.storage.getItem(key)
    } catch(e) {}
    if (value) {
      try {
        this.storage.removeItem(key)
        status = this.status.SUCCESS;
      } catch(e) {}
    }
    callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length))
  }
}
var LS = new BaseLocalStorage('LS__')
LS.set('a', 'xiaoming', function() {})
LS.get('a', function() {})
LS.remove('a', function() {})
```
服务端的数据库操作
```js
module.exports = {
  DB: {
    db: 'demo',
    host: 'localhost',
    port: 27017
  }
}
var mongodb = require('mongodb')
var config = require('./config').DB
var d = new mongodb.Db(
  config.db,
  new mongodb.Server(
    config.host,
    config.port,
    {auto_reconnect: true}
  ),
  {safe: true}
)
exports.DB = function() {}
function connct(col, fn) {
  d.open(function(err, db) {
    if (err) throw err
     else {
       db.connection(col, function(err, col) {
         if (err) throw
         else fn && fn(col, db)
       })
     }
  })
}
export.DB = function(col) {
  return {
    insert: function(data, success, fail) {
      connect(col, function(col, db) {
        col.insert(data, function(err, docs) {
          if (err) fail && fail(err)
           else success && success(docs)
           db.close()
        })
      })
    },
    remove: function() {},
    update: function() {},
    find: function() {}
  }
}
```
### 执行控制-节流模式
对重复的业务逻辑进行节流控制，执行最后一次操作并取下筽其他操作，以提高性能
```js
// 节流器
var throttle = function() {
  var isClear = arguments[0], fn;
  if (typeof isClear === 'boolean') {
    fn = arguments[1]
    fn.__throttleID && clearTimeout(fn.__throttleID)
  } else {
    fn = isClear;
    param = arguments[1]
    var p = extend({
      context: null,
      args: [],
      time: 300
    }, param)
    arguments.callee(true, fn)
    fn.__throttleID = setTimeout(function() {
      fn.apply(p.context, p.args)
    }, p.time)
  }
}
// 图片的延迟加载
function LazyLoad(id) {
  this.contaienr = document.getElementById(id)
  this.imgs = this.getImgs()
  this.init()
}
LazyLoad.prototype = {
  init: function() {
    this.update()
    this.bindEvent()
  },
  getImgs: function() {
    var arr = []
    var imgs = this.container.getElementsByTagName('img')
    for(var i = 0, len = imgs.length; i < len; i ++) {
      arr.push(imgs[i])
    }
    return arr;
  },
  update: function() {
    if (!this.imgs.length) {
      return;
    }
    var i = this.imgs.length;
    for(--i; i >= 0; i--) {
      if (this.shouldShow(i)) {
        this.imgs[i].src = this.imgs[i].getAttribute('data-src')
        this.imgs.splice(i, 1)
      }
    }
  },
  // 判读图片是否在可视范围内
  shouldShow: function(i) {
    var img = this.imgs[i],
    scrollTop = document.documentElement.scrollTop || document.body.srcollTop,
    scrollBottom = srollTop = document.documentElement.clientHeight;
    imgTop = this.pageY(img),
    imgBottom = imgTop + img.offsetHeight
    if (imgBottom > scrollTop && imgBottom < scrollBottom || (imgTop > scrollTop && imgTop < scrollBottom)) {
      return true;
    }
    return false
  },
  pageY: function(element) {
    if (element.offsetParent) {
      return element.offsetTop + this.pageY(element.offsetParent)
    } else {
      return element.offsetTop;
    }
  },
  on: function(element, type, fn) {
    if (element.addEventListener) {
      addEventListener(type, fn, false)
    } else {
      element.attachEvent('on' + type, fn, false)
    }
  },
  // 为窗口绑定resize事件与scroll事件
  bindEvent: function() {
    var that = this;
    this.on(window, 'resize', function() {
      throttle(that.update, {context: that})
    })
    this.on(window, 'scroll', function() {
      throttle(that.update, {context: that})
    })
  }
}
```
统计打包： 在统计中我们经常监听事件触发次数，当触发次数达到某一值才发送请求。
```js
var LogPack = function() {
  var data = [],
  MaxNum = 10, itemSplitStr = '|',
  keyvalueSplitStr = '*',
// img图片可以作为请求触发器
  img = new Image()
  function sendLog() {
    var logStr = '';
    fireData = data.splice(0, MaxNum)
    for(var i = 0, len = fireData.length; i < len; i++) {
      logStr += 'log' + i + '='
      for(var j in fireData[i]) {
        logStr += j + keyValueSplitStr + fireDAta[i][j];
        logStr += itemSplitStr;
      }
      logStr = logStr.replace(/\|$/,'') + '&'
    }
    logStr += 'logLength=' + len;
    img.src = 'a.gif?' + logStr;
  }
  return function(param) {
    if (!param) {
      sendLog()
      return
    }
    data.push(param)
    data.length >= MaxNum && sendLog()
  }
}()
btn.onclick = function() {
  LogPack({
    btnId: this.id,
    context: this.innerHTML,
    type: 'click'
  })
}
btn.onmouseover = function() {
  LogPack({
    btnId: this.id,
    context: this.innerHTML,
    type: 'mouseover'
  })
}
```
### 卡片拼图- 简单模版模式
通过格式化字符串拼凑出视图避免创建视图时大量节点操作，优化内存开销
```js
var A = A || {}
A.root = document.getElementById('container')
// 模版渲染方法
A.formateString = function(str, data) {
  return str.replace(/\{#(\w)#\}/g, function(match, key) {
    return typeof data[key] === undefined ? '' : data[key]
  })
}
// 模版生成器
A.view = function(name) {
  var v = {
    code: '<pre><code>{#code#}</code></pre>',
    img :'<img src="{#src#} title="{#title#}" />',
  }
  if (Object.prototype.toString.call(name) === '[object Array]') {
    var tpl = ''
    for(var i = 0, len = name.length; i < len; i ++) {
      tpl += arguments.callee(name[i])
    }
    return tpl;
  } else {
    return v[name] ? v[name] : ('<' + name + '>(#' + name + '#</' + name + '>')
  }
}

// 创建视图方法集合
A.strategy = {
  // 文字列表展示
  'listPart': function() {
    var s = document.createElement('div')
    ul = '', ldata = data.data.li
    tpl = [
      '<h2>{#h2#}></h2>',
      '<p>{#p#}></p>',
      '<ul>{#ul#}></ul>',
    ].join("")
    liTpl = [
      '<li>',
        '<strong>{#strong#}</strong>',
        '<span>{#span#}</span>',
      '<li>',
    ].join('')
    data.id && (s.id = data.id)
    for(var i = 0, len = ldata.length; i < len; i++) {
      if (ldata[i].em || ldata[i].span) {
        ul += A.formateString(liTpl, ldata[i])
      }
    }
    data.data.ul = ul;
    s.innerHTML = A.formatString(tpl, data.data)
    A.root.appendChild(s)
  },
  'codePart': function() {},
  'onlyTitle': function() {}
  'guide': function() {}
}
A.init = function(data) {
  this.strategy[data.type](data)
}
```
### 机器学习-惰性模式
减少每次代码执行时的重复性的分支判断，通过对对象重定义来屏蔽原对象的分支判断
```js
var A = {}
A.on = (function(dom, type, fn) {
  if (dom.addEventListener) {
    return function(dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (dom.attachEvent) {
    return function(dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    return function(do, type, fn) {
      dom['on' + type] = fn
    }
  }
})()
// 惰性执行
A.on = function(dom, type, fn) {
  if (dom.addEventListender) {
    A.on = function(dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (dom.attachEvent) {
    A.on = function(dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    A.on = function(dom, type, fn) {
      dom['on' + type] = fn;
    }
  }
  A.on(dom, type, fn)
}
// 创建XHR对象
// 第一种方案 加载时损失性能
var createXHR = (function() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return function() {
      return new XMLHttpRequest()
    }
  } else if (typeof ActiveXObject !== 'undefined') {
    return function() {
      throw new Error('no XHR object available')
    }
  }
})()
// 第二种方案 调用时损失性能
function createXHR() {
  if (typeof XMLHttpRequest !== 'undefined') {
    createXHR = function() {
      return new XMLHttpRequest()
    }
  } else if (typeof ActiveXObject != 'undefined') {
    createXHR = function() {

    }
  } else {

  }
}
```
### 异国战场-参与者模式
在特定的作用域中执行给定的函数，并将参数原封不动地传递
```js
function bind(fn, context) {
  var Slice = Array.prototype.slice, args = Slice.call(arguments, 2)
  return function() {
    var addArgs = Slice.call(arguments),
    allArgs = addArgs.concat(args)
    return fn.apply(context, allArgs)
  }
}
function demoFn() {
  console.log(arguments)
}
var bindFn = bind(demoFn)
btn.addEventListener('click', bindFn)
btn.removeEventListener('click', bindFn)
// 函数柯里化
function curry(fn) {
  var Slice = [].slice
  var args = Slice.call(arguments, 1)
  return function() {
    var addArgs = Slice.call(arguments),
        allArgs = args.concat(addArgs)
        return fn.apply(null, allArgs)
  }
}
```
### 入场仪式-等待者模式
通过对多个异步进程监听，来触发未来发生的动作
等待者对象是用来解决那些不确定先后完成的异步逻辑的。
```js
var Waiter = function() {
  var dfd = [],
      doneArr = [],
      failArr = [],
      slice = Array.prototype.slcie,
      that = this;

  var Primise = function() {
    this.resolved = false;
    this.rejected = false;
  }

  Primise.prototype = {
    resolve: function() {
      this.resolved = true;
      if (!dfd.length) return;
      for(var i = dfd.length - 1; i >= 0; i--) {
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
          return;
        }
        dfd.splice(i, 1)
      }
      _exec(doneArr)
    },
    reject: function() {
      this.rejected = true;
      if (!dfd.length) return;
      dfd.splice(0)
      _exec(failArr)
    }
  }
  // 创建监控对象
  that.Deferred = function() {
    return new Primise()
  }

  function _exec(arr) {
    var i = 0, len = arr.length;
    for(; i < len; i++) {
      try {
        arr[i] && arr[i]()
      } catch(e) {}
    }
  }
  // 检测已注册过的监控对象的异步逻辑，所以when方法就要将监控对象放入监控对象容器中，当然还要判断对象是否存在、是否解决、是否是监控对象类的实例。最后还要返回该等待对象便于链式调用
  that.when = function() {
    dfd = slice.all(arguments)
    var i = dfd.length;
    for(--i; i >= 0; i--) {
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise) {
        dfd.splice(i, 1)
      }
    }
    return that
  }
  that.done = function() {
    doneArr = doneArr.concat(slice.call(arguments))
    return that;
  }
  that.fail = function() {
    failArr = failArr.concat(slice.call(arguments))
    return that;
  }
}
// 彩蛋方法
var waiter = new Waiter()
var first = function() {
  var dtd = waiter.Deferred()
  setTimeout(function() {
    console.log('first finish')
    dtd.resolve()
  }, 5000)
  return dtd
}
var second = function() {
  var dtd = waiter.Deferred()
  setTimeout(function() {
    console.log('second finish')
    dtd.resolve()
  }, 10000)
  return dtd
}()
// 用等待者对象监听两个彩蛋的工作状态，并执行相应的成功回调与失败回调函数
waiter.when(first, second).done(function() {
  console.log('success')
}, function() {
  console.log('success again')
})
.fail(function() {
  console.log('fail')
})

var first = function() {
  var dtd = waiter.Deferred()
  setTimeout(function() {
    console.log('first finish')
    dtd.reject()
  }, 5000)
}()

// 封装异步请求
var ajaxGet = function(url, success, fail) {
  var xhr = new XMLHttpRequest()
  var dtd = waiter.Deferred()
  xhr.onload = function(event) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.statu === 304) {
      success && succes()
      dtd.resolve()
    } else {
      dtd.reject()
      fail && fail()
    }
  }
  xhr.open('get', url, true)
  xhr.open(null)
}
```
## 架构型设计模式
### 死心眼-同步模块模式
模块化：将复杂的系统分解成高内聚、低耦合的模块，使系统开发变得可控、可维护、可拓展、提高模块的复用率
```js
// 定义模块管理器单体对象
var F = F || {}
/**
 * @param str 模块路由
 * @param fn 模块方法
 */
F.define = function(str, fn) {
  var parts = str.split('.'), 
      old = parent = this, i = len = 0;
  if (parts[0] === 'F') {
    parts = parts.slice(1)
  }
  if (parts[0] === 'define' || parts[0] === 'module') {
    return
  }
  for(len = parts.length; i < len; i++) {
    if (typeof parent[parents[i]] === 'undefined') {
      parent[parts[i]] = {}
    }
    old = parent;
    parent = parent[parts[i]]
  }
  if (fn) {
    old[parts[--i]] = fn()
  }
  return this;
}
// 创建sting模块
F.define('string', function() {
  return {
    trim: function(str) {
      return str.replace(/^\s+|\s+$/g, '')
    }
  }
})
F.define('dom', function() {
  var $ = function(id) {
    $.dom = document.getElementById(id)
    return $
  }
  $.html = function(html) {
    if (html) {
      this.dom.innerHTML = html
      return this;
    } else {
      return this.dom.innerHTML
    }
  }
  return $
})
// 模块调用方法
F.module = function() {
  var args = [].slice.call(arguments), fn = args.pop(), parts = args[0] && args[0] instanceof Array ? args[0] : args,
  modules = [], modIds = '', i = 0, ilen = parts.length, parent, j, jlen;
  while(i < ilen) {
    if (typeof parts[i] === 'string') {
      parent = this;
      modIDs = parts[i].replace(/^F\./, '').split('.');
      for(j = 0, jlen = modIDs.length; j < jlen; j++) {
        parent = parent[modIDs[j] || false]
      }
      modules.push(parent)
    } else {
      modules.push(parts[i])
    }
    i++
  }
  fn.apply(null, modules)
}
// 调用模块 参数分为两部分：依赖模块与回调执行函数
F.module(['dom', document], function(dom, doc) {
  // 通过dom模块设置元素内容
  dom('test').html('new add')
  // 通过document设置body元素背景色
  doc.body.style.background = 'red'
})
F.module('dom', 'string.trim', function(dom, trim) {
  var html = dom('test').html()
  var str= trim(html)
  console.log('*' + html + "*", "*" + str + '*')
})
```
### 大心脏-异步模块模式
```js
var moduleCache = {},
// 设置模块
setModule = function(moduleName, params, calback) {
  var _module, fn;
  if (moduleCache[moduleName]) {
    _module = moduleCache[moduleName]
    _module.status = 'loaded'
    _module.exports = callback ? callback.apply(_module, params) : null
    while(fn = module.onload.shift()) {
      fn(_module.exports)
    }
  } else {
    callback && callback.apply(null, params)
  }
},
loadModuel = function(moduleName, callback) {
  var _module;
  if (moduleCache[moduleName]) {
    _module = moduleCache[moduleName]
    if (_module.status === 'loaded') {
      setTimeout(callback(_module.exports), 0)
    } else {
      _module.onload.push(calback)
    }
  } else {
    moduleCache[moduleName] = {
      moduleName: moduleName,
      status: 'loading',
      exports: null,
      onload: [callback]
    }
    loadScript(getUrl(moduleName))
  }
}
getUrl = function(moduleName) {
  return String(moduleName).replace(/\.js$/g, '') + '.js'
},
loadScript = function(src) {
  var _script = document.createElement('script')
  _script.type = 'text/JavaScript'
  _script.charset = 'UTF-8'
  _scirpt.async = true;
  _script.src = src;
  document.getElementsByTagName('head')[0].appendChild(_script)
}
```
### 分而治之-Widget模式
Widget模式是指借用Web Widget思想将页面分解成部件，针对部件开发，最终组合成完整的页面。
```js
// 模版引擎模块
F.module('lib/template', function() {
  /**
   * 模版引擎 处理数据与编译模版入口
   * @param str 模版容器id或者模版字符串
   * @param data 渲染数据
   */
  var _TplEngine = function(str, data) {
    if (data instanceof Array) {
      var html = '',
      i = 0, 
      len = data.length;
      for(; i < len; i++) {
        html += _getTpl(str)(data[i])
      }
      return html
    } else {
      return _getTpl(str)(data)
    }
  },
      _getTpl = function(str) {
        var ele = document.getElementById(str)
        if (ele) {
          // 如果是input或者textarea表单元素，则获取该元素的value值，否者获取元素的内容
          var html = /^(textarea|input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
          return _compileTpl(html)
        } else {
          return _compileTpl(str)
        }
      },
      _dealTpl = function(str) {
        var _left = '{%',
            _right = '%}';
        return String(str).replace(/&lt;/g, '<')
        .replace(/&gt/g, '>')
        .replace(/[\r\t\n]/g, '')
        .replace(new RegExp(_left + '=(.*?)' + _right, 'g'), "',typeof ($1) === 'undefined' ? '' : $1, '")
        .repalce(new RegExp(_left, 'g'), "');")
        .replace(new RegExp(_right, 'g'), "template_array.push('")
      },
      _compileTpl = function(str) {
        var fnBody = "var tempalte_array = [];\n var fn = (function(data{}"
      }
    return _TplEngine;
})

```
### 三人行-MVC模式
模型-视图-控制器，用一种将业务逻辑、数据、视图分离的方式组织架构代码
```js
$(function() {
  var MVC = MVC || {}
  MVC.model = function() {
    var M = {};
    M.data = {
      slideBar: [
        {
          text: '萌妹子',
          icon: 'left.png',
          title: '',
          content: '',
          img: '',
          href: ''
        }
      ],
      newMode: [

      ]
    };
    M.conf = {
      slideBarCloseAnimate: false
    };
    return {
      getData: function(m) {
        return M.data[m]
      },
      getConf: function(c) {
        return M.conf[c]
      }
      setData: function(m, v) {
        M.data[m] = v;
        return this;
      }
      setConf: function(c, v) {
        M.conf[c] = v;
        return this;
      }
    }
  }()
  MVC.view = function() {
    var M = MVC.model;
    var V = {
      createSlideBar: function() {
        var html = '',
        data = M.getData('slideBar')
        if (!data || !data.length) {
          return;
        }
        var dom = $.create('div', {
          'class': 'slidebar',
          'id': 'slidebar'
        })
        var tpl = {
          container: [
            '<div>{#content#}</div>'
          ],
          item: []
        }
        for(var i = 0, len = data.length; i < len; i++) {
          html += $.formateString(tpl.item, data[i])
        }
      }
    }
    return function(v) {
      V[v]()
    }
  }()
  MVC.ctrl = function() {
    var M = MVC.model
    var V = MVC.view;
    var C = {
      initSlideBar: function() {
        V('createSlideBar')
        $('li', 'slidebar')
        .on('mouseover', function(e) {
          $(this).removeClass('show')
        })
      }
    }
  }()
})
```
### 三军统帅-MVP模式
模型-视图-管理器：View层不直接引用Model层内的数据，而是通过Presenter层实现对Model层内的数据访问
```js
// 创建一个MVP单体对象
(function(window) {
  var MVP = function() {};
  MVP.model = function() {
    var M = {}
    M.data = {}
    M.conf = {}
    return {
      getData: function(m) {
        return M.data[m]
      },
      setData: function(m, v) {
        return M.conf(c)
      },
      getConf: function(c) {
        return M.conf[c]
      },
      setConf: function(c, v ) {
        M.conf[c] = c;
        return v;
      }
    }()
  };
  MVP.view = function() {
    // 解析字符串并创建视图
    var REPLACEKEY = '__REPLACEKEY__'
    function getHTML(str, replacePos) {}
    function eachArray(arr, fn) {
      for(var i = 0, len = arr.length; i < len; i++) {
        fn(i, arr[i], len)
      }
    }
    function formateItem(str, rep) {
      return str.replace(new RegExp(REPLACEKEY, 'g'), rep)
    }
    // 模版解析器
    return function(str) {
      var part = str.replace(/^\s+|\s+$/g, '')
      return html;
    }
  }()
  //  有了模版引擎，我们在管理器中实现就容易多了。为了使管理器更适合我们的MVP模式，我们对管理器稍加改动，添加管理器执行方法init,这样方便在任何时候执行我们的管理器，总的和MVC的控制层类似
  MVP.presenter = function() {
    var V = MVP.view;
    var M = MVP.model;
    var C = {}
    return {
      init: function() {
        // 遍历内部管理器
        for(var i in C) {
          C[i] && C[i](M, V, i)
        }
      }
    }
  }()
  MVP.init = function() {
    this.presenter.init()
  }
  window.MVP = MVP;
})(window)
```
### 视图的逆袭-MVVM模式
模型-视图-视图模型：为视图层量身定做的一套视图模型，并在视图模型中创建属性和方法，为视图层绑定数据并实现交互。   
```js
(function() {
  var window = this || (0, eval)('this')
  var FONTSIZE = function() {
    return parseInt(document.body.currentStyle ? document.body.currentStyle['fontSize'] : getComputedStyle(document.body, false)['fontSize'])
  }()
  var VM = function() {
    var Method = {
      // 进度条组件创建方法
      progressbar = function(dom, data) {
        var progress = document.createElement('div'), param = data.data;
        progress.style.width = (param.position || 100) + '%'
        dom.className += ' ui-progressbar'
        dom.appendChild(progress)
      },
      slider: function(dom, data) {
        var bar = document.createElement('span'),
        progress = document.createElement('div'),
        totleText = null,
        progressText = null,
        param = data.data,
        width = dom.clientWidth,
        left: dom.offsetLeft,
        realWidth = (param.position || 100) * width ? 100;
        dom.innerHTML = '';
        if (param.totle) {
          text = document.createElement('b')
          progressText = document.createElement('em')
          text.innerHTML = param.totle;
          dom.appendChild(text)
          dom.appendChild(progressText)
        }
        setStyle(realWidth)
        dom.className += ' ui-slider'
        dom.appendChild(progress)
        dom.appendChild(bar)
        function setStyle(w) {
          progress.style.width = w + 'px'
          bar.style.left = w - FONTSIZE / 2 + 'px'
          if(progressText) {
            progressText.style.left = w - FONTSIZE / 2 * 2.4 + 'px'
            progressText.innerHTML = parseFloat(w / width * 100).toFixed(2) + '%'
          }
        }
        bar.onmousedown = function() {
        
        }
      }
      }
    // 获取视图层渲染数据的映射信息
    function getBindData(dom) {
      var data = dom.getAttribute('data-bind')
      return !!data && (new Function("return ({" + data + "})"))()
    }
    // 组件实例化方法
    return function() {
      var doms = document.body.getElementsByTagName('*'),
      ctx = null;
      for(var i = 0; i < doms.length; i++) {
        ctx = getBindData(doms[i])
        ctx.type && Method[ctx.type] && Method[ctx.type](doms[i], ctx)
      }
    }
  }()
  window.VM = VM;
})()
```