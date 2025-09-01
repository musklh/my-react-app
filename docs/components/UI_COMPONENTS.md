# UI组件库文档

## 📚 组件目录

- [Button 按钮](#button-按钮)
- [Input 输入框](#input-输入框)
- [Modal 模态框](#modal-模态框)
- [Card 卡片](#card-卡片)
- [Badge 徽章](#badge-徽章)
- [Spinner 加载器](#spinner-加载器)

---

## Button 按钮

### 概述
Button 组件是最常用的交互元素，用于触发操作、提交表单或导航到其他页面。

### 设计原则
- **一致性**: 保持视觉和交互的一致性
- **可识别性**: 清晰表达按钮的功能和状态
- **可访问性**: 支持键盘导航和屏幕阅读器

### 基础用法

```jsx
import { Button } from '@/components/ui'

function App() {
  return (
    <div>
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="danger">危险操作</Button>
    </div>
  )
}
```

### API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | 按钮变体 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| icon | `ReactNode` | - | 图标内容 |
| iconPosition | `'left' \| 'right'` | `'left'` | 图标位置 |
| onClick | `(event: MouseEvent) => void` | - | 点击事件 |

### 样式变体

#### 主要按钮 (Primary)
用于页面中最重要的操作，一个页面中建议只有一个主要按钮。

```jsx
<Button variant="primary">确认提交</Button>
```

#### 次要按钮 (Secondary)
用于次要操作，可以与主要按钮配合使用。

```jsx
<Button variant="secondary">取消</Button>
```

#### 危险按钮 (Danger)
用于删除、破坏性操作等需要用户谨慎考虑的行为。

```jsx
<Button variant="danger">删除数据</Button>
```

#### 幽灵按钮 (Ghost)
用于弱化的操作，通常用作辅助按钮。

```jsx
<Button variant="ghost">查看详情</Button>
```

### 尺寸规格

```jsx
<Button size="small">小按钮</Button>
<Button size="medium">中按钮</Button>
<Button size="large">大按钮</Button>
```

### 状态示例

#### 加载状态
```jsx
<Button loading>提交中...</Button>
```

#### 禁用状态
```jsx
<Button disabled>已禁用</Button>
```

#### 带图标
```jsx
<Button icon="🔍">搜索</Button>
<Button icon="⬇️" iconPosition="right">下载</Button>
```

### 最佳实践

#### ✅ 推荐做法
- 使用清晰、简洁的按钮文本
- 保持按钮文本简短，通常不超过3个词
- 为危险操作使用 danger 变体
- 在表单中为主要操作使用 primary 按钮

#### ❌ 避免做法
- 不要在一个页面中使用过多的主要按钮
- 不要使用模糊不清的按钮文本如"点击这里"
- 避免按钮文本过长导致换行

### 无障碍设计

- 支持键盘 Tab 导航
- 支持空格键和回车键触发
- 为图标按钮提供 aria-label
- 在加载状态下自动设置 aria-busy

```jsx
<Button 
  icon="🔍" 
  aria-label="搜索产品"
>
  搜索
</Button>
```

---

## Input 输入框

### 概述
Input 组件用于收集用户输入的文本内容，支持多种样式和验证状态。

### 基础用法

```jsx
import { Input } from '@/components/ui'

function LoginForm() {
  return (
    <form>
      <Input 
        label="用户名" 
        placeholder="请输入用户名"
        required
      />
      <Input 
        label="密码" 
        type="password"
        placeholder="请输入密码"
        required
      />
    </form>
  )
}
```

### API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 输入框标签 |
| error | `string` | - | 错误信息 |
| hint | `string` | - | 提示信息 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框尺寸 |
| variant | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | 输入框变体 |
| prefix | `ReactNode` | - | 前缀内容 |
| suffix | `ReactNode` | - | 后缀内容 |
| disabled | `boolean` | `false` | 是否禁用 |
| required | `boolean` | `false` | 是否必填 |

### 样式变体

```jsx
<Input variant="outline" placeholder="边框样式" />
<Input variant="filled" placeholder="填充样式" />
<Input variant="ghost" placeholder="无边框样式" />
```

### 状态示例

#### 错误状态
```jsx
<Input 
  label="邮箱"
  value="invalid-email"
  error="请输入正确的邮箱格式"
/>
```

#### 带前后缀
```jsx
<Input 
  label="网站"
  prefix="https://"
  suffix=".com"
  placeholder="example"
/>

<Input 
  label="金额"
  prefix="¥"
  type="number"
  placeholder="0.00"
/>
```

---

## Modal 模态框

### 概述
Modal 组件用于在当前页面上层显示内容，通常用于重要信息展示、表单填写或确认操作。

### 基础用法

```jsx
import { useState } from 'react'
import { Modal, Button } from '@/components/ui'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        打开模态框
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="确认操作"
      >
        <p>您确定要执行此操作吗？</p>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setIsOpen(false)}>
            确认
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setIsOpen(false)}
          >
            取消
          </Button>
        </div>
      </Modal>
    </>
  )
}
```

### API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| isOpen | `boolean` | `false` | 是否显示模态框 |
| onClose | `() => void` | - | 关闭回调函数 |
| title | `string` | - | 模态框标题 |
| size | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | 模态框尺寸 |
| closeOnOverlay | `boolean` | `true` | 点击遮罩是否关闭 |
| closeOnEscape | `boolean` | `true` | 按ESC是否关闭 |

### 尺寸规格

```jsx
<Modal size="small" title="小型模态框">
  <p>内容区域</p>
</Modal>

<Modal size="medium" title="中型模态框">
  <p>内容区域</p>
</Modal>

<Modal size="large" title="大型模态框">
  <p>内容区域</p>
</Modal>
```

---

## 设计规范

### 颜色系统

#### 主色调
- **Primary**: #646cff - 用于主要操作和强调
- **Secondary**: #61dafb - 用于次要信息和装饰
- **Success**: #10b981 - 用于成功状态
- **Warning**: #f59e0b - 用于警告状态
- **Danger**: #ef4444 - 用于错误和危险操作

#### 中性色
- **Gray-50**: #f8fafc - 背景色
- **Gray-100**: #f1f5f9 - 分割线
- **Gray-500**: #64748b - 次要文本
- **Gray-900**: #0f172a - 主要文本

### 字体系统

```css
/* 字体大小 */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */

/* 字体权重 */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 间距系统

```css
/* 间距单位 */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 圆角系统

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* 圆形 */
```

### 阴影系统

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

---

## 开发指南

### 贡献指南

#### 新增组件流程

1. **需求分析**: 确认组件的用途和API设计
2. **设计评审**: 与设计团队确认视觉规范
3. **代码实现**: 按照组件模板开发
4. **测试验证**: 编写单元测试和集成测试
5. **文档编写**: 完善组件文档和使用示例
6. **代码审查**: 提交PR进行code review

#### 组件开发模板

```jsx
// components/ui/NewComponent/index.jsx
import { forwardRef } from 'react'
import classNames from 'classnames'
import './NewComponent.css'

const NewComponent = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  const componentClasses = classNames(
    'new-component',
    className
  )

  return (
    <div
      ref={ref}
      className={componentClasses}
      {...props}
    >
      {children}
    </div>
  )
})

NewComponent.displayName = 'NewComponent'
export default NewComponent
```

### 测试规范

#### 单元测试示例

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

**维护者**: UI组件团队  
**最后更新**: 2024年9月1日  
**版本**: v1.0.0