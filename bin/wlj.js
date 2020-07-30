#!/usr/bin/env node
const program = require('commander')
// 定义当前版本
// 定义使用方法
// 编写四个指令
program
  .version(require('../package.json').version) // 获取package.json中version来作为项目的版本号
  .usage('<command> [options]') // 定义脚手架的用法，在program.help方法中会使用
  .command('add', 'add a new template')
  .command('del', 'delete a template')
  .command('list', 'list all the template')
  .command('init', 'init a based project')

// 解析命令行参数
program.parse(process.argv)