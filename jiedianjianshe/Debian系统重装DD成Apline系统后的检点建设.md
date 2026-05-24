# 🚀 9527 高级定制系统：Alpine Linux + Xray 极简搭建指南
本方案专为 **CloudCone/洛杉矶** 环境优化，利用 **Cloudflare CDN** 实现 443 端口 TLS 卸载，让 VPS 运行压力降至最低（内存占用 < 50MB）。
## 一、 系统环境准备
在 Alpine Linux 环境下，执行以下命令安装必要依赖：
```bash
# 更新并安装基础工具
apk update && apk upgrade
apk add curl wget ca-certificates unzip gcompat

# 设置时区为上海
apk add tzdata
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
echo "Asia/Shanghai" > /etc/timezone
apk del tzdata # 用完即删，极致精简

```
## 二、 安装 Xray-core
 1. **下载并授权**：
   ```bash
   mkdir -p /usr/local/etc/xray
   wget https://github.com/XTLS/Xray-core/releases/latest/download/Xray-linux-64.zip
   unzip Xray-linux-64.zip -d /usr/local/bin/
   chmod +x /usr/local/bin/xray
   
   ```
 2. **写入配置 (VLESS + WS 模式)**：
   *使用 80 端口配合 Cloudflare 最佳。*
   ```bash
   cat > /usr/local/etc/xray/config.json <<EOF
   {
       "log": { "loglevel": "warning" },
       "inbounds": [{
           "port": 80,
           "protocol": "vless",
           "settings": {
               "clients": [{ "id": "b136f91f-bfb2-4f0f-a331-b1661ae5aa1e" }],
               "decryption": "none"
           },
           "streamSettings": {
               "network": "ws",
               "wsSettings": { "path": "/9527-vless" }
           }
       }],
       "outbounds": [{ "protocol": "freedom" }]
   }
   EOF
   
   ```
## 三、 配置 OpenRC 开机自启
针对 Alpine 的服务管理编写启动脚本：
```bash
cat > /etc/init.d/xray <<EOF
#!/sbin/openrc-run
description="Xray-core Service"
command="/usr/local/bin/xray"
command_args="run -c /usr/local/etc/xray/config.json"
pidfile="/run/xray.pid"
command_background=true
depend() { need net; }
EOF

chmod +x /etc/init.d/xray
rc-update add xray default
rc-service xray start

```
## 四、 核心网络设置 (CF 篇)
为了确保节点打通，必须完成以下闭环：
 * **DNS 记录**：blog.954006.xyz 解析到 VPS IP，并**点亮橙色云朵**。
 * **SSL/TLS 模式**：设置为 **Flexible (灵活)**。
 * **防火墙**：
   ```bash
   iptables -I INPUT -p tcp --dport 80 -j ACCEPT
   /etc/init.d/iptables save
   
   ```
## 五、 客户端连接指南
| 参数项 | 配置内容 |
|---|---|
| **服务器地址** | blog.954006.xyz |
| **端口** | 443 |
| **用户 ID** | b136f91f-bfb2-4f0f-a331-b1661ae5aa1e |
| **传输协议** | ws |
| **伪装路径** | /9527-vless |
| **TLS** | 开启 (ON) |
> **Note:** 节点状态验证：浏览器访问 http://blog.954006.xyz/9527-vless 返回 **400 Bad Request** 即为成功。
> *Designed by X-chang | 9527 Advanced Custom System*

> 
