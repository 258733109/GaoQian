# **git��������**
git branch -vv �鿴����
git branch --set-upstream-to=origin/hotfix/lianbo ��������
git branch -r �鿴Զ�̷�֧

git push origin hotfix/lianbo:hotfix/lianbo ���ͱ��ط�֧��Զ��
git push --set-upstream origin feature/wallquickdrag  ���ͱ��ط�֧��Զ��

git push origin -D <BranchName> ɾ��Զ�̷�֧
git merge --no-ff mater �ϲ�master
git reflog --date=local | grep feature/cornerMerge@lianbo �鿴��ǰ��֧�Ǵ��ĸ���֧�ֳ�����


git push origin --delete <BranchName>  ɾ�����ط�֧
git checkout -b develop origni/develop ���Զ�̷�֧������

git stash save "" ����
git stash apply stash@{0} // ȡ������ĵ�һ��

git reset --hard 75c26377 �ع���һ���汾
git �����ļ��ع���ĳ���汾
1��git log WallHide.ts
2��git checkout 6530c1358d1a0b66e9f5cf6106873431ddcec6c9 WallHide.ts



git������

1 ��Git�����Ĺ�����ͻȻ��ʾAnother git process semms to be running in this repository, e.g. an editor opened by ��git commit��. Please make sure all processes are terminated then try again. If it still fails, a git process remove the file manually to continue�� 
rm -f .git/index.lock // ɾ��index.lock�ļ�



Chrome ��������
document.getElementsByTagName('body')[0].style.background='#cce8cc';x=document.getElementsByTagName('div');for(var i=0;i<x.length;i++){x[i].style.background='#cce8cc'}