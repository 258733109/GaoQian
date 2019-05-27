# **git常用命令**

+ git branch -vv 查看链接
+ git branch --set-upstream-to=origin/hotfix/lianbo 建立链接
+ git branch -r 查看远程分支

+ git push origin hotfix/lianbo:hotfix/lianbo 推送本地分支到远程
+ git push --set-upstream origin feature/wallquickdrag  推送本地分支到远程
+ git push origin -D *BranchName* 删除远程分支
+ git merge --no-ff mater 合并master
+ git reflog --date=local | grep feature/cornerMerge@lianbo 查看当前分支是从哪个分支分出来的

+ git push origin --delete _BranchName_  删除本地分支
+ git checkout -b develop origni/develop 检出远程分支到本地

+ git stash save "" 储存
+ git stash apply stash@{0} // 取出储存的第一条

+ git reset --hard 75c26377 回滚到一个版本
+ git 单个文件回滚到某个版本  
    1、git log WallHide.ts  
    2、git checkout 6530c1358d1a0b66e9f5cf6106873431ddcec6c9 WallHide.ts

+ **git错误处理**

Git操作的过程中突然显示Another git process semms to be running in this repository, e.g. an editor opened by ‘git commit’. Please make sure all processes are terminated then try again. If it still fails, a git process remove the file manually to continue…
    rm -f .git/index.lock // 删除index.lock文件

+ Chrome 护眼命令

```
document.getElementsByTagName('body')[0].style.background='#cce8cc';x=document.getElementsByTagName('div');for(var i=0;i<x.length;i++){x[i].style.background='#cce8cc'}
```