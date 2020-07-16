# 修改git全部已提交的用户名和邮箱
## 起因
提交了很多次代码，发现repo上有提交记录，但是commit看板上没有变绿，即没有提交记录
### 原因
去搜了一下，发现是系统内git设置的email与远端setting里的email不对，居然变成了xxx@mac.local,鬼知道这破电脑咋啦。
#### 查看设置信息
`git config user.name`  
`git config user.email`
#### 修改设置信息
`git confg --global user.name "xxx"` 
`git confg --global user.email "xxx"`
#### 查看提交记录
`git log`  

在上述方法尝试后，果然发现有一段时间的提交记录所显示的email不对，修改正确的用户名邮箱，git pull 完事！  
当我以为完事后，打开git一看，只有刚刚commit的记录，之前的记录还是没有，那咋搞呢，就只能修改git全部已提交的用户名和邮箱了。

## 解决方案
如果这个项目仅是只有你一人维护的话，这个方法非常简单，但是如果是多人维护的话建议就不使用了。
### 步骤1
新建一个文件夹，创建你repo库的一个副本，全新的裸clone
`git clone --bare 你的repo地址`
`cd repo.git`
### 步骤2
在终端打开文件夹，复制粘贴脚本，并将`OLD_EMAIL` `CORRECT_NAME` `CORRECT_EMAIL`修改为你正确的信息，脚本如下   
``` shell
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```  
### 步骤3
按enter执行脚本，并git log查看历史是否已经被修改，修改成功使用`git push --force --tags origin 'refs/heads/*'`将修改后的commit push到远端上。这样修改就成功了
### 步骤4
最后别忘记删除了备份文件夹，不然占用系统空间哦。 `cd ..` `rm rf **.git`