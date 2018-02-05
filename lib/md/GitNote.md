# Git笔记
[TOC]
### 相关命令行命令
    cd //进入目录
    dir //查看当前目录下的文件
    clear //清屏
    mkdir //新建文件夹
    echo >> xxx.txt //新建xxx文本文档

------------

### 设置
    git config --list //查看设置
    git config --global user.name "Tian" //设置本地用户名
    git config --global user.email m18825070504@163.com //设置本地用户邮箱

------------

### 版本库
    git init //在当前目录创建版本库
    git init xxx //在xx目录下创建版本库
    
    git clone url //从url中导出版本库

------------

### 缓存
    git add //将文件添加到缓存
    git add . //添加当前项目的所有文件
    
    git status //查看缓存状态
    git diff //尚未缓存的改动
    git diff --cached //查看已缓存的改动
    git diff HEAD //查看已缓存的与未缓存的所有改动
    git diff --stat //显示摘要而非整个
    //git status 显示你上次提交更新后的更改或者写入缓存的改动， 而 git diff 一行一行地显示这些改动具体是啥。

------------

### 备注
    git commit -m "添加备注" //将缓存的改动更新到版本库
    git commit -am "添加备注"	//跳过上传步骤（即git add），直接将改动上传到版本库

------------

### 取消、删除、重命名
    git reset HEAD //取消已缓存的内容
    git reset HEAD -- xxx//取消已缓存的xxx文件
    
    git rm file -- xxx //将文件xxx从缓存区和你的硬盘中（工作目录）删除
    git rm --cached xxx //将文件xxx从缓存区中删除
    
    git mv //移动或重命名一个文件、目录、软连接。

------------

### 分支
    git branch //列出本地的分支
    git branch xxx // 创建“xxx”分支
    
    git checkout xxx //切换到xxx分支
    git checkout -b xxx //命令来创建新分支xxx并立即切换到该分支下
    
    git branch -d xxx //删除xxx分支
    
    Git branch -m oldbranchname newbranchname //分支重命名
    
    git merge xxx //将xxx分支合并到主分支去

------------

### 提交
    git log //查看提交历史
    git log --oneline//查看提交历史简洁版
    git log --oneline --graph //查看提交历史中的分支
    git log --reverse --oneline //倒序显示所有日志
    git log --author==xxx //查看用户xxx的提交历史
    git log -n //查看n条提交历史
    //如果需要指定日期，可以执行几个选项：--since 和 --before，但是也可以用 --until 和 --after

------------

### 标签
    git tag -a xxx //添加备注为xxx的标签
    git tag //查看标签
    Deleted tag 'xxx' //删除xxx标签
    git log --decorate //查看提交历史和标签
    git tag -a <tagname> -m "w3cschool.cc标签" //为提交历史追加标签

------------

### 远程仓库
    git remote add [shortname] [url] //连接远程仓库
    git remote //查看当前配置有哪些远程仓库
    git remote -v //查看当前配置有哪些远程仓库

------------

### 上传
    $ git pull <远程主机名> <远程分支名>:<本地分支名> //取回远程主机某个分支的更新，再与本地的指定分支合并
    $ git pull origin master --allow-unrelated-histories //把两个不同的项目合并，git需要添加一句代码，在git pull，这句代码是在git 2.9.2版本发生的，最新的版本需要添加--allow-unrelated-histories
    
    git push origin master //上传master分支到origin配置的远程仓库
    
    git fetch //从远程仓库下载新分支与数据
    git merge oigin/master //从远端仓库提取数据并尝试合并到master分支

------------

### 解决方案
    /*git log 显示中文乱码时的解决方案（用git bash 输入命令）*/
    $ git config --global core.quotepath false          # 显示 status 编码
    $ git config --global gui.encoding utf-8            # 图形界面编码
    $ git config --global i18n.commit.encoding utf-8    # 提交信息编码
    $ git config --global i18n.logoutputencoding utf-8  # 输出 log 编码
    $ export LESSCHARSET=utf-8