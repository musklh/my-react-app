import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

/**
 * Modal 组件 - 通用模态框组件
 * 
 * @param {Object} props - 组件属性
 * @param {boolean} props.isOpen - 是否显示模态框
 * @param {Function} props.onClose - 关闭回调函数
 * @param {string} props.title - 模态框标题
 * @param {React.ReactNode} props.children - 模态框内容
 * @param {'small'|'medium'|'large'|'fullscreen'} props.size - 模态框尺寸
 * @param {boolean} props.closeOnOverlay - 点击遮罩层是否关闭
 * @param {boolean} props.closeOnEscape - 按ESC键是否关闭
 * @param {boolean} props.showCloseButton - 是否显示关闭按钮
 * @param {string} props.className - 自定义CSS类名
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = ''
}) {
  const modalRef = useRef()
  const previousActiveElement = useRef()

  useEffect(() => {
    if (!isOpen) return

    // 保存当前焦点元素
    previousActiveElement.current = document.activeElement

    // 处理ESC键关闭
    const handleEscape = (event) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose()
      }
    }

    // 处理焦点陷阱
    const handleTabKey = (event) => {
      if (event.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    // 防止背景滚动
    document.body.style.overflow = 'hidden'
    
    // 添加事件监听
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTabKey)

    // 设置初始焦点
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (firstFocusable) {
          firstFocusable.focus()
        } else {
          modalRef.current.focus()
        }
      }
    }, 0)

    return () => {
      // 清理事件监听
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)
      
      // 恢复背景滚动
      document.body.style.overflow = 'unset'
      
      // 恢复焦点
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  const modalClasses = [
    'modal',
    `modal--${size}`,
    className
  ].filter(Boolean).join(' ')

  const handleOverlayClick = (event) => {
    if (closeOnOverlay && event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleCloseClick = () => {
    onClose()
  }

  return createPortal(
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        ref={modalRef}
        className={modalClasses}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && (
              <h2 id="modal-title" className="modal__title">{title}</h2>
            )}
            {showCloseButton && (
              <button 
                className="modal__close"
                onClick={handleCloseClick}
                aria-label="关闭模态框"
                type="button"
              >
                <svg viewBox="0 0 24 24" className="modal__close-icon">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal