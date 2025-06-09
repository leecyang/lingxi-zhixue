# 🌟 灵犀智学 - 多智能体赋能沉浸式教育新生态

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4.svg?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**🚀 基于大语言模型驱动的多智能体协作教育平台**

[在线体验](http://localhost:5174/) • [项目文档](./public/project-document.pdf) • [技术支持](#联系我们)

</div>

## 📖 项目简介

灵犀智学是一个创新的教育科技平台，通过**11个专业智能体**的协同工作，为大学生提供全方位的学习支持和成长陪伴。项目融合了**WebAR技术**、**低代码开发**和**多智能体架构**，打造沉浸式的智慧教育新生态。

### ✨ 核心特色

- 🤖 **11个专业智能体** - 覆盖学习、心理、健康、社交等全方位需求
- 🥽 **WebAR沉浸体验** - 3D机房地图，可视化学习环境
- ⚡ **低代码实现** - 基于Coze平台快速构建和部署
- 🔄 **智能体协作** - 多智能体联动，提供个性化服务
- 🎨 **现代化UI** - 基于React + TailwindCSS的精美界面

## 🎯 智能体矩阵

### 📚 学习认知类智能体
- **计算机三级网络小助手** - 考试大纲解读、知识图谱、错题本管理
- **智农绘图活动文字工作者** - 策划文案、总结材料、科普内容生成
- **活动宣传海报生成器** - 海报设计、宣传语生成、排版建议
- **选课推荐小助手** - 基于兴趣和难度的智能选课推荐

### 💝 心理支持类智能体
- **青藤心桥** - 心理情绪识别与语言安抚，支持音频交互
- **搭子匹配** - 校园兴趣匹配，缓解孤独感的社交连接

### 🏃 健康生活类智能体
- **膳食管理** - 个性化饮食建议，营养摄入均衡优化
- **陆吾训练** - 定制化训练计划与健康提醒
- **无障碍交流** - 语音/文本转手语，支持听障学生交流

### 🚀 自主成长与社交协作类
- **时间管理小助手** - 智能时间规划，可视化日程管理
- **问答回廊** - 开放式知识问答社区，经验分享平台

## 🛠️ 技术栈

### 前端技术
- **React 18+** - 现代化前端框架
- **Vite** - 快速构建工具
- **TailwindCSS** - 原子化CSS框架
- **Framer Motion** - 流畅动画效果
- **Radix UI** - 无障碍组件库
- **Lucide React** - 精美图标库

### AR/3D技术
- **A-Frame** - WebAR框架
- **React Three Fiber** - React 3D渲染
- **Sketchfab** - 3D模型展示

### AI集成
- **Coze平台** - 低代码智能体构建
- **大语言模型** - 智能对话和推理
- **多智能体协作** - 分布式AI服务

## 🚀 快速开始

### 环境要求
- Node.js 16+
- pnpm (推荐) 或 npm

### 安装依赖
```bash
# 克隆项目
git clone https://github.com/lingxi-zhixue/lingxi-zhixue-v2.git
cd lingxi-zhixue-v2

# 安装依赖
pnpm install
# 或
npm install
```

### 开发运行
```bash
# 启动开发服务器
pnpm dev
# 或
npm run dev
```

访问 [http://localhost:5174](http://localhost:5174) 查看项目

### 构建部署
```bash
# 构建生产版本
pnpm build
# 或
npm run build

# 预览构建结果
pnpm preview
# 或
npm run preview
```

## 📱 功能展示

### 🎮 WebAR机房体验
- 沉浸式3D机房环境探索
- 设备布局和网络架构可视化
- 交互式学习体验

### 🤖 智能体交互
- 实时对话和问答
- 个性化学习建议
- 多模态交互支持

### 📊 学习数据分析
- 学习行为追踪
- 智能推荐算法
- 个性化干预策略

## 🏗️ 项目结构

```
lingxi-zhixue-v2/
├── public/                 # 静态资源
│   └── project-document.pdf
├── src/
│   ├── components/         # React组件
│   │   ├── ui/            # UI组件库
│   │   └── WebAR.jsx      # AR组件
│   ├── hooks/             # 自定义Hooks
│   ├── lib/               # 工具库
│   ├── App.jsx            # 主应用组件
│   └── main.jsx           # 应用入口
├── components.json         # 组件配置
├── package.json           # 项目配置
├── tailwind.config.js     # TailwindCSS配置
└── vite.config.js         # Vite配置
```

## 🎨 设计理念

### 用户体验优先
- 直观的界面设计
- 流畅的交互动画
- 响应式布局适配

### 技术创新融合
- AI原生应用设计
- WebAR技术集成
- 低代码开发模式

### 教育生态构建
- 开放的智能体平台
- 社区驱动的内容创作
- 可持续的技术架构

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

## 👥 团队成员

**项目负责人：** 李承阳

**核心团队：** 李远洋、吴桐、苏德宇、范新蕊、陈妍、黄悦、王青、王秉杭、胡宇昊

## 📞 联系我们

- 📧 **邮箱：** yangyangli0426@gmail.com
- 🐙 **GitHub：** [lingxi-zhixue](https://github.com/lingxi-zhixue)
- 💬 **技术交流：** 欢迎提交Issue或加入讨论

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给我们一个Star！**

**让我们一起构建更智慧的教育未来！** 🚀

</div>