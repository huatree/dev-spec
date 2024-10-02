# eslint-plugin-huatree

> 自定义 eslint 插件

## 安装

除了本包，你需要同时安装 [ESlint](https://eslint.org/)

```sh
npm i eslint-plugin-huatree eslint -D
```

## 使用

### 引入插件

```js
// .eslintrc.js
module.exports = {
  plugin: ['eslint-plugin-huatree'],
  rules: {
    'eslint-plugin-huatree/no-secret-info': 'error',
  },
};
```

### 使用 presets

或者，可以使用预设配置：

```js
// .eslintrc.js
module.exports = {
  extends: 'plugin:eslint-plugin-huatree/recommended',
};
```

## 支持的规则

- `no-broad-semantic-versioning` 不要指定宽泛的版本范围
- `no-http-url` 使用 HTTPS 协议头的 URL，而不是 HTTP
- `no-js-in-ts-project` 不要在 TS 项目中使用 JS
- `no-secret-info` 不要在代码中直接设置 `password` `token` and `secret` 信息
