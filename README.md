<!--
 * @Author: 
 * @Date: 2020-07-21 19:41:42
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-07-29 19:02:31
 * @Description: 
--> 
# wlj-cli
用于从github上拉取模板到本地的脚手架工具  
```
npm i wlj-cli -g
```
来下载到全局

使用
```
wlj init
```
来初始化项目

# help说明
Open your terminal and type `wlj`, you'll see the help infomation below:
```
  Usage: wlj <command>

  Commands:

    add       Add a new template
    del       Delete a template
    list      List all the templates
    init      Init a based project

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> Note that if you are using `MacOS`, `sudo` was required while using commands `add` and `del`.


## 1.0.0
实现基本功能

修改了生成后的package.json相关内容
增加对版本的提问
在模板下载后自动执行npm i将依赖包下载到node_modules中

增加了ejs的模板渲染，修改index.html，package.json等文件的相关内容
增加了是否启用vuex的选择
增加了模板文件，在启用vuex的时候将模板文件写入
## 1.1.0
增加对App.vue的ejs模板处理
增加对UI框架的配置
增加对css预处理语言的配置

## 2.0.0
增加命令 list 提示
增加添加模板、删除模板功能
增加模板wlj add <模板名称><项目名称>的方式初始化项目

## 后续
增加已有模板list方便使用模板
完善2.0.0版本功能
敬请期待。。。

## 小小故事
我在开始写wlj-cli@1.0.0 版本的时候，考虑很多，希望设计的完美，呈现的效果也完美，可是技术、知识、时间限制，致使达不到自己的预期，当时有不想写的念头。幸运的是我当时在读一本书，提到完成好过完美，在80%的时间里表现出80分的状态就很好，这句话启发我以一种追求不完美的方式完成了一个版本，然后去慢慢的迭代优化，完成了2.0.0版本，并计划后续出3.0.0版本。

