/*
 * @Author: 
 * @Date: 2020-07-29 16:30:24
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-07-29 18:05:33
 * @Description: 
 */ 
const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const download =require('download-git-repo');
const tplObj = require(`${__dirname}/../temp.json`)
module.exports = () => {
  console.log(program.args, 'args');
  // 第一个参数是模板名称，第二个参数是项目名称
  let templateName = program.args[0];
  let projectName = program.args[1];
  if(!tplObj[templateName]) {
    console.log(chalk.red('\n Template does not exit! \n'))
    return
  }
  if(!projectName) {
    console.log(chalk.red('\n Project shold not be empty! \n'))
    return
  }
  let url = tplObj[templateName];
  console.log(url, '1111');
  console.log(chalk.white('\n Start generating... \n'))
  const spinner = ora('Downloading...');
  spinner.start();
  download (url, projectName, err => {
    if(err) {
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`))
    }else{
      spinner.succeed();
      console.log(chalk.green('\n Generation completed!'))
      console.log('\n To get started')
      console.log(`\n cd ${projectName} \n`)
    }
  })
}
