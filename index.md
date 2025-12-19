---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "WANOS"
  text: "分布式对象存储网关与编排系统"
  tagline: 统一 S3 接口 · 多后端编排 · 边缘/中心协同
  actions:
    - theme: brand
      text: 快速开始（安装）
      link: /manual/install
    - theme: alt
      text: 项目简介
      link: /concepts/intro

features:
  - title: 统一 S3 接口
    details: 基于 VersityGW 提供 S3 兼容 API。
  - title: 多后端编排
    details: 支持多云/本地后端接入与分层、迁移策略与生命周期管理。
  - title: 边缘-中心架构（规划中）
    details: Edge 节点代理请求，Center 节点统一管理与调度。
  - title: 存储管理
    details: 整合多种存储资源统一管理，支持一键迁移与回迁，便于资源重组。
---
