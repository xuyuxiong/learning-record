# github
## git submodule
[git submodule](https://www.jianshu.com/p/e27a978ddb88)

## merge和rebase的区别
[merge和rebase的区别](https://www.cnblogs.com/xueweihan/p/5743327.html)

## 如何修改已经提交的Commit信息

## 如何撤销Commit并保存之前的修改

## 如何ignore被commit过的文件

## commit信息如何github issues关联

## Git hook在项目中的作用？有哪些常用钩子

## pre-commit和commit-msg钩子的区别
## 了解 Git （Submodule）子模块吗？简单介绍一下 Git 子模块的作用？
指令本质上就是一个 JavaScript 对象，对象上挂着一些钩子函数，无论是官方提供的指令，还是自定义指令，一个指令从第一次被绑定到元素上到最终与被绑定的元素解绑，它会经过以下几种状态：

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。

## Git 如何修改已经提交的 Commit 信息？
- git rebase -i <commit id> 列出 commit 列表
- 找到需要修改的 commit 记录，把 pick 修改为 edit 或 e，:wq 保存退出
- 修改 commit 的具体信息git commit --amend，保存并继续下一条git rebase --continue，直到全部完成
- 中间也可跳过或退出git rebase (--skip | --abort)

## Git 如何撤销 Commit 并保存之前的修改？
- 查看commit git log --pretty=oneline
- 撤销到上一个commit，但是保存当前的修改。 git reset --soft <commit>
- 修改成功。重建分支，进行提交。
## Git 如何 ignore 被 commit 过的文件？
- 删除 track 的文件 (已经 commit 的文件)
- 在 .gitignore 文件中添加忽略规则
在 .gitignore 文件中添加 ignore 条目, 如: .DS_Store
提交 .gitignore 文件: git commit -a -m "添加ignore规则"
- 推送到远程仓库让 ignore 规则对于其他开发者也能生效

## 在使用 Git 的时候如何规范 Git 的提交说明（Commit 信息）？
用Commitizen，Commitizen 是一个撰写符合上面 Commit Message 标准的一款工具。 在push操作时检查commit的信息，使用正则检查是否匹配（比如使用angular的git规范），不符合的不允许Push。
## Commit 信息如何和 Github Issues 关联？
当你提交一个commit的时候在commit message里面使用#issue, 比如#8, github就会自动关联issue 8跟这个commit. 当然在github上面写comment的时候使用这个也是有效的，在confirm merge的时候可以使用一下命令来关闭相关issue。
## Git Hook 在项目中哪些作用？
Git Hooks是定制化的脚本程序，所以它实现的功能与相应的git动作相关,如下几个简单例子：

多人开发代码语法、规范强制统一
commit message 格式化、是否符合某种规范
如果有需要，测试用例的检测
服务器代码有新的更新的时候通知所有开发成员
代码提交后的项目自动打包（git receive之后）

## Git Hook 中客户端和服务端钩子各自用于什么作用？
客户端钩子由诸如提交和合并这样的操作所调用， 而服务器端钩子作用于诸如接收被推送的提交这样的联网操作。
## Git Hook 中常用的钩子有哪些？
ClientSide hooks：
- pre-commit，当执行commit动作时先执行此hook，可以用此hook做一些检查，比如代码风格检查，或者先跑测试。

- prepare-commit-msg， 当commit时需要输入message前会触发此hook，可以用此hook来定制自己的default message信息。

- commit-msg，当用户输入commit的message后被触发，可以用此hook校验message的信息，比如是否符合规定，有没有cr等。

- post-commit, 当commit完成后被触发，可以用此hook发送 notification 等。

- pre-rebase, rebase之前会被触发，可以用此hook来拒绝所有的已经push的commits进行rebase操作。

- post-merge, 当merge成功后，会触发此hook。

- pre-push, 当push时，remote refs被更新，但是在所有的objects传输前被触发。

- pre-auto-gc, 当git gc –auto执行前被触发。在垃圾回收之前做一些验证或备份是挺不错的。

ServerSide hooks:
- pre-receive, 当收到push动作之前会被执行。

- update, 也是收到push动作之前被执行，但是有可能被执行多次，每个branch一次。

- post-receive, 当push动作已经完成的时候会被触发，可以用此hook来 push notification等，比如发邮件，通知持续构建服务器等。

## pre-commit 和 commit-msg 钩子的区别是什么？各自可用于做什么？
pre-commit是客户端hooks之一，也是接下来要介绍的钩子。pre-commit在git add提交之后，然后执行git commit时执行，脚本执行没报错就继续提交，反之就驳回提交的操作。
这个钩子中可以实现：对将要提交的代码进行检查、优化代码格式、或者对提交的图片进行压缩等等任务。
Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。

## 如何设计一个通用的 Git Hook ？
借助Commitizen，使用 git cz 代替 git commit 进行复合 Angular 规范的 Commit Message 信息提交，规范团队的git规范。代码提交之前会通过 husky 配合 git hook 进行提交信息校验，一旦提交信息不符合 团队的git规范，正则匹配失败，则提交会失败。

## 如何确保别人上传的代码没有 Lint 错误？如何确保代码构建没有 Lint 错误？
在使用cli构建项目时，勾选 Use ESLint to lint your code。 在 .eslintrc.js 文件里，找到文件中的rules，我们可以在其中定义一些代码检查的规则
