---
title: commitlint-config-huatree
categories:
  - NPM包
tags:
  - NPM包
author:
  name: huatree
  link: https://github.com/huatree/dev-spec
---

# commitlint-config-huatree

:::tip
文档规范
:::

支持配套的 [markdownlint 可共享配置](https://www.npmjs.com/package/markdownlint#optionsconfig)。

## 安装

需要先行安装 [markdownlint](https://www.npmjs.com/package/markdownlint)：

```bash
npm i markdownlint-config-huatree markdownlint -D
```

## 使用

在 `.markdownlint.json` 中继承本包:

```json
{
  "extends": "markdownlint-config-huatree"
}
```
