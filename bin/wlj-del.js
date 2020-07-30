#!/usr/bin/env node --harmony
const program = require('commander')
/*
command 执行的命令
description 为命令的描述
alias 简写
action 命令响应的操作
*/
program
    .alias('d')
    .action(() => {
      // 如果有选项被放在program.args,即没有被program.parse处理，则默认使用program.help()将npm包可以执行的命令打印出来
      // 可以通过program.on('--help',function(){})来自定义help
      if(program.args.length === 0) {
        require('../command/del.js')()
      }else{
        program.help()
      }
    })
// program.parse(arguments)会处理参数，没有被使用的选项会被存放在program.args数组中
program.parse(process.argv)
