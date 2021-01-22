# New Feature
## html
### dialog tag 
> 弹窗，目前 2019-1-7 兼容性还不太好
> 样式还是得自己写
```
<dialog>
  <h2>Dialog Title</h2>
  <p>Dialog content and other stuff will go here</p>
</dialog>
```
### Payment Request API 
> 国内貌似没啥用

### Styles in the `<body>`
> 没什么用，并不推荐这么干
```
<body>
    <p>I’m cornflowerblue!</p>
    <style>
        p { color: cornflowerblue; }
    </style>
    <p>I’m cornflowerblue!</p>
</body>
```

## css
### clip-path
> 定义裁剪路径，显示不规则元素
示例 https://codepen.io/rrenula/pen/LzLXYJ
文档 https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
工具 https://bennettfeely.com/clippy/