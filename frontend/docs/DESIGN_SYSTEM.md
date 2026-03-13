# AIGovern Pro 设计系统 & 组件库文档

## 📐 设计系统概览

AIGovern Pro 采用**精密数据驱动美学**（Precision Data Dashboard），为企业级B端管理系统打造专业、现代的视觉体验。

### 核心美学特征
- **深色主题为主** - 适合长时间使用的管理系统
- **高对比accent色** - 青色 + 金色 + 紫色 + 粉色
- **科技感微动画** - 流畅的数据转换、卡片交互
- **卡片式布局** - 信息组织清晰、视觉层级分明
- **企业级排版** - Plus Jakarta Sans + JetBrains Mono + Noto Sans SC

---

## 🎨 色彩系统

### 深色主题（Primary）
```
背景色：
  - 主背景：#0f172a (--color-bg-primary)
  - 次背景：#1e293b (--color-bg-secondary)
  - 三级背景：#334155 (--color-bg-tertiary)
  - 表面色：#1a1f2e (--color-surface)

文字色：
  - 主文字：#f1f5f9 (--color-text-primary)
  - 次文字：#cbd5e1 (--color-text-secondary)
  - 三级文字：#94a3b8 (--color-text-tertiary)

Accent色（强调色）：
  - 青色：#00d9ff (--color-accent-cyan) - 主要交互
  - 金色：#ffd700 (--color-accent-gold) - 次要强调
  - 紫色：#7f5af0 (--color-accent-purple) - 警告/提示
  - 粉色：#ff69b4 (--color-accent-pink) - 数据展示

状态色：
  - 成功：#10b981
  - 警告：#f59e0b
  - 危险：#ef4444
```

### 浅色主题（Secondary）
- 主背景：#ffffff
- 次背景：#f8fafc
- 文字色反转为深色系

### 使用规则
1. **背景层级** - 用三级背景区分内容优先级
2. **Accent色区分功能** - 青色用于主要操作，金色用于重要数据
3. **文字对比** - 保持最小对比度 4.5:1
4. **边框色** - 使用 rgba(0, 217, 255, 0.1-0.3) 创建微妙分割

---

## 🔤 排版系统

### 字体栈
```typescript
// 显示字体（标题、按钮）
--font-display: 'Plus Jakarta Sans', 'Noto Sans SC', sans-serif;

// 正文字体
--font-body: 'Plus Jakarta Sans', 'Noto Sans SC', sans-serif;

// 代码/数据字体
--font-mono: 'JetBrains Mono', monospace;
```

### 字体大小等级
```
Display (页面标题)：28px, 700 weight, -0.5px 字间距
Headline 1 (卡片标题)：20px, 700 weight
Headline 2 (小标题)：16px, 600 weight
Body Large (正文)：14px, 400 weight, 1.6 行高
Body Default (标注)：13px, 400 weight, 1.5 行高
Body Small (辅助)：12px, 500 weight
Caption (极小)：11px, 600 weight, 0.5px 字间距
Mono (数据)：13px, 500 weight, JetBrains Mono
```

### 使用建议
1. **KPI数值** - Mono字体，提升数据科技感
2. **标题** - Plus Jakarta Sans，加强视觉层级
3. **长文本** - 使用1.5-1.6行高，提升可读性
4. **标签/徽章** - 字母间距 0.5-1px，提升质感

---

## 🧩 组件库

### 1. KPI卡片 (KPI Card)
**用途**：展示关键指标

**属性**：
```typescript
interface KPICard {
  label: string;        // 指标名称
  value: string;        // 主值（数字）
  change: string;       // 环比变化
  trend: 'up' | 'down'; // 趋势方向
  icon: ReactNode;      // emoji图标
  color?: 'cyan' | 'gold' | 'purple' | 'pink';
}
```

**实现细节**：
- 悬停时背景渐变 + 向上偏移 4px
- 左侧有渐变光晕效果
- 数值用Mono字体，增强科技感
- 变化率用对应的趋势颜色

---

### 2. 图表卡片 (Chart Card)
**用途**：数据可视化容器

**特性**：
- 标题栏背景 rgba(0, 217, 255, 0.1)
- 悬停时增强边框和阴影
- 响应式高度，自适应容器
- Recharts集成

---

### 3. 异常预警卡片 (Anomaly Card)
**用途**：展示异常/问题

**严重程度**：
- `high` - 红色边框 + 红色背景 (rgba(239, 68, 68, 0.05))
- `medium` - 橙色边框 + 橙色背景

**交互**：
- 悬停时向右偏移 4px
- 显示左侧彩色指示线

---

### 4. 推荐操作卡片 (Recommendation Card)
**用途**：AI生成的操作建议

**特性**：
- 青色主题背景
- 包含标题、描述、操作按钮
- 悬停时左侧指示线变金色
- Primary按钮采用渐变样式

---

### 5. 对话面板 (Chat Panel)
**用途**：AGUI知识问答交互

**特性**：
- 固定右下角浮窗
- 可折叠/展开
- 支持对话历史
- 显示引用源 + 置信度
- 推荐问题快捷键

---

## 🎬 动画系统

### 进入动画
```css
slideInUp: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)
  /* KPI卡片进入 */

slideInRight: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
  /* 对话面板进入 */

fadeInUp: 0.3s ease
  /* 对话消息进入 */
```

### 交互动画
```css
hovering:
  - 卡片：translateY(-4px) + 边框加强
  - 按钮：opacity 0.85 + translateY(-1px)
  - 文本链接：color变更 + 下划线

transitions:
  - 颜色变更：0.2s ease
  - 位移变更：0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
  - 大小变更：0.3s ease
```

---

## 📱 响应式设计

### 断点
```typescript
lg: 1200px+   // 桌面 - 完整布局
md: 768px+    // 平板 - 2列网格
sm: 576px     // 手机 - 单列布局
xs: <576px    // 极小屏幕 - 适配小屏
```

### 调整规则
| 分辨率 | 侧边栏 | 内容 | 对话面板 |
|------|--------|------|---------|
| lg   | 280px  | full | 420px浮窗 |
| md   | 收起   | full | 360px浮窗 |
| sm   | 收起   | full | 100%-32px |
| xs   | 收起   | full | 100%-16px |

---

## ⌨️ 交互规范

### 按钮样式
1. **Primary Button** - 渐变背景 (Cyan → Purple/Gold)
2. **Secondary Button** - 边框 + 透明背景
3. **Text Button** - 无背景 + Accent色文字
4. **Disabled** - opacity 0.5 + 禁用光标

### 输入框
- 焦点时背景变亮 + 边框加强
- 支持快捷键（Enter发送 Shift+Enter换行）
- placeholder文字 #64748b

### 菜单项
- 选中时：Accent色背景 + 左侧彩色条
- 悬停时：浅Accent色背景 + 文字变Accent色

---

## 🔧 开发指南

### CSS变量使用
```typescript
// 在任何组件中导入并使用
const kpiValue = 'var(--color-accent-cyan)';
const background = 'var(--color-bg-secondary)';
const textColor = 'var(--color-text-primary)';
```

### TypeScript组件示例
```typescript
import styles from './Component.module.css';

interface ComponentProps {
  title: string;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

const Component: React.FC<ComponentProps> = ({ title, loading = false, theme = 'dark' }) => {
  return (
    <div className={`${styles.component} ${styles[theme]}`}>
      {/* 内容 */}
    </div>
  );
};
```

### 颜色适配暗黑模式
```css
/* 自动适配 */
.element {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* 深色主题显式覆盖（可选） */
.dark .element {
  background: #1e293b;
}

/* 浅色主题显式覆盖 */
.light .element {
  background: #f8fafc;
}
```

---

## 📚 页面架构

### 页面组成
每个主页面遵循统一结构：

```typescript
Layout
  ├─ Sider (导航菜单)
  ├─ Header (顶部导航)
  └─ Content (主内容)
      ├─ PageHeader (标题 + 副标题)
      ├─ MainContent
      │  ├─ 数据卡片区
      │  ├─ 图表区
      │  └─ 操作区
      └─ ChatPanel (右下角浮窗)
```

### 页面列表
1. **Dashboard** - 仪表板（核心概览）
2. **Documents** - 知识库管理
3. **DataQuery** - 数据查询 + SQL生成
4. **SmartOps** - 智能操作执行
5. **Diagnosis** - 经营诊断分析

---

## 🚀 使用checklist

- [ ] 所有页面导入主题CSS变量
- [ ] 使用CSS模块避免样式冲突
- [ ] 组件支持light/dark主题切换
- [ ] 响应式测试在所有断点
- [ ] 无障碍性检查（颜色对比 WCAG AA）
- [ ] 动画性能优化（60fps）
- [ ] 字体加载优化

---

**维护人**：Design System Team
**最后更新**：2026-03-12
**版本**：1.0
