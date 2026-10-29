# 史记总览

《史记》一百三十篇的单页总览，纯静态 HTML，无外部依赖（字体、脚本、图片全部内联）。

- 线上地址：部署后填写
- 源文件：仓库外的 `../shiji-overview.html`

## 更新

改完源文件后同步过来再提交：

```bash
cp ../shiji-overview.html index.html
git commit -am "content: 更新"
git push
```

## 部署

GitHub Pages，从 `main` 分支根目录发布。`.nojekyll` 用于跳过 Jekyll 处理，别删。
