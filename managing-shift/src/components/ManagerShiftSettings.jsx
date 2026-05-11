import { useMemo, useRef, useState } from 'react'
import { useMonthlySchedule } from '../hooks/useMonthlySchedule'
import ManagerRulesPanel from './ManagerRulesPanel'
import ManagerSchedulePanel from './ManagerSchedulePanel'
import ManagerStaffPanel from './ManagerStaffPanel'

const year = 2026
const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
const weekdayOptions = ['월', '화', '수', '목', '금', '토', '일']
const timeOptions = ['08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '18:00', '22:00']
const positionOptions = ['오픈', '미들', '서빙', '주방', '마감', '교육']
const placeOptions = ['카운터', '홀', '주방', '관리', '테라스']
const teamByRole = {
  오픈: '운영팀',
  미들: '운영팀',
  서빙: '홀팀',
  주방: '주방팀',
  마감: '운영팀',
  교육: '교육팀',
}
const employeeStatuses = {
  active: '재직',
  inactive: '퇴사',
}
const sampleEmployeeStatus = {
  5: 'inactive',
}

function toDateKey(monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function parseDay(dateKey) {
  return Number(dateKey.split('-')[2])
}

function getUniqueWorkers(shifts) {
  const workerMap = new Map()

  shifts.forEach((shift) => {
    if (!workerMap.has(shift.employeeId)) {
      workerMap.set(shift.employeeId, shift)
    }
  })

  return Array.from(workerMap.values())
}

function ManagerShiftSettings() {
  const [activeMonth, setActiveMonth] = useState(4)
  const [selectedDate, setSelectedDate] = useState(toDateKey(4, 4))
  const [selectedShiftId, setSelectedShiftId] = useState(null)
  const [activeManagerTab, setActiveManagerTab] = useState('schedule')
  const [selectedRuleEmployeeId, setSelectedRuleEmployeeId] = useState(null)
  const [mobileTransition, setMobileTransition] = useState(null)
  const touchStartX = useRef(null)

  const { calendarDays, range, shifts, shiftsByDate, status } = useMonthlySchedule(year, activeMonth)
  const workingShifts = shiftsByDate.get(selectedDate) ?? []
  const workers = useMemo(() => getUniqueWorkers(shifts), [shifts])
  const employeeDirectory = useMemo(
    () =>
      workers.map((worker) => ({
        ...worker,
        status: sampleEmployeeStatus[worker.employeeId] ?? 'active',
      })),
    [workers],
  )
  const activeEmployees = employeeDirectory.filter((worker) => worker.status === 'active')
  const activeEmployeeIds = new Set(activeEmployees.map((worker) => worker.employeeId))
  const visibleWorkingShifts = workingShifts.filter((shift) => activeEmployeeIds.has(shift.employeeId))
  const selectedShift = visibleWorkingShifts.find((shift) => shift.shiftId === selectedShiftId) ?? visibleWorkingShifts[0]
  const selectedRuleEmployee =
    activeEmployees.find((worker) => worker.employeeId === selectedRuleEmployeeId) ?? activeEmployees[0]

  const selectDate = (date) => {
    const nextShifts = shiftsByDate.get(date) ?? []
    const nextVisibleShifts = nextShifts.filter((shift) => activeEmployeeIds.has(shift.employeeId))
    setSelectedDate(date)
    setSelectedShiftId(nextVisibleShifts[0]?.shiftId ?? null)
  }

  const goToMonth = (monthIndex) => {
    const nextMonth = monthIndex < 0 ? 11 : monthIndex > 11 ? 0 : monthIndex
    const currentDay = parseDay(selectedDate)
    const daysInMonth = new Date(year, nextMonth + 1, 0).getDate()
    const nextDate = toDateKey(nextMonth, Math.min(currentDay, daysInMonth))

    setActiveMonth(nextMonth)
    setSelectedDate(nextDate)
    setSelectedShiftId(null)
  }

  const handleTouchStart = (event) => {
    if (!mobileTransition) {
      touchStartX.current = event.touches[0].clientX
    }
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || mobileTransition) {
      return
    }

    const swipeDistance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(swipeDistance) < 45) {
      return
    }

    const direction = swipeDistance < 0 ? 'next' : 'prev'
    const targetMonth =
      direction === 'next'
        ? activeMonth === 11
          ? 0
          : activeMonth + 1
        : activeMonth === 0
          ? 11
          : activeMonth - 1

    setMobileTransition({ direction, targetMonth })
  }

  const finishMobileTransition = () => {
    if (mobileTransition) {
      goToMonth(mobileTransition.targetMonth)
      setMobileTransition(null)
    }
  }

  return (
    <main className="manager-shift-screen">
      <header className="manager-shift-hero">
        <div>
          <p className="section-kicker">CEO Only</p>
          <h1>시프트 조정</h1>
          <p>월별 스케줄을 전체로 확인하고, 선택한 날짜의 근무자를 바로 조정합니다.</p>
        </div>
        <a className="ghost-button link-button" href="/">
          스케줄로 돌아가기
        </a>
      </header>

      <datalist id="manager-staff-options">
        {activeEmployees.map((worker) => (
          <option key={worker.employeeId} value={worker.employeeName} />
        ))}
      </datalist>
      <datalist id="manager-position-options">
        {positionOptions.map((position) => (
          <option key={position} value={position} />
        ))}
      </datalist>
      <datalist id="manager-place-options">
        {placeOptions.map((place) => (
          <option key={place} value={place} />
        ))}
      </datalist>
      <datalist id="manager-time-options">
        {timeOptions.map((time) => (
          <option key={time} value={time} />
        ))}
      </datalist>
      <datalist id="manager-weekday-options">
        {weekdayOptions.map((weekday) => (
          <option key={weekday} value={weekday} />
        ))}
      </datalist>

      <nav className="manager-work-tabs" aria-label="관리 메뉴">
        <button
          className={activeManagerTab === 'schedule' ? 'is-active' : ''}
          type="button"
          onClick={() => setActiveManagerTab('schedule')}
        >
          근무 일정
        </button>
        <button
          className={activeManagerTab === 'staff' ? 'is-active' : ''}
          type="button"
          onClick={() => setActiveManagerTab('staff')}
        >
          직원 관리
        </button>
        <button
          className={activeManagerTab === 'rules' ? 'is-active' : ''}
          type="button"
          onClick={() => setActiveManagerTab('rules')}
        >
          고정 근무
        </button>
      </nav>

      {activeManagerTab === 'schedule' && (
        <ManagerSchedulePanel
          activeMonth={activeMonth}
          calendarDays={calendarDays}
          monthNames={monthNames}
          mobileTransition={mobileTransition}
          onAnimationEnd={finishMobileTransition}
          onMonthChange={goToMonth}
          onSelectDate={selectDate}
          onSelectShift={setSelectedShiftId}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          range={range}
          selectedDate={selectedDate}
          selectedShift={selectedShift}
          status={status}
          visibleWorkingShifts={visibleWorkingShifts}
          year={year}
        />
      )}

      {activeManagerTab === 'staff' && (
        <ManagerStaffPanel
          employeeDirectory={employeeDirectory}
          employeeStatuses={employeeStatuses}
          placeOptions={placeOptions}
          positionOptions={positionOptions}
          teamByRole={teamByRole}
          timeOptions={timeOptions}
        />
      )}

      {activeManagerTab === 'rules' && (
        <ManagerRulesPanel
          activeEmployees={activeEmployees}
          onSelectRuleEmployee={setSelectedRuleEmployeeId}
          selectedRuleEmployee={selectedRuleEmployee}
        />
      )}
    </main>
  )
}

export default ManagerShiftSettings
