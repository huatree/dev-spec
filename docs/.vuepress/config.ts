import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config';

export default defineConfig4CustomTheme({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '前端守夜人',
      description: '前端编码规范工程化',
    },
  },
  base: '/dev-spec/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/index.md' },
      {
        text: '编码规范',
        items: [
          { text: 'HTML 编码规范', link: '/coding/html.md' },
          { text: 'CSS 编码规范', link: '/coding/css.md' },
          { text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
          { text: 'Node 编码规范', link: '/coding/node.md' },
          { text: 'Typescript 编码规范', link: '/coding/typescript.md' },
        ],
      },
      {
        text: '工程规范',
        items: [
          { text: 'Git 规范', link: '/engineering/git.md' },
          { text: '文档规范', link: '/engineering/doc.md' },
          { text: 'CHANGELOG 规范', link: '/engineering/changelog.md' },
        ],
      },
      {
        text: 'NPM包',
        items: [
          { text: 'markdownlint-config-huatree', link: '/npm/markdownlint.md' },
          { text: 'commitlint-config-huatree', link: '/npm/commitlint.md' },
          { text: 'stylelint-config-huatree', link: '/npm/stylelint.md' },
          { text: 'eslint-config-huatree', link: '/npm/eslint.md' },
          { text: 'eslint-plugin-huatree', link: '/npm/eslint-plugin.md' },
        ],
      },
      {
        text: '脚手架',
        items: [{ text: 'h-lint', link: '/cli/h-lint.md' }],
      },
    ],
    sidebar: [
      {
        title: '编码规范',
        children: [
          {
            title: 'HTML 编码规范',
            path: '/coding/html.md',
          },
          {
            title: 'CSS 编码规范',
            path: '/coding/css.md',
          },
          {
            title: 'JavaScript 编码规范',
            path: '/coding/javascript.md',
          },
          {
            title: 'Node 编码规范',
            path: '/coding/node.md',
          },
          {
            title: 'Typescript 编码规范',
            path: '/coding/typescript.md',
          },
        ],
      },
      {
        title: '工程规范',
        children: [
          {
            title: 'Git 规范',
            path: '/engineering/git.md',
          },
          {
            title: '文档规范',
            path: '/engineering/doc.md',
          },
          {
            title: 'CHANGELOG 规范',
            path: '/engineering/changelog.md',
          },
        ],
      },
      {
        title: 'NPM包',
        children: [
          { title: 'commitlint-config-huatree', path: '/npm/commitlint.md' },
          { title: 'markdownlint-config-huatree', path: '/npm/markdownlint.md' },
          { title: 'stylelint-config-huatree', path: '/npm/stylelint.md' },
          { title: 'eslint-config-huatree', path: '/npm/eslint.md' },
          { title: 'eslint-plugin-huatree', path: '/npm/eslint-plugin.md' },
        ],
      },
      {
        title: '脚手架',
        children: [{ title: 'h-lint', path: '/cli/h-lint.md' }],
      },
    ],
    logo: '/img/logo.jpg',
    repo: 'huatree/dev-spec',
    searchMaxSuggestions: 10,
    docsDir: 'docs',
    footer: {
      createYear: 2024,
      copyrightInfo:
        'huatree | <a href="https://github.com/huatree/dev-spec" target="_blank">github</a>',
    },
    extendFrontmatter: {
      author: {
        name: 'huatree',
        link: 'https://github.com/huatree/dev-spec',
      },
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/img/logo.jpg' }],
    [
      'meta',
      {
        name: 'keywords',
        content: '前端编码规范工程化',
      },
    ],
  ],
  plugins: <UserPlugins>[
    [
      'one-click-copy',
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: '复制成功',
        duration: 1000,
        showInMobile: false,
      },
    ],
    [
      'vuepress-plugin-zooming',
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)',
        options: {
          bgColor: 'rgba(0,0,0,0.6)',
        },
      },
    ],
  ],
  extraWatchFiles: ['.vuepress/config.ts'],
});
