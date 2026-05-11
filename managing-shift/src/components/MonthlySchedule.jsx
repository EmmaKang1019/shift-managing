import { useMemo, useState } from 'react'
import { useMonthlySchedule } from '../hooks/useMonthlySchedule'

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

function formatMonthTitle(year, monthIndex) {
  return `${year}년 ${monthIndex + 1}월`
}

function formatDayTitle(date) {
  const nextDate = new Date(`${date}T00:00:00`)
  return `${nextDate.getMonth() + 1}월 ${nextDate.getDate()}일 근무`
}

function MonthlySchedule({ initialYear = 2026, initialMonthIndex = 4 }) {
  const [selectedDate, setSelectedDate] = useState(
    `${initialYear}-${String(initialMonthIndex + 1).padStart(2, '0')}-04`,
  )
  const { calendarDays, range, shiftsByDate, status } = useMonthlySchedule(initialYear, initialMonthIndex)

  const selectedShifts = useMemo(() => shiftsByDate.get(selectedDate) ?? [], [selectedDate, shiftsByDate])

  return (
    <section className="monthly-schedule" aria-labelledby="monthly-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">Monthly</p>
          <h2 id="monthly-title">{formatMonthTitle(initialYear, initialMonthIndex)}</h2>
        </div>
        <p className="section-meta">
          {range.from} - {range.to}
          {status === 'sample' ? ' · 샘플 표시 중' : ''}
        </p>
      </div>

      <div className="month-weekdays" aria-hidden="true">
        {weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="month-grid">
        {calendarDays.map((calendarDay) => {
          if (calendarDay.type === 'spacer') {
            return <span className="month-cell muted" key={calendarDay.key} aria-hidden="true" />
          }

          const isSelected = calendarDay.date === selectedDate

          return (
            <button
              className={['month-cell', isSelected ? 'selected' : ''].filter(Boolean).join(' ')}
              data-date={calendarDay.date}
              key={calendarDay.date}
              type="button"
              onClick={() => setSelectedDate(calendarDay.date)}
            >
              <strong>{calendarDay.day}</strong>
              <small>{calendarDay.shifts.length}명</small>
              <div className="month-worker-list" aria-hidden="true">
                {calendarDay.shifts.slice(0, 6).map((shift) => (
                  <span className={shift.employeeName.length > 4 ? 'wide-name' : ''} key={shift.shiftId}>
                    {shift.employeeName}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <section className="month-day-detail" aria-label="선택 날짜 근무 상세">
        <div className="month-day-detail-header">
          <strong>{formatDayTitle(selectedDate)}</strong>
          <span>{selectedShifts.length}명</span>
        </div>
        <div className="month-day-detail-list">
          {selectedShifts.length === 0 && <p className="empty-shift">등록된 근무가 없습니다.</p>}
          {selectedShifts.map((shift) => (
            <article className="month-day-worker" key={shift.shiftId}>
              <strong>{shift.employeeName}</strong>
              <span>
                {shift.startTime}-{shift.endTime}
              </span>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default MonthlySchedule
