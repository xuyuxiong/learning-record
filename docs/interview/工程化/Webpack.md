# Webpack
## webpack5新特性
[一文吃透 Webpack 核心原理](https://mp.weixin.qq.com/s/SbJNbSVzSPSKBe2YStn2Zw)
[Webpack5 上手测评](https://juejin.cn/post/6844904169405415432)
[打包构建全流程]https://juejin.cn/post/7031546400034947108
[webpack优化](https://juejin.cn/post/6844903924806189070)
```js
// 简易版webpack
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')
const options = require('./webpack.config')

const Parser = {
  getAst: path => {
    const content = fs.readFileSync(path, 'utf-8')
    return parser.parse(content, {
      sourceType: 'module'
    })
  },
  getDependecies: (ast, filename) => {
    const dependecies = {}
    // 遍历所有的import模块，存入dependecies
    traverse(ast, {
      ImportDeclaration({node}) {
        const dirname = path.dirname(filename)
        const filepath = './' + path.join(dirname, node.source.value)
        // 保存依赖模块路径，之后生成依赖关系图需要用到
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },
  getCode: ast => {
    const {code} = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}
class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry;
    this.output = output;
    this.modules = []
  }
  run() {
    const info = this.build(this.entry)
    this.modules.push(info)
    this.modules.forEach(({ dependecies }) => {
      if (dependecies) {
        for(const dependency in dependecies) {
          this.modules.push(this.build(dependecies[dependency]))
        }
      }
    })
    const dependencyGraph = this.modules.reduce((graph, item) => ({
      ...graph,
      [item.filename]: {
        dependecies: item.dependecies,
        code: item.code
      }
    }),
    {})
  },
  build(filename) {
    const ast = Parser.getAst(this.entry)
    const dependecies = Parser.getDependecies(ast, this.entry)
    const code = Parser.getCode(ast)
    return {
      filename,
      dependecies,
      code
    }
  }
  generate(code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const bundle = `(function(graph) {
      function require(module) {
        return require(graph[module].dependecies[relativePath]);
        return exports;
      }
      require('${this.entry}')
      })(${JSON.stringify(code)})`
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}
new Compiler(options).run()

// webpack.config.js
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  }
}
```
## webpack 拆包 打包加速优化 dll plugins 图片资源优化

## tree shaking实现
[](https://blog.csdn.net/zjjcchina/article/details/121159109)
## 常见的loader、plugin

## bundle、chunk、module

## webpack构建流程

## 编写loader和plugin的思路
[编写loader和plugin](https://www.jianshu.com/p/9f4ba97582c8)
## 如何用webpack优化前端性能
[如何借助webpack来优化前端性能](https://blog.csdn.net/m0_69892739/article/details/128579662)
1. JS代码压缩：webpack默认使用TerserPlugin来处理我们的代码
2. CSS代码压缩：css-minimizer-webpack-plugin
3. HTML代码压缩
4. 文件大小压缩
5. 图片压缩
6. tree shaking
7. 代码分离
8. 内联chunk
## 如何提高Webpack构建速度
1. CommonsChunkPlugin来提取公共代码
2. externals 配置来提取常用库
3. 利用DllPlugin和DllReferencePlugin预编译资源模块通过DllPlugin来对那些我们引用但是绝对不会修改的npm包进行预编译，再通过DllReferencePlugin将预编译的模块加载进来
4. Happyack实现多线程加速编译
5. webpack-uglify-parallel(多核并行压缩来提升压缩速度)提升uglifyPlugin的压缩速度
6. tree-shaking和scoped hoisting来剔除多余的代码
## 热更新原理
[热更新](https://blog.csdn.net/weixin_37722222/article/details/99615479)
## Webpack Proxy工作原理 为什么能解决跨域
[热更新](https://www.cnblogs.com/houxianzhou/p/14743623.html)
## Webpack利用什么机制分包
[](https://blog.csdn.net/qianyu6200430/article/details/110102314)
## 对SourceMap的了解
[](https://zhuanlan.zhihu.com/p/460484117)
1. source map是源代码和编译后代码的一种映射关系
2. 只要进行代码编译/转换 都可以产生这种映射关系
3. sourcemap常常以注释 + URL的形式出现在脚本文件最后，可以直接放在脚本中，也可以独立成一个文件，按需使用
4. 预编译的sourcemap,只要不在node_modules库中，可以直接解析合并载入
5. 位于node_modules库中或者其他形式的sourcemap可以通过webpack插件source-map-loader实现合并载入
6. sourcemap在代码还原，可以用mozilla库的source-map的API实现解析
## 如何做到类似于JSX语法的sourcemap定位

## Webpack文件指纹策略
文件指纹就是打包后的文件名的后缀
文件指纹有三种类型：
- hash
和整个项目的构建有关，只要项目文件有修改，整个项目构建的hash就会修改
- ChunkHash
chunkHash和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值，chunkhash只用于生产环境，热更新的时候不会生成
- ContentHash
文件内容变动则contentHash变动
## 模块联邦
[](https://juejin.cn/post/7119298510247165965)

## Webpack的事件流和插件机制
[](https://juejin.cn/post/6918998088010956807)
[](https://zhuanlan.zhihu.com/p/134224806)
## 什么是事件流
[](https://juejin.cn/post/6918998088010956807)
webpack就像一条生成线，要经过一系列的处理流程后才能将源文件转换成输出结果。这条生产线上的每个处理流程的职责都是单一的，多个流程之间存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。webpack通过tapable来组织这条复杂的生产线。webpack在运行过程中会广播事件，插件只需要关心它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。webpack的事件流机制保证了插件的有序性，使得整个系统的拓展性很好。
```js
// 统计组件被页面使用的情况
class NormalModuleFactory {
  constructor() {
    this.dependencies = {}
    this.entry = ''
    this.workDictory = ""
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('NormalModuleFactory', (nmf) => {
      nmf.hooks.afterResolve.tapAsync('nmf', (result, callback) => {
        let { request, contextInfo, context } = result
        if (!request.includes('node_modules')) {
          if (!contextInfo.issuer) {
            console.log('entry', path.normalize(request))
            this.entry = request
            this.workDictory = context
          } else if(!['react', 'react-dom'].includes(request)){
            // 有依赖项 contextInfo 是请求资源的上下文
            const requestPath = path.relative(this.workDictory, contextInfo.issuer)
            // './component/Hello   requestPath: src/index.js
            if(!requestPath.includes("node_modules")) {
              const resourcePath = path.join(context, request)
              console.log(requestPath, request)
              request = path.relative(this.workDictory, resourcePath)
              if(!this.dependencies[request]) {
                this.dependencies[request] = [requestPath]
              } else {
                this.dependencies[request].push(requestPath)
              }
            }
          }
        }
        callback()
      })
    })
    compiler.hooks.done.tap('NormalModuleFactory', () => {
      console.log(this.dependencies)
    })
  }
}

module.exports = NormalModuleFactory
```
## webpack动态加载的原理