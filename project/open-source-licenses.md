# 开源许可说明

WANOS 的构建离不开开源社区的贡献。我们在开发过程中引用了多个优秀的开源项目，并严格遵循其对应的开源许可证（License）条款。

在此，我们对项目中使用到的核心第三方组件进行特别致谢与说明。

## 核心组件致谢

### VersityGW

- **项目主页**：[versity/versitygw](https://github.com/versity/versitygw)
- **许可证**：Apache License 2.0
- **使用说明**：
  WANOS 采用了 **versitygw** 作为底层的 S3 协议转换网关。它为 WANOS 提供了稳定且高性能的 S3 兼容接口支持，使我们能够专注于上层的多后端编排与策略管理。我们严格遵循 Apache 2.0 协议，保留了其原始版权声明。

## 其他重要组件

除了核心网关引擎外，WANOS 的研发也得益于以下优秀的开源项目：

### 后端 (Go)

- **框架与工具**：
  - [Gin](https://github.com/gin-gonic/gin) (MIT) - 高性能 Web 框架
  - [GORM](https://gorm.io/) (MIT) - 强大的 ORM 库
  - [GoFrame](https://goframe.org/) (MIT) - 企业级应用开发框架
  - [Robfig Cron](https://github.com/robfig/cron) (MIT) - 定时任务调度库
- **云服务集成**：
  - [AWS SDK for Go v2](https://github.com/aws/aws-sdk-go-v2) (Apache 2.0) - AWS S3 官方 SDK
  - [Go OIDC](https://github.com/coreos/go-oidc) (Apache 2.0) - OIDC 认证支持

### 前端 (TypeScript/React)

- **核心框架**：
  - [React](https://react.dev/) (MIT) - 用于构建用户界面的库
  - [Next.js](https://nextjs.org/) (MIT) - React Web 应用框架
- **UI 组件库**：
  - [Ant Design](https://ant.design/) (MIT) - 企业级 UI 设计语言与组件库


为了方便合规性审查，我们在源码仓库的根目录下维护了 `OPEN_SOURCE_LICENSES` 文件。

该文件详细列出了 WANOS 依赖的所有第三方库及其许可证类型。如果您计划将 WANOS 集成到商业产品中，或者进行代码审计，建议详细审阅该清单以确保满足相关合规要求。

