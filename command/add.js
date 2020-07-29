/*
 * @Author: 
 * @Date: 2020-07-29 17:07:02
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-07-29 18:59:11
 * @Description: 
 */ 
'use strict'
// 定义脚手架的文件路径，__dirname是当前文件所在路径
process.env.NODE_PATH = __dirname + '/../node_modules/'
// 交互命令行
const inquirer = require('inquirer');
// 修改控制台字符串的样式
const chalk = require('chalk');
const fs = require('fs');
// 读取根目录下的template.json模板
const tplObj = require(`${__dirname}/../temp`) // {simple: ''}
// 自定义交互行的问题及简单的校验
module.exports = () => {
  let prompts = [
    {
      type: 'input',
      name: 'name',
      message: '请输入模板名称',
      validate(val) {
        if(val === '') {
          return 'Name is required!'
        }else if(tplObj[val]) {
          return 'Template has already existed!'
        }else{
          return true
        }
      }
    },{
      type: 'input',
      name: 'url',
      message: '请输入模板[git账户名]/[git仓库名],eg:wangAlisa/vue-temp',
      validate(val) {
        if(val === '') {
          return 'The url is required!'
        }else{
          return true
        }
      }
    }
  ]
  inquirer.prompt(prompts).then(answer => {
    // answer 就是用户输入的内容，是一个对象
    let {name, url} = answer;
    // 过滤 unicode 字符
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '');
    // 把模板信息写入 template.json文件中
    fs.writeFile(`${__dirname}/../temp.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if(err) console.log(chalk.red(err))
      console.log('\n')
      console.log(chalk.green('Added successfully! \n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
    })
  })
}

