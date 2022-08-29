# git

## git的简介

代码管理工具，其特点是：分布式管理代码，有分支，代码回退，代码合并（团队开发）

## 安装步骤【第一次安装git需要做的事情】
1. 先安装软件到电脑上

2. 配置本地电脑的全局git的账户和邮箱（一个电脑只做一次）<br/> 
- `git config --global user.name "name"`<br/>
- `git config --global user.email "email"`
3. 生成本地的公钥和密钥
- `ssh-keygen -t rsa -C 'email'`连续回车三次得到一个路径存放目录

4. 把本机的公钥添加到远程的账户的ssh公钥里，目的是让本地电脑和远程账户进行关联
- 公钥的位置：`c:/users/admin/.ssh/rsa_id.pub`把这个文件使用txt格式打开，复制里面的代码，复制粘贴到远程账号的ssh公钥里即可

## 仓库的创建和基础的使用
1. 首先在项目中创建一个git的仓库
- `git init` 目的是为了在当前项目中产生一个`.git`文件夹，一个项目只做一次就行。
2. 暂存区存储
-  `git add .` 或 `git add *`如果你只想单独的把一个指定的文件存入暂存区`git add fileName`
3. 把暂存区的内容存入真正的本地仓库中` git commit -m "本次你具体干了什么的标题描述"`

## 检查命令
`git status`

## 高级使用-代码的回退
1. 查看历史的提交记录，目的是为了获取提交的Id`git log`【注意：在git bash命令窗里不可以使用快捷键，只能选择后右键copy，paste】
- `git log`只能查看正常提交的记录
2. 复制commitId 用来代码的回退
`git reset --hard commitId`

## 本地仓库和远程仓库的关联和上传与下载
1. 本地仓库关联远程仓库【每个仓库/项目只做一次】
`git remote add origin 线上的git仓库地址`
- 【注意】仓库地址前缀必须是git@xxx开头，不可以是https的。
`gir remote -v`检查仓库

2. 上传本地仓库到远程仓库中【必须联网】
- 【如果是第一次上传】:`git push -u origin master`把本地仓库的内容上传到远程仓库的master分支上。
- 【如果不是第一次上传】：`git push`

## git的工作流程
1.先安装并配置git在电脑上【每个电脑只做一次】

2.在项目中初始化仓库 `git init`【每个项目里只做一次】

3.每次项目中改变了内容后，都要先存入暂存区：git add .

4.再从暂存区存入到本地仓库：`git commit -m 'log'`

5.从本地仓库上传到远程仓库：`git push`如果是第一次上传用:`git push -u origin master`

6.总结：`git add .` > `git commit -m 'log'` > `git push`

## 克隆代码
- `git clone + 项目地址`

## 拉取远程仓库的代码到本地
- `git pull`

## git仓库的权限问题

- 对于开源的项目我们可以克隆下来，但是没有权限去修改远程的开源项目
- 如果你想修改别人仓库的内容，需要加入到仓库的成员中，获取到仓库的权限

## 代码冲突问题【重要问题】
- 当多人操作同一个文件的时候，在该文件同一个位置都书写了内容，这个时候git的合并策略就会失效，然后就产生了代码冲突的问题

## 解决冲突
1. 首先在项目中手动解决冲突
2. 再存入本地
3. 再上传到远程

## 注意事项
1. 仓库里不能嵌套仓库
2. 远程仓库必须是一个空仓库的时候，我们才在本地初始化一个仓库，然后再关联，最后再上传

## 分支管理
1. 创建分支：`git branch name`
2. 切换分支：`git checkout name`
3. 创建并切换到新分支：`git checkout -b name`
4. 第一次上传新分支到远程：`git push origin name`以后直接git push
5. 克隆指定的分支：`git clone -b name 仓库地址` -b是--branch的缩写
6. 删除本地分支：`git branch -d name` -d是--detele的缩写
7. 删除远程分支：`git push origin -d name`
8.【注意】：每次切换分支前，一定要确保当前分支全部是存储的状态，对于要删除的分支，不能在它的仓库中

## 标签tag管理
1. 创建标签: `git tag name`或者`git tag -a name -m 'log'`
2. 查看标签: `git tag`
3. 删除标签: `git tag -d name`
4. 上传标签: `git push origin name`
5. 使用tag回退代码:
- 查看tag`git tag`
- 查看指定tag的详细信息`git show name`获取到提交的commitId
- 根据Id回退代码`git rest --hard commitId`

## 代码合并
- `git merge [分支名称]`

## 团队开发流程
1. 一开始，所有人都需要克隆我的仓库到本地
2. 接下来是开发代码
3. 先把自己的改动存入本地`git add .``git comit -m 'log'`
4. 自己的改动存入本地后，先拉取远程代码`git pull`目的是为了保持和远程代码是一样的，都是新的记录
5. 【注意】：一定要注意看pull后的代码提示，如果有冲突一定要先解决冲突，再存入本地，再上传，再到远程
5.1 【注意】：如果没有提示冲突，意味着git帮我们把远程代码和本地代码进行了合并，然后再`git push`上传到远程仓库
6. 总结：每次改动项目后：先存本地，再拉取远程，最后提交push

7. 报错：vim编译器:
- esc键
- shift+冒号
- 输入!ws 保存并退出
- i是进入编辑模式

## 公司里的团队协作
1. 首先本地和线上分支都有一个自己的分支：dev-shenyi dev-...
2. 以后的开发全都在自己的分支中操作:dev-shenyi:提交到该分支，然后拉取master分支的代码，最后提交到远程的dev-...
3. 去线上仓库发起一个合并的请求，然后由项目组长去审查代码，项目组长负责把我的分支代码合并到master

## 一键快速解决冲突
1. vscode里使用`ctrl+shift+p`输入: merge
2. 保留远程的代码:选择`>merge conflict:Accept All incoming`
3. 保留自己的代码:选择`>merge conflict:Accept All current`