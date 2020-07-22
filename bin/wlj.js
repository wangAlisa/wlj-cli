#!/usr/bin/env node --harmony
'use strict'
// 定义脚手架的文件路径，__dirname是当前文件所在路径
process.env.NODE_PATH = __dirname + '/../node_modules/'
const program = require('commander')

// 获取package.json中version来作为项目的版本号
program.version(require('../package').version)
// 定义脚手架的用法，在program.help方法中会使用
program.usage('<command>')
/*
command 执行的命令
description 为命令的描述
alias 简写
action 命令响应的操作
*/
program
      .command('init')
      .description('init a vue-based project')
      .alias('i')
      .action(() => {
        require('../command/init.js')()
      })
// program.parse(arguments)会处理参数，没有被使用的选项会被存放在program.args数组中
program.parse(process.argv)
// 如果有选项被放在program.args,即没有被program.parse处理，则默认使用program.help()将npm包可以执行的命令打印出来
// 可以通过program.on('--help',function(){})来自定义help
if(program.args.length) {
  program.help()
}