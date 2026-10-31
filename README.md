# 史记总览

《史记》130 篇的导读、原文、白话译文与阅读工具。纯静态站点，部署在 GitHub Pages。

- 线上：https://yjm002.github.io/shiji/
- 底本：司马迁《史记》，中国文史出版社，2021 年。
- 根页：`index.html`（交互版：人物、事件、时间轴、精读、朗读、笔记）
- 分篇页：`ch/<编号>-<slug>/`，共 132 个独立 URL，带完整 meta / OG / JSON-LD
- 分篇索引：`ch/`
- 离线单文件版：`dist/shiji-standalone.html`（9.6MB，字体/脚本/数据全内联，可离线；已加 noindex，不参与搜索收录）
- 原文数据：`data/jd/<编号>.json`，打开某篇时按需加载（根页不再内联全量精读）
- 站点文件：`robots.txt`、`sitemap.xml`、`favicon.svg`、`og-cover.png`、`assets/`

## 统计

远程统计默认关闭，不加载任何第三方脚本。启用方式：编辑 `assets/analytics.js` 第一行的默认配置，填一个即可：

```js
window.SHIJI_ANALYTICS = {
  plausible: "你的域名",              // Plausible
  ga4: "G-XXXXXXXXXX",               // Google Analytics 4
  umami: {src:"https://cloud.umami.is/script.js", id:"xxxx"}, // Umami
  local: true                        // 本机阅读统计（不上传）
};
```

启用后，根页和全部分篇页会一起生效；`chapter` 事件记录打开的是哪一篇。
不填则只有 `localStorage` 里的本机统计：访问次数、已读篇数、笔记条数，显示在「底本 → 本机统计」。

远程统计需要一个免费账号（Plausible / Umami / GA4），把 ID 填进 `assets/analytics.js` 即可；没有账号无法代开。另：GitHub 仓库 Insights → Traffic 可看 14 天访客与克隆，不需要配置。

## 更新内容

源文件在仓库外的 `../shiji-overview.html`。改完内容后：

```bash
cp ../shiji-overview.html index.html
```

分篇页由本地构建脚本从 `../.jd.json`、`../.shiji-build/data.json`、`../.shiji-build/jd/study.json` 生成；改完正文后需重跑生成器，再提交 `ch/`、`data/jd/`、`sitemap.xml`。

## 部署

GitHub Pages 从 `main` 分支根目录发布。`.nojekyll` 用于跳过 Jekyll，别删。

## 内容边界

- 130 篇，另收《报任安书》；十表 8 张已收表文（四库本转录），2 张仅表序。
- 原文逐字回查底本；导读、译文、摘要为本站整理，AI 生成部分已标注。
- 部分篇目含后人补作，篇首已注明。
