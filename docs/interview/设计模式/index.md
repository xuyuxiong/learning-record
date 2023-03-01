# 设计模式

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