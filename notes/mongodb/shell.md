```bash
1. mongo 连接数据库
2. show dbs 显示所有数据库
3. use dbName 切换到相应的数据库
4. show collections 显示该数据库下所有collections
5. db.getCollection('collectionName').find({})

```

远程连接数据库
```BASH
mongo ${ip}:${port}/${dbName}
```
如果没有设置密码直接浏览器访问 ${ip}:${port + 1000}可以获取到数据库信息，包括dbName，然后就可以远程连接数据库并读写数据库了。。。
mongodb默认端口为27017