import { useState, useEffect } from 'react'

function ActivityCalendar({ contributions }) {
  const [calendarData, setCalendarData] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [hoveredCell, setHoveredCell] = useState(null)

  useEffect(() => {
    // 生成过去一年的日历数据
    const generateCalendarData = () => {
      const today = new Date()
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
      const data = []

      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        // 随机生成贡献次数（模拟真实数据）
        const contributionCount = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0
        const level = contributionCount === 0 ? 0 : 
                     contributionCount <= 2 ? 1 :
                     contributionCount <= 4 ? 2 :
                     contributionCount <= 6 ? 3 : 4

        data.push({
          date: new Date(d),
          count: contributionCount,
          level: level
        })
      }

      return data
    }

    const timer = setTimeout(() => {
      setCalendarData(generateCalendarData())
    }, 300)

    return () => clearTimeout(timer)
  }, [contributions])

  // 获取周数
  const getWeeksInYear = () => {
    if (calendarData.length === 0) return []
    
    const weeks = []
    let currentWeek = []
    
    calendarData.forEach((day, index) => {
      const dayOfWeek = day.date.getDay()
      
      // 如果是周日且不是第一天，开始新的一周
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }
      
      currentWeek.push(day)
      
      // 最后一天
      if (index === calendarData.length - 1) {
        weeks.push(currentWeek)
      }
    })
    
    return weeks
  }

  const getContributionColor = (level) => {
    const colors = {
      0: 'rgba(255, 255, 255, 0.05)',
      1: 'rgba(100, 108, 255, 0.3)',
      2: 'rgba(100, 108, 255, 0.5)',
      3: 'rgba(100, 108, 255, 0.7)',
      4: 'rgba(100, 108, 255, 0.9)'
    }
    return colors[level] || colors[0]
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTotalContributions = () => {
    return calendarData.reduce((sum, day) => sum + day.count, 0)
  }

  const getStreakData = () => {
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    for (let i = calendarData.length - 1; i >= 0; i--) {
      if (calendarData[i].count > 0) {
        tempStreak++
        if (i === calendarData.length - 1 || currentStreak === 0) {
          currentStreak = tempStreak
        }
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 0
        if (currentStreak > 0) break
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak)

    return { currentStreak, longestStreak }
  }

  const weeks = getWeeksInYear()
  const { currentStreak, longestStreak } = getStreakData()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  if (calendarData.length === 0) {
    return (
      <div className="activity-calendar-container">
        <h3 className="section-title">活动日历</h3>
        <div className="calendar-loading">
          <div className="loading-grid">
            {[...Array(53)].map((_, weekIndex) => (
              <div key={weekIndex} className="loading-week">
                {[...Array(7)].map((_, dayIndex) => (
                  <div key={dayIndex} className="loading-day"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="activity-calendar-container">
      <h3 className="section-title">活动日历</h3>
      
      {/* 统计信息 */}
      <div className="calendar-stats">
        <div className="stat-item">
          <span className="stat-number">{getTotalContributions()}</span>
          <span className="stat-label">总贡献</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{currentStreak}</span>
          <span className="stat-label">当前连续</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{longestStreak}</span>
          <span className="stat-label">最长连续</span>
        </div>
      </div>

      {/* 日历网格 */}
      <div className="calendar-grid-container">
        {/* 月份标签 */}
        <div className="month-labels">
          {months.map((month, index) => (
            <span key={index} className="month-label">{month}</span>
          ))}
        </div>

        <div className="calendar-content">
          {/* 星期标签 */}
          <div className="weekday-labels">
            {weekDays.map((day, index) => (
              <span key={index} className="weekday-label">{day}</span>
            ))}
          </div>

          {/* 日历网格 */}
          <div className="calendar-grid">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="calendar-week">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = week.find(d => d.date.getDay() === dayIndex)
                  return (
                    <div
                      key={dayIndex}
                      className={`calendar-day ${day ? 'has-data' : 'empty'} ${
                        selectedDate === day?.date.toDateString() ? 'selected' : ''
                      }`}
                      style={{
                        backgroundColor: day ? getContributionColor(day.level) : 'transparent',
                        animationDelay: `${(weekIndex * 7 + dayIndex) * 10}ms`
                      }}
                      onMouseEnter={() => day && setHoveredCell(day)}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => day && setSelectedDate(day.date.toDateString())}
                      title={day ? `${formatDate(day.date)}: ${day.count} 贡献` : ''}
                    >
                      {day && (
                        <div className="day-content">
                          <span className="contribution-indicator"></span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 悬浮提示 */}
      {hoveredCell && (
        <div className="contribution-tooltip">
          <div className="tooltip-date">{formatDate(hoveredCell.date)}</div>
          <div className="tooltip-count">
            {hoveredCell.count} 次贡献
          </div>
        </div>
      )}

      {/* 图例 */}
      <div className="calendar-legend">
        <span className="legend-label">少</span>
        <div className="legend-colors">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className="legend-color"
              style={{ backgroundColor: getContributionColor(level) }}
            ></div>
          ))}
        </div>
        <span className="legend-label">多</span>
      </div>

      {/* 详细信息 */}
      {selectedDate && (
        <div className="selected-date-info">
          <h4>选中日期详情</h4>
          <p>
            {formatDate(new Date(selectedDate))} 
            有 {calendarData.find(d => d.date.toDateString() === selectedDate)?.count || 0} 次贡献
          </p>
        </div>
      )}
    </div>
  )
}

export default ActivityCalendar