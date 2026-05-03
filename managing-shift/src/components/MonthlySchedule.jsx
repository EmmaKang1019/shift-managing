import { useState } from 'react'

const staff = [
  { name: '김민지', position: '오픈' },
  { name: '박준호', position: '미들' },
  { name: '이서연', position: '서버' },
  { name: '정하린', position: '주방' },
  { name: '최도윤', position: '마감' },
]

function getShifts(count, offset = 0) {
  return staff.slice(0, count).map((person, index) => {
    const position = staff[(index + offset) % staff.length].position

    return {
      ...person,
      position,
    }
  })
}

const monthCells = [
  { day: 27, muted: true, shifts: [] },
  { day: 28, muted: true, shifts: [] },
  { day: 29, muted: true, shifts: [] },
  { day: 30, muted: true, shifts: [] },
  { day: 1, shifts: getShifts(4, 0) },
  { day: 2, shifts: getShifts(4, 1) },
  { day: 3, shifts: getShifts(4, 2) },
  { day: 4, shifts: getShifts(5, 0) },
  { day: 5, shifts: getShifts(5, 1) },
  { day: 6, shifts: getShifts(4, 2) },
  { day: 7, shifts: getShifts(5, 3) },
  { day: 8, shifts: getShifts(5, 4) },
  { day: 9, shifts: getShifts(4, 0) },
  { day: 10, shifts: getShifts(5, 1) },
  { day: 11, shifts: getShifts(5, 2) },
  { day: 12, shifts: getShifts(4, 3) },
  { day: 13, shifts: getShifts(5, 4) },
  { day: 14, shifts: getShifts(5, 0) },
  { day: 15, shifts: getShifts(4, 1) },
  { day: 16, shifts: getShifts(5, 2) },
  { day: 17, shifts: getShifts(5, 3) },
  { day: 18, shifts: getShifts(4, 4) },
  { day: 19, shifts: getShifts(5, 0) },
  { day: 20, shifts: getShifts(5, 1) },
  { day: 21, shifts: getShifts(4, 2) },
  { day: 22, shifts: getShifts(5, 3) },
  { day: 23, shifts: getShifts(5, 4) },
  { day: 24, shifts: getShifts(4, 0) },
  { day: 25, shifts: getShifts(5, 1) },
  { day: 26, shifts: getShifts(5, 2) },
  { day: 27, shifts: getShifts(4, 3) },
  { day: 28, shifts: getShifts(5, 4) },
  { day: 29, shifts: getShifts(5, 0) },
  { day: 30, shifts: getShifts(4, 1) },
  { day: 31, shifts: getShifts(5, 2) },
]

const initialSelectedDay = monthCells.find((cell) => cell.day === 4 && !cell.muted)

function MonthlySchedule() {
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay)

  return (
    <section className="monthly-schedule" aria-labelledby="monthly-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">Monthly</p>
          <h2 id="monthly-title">2026년 5월</h2>
        </div>
        <p className="section-meta">일자를 선택하면 근무자를 확인할 수 있습니다</p>
      </div>

      <div className="month-weekdays" aria-hidden="true">
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span>토</span>
        <span>일</span>
      </div>

      <div className="month-grid">
        {monthCells.map((cell, index) => {
          const isSelected = selectedDay?.day === cell.day && !cell.muted

          return (
            <button
              className={`month-cell ${cell.muted ? 'muted' : ''} ${
                isSelected ? 'selected' : ''
              }`}
              data-date={cell.muted ? `2026-04-${cell.day}` : `2026-05-${cell.day}`}
              disabled={cell.muted}
              key={`${cell.muted ? 'prev' : 'may'}-${cell.day}-${index}`}
              onClick={() => setSelectedDay(cell)}
              type="button"
            >
              <strong>{cell.day}</strong>
              {cell.shifts.length > 0 && <small>{cell.shifts.length}명</small>}
              <div className="month-worker-list" aria-hidden="true">
                {cell.shifts.map((shift) => (
                  <span
                    className={shift.name.length > 3 ? 'wide-name' : ''}
                    key={`${cell.day}-${shift.name}`}
                  >
                    {shift.name}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {selectedDay && (
        <section className="month-day-detail" aria-live="polite">
          <div className="month-day-detail-header">
            <strong>5월 {selectedDay.day}일 근무</strong>
            <span>{selectedDay.shifts.length}명</span>
          </div>
          <div className="month-day-detail-list">
            {selectedDay.shifts.map((shift) => (
              <article className="month-day-worker" key={shift.name}>
                <strong>{shift.name}</strong>
                <span>{shift.position}</span>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default MonthlySchedule
