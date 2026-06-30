# sherlock's blog

GitHub Pages + Jekyll personal blog for:

```text
https://zhl-max.github.io/
```

## 写新文章

以后写博客内容，不需要手写整页 HTML。只需要在 `_posts/` 目录新建 Markdown 文件。

文件名必须是：

```text
YYYY-MM-DD-title.md
```

例如：

```text
_posts/2026-07-01-machine-learning-note.md
```

文件开头写 front matter：

```yaml
---
title: "机器学习笔记"
date: 2026-07-01 10:00:00 +0800
categories: [AI]
tags: [machine-learning, notes]
description: "首页文章列表里显示的摘要。"
permalink: /machine-learning-note.html
hero_class: hero-index
hero_title: "机器学习笔记"
subtitle: "AI Notes"
---
```

然后下面直接写 Markdown 正文：

````md
这是一段正文。

## 第一节

- 要点一
- 要点二

```python
print("hello")
```
````

提交到 GitHub 后，GitHub Pages 会自动把 Markdown 生成网页。

## 常用字段

- `title`: 文章标题
- `date`: 发布时间
- `categories`: 分类，会自动出现在 `categories.html`
- `tags`: 标签，会自动出现在 `tags.html`
- `description`: 首页摘要
- `permalink`: 文章生成后的网页地址
- `hero_class`: 首屏图片，可选 `hero-index`、`hero-archive`、`hero-categories`、`hero-tags`
- `pin: true`: 让文章在首页置顶

## 上传更新

```bash
git status
git add .
git commit -m "Update blog"
git push origin main
```

如果远程拒绝：

```bash
git fetch origin main
git push --force-with-lease origin main
```

## 本地预览

普通 `python3 -m http.server` 不能预览 Jekyll 模板，只能看静态资源。要完整本地预览，需要安装 Ruby 和 Jekyll：

```bash
gem install bundler jekyll
jekyll serve
```

然后打开：

```text
http://127.0.0.1:4000/
```

当前机器暂时没有 Ruby/Jekyll，所以完整构建会在 GitHub Pages 线上完成。
