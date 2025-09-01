import './Badge.css'

/**
 * Badge 组件 - 徽章组件
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 徽章内容
 * @param {'primary'|'secondary'|'success'|'warning'|'danger'|'info'|'gray'} props.variant - 徽章变体
 * @param {'small'|'medium'|'large'} props.size - 徽章尺寸
 * @param {'solid'|'outline'|'soft'} props.style - 徽章样式
 * @param {'circle'|'rounded'|'square'} props.shape - 徽章形状
 * @param {boolean} props.dot - 是否为点状徽章
 * @param {number|string} props.count - 计数值
 * @param {number} props.max - 最大显示数值
 * @param {boolean} props.showZero - 是否显示零值
 * @param {string} props.className - 自定义CSS类名
 */
function Badge({
  children,
  variant = 'primary',
  size = 'medium',
  style = 'solid',
  shape = 'rounded',
  dot = false,
  count,
  max = 99,
  showZero = false,
  className = '',
  ...props
}) {
  // 处理计数显示
  const getDisplayCount = () => {
    if (count === undefined || count === null) return ''
    if (count === 0 && !showZero) return ''
    if (typeof count === 'number' && count > max) return `${max}+`
    return count.toString()
  }

  const displayCount = getDisplayCount()
  const shouldShow = dot || displayCount || (count === 0 && showZero)

  if (!shouldShow && !children) return null

  // 构建CSS类名
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    `badge--${style}`,
    `badge--${shape}`,
    dot && 'badge--dot',
    !children && 'badge--standalone',
    className
  ].filter(Boolean).join(' ')

  if (children) {
    // 有子元素时作为装饰性徽章
    return (
      <div className="badge-wrapper" {...props}>
        {children}
        {shouldShow && (
          <span className={badgeClasses}>
            {!dot && displayCount}
          </span>
        )}
      </div>
    )
  }

  // 独立徽章
  return (
    <span className={badgeClasses} {...props}>
      {!dot && displayCount}
    </span>
  )
}

export default Badge