/**
 * UI 组件库统一导出
 * 
 * 这个文件作为UI组件库的统一入口，提供所有组件的导出
 * 使用方式：import { Button, Input } from '@/components/ui'
 */

// 基础组件
export { default as Button } from './Button'
export { default as Input } from './Input'

// 布局组件
export { default as Card } from './Card'
export { default as Modal } from './Modal'

// 反馈组件
export { default as Badge } from './Badge'
export { default as Spinner } from './Spinner'
// export { default as Toast } from './Toast'

// 数据展示组件 (待实现)
// export { default as Tooltip } from './Tooltip'
// export { default as Dropdown } from './Dropdown'
// export { default as Table } from './Table'

// 导航组件 (待实现)
// export { default as Tabs } from './Tabs'
// export { default as Breadcrumb } from './Breadcrumb'
// export { default as Pagination } from './Pagination'

/**
 * 组件库版本信息
 */
export const UI_VERSION = '1.0.0'

/**
 * 组件库配置
 */
export const UI_CONFIG = {
  version: UI_VERSION,
  prefix: 'ui',
  theme: {
    default: 'dark',
    available: ['light', 'dark']
  }
}