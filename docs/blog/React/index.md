# Scheduler
[自底向上盘一盘 Scheduler](https://zhuanlan.zhihu.com/p/538378360)
SchedulerWithReactIntegration: Fiber调度
SchedulerHostConfig: 时间分片
scheduleCallback：任务注册
requestHostCallback：派发任务
shouldYieldToHost：及时中断
## Scheduler调度实现
优先级定义以及对应的过期时间
任务注册过程也是根据新任务优先级插入任务池的过程，计算过期时间 —> 构造节点对象 —> 插入任务池
