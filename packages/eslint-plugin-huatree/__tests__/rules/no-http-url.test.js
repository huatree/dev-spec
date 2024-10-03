'use strict';

const rule = require('../../rules/no-http-url');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://wyh.huatree.top';",
    },
  ],

  invalid: [
    {
      code: "var test = 'http://wyh.huatree.top';",
      output: "var test = 'http://wyh.huatree.top';",
      errors: [
        {
          message: 'Recommended "http://wyh.huatree.top" switch to HTTPS',
        },
      ],
    },
    {
      code: "<img src='http://wyh.huatree.top' />",
      output: "<img src='http://wyh.huatree.top' />",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'Recommended "http://wyh.huatree.top" switch to HTTPS',
        },
      ],
    },
  ],
});
