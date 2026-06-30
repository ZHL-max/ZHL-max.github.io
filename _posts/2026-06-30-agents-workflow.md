---
title: "Agents-workflow"
date: 2026-06-30 09:00:00 +0800
categories: [AI]
tags: [workflow]
description: "记录 planner、implementation、review 三个 agent 协作完成任务的工作流程。"
permalink: /agents-workflow.html
hero_class: hero-index
hero_title: "Agents-workflow"
subtitle: "Workflow"
---

这个章节用来记录我如何把三个 agent 串成一个完整流程：规划、实现、复核。核心思想是每个阶段都产生明确的 Markdown 产物，下一个阶段直接读取上一个阶段的输出。

## 整体结构

当前工作流分成三个阶段：

1. **Task Planner Agent**：调研需求、比较方案、输出实施提示。
2. **Implementation Agent**：读取 planner 的提示，完成代码或文档实现。
3. **Review Verification Agent**：检查实现结果，修复明确问题，并输出最终报告。

## 如何实现跳转和交接

交接不是靠口头描述，而是靠固定文件。比如一个 run 目录可以这样组织：

```text
runs/blog-sherlock-holmes/
├── 00-task-intake.md
├── 01-planner-output.md
├── 02-implementation-prompt.md
├── 03-implementation-final-report.md
├── 04-review-input.md
└── 05-review-final-report.md
```

其中 `02-implementation-prompt.md` 从 planner 输出中抽取，`04-review-input.md` 再合并 planner 输出、implementation prompt 和 implementation report。这样前一个 agent 的内容就能稳定传给下一个 agent。

## 后续想记录的内容

- 每个 agent 的职责怎么写清楚。
- 怎么设计输入和输出模板。
- 如何验证一个 workflow 是否真的跑通。
- 哪些地方适合自动化，哪些地方应该保留人工判断。
