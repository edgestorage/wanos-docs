import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: "WANOS",
  titleTemplate: ':title | WANOS - 分布式对象存储网关',
  description: "分布式对象存储网关与编排系统，支持多后端统一管理、S3接口、数据冗余与无感迁移",
  srcExclude: ['README.md'],
  sitemap: {
    hostname: 'https://edgestorage.cc'
  },
  head: [
    ['meta', { name: 'keywords', content: 'WANOS,分布式存储,对象存储,S3网关,存储编排,多云存储,WebDAV,OneDrive,NAS,数据迁移,存储冗余,私有云存储,开源对象存储,MinIO替代,存储聚合,统一存储,边缘存储,混合云存储,数据备份,存储策略' }],
    ['meta', { name: 'author', content: 'WANOS Team' }],
    ['meta', { property: 'og:title', content: 'WANOS - 分布式对象存储网关' }],
    ['meta', { property: 'og:description', content: '分布式对象存储编排系统，整合S3、本地磁盘、WebDAV、OneDrive等多种后端，提供统一S3接口' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'WANOS - 分布式对象存储网关' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/concepts/intro' },
      { text: '能力与适用场景', link: '/concepts/capabilities' },
      { text: '安装', link: '/manual/quick-start' },
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: '简介', link: '/concepts/intro' },
          { text: '能力与适用场景', link: '/concepts/capabilities' },
          { text: '架构设计', link: '/concepts/architecture' },
          { text: '设计与对比', link: '/concepts/design-and-comparison' },
        ],
      },
      {
        text: '部署与使用',
        items: [
          { text: '快速安装', link: '/manual/quick-start' },
          {
            text: '手动安装',
            link: '/manual/install',
            collapsed: false,
            items: [
              { text: '环境要求', link: '/manual/install#环境要求' },
              { text: '启动服务', link: '/manual/install#启动服务' },
              { text: '反向代理与 SSL', link: '/manual/install#反向代理与-ssl-生产部署' },
            ],
          },
          {
            text: '管理后台指南',
            link: '/manual/usage',
            collapsed: false,
            items: [
              { text: '首页概览', link: '/manual/usage#首页概览' },
              { text: '存储管理', link: '/manual/usage#存储管理' },
              { text: 'Bucket 管理', link: '/manual/usage#bucket-管理' },
              { text: '监控与任务', link: '/manual/usage#监控与任务' },
              { text: '设置', link: '/manual/usage#设置' },
            ],
          },
          { text: '生态集成', link: '/manual/ecosystem' },
        ],
      },
      {
        text: '数据与存储',
        items: [
          {
            text: '存储后端',
            collapsed: false,
            items: [
              { text: '概览', link: '/reference/backends/' },
              { text: 'S3 对象存储', link: '/reference/backends/s3' },
              { text: '本地存储', link: '/reference/backends/local' },
              { text: 'WebDAV 存储', link: '/reference/backends/webdav' },
              { text: 'OneDrive 存储', link: '/reference/backends/onedrive' },
            ],
          },
          { text: '副本与存储策略', link: '/reference/storage-policy' },
        ],
      },
      {
        text: '项目',
        items: [
          { text: '路线图', link: '/project/roadmap' },
          { text: '开源与第三方组件', link: '/project/open-source-licenses' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    // 本地化默认主题文案
    outline: {
      label: '本页目录', // "On this page"
    },
    sidebarMenuLabel: '侧边导航', // "Sidebar Navigation"
    returnToTopLabel: '回到顶部', // "Return to top"
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  }
}))
