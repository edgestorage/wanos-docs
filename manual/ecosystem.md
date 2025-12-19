# 生态集成

WANOS 提供了标准的对象存储接口（S3）以及文件协议支持（WebDAV），这使得它可以与众多优秀的第三方软件无缝协作。以下是我们推荐的一些组合方案，能帮助你进一步拓展使用场景。

## 媒体播放客户端：nPlayer

如果你将 WANOS 用作家庭或团队的媒体中心，配合支持 WebDAV 的流媒体播放器可以获得极佳的视听体验。

### nPlayer

- **适用平台**：iOS / Android
- **集成方式**：
  - nPlayer 内置了对 WebDAV 协议的支持。
  - 在添加服务器时选择 "WebDAV"，填写 WANOS 的服务地址与端口。
  - **优势**：可以直接流式播放 WANOS 存储桶中的视频与音频文件，无需将大文件下载到本地，既节省空间又提升响应速度。
- **配置步骤**：
  - 添加服务器 -> WebDAV。
  - 主机：填写 WANOS IP 或域名。
  - 路径：`/dav`（WANOS 默认 WebDAV 挂载路径）。

## 网盘前端：Cloudreve

WANOS 专注于底层的多后端编排与统一网关。如果你需要一套面向最终用户的网盘系统（包含用户隔离、文件分享等业务逻辑），可以将 Cloudreve 作为前端应用。

### Cloudreve

- **定位**：作为 WANOS 的**上层客户端应用**
- **集成方式**：
  - Cloudreve 支持将 **AWS S3** 兼容的对象存储作为底层的“存储策略”。
  - 将 WANOS 配置为 Cloudreve 的存储后端，Endpoint 填写 WANOS 的 S3 API 地址（如 `http://wanos:9000`）。
  - **效果**：Cloudreve 处理用户的文件管理与分享交互，而文件数据实际存储在 WANOS 管理的异构后端（如本地磁盘、各类公有云）中，享受 WANOS 的统一编排能力。

## 万能后端适配：Rclone

WANOS 原生支持 S3、Local、WebDAV、OneDrive 等主流后端。对于尚未原生支持的存储协议（如 Google Drive, Dropbox, FTP, SFTP 等），可以利用 Rclone 进行桥接。

### Rclone

- **定位**：作为 WANOS 的**扩展后端适配器**
- **集成方式**：
  - **方案 A (推荐)：** 使用 `rclone mount` 将任意云存储挂载为 WANOS 服务器上的**本地目录**，然后通过 WANOS 的 **[本地存储](/reference/backends/local)** 类型进行接入。
  - **方案 B：** 使用 `rclone serve webdav` 将云存储转为 WebDAV 服务，然后通过 WANOS 的 **[WebDAV 存储](/reference/backends/webdav)** 类型接入。
  - **效果**：极大地拓展了 WANOS 的后端支持范围，使其能够统一管理几乎所有形式的数字资产。
