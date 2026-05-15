没问题，已经为你整理好了。这份 Markdown 格式的笔记可以直接粘贴到你的博客或 Notion 里。
# 🚀 VPS 重装 Alpine Linux 指南 (Debian 篇)
本指南适用于在 **CloudCone**、**DigitalOcean** 等 KVM 架构的 VPS 上，将 Debian 快速重装为极致精简的 **Alpine Linux**。
## 一、 重装核心步骤
### 1. 准备工作
 * **备份数据**：重装会抹除所有硬盘数据。
 * **打开 VNC**：建议在 VPS 后台开启 VNC 控制台，以便实时观察重启后的安装进度。
### 2. 执行重装脚本
在原 Debian 终端输入以下命令：
```bash
# 下载重装脚本
curl -O https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh

# 开始重装 (以海外洛杉矶节点为例)
# --password: 设置你的 root 密码
# --mirror: 使用官方 CDN 镜像源
bash reinstall.sh alpine \
  --password '你的密码' \
  --mirror 'https://dl-cdn.alpinelinux.org/alpine/'

```
### 3. 重启
脚本执行完成后会提示重启，此时 SSH 会断开，系统会自动进入内存完成安装。
## 二、 Alpine 初始化配置
### 1. 开启 SSH Root 登录
Alpine 默认可能禁止 Root 远程登录，需手动开启：
```bash
# 允许密码登录
sed -i 's/#PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config

# 重启 SSH 服务并设为开机自启
rc-service sshd restart
rc-update add sshd

```
### 2. 启用 BBR 加速
对于网络转发（如 sing-box、xray）至关重要：
```bash
cat >> /etc/sysctl.conf <<EOF
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr
EOF

# 使配置生效
sysctl -p

```
### 3. 修改主机名
```bash
echo "9527" > /etc/hostname
hostname -F /etc/hostname

```
## 三、 Alpine 常用操作备忘
### 1. 包管理 (apk)
| 功能 | 命令 |
|---|---|
| 更新索引 | apk update |
| 安装软件 | apk add <package> |
| 卸载软件 | apk del <package> |
| 查找包 | apk search <name> |
### 2. 服务管理 (OpenRC)
| 功能 | 命令 |
|---|---|
| 启动服务 | rc-service <name> start |
| 停止服务 | rc-service <name> stop |
| 重启服务 | rc-service <name> restart |
| 设为开机自启 | rc-update add <name> |
| 取消开机自启 | rc-update del <name> |
## 四、 避坑小贴士
 * **内核选择**：KVM VPS 默认会安装 linux-virt，这是最省资源的精简内核。
 * **时区设置**：若需同步时间，可执行 apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime。
 * **libc 差异**：注意 Alpine 使用的是 musl libc，运行非静态编译的二进制文件时需选择 musl 版本。
> **Note:** 9527 Advanced Custom System. Designed by X-cha
> ng.
> 
