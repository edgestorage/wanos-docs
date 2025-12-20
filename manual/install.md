# 手动安装

本文档介绍使用 Docker Compose 手动部署 WANOS。如果您希望快速体验，请参考 [快速安装](./quick-start.md)。

## 环境要求

- Docker 20+（或最新版 Docker Desktop）
- Docker Compose v2+

### 准备环境变量（可选但推荐）

在项目根目录新建或编辑 `.env`，用于 Compose 变量替换；或使用 `.env.local` 并在命令中通过 `--env-file` 指定。

#### 变量说明

##### 管理员

| 变量名 | 说明 |
|--------|------|
| `ADMIN_USER` | 首次启动用于创建默认管理员账号。若该用户已存在，则不会覆盖。 |
| `ADMIN_PASS` | 默认管理员密码。建议仅用于初始化，首次登录后尽快在“设置/用户”中修改。 |

##### 会话

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `SESSION_SECRET` | 会话签名密钥。用于保护登录态，建议长度≥32、随机生成，切勿泄露。 | 随机高熵字符串 |
| `SESSION_TTL_SECONDS` | 会话有效期（秒），例如 `43200` 表示 12 小时。到期需重新登录。 | `43200`（12 小时） |

##### 单点登录（可选，如需启用 OIDC）

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `OIDC_ISSUER` | 身份提供商 Issuer 地址（如 `https://accounts.example.com`）。 | `https://accounts.example.com` |
| `OIDC_CLIENT_ID` | 在身份提供商端注册得到的 Client ID。 |  |
| `OIDC_CLIENT_SECRET` | 对应的 Client Secret（务必保密）。 |  |
| `OIDC_REDIRECT_URL` | 回调地址，需与身份提供商的应用配置一致。 |  |
| `OIDC_SCOPES` | OIDC 授权范围，常见为 `openid profile email`，按实际需要配置。 | `openid profile email` |

##### 加密

| 变量名 | 说明 | 要求 / 建议 |
|--------|------|-------------|
| `AKSK_SECRET_KEY` | 用于敏感配置加/解密的 AES-256 密钥。 | 要求：32 字节原始值，或其 Base64 编码（32 字节经标准 Base64 编码长度通常为 44 字符）。建议：使用高熵随机值，妥善保管。 |

##### S3 配置

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `HOST_STYLE` | S3 虚拟主机风格访问的基础域名。若配置，则支持 `bucket.domain` 格式访问。 | `s3.example.com` |

##### 可观测性（内部调试）

| 变量名 | 说明 | 默认值 / 示例 |
|--------|------|-------------|
| `PYRO_URL` | Pyroscope 性能分析服务器地址（为空则不启用） | `https://pyroscope.example.com` |
| `PYRO_AUTH_USER` | Pyroscope Basic Auth 用户名 | `wanos` |
| `PYRO_AUTH_PASS` | Pyroscope Basic Auth 密码 | |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OpenTelemetry OTLP 上报地址（为空则不启用） | `https://otel.example.com` |

示例（仅示例，请按需修改）：

```bash
ADMIN_USER=admin
ADMIN_PASS=changeme
SESSION_SECRET=dev-secret
SESSION_TTL_SECONDS=43200
AKSK_SECRET_KEY=BASE64_OF_32_BYTES
# OIDC_ISSUER=https://accounts.example.com
# OIDC_CLIENT_ID=xxxx
# OIDC_CLIENT_SECRET=xxxx
# OIDC_REDIRECT_URL=http://localhost:9001/api/v1/auth/oidc/callback
# OIDC_SCOPES=openid profile email
```

生成 AKSK_SECRET_KEY 示例

```bash
# 生成 32 字节并输出为 Base64（推荐）
openssl rand -base64 32

# 或使用 Python 生成 URL-safe Base64
python - <<'PY'
import secrets, base64
print(base64.urlsafe_b64encode(secrets.token_bytes(32)).decode())
PY
```

提示
- Docker Compose 会自动读取与 `docker-compose.yml` 同目录下的 `.env`。
- 若使用 `.env.local`，通过命令行指定：`docker compose --env-file .env.local up -d`。

### 启动服务

在项目根目录执行：

```bash
docker compose up -d
```
- 后端端口：`9000`（S3 API）、`9001`（管理 API）
- 前端端口：`3000`
- 数据目录映射：`./data:/data`

### 下一步

- 打开管理后台：`http://localhost:3000`，使用管理员账号登录
- 参考“使用”文档了解：存储管理（含一键迁移）、Bucket 管理、节点与设置等

### 反向代理与 SSL（生产部署）

- 本项目不内置 SSL/TLS 配置，生产环境请使用 Nginx/Caddy/Traefik 等在边缘配置 TLS。
- 反向代理需保留 Host 与常见 X-Forwarded-* 头部。
- 若使用“虚拟主机风格” S3 域名（如 `bucket.s3.example.com`），务必将原始 Host 转发到后端。

注意事项（S3 API）
- 必须设置：
  - `proxy_cache_convert_head off;`
  - `ignore_invalid_headers off;`
- 推荐设置（大文件直传/流式场景）：
  - `client_max_body_size 0;`
  - `proxy_request_buffering off;`
  - `proxy_buffering off;`
  - `proxy_read_timeout 300s;`
  - `proxy_send_timeout 300s;`

示例一：管理后台（前端 3000）
```nginx
server {
  listen 80;
  server_name wanos.example.com;

  # 如需 HTTPS：
  # listen 443 ssl http2;
  # ssl_certificate /path/to/fullchain.pem;
  # ssl_certificate_key /path/to/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

示例二：S3 API（后端 9000）
```nginx
server {
  listen 80;
  server_name s3.example.com; # 或使用通配：*.s3.example.com（虚拟主机风格）

  # 如需 HTTPS：
  # listen 443 ssl http2;
  # ssl_certificate /path/to/fullchain.pem;
  # ssl_certificate_key /path/to/privkey.pem;

  # 基础与上传优化
  client_max_body_size 0;
  ignore_invalid_headers off;

  location / {
    proxy_pass http://127.0.0.1:9000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;              # 保留 Host（支持虚拟主机风格 Bucket）
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # S3/HEAD 行为与缓存处理
    proxy_cache_convert_head off;

    # 流式转发与超时
    proxy_request_buffering off;
    proxy_buffering off;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
  }
}
```
