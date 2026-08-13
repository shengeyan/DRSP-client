# DRSP-client · 配料表过敏源智能分析小程序

> 基于**微信小程序**的商品配料表过敏源智能分析工具，通过「拍照 / 相册 → OCR 识别 → 大模型分析 → 对话交互」一条龙完成过敏源筛查。

## ✨ 核心功能

- 📸 **拍照 / 相册识别** — 调用摄像头或本地相册获取商品配料表图片
- 🔍 **OCR 文字提取** — 自动识别配料表内容
- 🧠 **智能过敏源分析** — 结合 ChatGPT 大模型分析潜在过敏源
- 💬 **对话式交互** — 以聊天形式提问与获取分析结果

## 🛠 技术栈

- **ECMAScript 6**
- **微信小程序开发平台**（基础库 2.19.4）
- **Vant Weapp** — UI 组件库

## 🚀 快速开始

1. 克隆仓库到本地
2. 使用「微信开发者工具」打开项目目录
3. 运行即可在模拟器中预览
4. 通过「微信扫码」真机体验

> 首次运行请先在开发者工具中「构建 npm」，确保 `miniprogram_npm` 依赖已就绪。

## 📁 目录结构

| 目录 / 文件 | 说明 |
| :--- | :--- |
| `pages/index` | 首页（入口，跳转拍照页） |
| `pages/camera` | 拍照 / 选图页（OCR 提取） |
| `pages/chat` | 聊天页（过敏源分析问答） |
| `pages/user` | 我的 |
| `pages/logs` | 日志 |
| `components/beforelogin` | 登录前用户信息授权组件 |
| `utils` | 工具函数 |
| `image` | 项目静态资源 |

## 🧩 主要依赖

- `@vant/weapp` / `vant-weapp` — Vant 小程序 UI 组件库
- `@babel/runtime` — Babel 运行时

## 📱 项目效果

| 首页 | 拍照识别 | 过敏源分析 |
| :---: | :---: | :---: |
| ![首页](https://raw.githubusercontent.com/shengeyan/image/master/img39bf9e72ce37d3343e88e56a58440aaf.jpg) | ![拍照](https://raw.githubusercontent.com/shengeyan/image/master/img74b5a2bf9104f4a0419647ca642b3f44.jpg) | ![分析](https://raw.githubusercontent.com/shengeyan/image/master/img8871af31e4876fa0523b45e83d1db695.jpg) |

![效果](https://raw.githubusercontent.com/shengeyan/image/master/img90132ff45b49ff273ba8ad873efeb030.jpg)

