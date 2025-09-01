import './Spinner.css'

/**
 * Spinner 组件 - 加载动画组件
 * 
 * @param {Object} props - 组件属性
 * @param {'small'|'medium'|'large'} props.size - 加载器尺寸
 * @param {'primary'|'secondary'|'white'|'gray'} props.color - 加载器颜色
 * @param {'spin'|'pulse'|'bounce'|'wave'|'dots'} props.type - 动画类型
 * @param {string} props.label - 加载文本
 * @param {boolean} props.overlay - 是否为覆盖层模式
 * @param {string} props.className - 自定义CSS类名
 */
function Spinner({
  size = 'medium',
  color = 'primary',
  type = 'spin',
  label,
  overlay = false,
  className = '',
  ...props
}) {
  // 构建CSS类名
  const spinnerClasses = [
    'spinner',
    `spinner--${size}`,
    `spinner--${color}`,
    `spinner--${type}`,
    overlay && 'spinner--overlay',
    className
  ].filter(Boolean).join(' ')

  const renderSpinner = () => {
    switch (type) {
      case 'spin':
        return (
          <svg viewBox="0 0 24 24" className="spinner__icon">
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
        )
      
      case 'pulse':
        return <div className="spinner__pulse" />
      
      case 'bounce':
        return (
          <div className="spinner__bounce-container">
            <div className="spinner__bounce-dot" />
            <div className="spinner__bounce-dot" />
            <div className="spinner__bounce-dot" />
          </div>
        )
      
      case 'wave':
        return (
          <div className="spinner__wave-container">
            <div className="spinner__wave-bar" />
            <div className="spinner__wave-bar" />
            <div className="spinner__wave-bar" />
            <div className="spinner__wave-bar" />
            <div className="spinner__wave-bar" />
          </div>
        )
      
      case 'dots':
        return (
          <div className="spinner__dots-container">
            <div className="spinner__dot" />
            <div className="spinner__dot" />
            <div className="spinner__dot" />
          </div>
        )
      
      default:
        return (
          <svg viewBox="0 0 24 24" className="spinner__icon">
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
        )
    }
  }

  if (overlay) {
    return (
      <div className={spinnerClasses} {...props}>
        <div className="spinner__content">
          {renderSpinner()}
          {label && <span className="spinner__label">{label}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className={spinnerClasses} {...props}>
      {renderSpinner()}
      {label && <span className="spinner__label">{label}</span>}
    </div>
  )
}

export default Spinner