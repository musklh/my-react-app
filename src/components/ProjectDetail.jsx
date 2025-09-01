import { useState, useEffect } from 'react'
import './ProjectDetail.css'

function ProjectDetail({ projectId, onClose }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟API调用
    const fetchProjectDetail = async () => {
      setLoading(true)
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockProject = {
        id: projectId,
        name: 'E-commerce Platform',
        description: '一个现代化的电商平台，采用微服务架构，支持高并发处理',
        tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker'],
        status: 'Active',
        progress: 85,
        team: ['张三', '李四', '王五'],
        timeline: {
          start: '2024-01-15',
          end: '2024-12-30'
        },
        features: [
          '用户认证与授权',
          '商品管理系统',
          '订单处理流程',
          '支付集成',
          '实时通知'
        ],
        screenshots: [
          '🏪 首页展示',
          '🛒 购物车',
          '💳 支付页面',
          '📊 管理后台'
        ]
      }
      
      setProject(mockProject)
      setLoading(false)
    }

    fetchProjectDetail()
  }, [projectId])

  if (loading) {
    return (
      <div className="project-detail-overlay">
        <div className="project-detail-modal">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div className="project-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="project-header">
          <h2>{project.name}</h2>
          <div className="project-status">
            <span className={`status ${project.status.toLowerCase()}`}>
              {project.status}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${project.progress}%` }}
              ></div>
              <span className="progress-text">{project.progress}%</span>
            </div>
          </div>
        </div>

        <div className="project-content">
          <section className="project-section">
            <h3>项目描述</h3>
            <p>{project.description}</p>
          </section>

          <section className="project-section">
            <h3>技术栈</h3>
            <div className="tech-stack">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </section>

          <section className="project-section">
            <h3>团队成员</h3>
            <div className="team-members">
              {project.team.map((member, index) => (
                <div key={index} className="member-card">
                  <div className="member-avatar">👤</div>
                  <span>{member}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="project-section">
            <h3>核心功能</h3>
            <ul className="features-list">
              {project.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="check-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="project-section">
            <h3>项目预览</h3>
            <div className="screenshots-grid">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-card">
                  <div className="screenshot-preview">{screenshot}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="project-section">
            <h3>时间线</h3>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-label">开始时间:</span>
                <span className="timeline-value">{project.timeline.start}</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">预计完成:</span>
                <span className="timeline-value">{project.timeline.end}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="project-actions">
          <button className="btn-edit">编辑项目</button>
          <button className="btn-share">分享</button>
          <button className="btn-archive">归档</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail