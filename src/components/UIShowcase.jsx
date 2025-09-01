import { useState } from 'react'
import { Button, Input, Modal, Card, Badge, Spinner } from './ui'
import './UIShowcase.css'

function UIShowcase() {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleButtonClick = (variant) => {
    console.log(`${variant} 按钮被点击`)
    if (variant === 'primary') {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="ui-showcase">
      <div className="showcase-header">
        <h1 className="showcase-title">🎨 UI 组件库展示</h1>
        <p className="showcase-description">
          这里展示了我们的UI组件库中的各种组件，基于统一的设计令牌系统构建
        </p>
      </div>

      <section className="showcase-section">
        <h2 className="section-title">🔘 Button 按钮组件</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">按钮变体</h3>
          <div className="demo-content">
            <Button 
              variant="primary" 
              onClick={() => handleButtonClick('primary')}
              loading={loading}
            >
              Primary 主要按钮
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleButtonClick('secondary')}
            >
              Secondary 次要按钮
            </Button>
            <Button 
              variant="success" 
              onClick={() => handleButtonClick('success')}
            >
              Success 成功按钮
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleButtonClick('danger')}
            >
              Danger 危险按钮
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => handleButtonClick('ghost')}
            >
              Ghost 幽灵按钮
            </Button>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">按钮尺寸</h3>
          <div className="demo-content">
            <Button size="small" variant="primary">Small 小按钮</Button>
            <Button size="medium" variant="primary">Medium 中按钮</Button>
            <Button size="large" variant="primary">Large 大按钮</Button>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">按钮状态</h3>
          <div className="demo-content">
            <Button variant="primary">正常状态</Button>
            <Button variant="primary" disabled>禁用状态</Button>
            <Button variant="primary" loading>加载状态</Button>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2 className="section-title">📝 Input 输入框组件</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">输入框变体</h3>
          <div className="demo-content demo-content--column">
            <Input 
              label="Outline 边框样式"
              placeholder="请输入内容..."
              variant="outline"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Input 
              label="Filled 填充样式"
              placeholder="请输入内容..."
              variant="filled"
            />
            <Input 
              label="Underline 下划线样式"
              placeholder="请输入内容..."
              variant="underline"
            />
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">输入框尺寸</h3>
          <div className="demo-content demo-content--column">
            <Input 
              label="Small 小尺寸"
              placeholder="小尺寸输入框"
              size="small"
            />
            <Input 
              label="Medium 中等尺寸"
              placeholder="中等尺寸输入框"
              size="medium"
            />
            <Input 
              label="Large 大尺寸"
              placeholder="大尺寸输入框"
              size="large"
            />
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">输入框功能</h3>
          <div className="demo-content demo-content--column">
            <Input 
              label="普通输入框"
              placeholder="普通状态的输入框"
              hint="这是一个提示信息"
            />
            <Input 
              label="必填字段"
              placeholder="必填字段的输入框"
              required
              hint="这个字段是必须填写的"
            />
            <Input 
              label="错误状态"
              placeholder="错误状态的输入框"
              error="请输入有效的内容"
            />
            <Input 
              label="可清除"
              placeholder="可清除内容的输入框"
              clearable
              hint="输入内容后会显示清除按钮"
            />
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2 className="section-title">🎨 设计令牌系统</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">颜色系统</h3>
          <div className="color-palette">
            <div className="color-group">
              <h4>主色调</h4>
              <div className="color-swatches">
                <div className="color-swatch" style={{backgroundColor: 'var(--color-primary-500)'}} title="Primary 500"></div>
                <div className="color-swatch" style={{backgroundColor: 'var(--color-primary-600)'}} title="Primary 600"></div>
                <div className="color-swatch" style={{backgroundColor: 'var(--color-primary-700)'}} title="Primary 700"></div>
              </div>
            </div>
            <div className="color-group">
              <h4>功能色</h4>
              <div className="color-swatches">
                <div className="color-swatch" style={{backgroundColor: 'var(--color-success-500)'}} title="Success"></div>
                <div className="color-swatch" style={{backgroundColor: 'var(--color-warning-500)'}} title="Warning"></div>
                <div className="color-swatch" style={{backgroundColor: 'var(--color-danger-500)'}} title="Danger"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">阴影系统</h3>
          <div className="shadow-demo">
            <div className="shadow-item" style={{boxShadow: 'var(--shadow-sm)'}}>Small</div>
            <div className="shadow-item" style={{boxShadow: 'var(--shadow-md)'}}>Medium</div>
            <div className="shadow-item" style={{boxShadow: 'var(--shadow-lg)'}}>Large</div>
          </div>
        </div>
      </section>

      {/* Modal 组件展示 */}
      <section className="showcase-section">
        <h2 className="section-title">🪟 Modal 模态框组件</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">模态框示例</h3>
          <div className="demo-content">
            <Button onClick={() => setModalOpen(true)}>打开模态框</Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="示例模态框"
              size="medium"
            >
              <p>这是一个示例模态框的内容。您可以在这里放置任何内容。</p>
              <p>模态框支持多种尺寸和配置选项，包括自定义头部、页脚，以及键盘和鼠标交互。</p>
              <div className="modal__actions">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>取消</Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>确认</Button>
              </div>
            </Modal>
          </div>
        </div>
      </section>

      {/* Card 组件展示 */}
      <section className="showcase-section">
        <h2 className="section-title">🃏 Card 卡片组件</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">卡片变体</h3>
          <div className="demo-content">
            <Card title="Outline 卡片" variant="outline" size="medium">
              <p>这是一个边框样式的卡片组件。</p>
            </Card>
            <Card title="Filled 卡片" variant="filled" size="medium">
              <p>这是一个填充样式的卡片组件。</p>
            </Card>
            <Card title="Shadow 卡片" variant="shadow" size="medium">
              <p>这是一个阴影样式的卡片组件。</p>
            </Card>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">可交互卡片</h3>
          <div className="demo-content">
            <Card 
              title="可悬浮卡片" 
              variant="outline" 
              hoverable 
              onClick={() => alert('卡片被点击!')}
            >
              <p>鼠标悬浮时会有动画效果。</p>
            </Card>
            <Card 
              title="可点击卡片" 
              variant="shadow" 
              clickable
              onClick={() => setSelectedCard('clicked')}
            >
              <p>点击这个卡片会触发事件。</p>
            </Card>
            <Card 
              title="加载状态" 
              variant="filled" 
              loading={selectedCard === 'loading'}
            >
              <p>显示加载状态的卡片。</p>
              <Button onClick={() => setSelectedCard('loading')}>开始加载</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Badge 组件展示 */}
      <section className="showcase-section">
        <h2 className="section-title">🏷️ Badge 徽章组件</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">徽章变体</h3>
          <div className="demo-content">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="gray">Gray</Badge>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">徽章样式</h3>
          <div className="demo-content">
            <Badge variant="primary" style="solid">Solid</Badge>
            <Badge variant="primary" style="outline">Outline</Badge>
            <Badge variant="primary" style="soft">Soft</Badge>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">带计数的徽章</h3>
          <div className="demo-content">
            <Badge count={5}>
              <Button>消息</Button>
            </Badge>
            <Badge count={99}>
              <Button>通知</Button>
            </Badge>
            <Badge count={1000} max={999}>
              <Button>新闻</Button>
            </Badge>
            <Badge dot>
              <Button>状态</Button>
            </Badge>
          </div>
        </div>
      </section>

      {/* Spinner 组件展示 */}
      <section className="showcase-section">
        <h2 className="section-title">⏳ Spinner 加载组件</h2>
        
        <div className="demo-group">
          <h3 className="demo-title">加载器类型</h3>
          <div className="demo-content">
            <Spinner type="spin" label="Spin" />
            <Spinner type="pulse" label="Pulse" />
            <Spinner type="bounce" label="Bounce" />
            <Spinner type="wave" label="Wave" />
            <Spinner type="dots" label="Dots" />
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">加载器尺寸</h3>
          <div className="demo-content">
            <Spinner size="small" label="Small" />
            <Spinner size="medium" label="Medium" />
            <Spinner size="large" label="Large" />
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-title">加载器颜色</h3>
          <div className="demo-content">
            <Spinner color="primary" label="Primary" />
            <Spinner color="secondary" label="Secondary" />
            <div style={{background: '#333', padding: '1rem', borderRadius: '8px'}}>
              <Spinner color="white" label="White" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UIShowcase