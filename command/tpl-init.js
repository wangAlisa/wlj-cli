/*
 * @Author: 
 * @Date: 2020-07-21 17:09:56
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-07-29 18:36:52
 * @Description: 
 */ 
const inquirer = require('inquirer')
const chalk = require('chalk')
const {exec} = require('child_process')
chalk.level = 3 // 设置chalk等级为3
const fs = require('fs')
const ejs = require('ejs')
const download =require('download-git-repo');
const ora = require('ora');


module.exports = () => {

  let prompt = [
    {
      type: 'input', // 问题类型为填空题
      message: 'your projectName:', // 描述问题
      name: 'projectName', // 问题答案对应的属性，用户输入的内容被存储在then方法中第一个参数对应的该属性中
      validate: val => {
        if(val === '') {
          return chalk.red('项目名不能为空，请重新输入')
        }
        return true
      }
    },{
      type: 'input',
      message: 'your version',
      name: 'version',
      default: '1.0.0'
    },
    {
      type: 'list',
      message: 'vue version:',
      name: 'vueVersion',
      choices: [
        {
          name: 'vue3', 
          value: 'vue3'
        },{
          name: 'vue2', 
          value: 'vue2'
      }]
    } 
  ]

  inquirer.prompt(prompt).then(answer1 => {
    if(answer1.vueVersion == "vue2") {
      let prompts = [
        {
          type: 'confirm',
          message: 'use vueX?',
          name: 'useVuex',
          default: true
        },
        {
          type: 'confirm',
          message: 'use vue router?',
          name: 'useVueRouter',
          default: true
        },
        {
          type : 'list',
          message: 'the UI fragment:',
          name: 'UIfrag',
          choices: [{
            name: 'no UI fragment', 
            value: 'none'
          },
          {
            name: 'element-ui',
            value: 'eleUI'
          }]
        },
        {
          type: 'list',
          message: 'the css preprocessing language:',
          name: 'cssPrep',
          choices: [
            {
              name: 'no preprocess', 
              value: 'none'
            },{
              name: 'less',
              value: 'less'
            },{
              name: 'sass',
              value: 'sass'
            }]
        }
      ]
      inquirer.prompt(prompts).then(answer => { // 通过用户的输入进行各种操作
        answer = {...answer1, answer};
        console.log(chalk.green('开始初始化文件\n'))
        console.log(chalk.gray('初始化中...'))
        const gitUrl = 'https://github.com/wangAlisa/vue-temp.git'
        exec(`git clone ${gitUrl} ${answer.projectName}`, (error, stdout, stderr) => {
          console.log('模板下载完毕')
          if(error) { // 当有错误的时候打印出错误并退出操作
            console.log('error: ', error);
            console.log(chalk.red('拷贝文件失败'))
            process.exit()
          }
          // 当配置vuex的时候进行的操作
          if(answer.useVuex) {
            fs.mkdirSync(`${process.cwd()}/${answer.projectName}/src/store`)
            fs.mkdirSync(`${process.cwd()}/${answer.projectName}/src/store/modules`)
            fs.mkdirSync(`${process.cwd()}/${answer.projectName}/src/store/modules/module`)
            let moduleFiles = ['index.js', 'modules/module/actions.js', 'modules/module/getters.js','modules/module/index.js', 'modules/module/mutations.js','modules/module/state.js']
            moduleFiles.forEach(val => {
              let fileData = fs.readFileSync(__dirname+`/../templates/vuex/${val}`)
              fs.writeFileSync(`${process.cwd()}/${answer.projectName}/src/store/${val}`, fileData)
            })
            console.log(chalk.green('vuex配置完成'));
          }
          // 当配置vue-router时进行操作
          if(answer.useVueRouter) {
            fs.mkdirSync(`${process.cwd()}/${answer.projectName}/src/router`)
            let moduleFiles = ['router/index.js']
            moduleFiles.forEach(val => {
              let fileData = fs.readFileSync(__dirname+ `/../templates/vue-router/${val}`)
              fs.writeFileSync(`${process.cwd()}/${answer.projectName}/src/${val}`, fileData)
            })
            console.log(chalk.green('vue-router配置完成'))
          }else{
            exec(`rm -rf ${answer.projectName}/src/views`)
          }
          let files = ['public/index.html','src/App.vue','src/main.js','package.json', 'README.md']
          new Promise(resolve=>{
              files.forEach((val,index)=>{
                  ejs.renderFile(`${answer.projectName}/${val}`,answer,(err,str)=>{
                      fs.writeFile(`${answer.projectName}/${val}`,'',()=>{
                          if(index===files.length-1){
                              resolve()
                          }
                      })
                  })
              })
          }).then(()=>{
              exec(`cd ${answer.projectName} && npm install`,(err,stdout,stderr)=>{
                  console.log(chalk.green('依赖包下载完毕'))
                  if (error) { // 当有错误时打印出错误并退出操作
                      console.log(chalk.red('拷贝文件失败'))
                      process.exit()
                  }
                  console.log(chalk.green('初始化完成'))
                  process.exit() // 退出这次命令行操作
              })
          })
        })
      })
    }else{
      const spinner = ora('Downloading...');
      spinner.start();
      download ('wangAlisa/vue3.0-ts-elementPlus', answer1.projectName, err => {
        if(err) {
          spinner.fail();
          console.log(chalk.red(`Generation failed. ${err}`))
        }else{
          spinner.succeed();
          console.log(chalk.green('\n Generation completed!'))
          console.log('\n To get started')
          console.log(`\n cd ${answer1.projectName} \n`)
        }
      })
    }
  });
}
