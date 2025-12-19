# WebDAV 存储

适用于：

- 支持 WebDAV 协议的网盘 / 文件服务；
- 自建 WebDAV 服务，希望纳入统一的 S3 编排层。

WebDAV 类型的表单字段包括：

- **Base URL**（必填）
  - WebDAV 服务的基础地址，例如：`https://example.com/dav`。
  - 建议直接填到用于存储的根路径，避免与其他业务目录混用。

- **用户名 / 密码**（必填）
  - 用于 Basic Auth 的登录凭证。
  - 建议为 WANOS 创建专用账号，并限制只访问指定目录。

- **Base Path**（可选）
  - 在 WebDAV 根路径下的子目录前缀，例如：`/wanos-data`。
  - 留空表示直接写入 `Base URL` 对应目录。

配置完成后，同样建议使用「测试连接」校验账号和权限是否正确。
