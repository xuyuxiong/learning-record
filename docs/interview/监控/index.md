# 监控
[](https://juejin.cn/post/7097157902862909471#heading-1)
## 为什么要自研监控平台
- 可以实现前后端全链路API监控
- 接入公司缺陷管理平台(实现一系列的监控告警闭环流程)
- 方便团队做自定的UV用户识别，比如通过登录账号ID或者通过设备信息
- 方便做各维度数据的联合分析，比如发生错误可以联动查询用户行为追溯数据
- 方便做业务需求上的拓展，比如自定义埋点、特殊的数据分析维度
## 前端监控体系需要关注的点
- 页面的性能情况：包括各阶段加载耗时，一些关键性的用户体验指标
- 用户的行为情况：包括PV、UV、访问来路，路由跳转
- 接口的调用情况：通过http访问的外部接口的成功率、耗时情况
- 页面的稳定情况：各种前端异常
- 数据上报及优化：如何将监控捕获到的数据优雅的上报
## 页面性能-整体封装
```ts
// store.ts 
// 数据暂存
export enum metricsName {
  FP = 'first-paint',
  FCP = 'first-contentful-paint',
  LCP = 'largest-contentful-paint',
  FID = 'first-input-delay',
  CLS = 'cumulative-layout-shift',
  NT = 'navigation-timing',
  RF = 'resource-flow'
}

export interface IMetrics {
  [prop: string | number]: any;
}

export default class metricsStore {
  state: Map<metricsName | string, IMetrics>

  constructor() {
    this.state = new Map(metricsName | string, IMetrics)()
  }
  set(key: metricsName | stirng, value: IMetrics): void {
    this.state.set(key, value)
  }

  add(key: metricsName | string, value: IMetrics): void {
    const keyValue = this.state.get(key)
    this.state.set(key, keyValue ? keyValue.concat([value]) : [value])
  }

  get(key: metricsName | string): IMetrics | undefind {
    return this.state.get(key)
  }

  has(key: metricsName | string): boolean {
    return this.state.get(key)
  }

  clear() {
    this.state.clear()
  }

  getValues(): IMetrics {
    return Object.fromEntries(this.state)
  }
}
```
## 以用户为中心的性能指标
- FCP(首次内容渲染)
- LCP(最大内容绘制)
- CLS(累计布局偏移)
# 用户的基本信息
包括访问的网页路径、浏览器语种、屏幕大小
## 用户行为记录栈
- 路由跳转行为
- 点击行为
- ajax请求行为
- 用户自定义事件