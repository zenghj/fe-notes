# useful shell script pieces

## 变量申明与引用
```bash
# 字符串
hello="hello world" # 单引号原样输出，双引号可以替换变量
echo $hello

# 数组
array_name=(value0 value1 value2 value3)
# 读取数组下标为n的元素值
valuen=${array_name[n]}
# 获取数组中的所有元素
echo ${array_name[@]}
```

## 数组的遍历
```bash
for item in ${array_name[@]}
  do
    # do something with $item
  done
```

## 判断文件夹是否存在
```bash
directory_name = 'directory_name'
if [ -d $directory_name ]
then
  # directory_name exist; do something
else
# directory_name not exist; do something
fi
```

## 替换文件中特定字符
```bash
# 把demo.txt中的{{domain}} 替换成 sandbox.activity.browser.intl.miui.com
# http://{{domain}}/test.html
sed -i '' 's/{{domain}}/sandbox\.activity\.browser\.intl\.miui\.com/g' demo.txt
# 处理一系列文件详见
# https://unix.stackexchange.com/questions/112023/how-can-i-replace-a-string-in-a-files?newreg=63655f028ac04f11bbf861c7bba8db9f
```