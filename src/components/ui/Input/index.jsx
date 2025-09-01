import { forwardRef, useState, useId } from 'react'
import './Input.css'

/**
 * Input 组件 - 通用输入框组件
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.label - 输入框标签
 * @param {string} props.placeholder - 占位符文本
 * @param {string} props.error - 错误信息
 * @param {string} props.hint - 提示信息
 * @param {'small'|'medium'|'large'} props.size - 输入框尺寸
 * @param {'outline'|'filled'|'underline'} props.variant - 输入框样式变体
 * @param {React.ReactNode} props.prefix - 前缀内容
 * @param {React.ReactNode} props.suffix - 后缀内容
 * @param {boolean} props.disabled - 是否禁用
 * @param {boolean} props.required - 是否必填
 * @param {boolean} props.clearable - 是否显示清除按钮
 * @param {boolean} props.fullWidth - 是否占满宽度
 * @param {string} props.className - 自定义CSS类名
 * @param {Function} props.onChange - 值变化事件处理函数
 * @param {Function} props.onClear - 清除事件处理函数
 */
const Input = forwardRef(({
  label,
  placeholder,
  error,
  hint,
  size = 'medium',
  variant = 'outline',
  prefix,
  suffix,
  disabled = false,
  required = false,
  clearable = false,
  fullWidth = false,
  className = '',
  value,
  onChange,
  onClear,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(value || '')
  const inputId = useId()
  
  // 使用受控或非受控模式
  const currentValue = value !== undefined ? value : internalValue
  const hasValue = currentValue && currentValue.length > 0

  // 构建CSS类名
  const wrapperClasses = [
    'input-wrapper',
    fullWidth && 'input-wrapper--full-width',
    className
  ].filter(Boolean).join(' ')

  const containerClasses = [
    'input__container',
    `input__container--${variant}`,
    `input__container--${size}`,
    focused && 'input__container--focused',
    error && 'input__container--error',
    disabled && 'input__container--disabled',
    prefix && 'input__container--with-prefix',
    suffix && 'input__container--with-suffix'
  ].filter(Boolean).join(' ')

  const inputClasses = [
    'input__field',
    hasValue && 'input__field--has-value'
  ].filter(Boolean).join(' ')

  // 处理值变化
  const handleChange = (event) => {
    const newValue = event.target.value
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(event)
  }

  // 处理焦点事件
  const handleFocus = (event) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event) => {
    setFocused(false)
    onBlur?.(event)
  }

  // 处理清除
  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' }
    }
    
    if (value === undefined) {
      setInternalValue('')
    }
    onChange?.(syntheticEvent)
    onClear?.()
  }

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required" aria-label="必填">*</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {prefix && (
          <div className="input__prefix" aria-hidden="true">
            {prefix}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          value={currentValue}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {clearable && hasValue && !disabled && (
          <button
            type="button"
            className="input__clear"
            onClick={handleClear}
            aria-label="清除内容"
            tabIndex={-1}
          >
            <svg viewBox="0 0 24 24" className="input__clear-icon">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        
        {suffix && (
          <div className="input__suffix" aria-hidden="true">
            {suffix}
          </div>
        )}
      </div>
      
      {error && (
        <div id={`${inputId}-error`} className="input__error" role="alert">
          <svg viewBox="0 0 24 24" className="input__error-icon" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor"
            />
          </svg>
          {error}
        </div>
      )}
      
      {hint && !error && (
        <div id={`${inputId}-hint`} className="input__hint">
          {hint}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input