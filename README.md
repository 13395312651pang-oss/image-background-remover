# 图片背景移除工具 | Image Background Remover

🖼️ 一款基于 AI 的在线图片背景移除工具，一键去除图片背景，智能识别并保留主体。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## ✨ 功能特性

- 🚀 **一键去背** - AI自动识别，无需手动抠图
- 🎯 **精准识别** - 发丝级精细边缘处理
- ⚡ **秒级处理** - 平均处理时间 < 3秒
- 🔒 **隐私安全** - 自动删除，保护用户隐私
- 📱 **响应式设计** - 支持桌面端和移动端

## 🛠️ 技术栈

- **前端框架**: [Next.js 14](https://nextjs.org/) + [React 18](https://react.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI组件**: [Radix UI](https://www.radix-ui.com/)
- **AI服务**: [Remove.bg API](https://www.remove.bg/api)

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/yourusername/image-background-remover.git
cd image-background-remover
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local，添加你的 API 密钥
```

4. 启动开发服务器
```bash
npm run dev
```

5. 打开浏览器访问 http://localhost:3000

### 环境变量说明

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | API 基础 URL | 否 |
| `REMOVE_BG_API_KEY` | Remove.bg API 密钥 | 是 |

## 📁 项目结构

```
image-background-remover/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 首页
│   ├── layout.tsx           # 根布局
│   └── globals.css          # 全局样式
├── components/               # React 组件
│   ├── UploadZone.tsx       # 上传组件
│   ├── ImagePreview.tsx     # 图片预览
│   ├── ProcessingButton.tsx # 处理按钮
│   └── ResultDownload.tsx   # 结果下载
├── lib/                      # 工具函数
│   ├── api.ts               # API 调用
│   └── utils.ts             # 工具函数
├── hooks/                    # 自定义 Hooks
│   └── useImageProcessing.ts # 图片处理逻辑
├── public/                   # 静态资源
├── .env.example             # 环境变量示例
├── next.config.js           # Next.js 配置
├── tailwind.config.js       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目依赖
```

## 🛣️ 产品路线图

### Phase 1: MVP (当前阶段) ✅
- [x] 基础页面框架
- [x] 图片上传功能
- [ ] 集成 Remove.bg API
- [ ] 结果展示与下载
- [ ] 响应式布局优化

### Phase 2: 功能完善
- [ ] 背景替换（纯色/自定义）
- [ ] 批量处理功能
- [ ] 历史记录（本地存储）
- [ ] 边缘精细化调整

### Phase 3: 商业化
- [ ] 用户系统（注册/登录）
- [ ] 免费额度 + 付费套餐
- [ ] 支付系统集成
- [ ] API 接口开放

### Phase 4: 生态扩展
- [ ] 移动端 App
- [ ] 小程序版本
- [ ] 更多 AI 图像功能
- [ ] 创作者生态

## 🤝 贡献指南

我们欢迎所有形式的贡献，无论是新功能、bug 修复还是文档改进。

### 提交 Pull Request

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [Remove.bg](https://www.remove.bg/) - 提供 AI 背景移除 API
- [Next.js](https://nextjs.org/) - React 应用框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍 UI 组件

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a>
</p>
