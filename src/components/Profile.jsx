import { useState, useEffect, lazy, Suspense } from 'react'
import './Profile.css'

// 懒加载子组件
const SkillChart = lazy(() => import('./SkillChart'))
const ActivityCalendar = lazy(() => import('./ActivityCalendar'))

function Profile() {
  const [profile, setProfile] = useState({
    name: '前端开发者',
    title: 'Senior React Developer',
    bio: '热爱前端技术，专注于React生态系统和现代Web开发。致力于创建优雅、高效的用户界面。',
    avatar: '👨‍💻',
    location: '北京, 中国',
    email: 'developer@example.com',
    github: 'github.com/developer',
    experience: 5,
    projects: 42,
    contributions: 1250
  })

  const [skills, setSkills] = useState([])
  const [achievements, setAchievements] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // 模拟技能数据加载
    const fetchSkills = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      setSkills([
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'JavaScript', level: 90, icon: '🟨' },
        { name: 'TypeScript', level: 85, icon: '🔷' },
        { name: 'CSS/SCSS', level: 88, icon: '🎨' },
        { name: 'Node.js', level: 78, icon: '🟢' },
        { name: 'Vite', level: 82, icon: '⚡' },
        { name: 'Git', level: 85, icon: '📋' },
        { name: 'UI/UX', level: 75, icon: '🎭' }
      ])
    }

    // 模拟成就数据加载
    const fetchAchievements = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAchievements([
        {
          title: '🏆 年度最佳开发者',
          description: '2023年度团队最佳开发者奖',
          date: '2023-12-15',
          type: 'award'
        },
        {
          title: '🚀 项目里程碑',
          description: '成功交付大型电商平台项目',
          date: '2023-10-20',
          type: 'milestone'
        },
        {
          title: '📝 技术分享',
          description: '在公司技术大会分享React最佳实践',
          date: '2023-08-15',
          type: 'presentation'
        },
        {
          title: '🌟 开源贡献',
          description: 'React生态系统开源库贡献者',
          date: '2023-06-10',
          type: 'contribution'
        }
      ])
    }

    fetchSkills()
    fetchAchievements()
  }, [])

  const handleSave = () => {
    setIsEditing(false)
    // 这里可以添加保存到后端的逻辑
  }

  const StatCard = ({ icon, label, value, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )

  return (
    <div className="profile-container">
      {/* 个人信息卡片 */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar">{profile.avatar}</div>
            <div className="online-indicator"></div>
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="edit-input"
                />
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="edit-input"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="edit-textarea"
                  rows="3"
                />
              </div>
            ) : (
              <>
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-title">{profile.title}</p>
                <p className="profile-bio">{profile.bio}</p>
              </>
            )}
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>保存</button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>取消</button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>编辑</button>
            )}
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span>{profile.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📧</span>
            <span>{profile.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💻</span>
            <span>{profile.github}</span>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="stats-grid">
        <StatCard 
          icon="📅" 
          label="工作经验" 
          value={`${profile.experience}年`}
          color="linear-gradient(45deg, #646cff, #61dafb)"
        />
        <StatCard 
          icon="🚀" 
          label="完成项目" 
          value={profile.projects}
          color="linear-gradient(45deg, #10b981, #06d6a0)"
        />
        <StatCard 
          icon="⭐" 
          label="代码贡献" 
          value={profile.contributions}
          color="linear-gradient(45deg, #f59e0b, #fbbf24)"
        />
      </div>

      {/* 技能图表 */}
      <div className="skills-section">
        <h3 className="section-title">技能水平</h3>
        {skills.length > 0 ? (
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ 
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="skills-loading">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skill-skeleton"></div>
            ))}
          </div>
        )}
      </div>

      {/* 成就展示 */}
      <div className="achievements-section">
        <h3 className="section-title">近期成就</h3>
        {achievements.length > 0 ? (
          <div className="achievements-timeline">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`achievement-item ${achievement.type}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="achievement-marker"></div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <span className="achievement-date">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="achievements-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="achievement-skeleton"></div>
            ))}
          </div>
        )}
      </div>

      {/* 懒加载的组件 */}
      <Suspense fallback={<div className="component-loading">加载技能图表中...</div>}>
        <SkillChart skills={skills} />
      </Suspense>

      <Suspense fallback={<div className="component-loading">加载活动日历中...</div>}>
        <ActivityCalendar contributions={profile.contributions} />
      </Suspense>
    </div>
  )
}

export default Profile