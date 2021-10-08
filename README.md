# 轻量级提示框 vue-toastification-mini

> 参照简书开发的轻量级toast  ，
>
> 支持Vue2 暂不支持Vue3

## Installing

```bash
 npm install vue-toastification-mini -S
```

### Using

```bash
# 全局注册
import vueToastificationMini from 'vue-toastification-mini'
import 'vue-toastification-mini/dist/vue-toastification-mini.css'
Vue.use(vueToastificationMini)

# 按需引入
import {message,notification} from 'vue-toastification-mini'
```

#### Message Api

组件提供了一些静态方法，使用方式和参数如下：

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.warn(content, [duration], onClose)`  // alias of warning
- `message.loading(content, [duration], onClose)`

| 参数     | 说明                                          | 类型                         | 默认值 |
| -------- | --------------------------------------------- | ---------------------------- | ------ |
| content  | 提示内容                                      | string\|VNode \|(h) => VNode | -      |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭。 | number                       | 3      |
| onClose  | 关闭时触发的回调函数                          | Function                     | -      |

全局方法

还提供了全局配置和全局销毁方法：

- `message.config(options)`
- `message.destroy()`

#### message.config

```javascript
message.config({
  top: `100px`,
  duration: 2,
  maxCount: 3,
});

or 


this.$message.config({
  top: `100px`, // 消息距离顶部的位置 默认24px
  duration: 2, // 默认自动关闭延时，单位秒
  maxCount: 3, // 最大显示数, 超过限制时，最早的消息会被自动关闭         
})
```

## Notification API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.open(config)`
- `notification.close(key: String)`
- `notification.destroy()`

| 参数         | 说明                                                         | 类型                           | 默认值              | 版本 |
| ------------ | ------------------------------------------------------------ | ------------------------------ | ------------------- | ---- |
| btn          | 自定义关闭按钮                                               | vueNode \|function(h)          | -                   |      |
| bottom       | 消息从底部弹出时，距离底部的位置，单位像素。                 | string                         | `24px`              |      |
| class        | 自定义 CSS class                                             | string                         | -                   |      |
| description  | 通知提醒内容，必选                                           | string \|vueNode \|function(h) | -                   |      |
| duration     | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭              | number                         | 4.5                 |      |
| getContainer | 配置渲染节点的输出位置                                       | () => HTMLNode                 | () => document.body |      |
| icon         | 自定义图标                                                   | vueNode \|function(h)          | -                   |      |
| key          | 当前通知唯一标志                                             | string                         | -                   |      |
| message      | 通知提醒标题，必选                                           | string \|vueNode \|function(h) | -                   |      |
| placement    | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` | string                         | topRight            |      |
| style        | 自定义内联样式                                               | Object \| string               | -                   |      |
| onClose      | 点击默认关闭按钮时触发的回调函数                             | Function                       | -                   |      |
| onClick      | 点击通知时触发的回调函数                                     | Function                       | -                   |      |
| top          | 消息从顶部弹出时，距离顶部的位置，单位像素。                 | string                         | `24px`              |      |
| closeIcon    | 自定义关闭图标                                               | VNode \| function(h)           | -                   |      |

还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

##### notification.config(options)

```js
notification.config({
  placement: 'bottomRight',// placement 弹出位置，可选 topLeft topRight bottomLeft bottomRight
  bottom: '50px', // 消息从底部弹出时，距离底部的位置，单位像素。
  duration: 3, // 默认自动关闭延时，单位秒
  // getContainer  配置渲染节点的输出位置 默认 () => document.body
  // top 消息从顶部弹出时，距离顶部的位置，单位像素。 默认24px  
  // closeIcon 自定义关闭图标 
});
```



