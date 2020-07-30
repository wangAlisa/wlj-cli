#!/usr/bin/env node
const tplObj = require(`${__dirname}/../temp.json`)
const {exec} = require('child_process')
const inquirer = require('inquirer')
if(Object.keys(tplObj).length) {
  console.log(tplObj)
}else{
  console.log('还未添加模板\n')
  inquirer.prompt([{
    type: 'input',
    name: 'isAdd',
    message: '是否添加新模板？',
    default: 'y or n'
  }]).then((answer) => {
    if(answer.isAdd ==='y') {
      require('../command/add.js')()
    }else{
      process.exit();
    }
  })
}
