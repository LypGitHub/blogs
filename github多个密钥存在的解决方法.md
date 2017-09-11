#### 解决多个github多个ssh密钥问题

原因是因为公司的项目迁移到gitlab，创建了gitlab得密钥后，github的ssh key就不能用，解决多个host下的密钥问题就需要修改
下的配置文件


- 创建ssh key的步骤
[github 创建ssh key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

- 修改config文件
``` bash
  ### 编辑config文件
   vim ~/.ssh/config
  ### 将需要配置的host 添加到文件内
    Host github.com
        IdentityFile ~/.ssh/id_rsa
```

