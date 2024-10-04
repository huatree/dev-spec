# commitlint-config-huatree

> Git 规范

支持配套的 [commitlint 配置](https://commitlint.js.org/#/concepts-shareable-config)，用于对 `git commit message` 进行校验。

## 安装

使用时，需要安装 [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)：

```bash
npm install commitlint-config-huatree @commitlint/cli --save-dev
```

## 使用

在 `commitlint.config.js` 中集成本包:

```javascript
module.exports = {
  extends: ['commitlint-config-huatree']
};
```

## 使用 git hooks 管理器

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

> 注意
> 以下说明旨在husky@v9如果您使用的是其他版本，请查阅您版本的官方文档。

先安装 husky，再初始化：

```sh
npm install --save-dev husky
npx husky init
```

设置在`git commit` 时触发 `commitlint`：

```sh
# Add commit message linting to commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

或者，您可以在 package.JSON 中创建脚本

```sh
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

> 警告
> 对于 Windows 用户：确保所有 Husky 文件都采用 UTF-8 编码。如果使用任何其他格式，则可能会在运行时引发错误，例如无法执行二进制文件。

更多信息，详见 [commitlint 文档](https://commitlint.js.org/guides/local-setup.html#using-a-git-hooks-manager)。
