# 快速安装

本文档将引导您使用一键脚本快速部署 WANOS。

## 适用场景

- 快速体验或测试 WANOS 功能
- 单机/单节点部署

## 一键脚本

我们提供了一键安装脚本，自动处理环境检查、配置生成与服务启动。

> **注意**：脚本需要在 Linux/Mac 环境下运行 (Bash)。

```bash
curl -fsSL https://raw.githubusercontent.com/edgestorage/wanos/main/install.sh | bash
```



## 安装向导

脚本启动后会进入交互模式，主要包含以下配置步骤：

### 1. 确认安装位置
脚本会显示当前运行目录。确认后，该目录将用于存放生成的配置文件（`.env`）以及 Docker Compose 文件。

### 2. 选择数据库类型
脚本提供两种数据库支持模式：

*   **PostgreSQL (推荐)**
    适合生产环境或正式部署，性能更好且支持所有功能。在此模式下，您可以选择：
    *   **Auto-deploy**: 让脚本自动通过 Docker 启动一个 PostgreSQL 容器（默认）。
    *   **External**: 连接现有的外部 PostgreSQL 数据库，需提供相应的连接信息（主机、端口、用户名、密码、库名）。
*   **SQLite**
    仅适用于快速功能体验或临时测试。数据存储在本地文件中，无需额外启动数据库服务。

### 3. 设置管理员账号
此步骤用于初始化 WANOS 的超级管理员凭证：
*   **Admin Username**: 管理员用户名（默认：`admin`）。
*   **Admin Password**: 管理员登录密码（默认：随机生成 12 位字符）。

> **提示**：配置完成后，脚本将自动拉取 Docker 镜像并启动服务。


## 验证安装

脚本执行成功后，您会看到如下提示：

```text
Success! WANOS is running.
Frontend: http://<YOUR_IP>:3000
Backend:  http://<YOUR_IP>:9001 (Internal) / Same host as frontend
```

### 访问管理后台

1. 在浏览器访问 `http://<YOUR_IP>:3000`。
2. 使用脚本交互过程中设置的管理员账号登录（默认用户 `admin`）。

---

如果您需要更深度的定制（如接入外部数据库、修改 S3 监听端口、配置 OIDC 等），请参考 [手动安装](./install.md)。
