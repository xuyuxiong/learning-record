Node.js是一个基于chrome v8引擎的javascript运行环境
解析、编译、堆管理垃圾回收机制、内存分配、安全机制

Node.js使用了事件驱动、非阻塞式IO模型、轻量高效
CRUD会直接在数据本体上进行处理，弊端有：
- CRUD会直接在数据本体上进行操作，会降低响应速度和性能水平，对进程的开销也会限制项目的规模和可拓展性
- 在存在大量并发用户的协作域中，对同一数据主体的操作可能会引起冲突
- 在没有额外监听措施的情况下，任何节点能够获得的只有当前状态快照
对比CURD，事件驱动的优势：
- 已经发生的事情不可更改，只在附加区域存储不影响主线程，对于性能优化和提升应用的可拓展性有利。
- 不同用户对于同一个对象的同时操作的不会产生冲突，因为这种数据处理方式避开了数据本身的直接更改。
- 附加区域中存储的事件流实际上提供了一个监听机制，使得开发者能够通过重演历史事件的方式来获取当前状态，进而有利于系统的测试和漏洞修复。

事件驱动的异步I/O模型使得Node.js非常适合用来处理I/O密集型应用：
web聊天室(socket.io) web博客 web论坛 前端管理平台(brower.js) 浏览器环境工具(browserify) 命令行工具(commander) 
```js
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 8080
const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  let extname = path.extname(pathname)
  if (pathname === '/' ) {
    res.writeHead(200, {"Content-Type": 'text/html'})
    res.end(fs.readFileSync(path.join(__dirname, pathname, 'index.html')))
  } els if (extname === '.jpg' || extname === '.png') {
    res.writeHead(200, {"Content-Type": 'image/' + extname.substr(1)})
  } else {
    res.statusCode = 404;
    res.end()
  }
})
server.listen(port, hostname, () => {
  console.log('server running at http://localhost:8080')
})
```

npm 常用命令
npm access 设置模块的访问级别
npm adduser 添加用户
npm cache 管理模块缓存
npm config 管理NPM配置文件
npm help 查看NPM的帮助信息
npm init 
npm install
npm ls
npm publish 发布模块
npm root 显示NPM根目录
npm start 启动模块
npm test
npm update
npm version

app.use(async ctx => {
  ctx;
  ctx.request;
  ctx.response;
  this;
  this.request;
  tihs.response;
})

```js
const koa = require('koa')
const app = new koa()
app.use(async ctx => {
  ctx.response.body = {
    url: ctx.request.url,
    query: ctx.request.query,
    querystring: ctx.request.querystring
  }
})
app.listen(3000)
```

```js
const koa = require('koa')
const app = new koa()
app.use(async ctx => {
  if (ctx.request.method === 'POST') {

  } else if (ctx.request.method === 'GET') {
    if (ctx.request.path !== '/') {
      ctx.response.type = 'html'
      ctx.response.body = '<a href="/">Go To Index</a>'
    } else {
      ctx.response.body = 'hello world'
    }
  }
})
app.listen(3000)
```
## 中间件
洋葱模型
```js
app.use(async function(ctx, next) {
  console.log('one start')
  await next()
  console.log('one end')
})
app.use(async function(ctx, next) {
  console.log('two start')
  await next()
  console.log('two end')
})
```
如果想把多个中间件组合成一个单一的中间件，可以使用koa-compose
```js
const compose = require('koa-compose')
const all = compose([middleware1, middleware2])
app.use(all)
```
使用中间件获取响应时间
```js
const koa = require('koa')
const app = new koa()
app.use(async (ctx, next) => {
  let stime = new Date().getTime()
  await next()
  let etime = new Date().getTime()
  ctx.response.type = 'text/html'
  ctx.resonse.body = '<h1>hello world</h1>'
  console.log(`响应时间：${etime - stime}ms`)
})
app.use(async(ctx, next) => {
  console.log('中间件doSoming')
  await next()
  console.log('中间件执行over')
})
```

### 常用的koa中间件
koa-bodyparser
```js
const koa = require('koa')
const app = new koa()
const bodyParser = require('koa-bodyparser')
app.use(bodyparser)
app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.type = 'html'
    let html = `
    <h1>登录</h1>
    <form></from>`
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    ctx.body = postData
  }
})
```
koa-router中间件
```js
const koa = require('koa')
const app = new koa()
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const router = new Router()
router.get('/', (ctx, next) => {

})
router.post('/', (ctx, next) => {

})
app.use(bodyParser).use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```
koa-static
koa-views
```js
const koa = require('koa')
const views = require('koa-views')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const Router = require('koa-router')
const app = new koa()
const router = new Router()
app.use(views(__dirname + '/views', {
  map: {html: 'ejs'}
}))
app.use(static(path.join(__dirname, '/static')))
router.get('/', async(ctx, next) => {
  await ctx.render('index')
})
rotuer.post('/', (ctx, next) => {
  let postData = ctx.request.body;
  ctx.body = postData;
})
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

// 路由的通用处理
class Router {
  constructor() {
    this._routes = []
  }
  get(url, handler) {
    this._routes.push({
      url: url,
      method: 'GET',
      handler
    })
  }
  rotues() {
    return async (ctx, next) => {
      const {method, url} = ctx
      const matchedRouter = this._routes.find(r => r.method === method && r.url === url)
      if (matchedRouter && matchedRouter.handler) {
        await matchedRouter.handler(context, next)
      } else {
        await next()
      }
    }
  }
}
```

REST设计一般符合以下条件：
- 程序或应用的事物都应该被抽象为资源
- 每个资源对应唯一的URI
- 使用统一的接口对资源继续操作
- 对资源的各种操作不会改变资源标识
- 所有的操作都是无状态的

```js
多中间件
router.get('/users/:id', (ctx,next) => {
  return User.findOne(ctx.param.id).then(function(user) {
    ctx.user = user;
    next()
  })
}, (ctx. next) => {
  console.log(ctx.user)
})
```
## koa-rotuer权限控制
基于koa-jwt
```js
const { sign } = require('jsonwebtoken')
const secret = 'demo' // 密钥
const jwt = require('koa-jwt')({secret}) // 构造JWT
router.post('/api/login', async (ctx, next) => {
  const user = ctx.request.body;
  if (user && user.username) {
    let {username} = user;
    const token = sign({username}, secret, { expiresIn: '1h'})
    ctx.body = {
      message: 'Get Token Succes',
      code: 1,
      token
    }
  } else {
    ctx.body = {
      message: 'param error',
      code: -1
    }
  }
})
.get('/api/userInfo', jwt, async ctx => { // 获取用户信息需要校验
  ctx.body = { username: ctx.state.user.username}
})
// admin中间件会对用户的身份进行判断
.get('/api/adminInfo', jwt, admin, async ctx=> {
  ctx.body = {username: ctx.state.user.username}
})

// admin中间件
module.exports = () => {
  return async (ctx, next) => {
    if (ctx.state.user.username === 'admin') {
      next()
    } else {
      ctx.body = {
        code: -1,
        message: 'Authentication Error'
      }
    }
  }
}

// 利用koa-router的嵌套路由 在URL地址的某个层级上进行权限控制，减少接口的重复设置
const user = new Router()
const detail = new Router()
detail.get('/info', async ctx => {
  ctx.body = {username: ctx.state.user.username}
})
// 将权限控制放在/api/user层级
user.use('/api/user', jwt, detail.routes(), detail.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
```

## HTTP
HTTP/1.1相比1.0改进：
- 默认使用持久连接
- 引入管道方式支持多请求发送
- 请求头增加host字段 使一台物理服务器中可以存在多个虚拟主机，共享同一IP地址
- 响应头增加Transfer-Endoding字段，引入了chunked分块传输编码机制
- 增加Cache-Control头域 缓存机制更加灵活强大
- 增加Content-Range头域，实现带宽优化
- 新增多种请求方法：OPTIONS TRACE CONNECT
- 新增24个HTTP状态码 203 205 206 303 035 306 307
### URI和URL
URI：Uniform Resource Identifier(统一资源标识符)
URL：Uniform Resource Locator(统一资源定位符)
URL是URI的子集
URL由7个部分组成：
schema:使用的协议
user:表示访问资源的用户名和密码
host: 主机
port: 端口号
path: 访问资源的路径
query: 请求数据，以？开头
fragment: 定位锚点
### 常用的请求方法
http1.1
GET POST HEAD PUT DELETE CONNECT OPTIONS TRACE PATCH 
### 常用的HTTP首部字段：
User-Agent: HTTP客户端程序的信息
Last-Mofified：资源的最后修改日期和时间
Content-Length: 实体主体的大小，单位为字节
Content-Encoding: 实体主体适用的编码方式，gzip compress deflate identity
Content-Type: 主体的媒体类型 image/png application/x-javascript text/html
Expires: 实体主体过期的日期和时间
Set-Cookie: 开始状态管理所使用的Cookie信息
Cookie: 服务器接收到的Cookie信息
Cache-Control: 控制缓存的行为
ETag: 资源的匹配信息
Vary： 代理服务器缓存的管理信息
Server: HTTP服务器的安装信息
### HTTP/2
- 采用二进制格式传输数据，之前的HTTP/1.*均采用文本格式传输
- 多路复用
在HTTP/1.0中并发多个请求需要创建多个TCP连接，并且单个域名限制为6个
HTTP/1.1引入了流水线技术，但先天的FIFO机制导致当前请求的执行依赖于上一个请求执行的完成，容易造成阻塞
HTTP/2允许在同一个连接上使用请求和响应双向数据流，同一个域名只占用一个TCP连接，减少了内存消耗提升了性能。
- 流的优先级
可以给每个流设置优先级，高优先级的流会被服务优先处理并返回给客户端，客户端可以在设置优先级帧来改变流的优先级。
- 首部压缩
引入了HPACK压缩首部数据
- 服务端推送

实战：电影搜索列表
server对象search方法获取远端搜索电影列表信息
```js
const Service = {
  search: async (kw = '') => {
    return new Promise((resolve, reject) => {
      Http.request({
        hostname: 'm.maoyan.com',
        path: '/ajax/search?' + QueryString.stringify({
          kw,
          cityId: 10
        })
      }, res => {
        res.setEncoding('utf8')
        let data = []
        res.on('data', chunk => {
          data.push(chunk)
        }).on('end', () => {
          resolve(data.join(''))
        })
      })
    })
  }
}
```
## 数据库
- 关系型数据库
把复杂的数据结构归结为简单的二维表格形式，表格之间的数据关系通过主外键关系来维系，这样的数据库就成为关系型数据库。
- 非关系型数据库
和关系型数据库对应，在某些业务场景下，需要存储的数据并不能简单的抽象为二维表格，存储的数据字段并不能确定。
MongoDB: 文档导向的数据库，可以直接存储对象，不需要限定存储的数据格式
Redis: 基于内存的可持久化的键值对存储数据库。
### Sequelize
不需要编写SQL脚本，直接通过访问对象的方式来查询、更新数据
```js
const Sequelize = require('sequelize')
const sequelize = new Sequelize('databaseName', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})
sequelize.authenticate().then(() => { // 校验数据库连接

}).catch(err => {

})
// 定义名为category的模型
const Categoty = sequelize.define('category', {
  id: Sequelize.UUID, // 类型为UUID
  name: Sequelize.STRING // 类型为String
})

const Project = sequelize.define('project', {
  name: {
    type: Sequelize.String,
    allowNull: false, // 不能为空
    unique: true // 必须唯一
  }
})

const Product = sequelize.define('product', {
  name: Sequelize.STRING
}, {
  timestamps: false, // 禁止创建CreateAt和UpdateAt字段
  updateAt: 'updateTimestamp', // 创建updateTimestamp字段替代UpdateAt 字段
  tableName: 'my_product' // 修改创建的数据表名称为my_product
})

// 在定义模型时，也可以为字段定义Getter和Setter，这样既可以定义计算字段，也可以定义写入数据的规则
const Custom = sequelize.define('custom', {
  name: {
    type: Sequelize.STRING,
    get() { // 定义getter可以自定义获取数据
      const title = this.getDataValue('title')
      return `${this.getDataValue('name')} (${title})`
    }
  },
  title: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('title', val.toUpperCase())
    }
  }
})

// 通过sync方法将定义的模型同步到数据库中，既可以同步单个表，也可以同步全部表
sequelize.sync().then(() => {

}).catch(error => {

})
Product.sync()
Project.sync({force: true})

// 查询
await Product.findAll()
await Project.findAll({
  attributes: ['name', 'date']
})
// 通过where参数来配置查询条件
const { Op } = require('sequlize')
await Project.findAll({
  where: {
    name: {
      [Op.like]: 't%' // 查询操作为like，值为't'
    }
  }
})

await Product.findAll({
  where: {
    createdAt: {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
    }
  }
})

await Product.findAll({
  where: {
    [Op.or]: {
      name: {
        [Op.eq]: 'test'
      },
      createdAt: {
        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    }
  }
})
```
实战数据演练：客户信息数据
```js
const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM(['男', '女'])，
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  }
  fullAddress: {
    get() {
      return `${this.getDataValue('counter')}`
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: fasle
  },
  country: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  }
})

// 通过操作定义的数据模型来实现这些功能
const {Op} = require('sequelize')
async function getAllCustomers() {
  return Customer.findAndCountAll({
    attributes: ['id', 'name', 'sex', 'fullAddress'],
    orderP [
      {'updatedAt', 'DESC'}
    ]
  })
}
async function getCustomerById(id) {
  return Customer.findById(id)
}
async function getCustomerByName(name) {
  return Customer.findAll({
    where: {
      name: {
        [Op.like]: '${name}%'
      }
    }
  })
}
// 更新数据
async function updateCustomer(id, customer) {
  const item = await getCustomerById(id)
  if (item) {
    return item.update(customer)
  } else {
    throw new Error('the customer with id is not exist')
  }
}

async function createCustomer(customer) {
  return Customer.create(customer)
}

async function deleteCustomer(id) {
  const customer = await getCustomerById(id)
  if (customer) {
    return customer.destory()
  }
}
```