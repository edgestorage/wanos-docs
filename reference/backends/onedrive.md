# OneDrive 存储

适用于：

- Microsoft OneDrive（个人或企业版）；
- 需要将 OneDrive 作为冷数据或协作空间的一部分接入 WANOS。

OneDrive 的配置稍微复杂一些，主要分为**应用配置**和**授权信息**两部分：

- **Tenant ID**（必填）
  - Azure AD 租户 ID，可在 Azure 门户中获取。

- **Client ID / Client Secret**（必填）
  - 在 Azure AD 中为 WANOS 创建的应用的 `Client ID` 和 `Client Secret`。
  - 需要为该应用授予访问 OneDrive/SharePoint 文件的相关权限。

- **Refresh Token（委托权限）**
  - 通过「授权」按钮引导用户登录并同意权限后，系统会自动回填。
  - 用于长期刷新访问令牌，避免频繁手动登录。

- **Drive ID**（必填）
  - 表示具体的 OneDrive / SharePoint 文档库。
  - 可通过「选择」按钮列出可用 Drive 并选择，也可以手动粘贴已知的 ID。

- **Base Path**（可选）
  - 在该 Drive 下用于存放对象的根目录前缀，例如：`/wanos`。

配置建议：

- 优先使用专门为 WANOS 准备的 Drive / 文档库，避免与个人文件混用；
- 授权时使用权限最小化原则，仅授予必要的文件读写权限；
- 修改密钥或权限后，记得在此页面更新相关字段并重新测试连接。
