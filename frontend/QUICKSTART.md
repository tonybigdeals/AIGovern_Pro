# 🚀 AIGovern Pro 快速启动指南

## ✅ 第一阶段完成清单

- [x] 高保真Figma设计系统 - 深色主题 + Accent色 + 完整组件库
- [x] 5大核心页面框架 - Dashboard / Documents / DataQuery / SmartOps / Diagnosis
- [x] AGUI对话面板 - 右侧浮窗、对话历史、引用溯源、置信度
- [x] 完整项目配置 - package.json / vite.config.ts / tsconfig.json
- [x] 设计系统文档 - 色彩、字体、动画、组件库规范
- [x] 实施指南 - 开发指南、API规范、最佳实践

## 📋 前端项目结构

```
frontend/
├── src/
│   ├── pages/                    # 5大核心页面
│   │   ├── Dashboard.tsx         # 仪表板
│   │   ├── Documents.tsx         # 知识库
│   │   ├── DataQuery.tsx         # 数据查询
│   │   ├── SmartOps.tsx          # 智能操作
│   │   └── Diagnosis.tsx         # 经营诊断
│   │
│   ├── components/
│   │   └── AGUI/
│   │       └── ChatPanel.tsx     # 对话面板
│   │
│   ├── App.tsx                   # 路由配置
│   ├── main.tsx                  # 入口
│   └── index.css                 # 全局样式
│
├── docs/
│   ├── DESIGN_SYSTEM.md          # 设计规范（150行）
│   └── IMPLEMENTATION_GUIDE.md   # 实施指南（400行）
│
├── package.json                  # 依赖管理 ✅ 新增
├── vite.config.ts                # Vite配置 ✅ 新增
├── tsconfig.json                 # TS配置 ✅ 新增
├── .env.example                  # 环境变量示例 ✅ 新增
├── .eslintrc.json                # ESLint配置 ✅ 新增
├── .prettierrc.json              # Prettier配置 ✅ 新增
├── .gitignore                    # Git忽略 ✅ 新增
├── index.html                    # HTML入口 ✅ 新增
└── README.md                     # 项目说明 ✅ 新增
```

## 🎯 本地开发步骤

### 1. 安装依赖

```bash
cd frontend

# 使用npm
npm install

# 或使用pnpm（推荐，更快）
pnpm install
```

### 2. 环境配置

```bash
# 复制环境变量模板
cp .env.example .env.local

# 修改 .env.local 中的后端地址（默认: http://localhost:8000）
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

自动打开 http://localhost:3000

## 📱 可用页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 仪表板 | `/` 或 `/dashboard` | KPI展示、图表、预警、推荐 |
| 知识库 | `/documents` | 文档上传、向量化、检索测试 |
| 数据查询 | `/query` | 自然语言查询、SQL预览、图表 |
| 智能操作 | `/operations` | 操作模板、执行日志、回滚 |
| 经营诊断 | `/diagnosis` | 指标分析、根因分析、决策建议 |

## 🛠️ 可用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build            # 生产构建
npm run preview          # 预览生产构建

# 代码质量
npm run lint             # ESLint检查
npm run type-check       # TypeScript类型检查
npm run format           # 代码格式化

# 测试
npm run test             # 运行单元测试
```

## 🎨 设计系统速查表

### 色彩
```css
/* 背景 */
--color-bg-primary: #0f172a      /* 主背景 */
--color-bg-secondary: #1e293b    /* 次背景 */
--color-bg-tertiary: #334155     /* 三级背景 */

/* Accent色 */
--color-accent-cyan: #00d9ff     /* 主强调 */
--color-accent-gold: #ffd700     /* 次强调 */
--color-accent-purple: #7f5af0   /* 警告/提示 */
--color-accent-pink: #ff69b4     /* 数据展示 */
```

### 字体
```css
--font-display: 'Plus Jakarta Sans'        /* 标题 */
--font-body: 'Plus Jakarta Sans'           /* 正文 */
--font-mono: 'JetBrains Mono'              /* 数据/代码 */
```

### 组件使用

```typescript
// KPI卡片
<div className={styles.kpiCard}>
  <div className={styles.kpiIcon}>📦</div>
  <div className={styles.kpiValue}>1,234</div>
</div>

// 图表卡片
<Card className={styles.chartCard}>
  <LineChart data={data} />
</Card>

// 异常预警
<div className={`${styles.anomalyItem} ${styles['severity-high']}`}>
  内容
</div>
```

## 🔗 后端API配置

开发环境已配置API代理，所有 `/api/*` 请求自动转发到 `http://localhost:8000`

修改位置：`vite.config.ts` → `server.proxy`

## 📚 核心依赖说明

| 依赖 | 版本 | 用途 |
|------|------|------|
| react | 18.3 | UI框架 |
| react-router-dom | 6.20 | 路由管理 |
| antd | 5.11 | UI组件库 |
| recharts | 2.10 | 图表库 |
| axios | 1.6 | HTTP客户端 |
| vite | 5.0 | 构建工具 |
| typescript | 5.2 | 类型系统 |

## 🚨 常见问题排查

### 问题1：启动失败提示缺少依赖

```bash
# 清除缓存重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 问题2：样式未应用

- 确认导入了 `.module.css` 文件
- 检查CSS类名拼写
- 清空浏览器缓存

### 问题3：路由404

- 检查 `App.tsx` 中的路由配置
- 确认页面文件在 `src/pages/` 目录
- 验证路由路径与菜单配置一致

### 问题4：API请求失败

- 检查后端服务是否运行 (http://localhost:8000)
- 查看 `.env.local` 中的 `VITE_API_URL` 配置
- 检查浏览器Network标签中的请求

## 🔍 开发工具推荐

- **VS Code** - 主编辑器
  - 扩展：ESLint、Prettier、REST Client
- **React DevTools** - React调试
- **Redux DevTools** - 状态管理调试
- **Chrome DevTools** - 网络/性能分析

## 📖 文档链接

- [设计系统](./docs/DESIGN_SYSTEM.md) - 完整UI规范
- [实施指南](./docs/IMPLEMENTATION_GUIDE.md) - 开发最佳实践
- [Ant Design文档](https://ant.design/)
- [React官方文档](https://react.dev/)
- [Vite官方文档](https://vitejs.dev/)

## ⏭️ 下一步计划

**第二阶段（待开始）**：
1. 搭建FastAPI后端项目
2. 配置 PostgreSQL + Milvus + Redis
3. 实现RAG检索流程
4. 集成商用大模型（豆包/通义千问）
5. 完整验证知识问答能力

**第三、四阶段**：
- 数据查询 + SQL生成引擎
- 智能操作执行引擎
- 经营诊断分析模块

## 💡 开发建议

1. **遵循设计系统** - 所有样式使用CSS变量
2. **使用CSS Modules** - 避免样式冲突
3. **分层开发** - 先样式 → 交互 → 数据连接
4. **充分测试** - 在真实设备上测试响应式
5. **性能优先** - 避免不必要的re-render

---

**项目状态**：🟢 第一阶段完成，UI框架就绪
**下一步**：开始第二阶段 - 后端开发

需要帮助？查看 `README.md` 或 `docs/IMPLEMENTATION_GUIDE.md`
