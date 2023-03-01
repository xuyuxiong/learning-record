# 移动端统一表单方案
## 设计思想
核心逻辑和目标：基于schema抹平h5和小程序的差异
特性：
- 支持h5、小程序
- 表单校验
- 表单详情页
- 分块表单
- 分组子表单
- 控件联动
- 卡片风格、弹窗表单
## 使用
```js
import XFrom from 'x-form'
Vue.component('x-form', XFrom)
```
示例
```vue
<template>
  <x-form v-model="form" :schema="schema" ref="form" />
</template>

<script>
  export default {
    data () {
      return {
        form: {
          key: value,
          ...
        }
        schema: [
          [
            {
              type: 'input',
              label: 'xxx',
              field: 'xxx',
              required: true,
              max: 20
            },
            ...
          ]
        ]
      }
    },

    methods: {
      input (val) {
        console.log('val: ', val)
      },
      getData () {
        const { validate, getData, getDataValid } = this.$refs.form
        if (validate !== false) {
          const data = getData()
          const validData = getDataValid()
          console.log(data, validData)
        }
      }
    }
  }
</script>
```