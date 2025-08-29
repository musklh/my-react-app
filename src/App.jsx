import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [theme, setTheme] = useState('dark')
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    achievements: 0
  })

  // 动画计数效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        projects: 42,
        tasks: 128,
        achievements: 15
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const features = [
    {
      icon: '🚀',
      title: '快速开发',
      description: '基于 Vite 的极速开发体验，支持热更新'
    },
    {
      icon: '⚡',
      title: '现代框架',
      description: '使用最新的 React 19 和现代化的开发工具链'
    },
    {
      icon: '🎨',
      title: '美观设计',
      description: '现代化的 UI 设计，支持暗色和明亮主题'
    },
    {
      icon: '📱',
      title: '响应式',
      description: '完美适配各种设备尺寸，移动优先设计'
    }
  ]

  const projects = [
    { name: 'E-commerce Platform', tech: 'React + Node.js', status: 'Active' },
    { name: 'Mobile App UI', tech: 'React Native', status: 'Completed' },
    { name: 'Dashboard Analytics', tech: 'React + D3.js', status: 'In Progress' }
  ]

  return (
    <div className={`app ${theme}`}>
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⚛️</span>
            <h2>React App</h2>
          </div>
          <div className="nav-links">
            <button 
              className={activeTab === 'home' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveTab('home')}
            >
              首页
            </button>
            <button 
              className={activeTab === 'projects' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveTab('projects')}
            >
              项目
            </button>
            <button 
              className={activeTab === 'about' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveTab('about')}
            >
              关于
            </button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="main-content">
        {activeTab === 'home' && (
          <>
            {/* 英雄区域 */}
            <section className="hero">
              <div className="hero-content">
                <h1 className="hero-title">
                  欢迎来到现代化的
                  <span className="gradient-text"> React 应用</span>
                </h1>
                <p className="hero-description">
                  基于 Vite 构建的高性能 React 应用，具有现代化的设计和优雅的用户体验
                </p>
                <div className="hero-buttons">
                  <button className="btn-primary">开始探索</button>
                  <button className="btn-secondary">了解更多</button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="floating-card card-1">💡</div>
                <div className="floating-card card-2">⚡</div>
                <div className="floating-card card-3">🎨</div>
              </div>
            </section>

            {/* 统计数据 */}
            <section className="stats">
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">{stats.projects}</span>
                  <span className="stat-label">项目数量</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.tasks}</span>
                  <span className="stat-label">完成任务</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.achievements}</span>
                  <span className="stat-label">获得成就</span>
                </div>
              </div>
            </section>

            {/* 特性展示 */}
            <section className="features">
              <div className="section-header">
                <h2>核心特性</h2>
                <p>探索我们为你准备的强大功能</p>
              </div>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'projects' && (
          <section className="projects">
            <div className="section-header">
              <h2>我的项目</h2>
              <p>查看所有正在进行和已完成的项目</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="project-tech">{project.tech}</p>
                  <div className="project-actions">
                    <button className="btn-sm">查看</button>
                    <button className="btn-sm btn-outline">编辑</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'about' && (
          <section className="about">
            <div className="about-content">
              <h2>关于此应用</h2>
              <div className="about-grid">
                <div className="about-card">
                  <h3>技术栈</h3>
                  <ul>
                    <li>React 19.1.1</li>
                    <li>Vite 7.1.2</li>
                    <li>ESLint 9.33.0</li>
                    <li>现代化 CSS</li>
                  </ul>
                </div>
                <div className="about-card">
                  <h3>特点</h3>
                  <ul>
                    <li>快速热更新</li>
                    <li>响应式设计</li>
                    <li>暗色主题支持</li>
                    <li>现代化 UI</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <p>&copy; 2024 React App. 基于 Vite + React 构建</p>
      </footer>
    </div>
  )
}

export default App
