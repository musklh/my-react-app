import { useEffect, useState } from 'react'

function SkillChart({ skills }) {
  const [animatedSkills, setAnimatedSkills] = useState([])

  useEffect(() => {
    // 延迟动画以创建更好的视觉效果
    const timer = setTimeout(() => {
      setAnimatedSkills(skills)
    }, 500)

    return () => clearTimeout(timer)
  }, [skills])

  if (!skills || skills.length === 0) {
    return (
      <div className="skill-chart-container">
        <h3>技能雷达图</h3>
        <div className="chart-loading">加载中...</div>
      </div>
    )
  }

  // 计算雷达图的点位置
  const getRadarPoints = () => {
    const center = 150
    const radius = 100
    const angleStep = (2 * Math.PI) / skills.length

    return skills.map((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const skillRadius = (skill.level / 100) * radius
      const x = center + Math.cos(angle) * skillRadius
      const y = center + Math.sin(angle) * skillRadius
      
      // 标签位置
      const labelRadius = radius + 30
      const labelX = center + Math.cos(angle) * labelRadius
      const labelY = center + Math.sin(angle) * labelRadius

      return {
        x,
        y,
        labelX,
        labelY,
        skill
      }
    })
  }

  // 生成网格线
  const generateGridLines = () => {
    const center = 150
    const levels = [20, 40, 60, 80, 100]
    const angleStep = (2 * Math.PI) / skills.length

    return levels.map(level => {
      const radius = (level / 100) * 100
      const points = []
      
      for (let i = 0; i <= skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = center + Math.cos(angle) * radius
        const y = center + Math.sin(angle) * radius
        points.push(`${x},${y}`)
      }
      
      return { level, points: points.join(' ') }
    })
  }

  const radarPoints = getRadarPoints()
  const gridLines = generateGridLines()
  
  // 技能区域的路径
  const skillPath = radarPoints.map(point => `${point.x},${point.y}`).join(' ')

  return (
    <div className="skill-chart-container">
      <h3 className="section-title">技能雷达图</h3>
      <div className="chart-wrapper">
        <svg width="300" height="300" className="radar-chart">
          {/* 网格线 */}
          <g className="grid-lines">
            {gridLines.map((grid, index) => (
              <polygon
                key={index}
                points={grid.points}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            ))}
            
            {/* 从中心到各顶点的线 */}
            {radarPoints.map((point, index) => (
              <line
                key={index}
                x1="150"
                y1="150"
                x2={150 + Math.cos(index * (2 * Math.PI) / skills.length - Math.PI / 2) * 100}
                y2={150 + Math.sin(index * (2 * Math.PI) / skills.length - Math.PI / 2) * 100}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* 技能区域 */}
          <polygon
            points={skillPath}
            fill="rgba(100, 108, 255, 0.2)"
            stroke="#646cff"
            strokeWidth="2"
            className="skill-area"
          />

          {/* 技能点 */}
          {radarPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#61dafb"
              stroke="#646cff"
              strokeWidth="2"
              className="skill-point"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}

          {/* 技能标签 */}
          {radarPoints.map((point, index) => (
            <g key={index} className="skill-label">
              <text
                x={point.labelX}
                y={point.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="12"
                fontWeight="500"
              >
                {point.skill.icon} {point.skill.name}
              </text>
              <text
                x={point.labelX}
                y={point.labelY + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#646cff"
                fontSize="10"
                fontWeight="600"
              >
                {point.skill.level}%
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      {/* 图例 */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(100, 108, 255, 0.2)' }}></div>
          <span>技能覆盖面积</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#61dafb' }}></div>
          <span>技能水平点</span>
        </div>
      </div>
    </div>
  )
}

export default SkillChart