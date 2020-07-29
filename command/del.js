/*
 * @Author: 
 * @Date: 2020-07-29 17:41:21
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-07-29 18:14:17
 * @Description: 
 */ 
// 交互命令行
const inquirer = require('inquirer');
const chalk = require('chalk')
const fs = require('fs')
const tplObj = require(`${__dirname}/../temp`)
module.exports = () => {
  let prompts = [
    {
      name: 'name',
      message: '请输入要删除的模板名称',
      validate(val) {
        if(val === '') {
          return 'Name is required!'
        }else if(!tplObj[val]) {
          return 'Template does not exist!'
        }else{
          return true
        }
      }
    }
  ]
  inquirer.prompt(prompts).then(answer => {
    // answer 就是用户输入的内容
    let {name} = answer;
    delete tplObj[name];
    // 更新temp文件
    fs.writeFile(`${__dirname}/../temp.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if(err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Deleted successfully! \n'))
      console.log(chalk.grey('The latest template list is: \n'))
      if(Object.keys(tplObj).length) {
        console.log(tplObj)
      }else{
        console.log('没有可下载的模板了')
      }
      console.log('\n')
    })
  })
}
