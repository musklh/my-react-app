import { forwardRef } from 'react'
import './Button.css'

/**
 * Button 组件 - 通用按钮组件
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 按钮内容
 * @param {'primary'|'secondary'|'danger'|'success'|'warning'|'ghost'|'outline'} props.variant - 按钮样式变体
 * @param {'small'|'medium'|'large'} props.size - 按钮尺寸
 * @param {boolean} props.disabled - 是否禁用
 * @param {boolean} props.loading - 是否显示加载状态
 * @param {React.ReactNode} props.icon - 图标
 * @param {'left'|'right'} props.iconPosition - 图标位置
 * @param {boolean} props.fullWidth - 是否占满宽度
 * @param {string} props.className - 自定义CSS类名
 * @param {Function} props.onClick - 点击事件处理函数
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  // 构建CSS类名
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    fullWidth && 'btn--full-width',
    !children && icon && 'btn--icon-only',
    className
  ].filter(Boolean).join(' ')

  // 处理点击事件
  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      ref={ref}
      type="button"
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="btn__spinner-icon">
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round"
              fill="none"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      
      {children && (
        <span className="btn__text">
          {children}
        </span>
      )}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button