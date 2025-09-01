import './Card.css'

/**
 * Card 组件 - 通用卡片容器组件
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 卡片内容
 * @param {string} props.title - 卡片标题
 * @param {React.ReactNode} props.header - 自定义头部内容
 * @param {React.ReactNode} props.footer - 页脚内容
 * @param {'outline'|'filled'|'shadow'|'flat'} props.variant - 卡片样式变体
 * @param {'small'|'medium'|'large'} props.size - 卡片尺寸
 * @param {boolean} props.hoverable - 是否可悬浮
 * @param {boolean} props.clickable - 是否可点击
 * @param {boolean} props.loading - 是否显示加载状态
 * @param {string} props.className - 自定义CSS类名
 * @param {Function} props.onClick - 点击事件处理函数
 */
function Card({
  children,
  title,
  header,
  footer,
  variant = 'outline',
  size = 'medium',
  hoverable = false,
  clickable = false,
  loading = false,
  className = '',
  onClick,
  ...props
}) {
  // 构建CSS类名
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--${size}`,
    hoverable && 'card--hoverable',
    clickable && 'card--clickable',
    loading && 'card--loading',
    className
  ].filter(Boolean).join(' ')

  // 处理点击事件
  const handleClick = (event) => {
    if (clickable && onClick && !loading) {
      onClick(event)
    }
  }

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {loading && (
        <div className="card__loading-overlay">
          <div className="card__spinner">
            <svg viewBox="0 0 24 24" className="card__spinner-icon">
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                fill="none"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              />
            </svg>
          </div>
        </div>
      )}
      
      {(header || title) && (
        <div className="card__header">
          {header || (
            <h3 className="card__title">{title}</h3>
          )}
        </div>
      )}
      
      <div className="card__body">
        {children}
      </div>
      
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card