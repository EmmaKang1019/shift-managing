const weekdays = ['일', '월', '화', '수', '목', '금', '토']

function parseDay(dateKey) {
  return Number(dateKey.split('-')[2])
}

function getSelectedDateLabel(monthNames, monthIndex, selectedDate) {
  return `${monthNames[monthIndex]} ${parseDay(selectedDate)}일`
}

function ComboField({ id, label, list, defaultValue, placeholder, className = '' }) {
  return (
    <label className={`manager-field ${className}`} htmlFor={id}>
      <span>{label}</span>
      <input id={id} type="text" list={list} defaultValue={defaultValue} placeholder={placeholder} />
    </label>
  )
}

function MonthCalendar({ calendarDays, monthIndex, monthNames, selectedDate, onSelectDate, year }) {
  return (
    <article className="manager-calendar-month" aria-label={`${year}년 ${monthNames[monthIndex]} 캘린더`}>
      <div className="manager-calendar-month-title">
        <strong>
          {year}년 {monthNames[monthIndex]}
        </strong>
        <span>
          {year}.{String(monthIndex + 1).padStart(2, '0')}.01 - {String(monthIndex + 1).padStart(2, '0')}.
          {String(new Date(year, monthIndex + 1, 0).getDate()).padStart(2, '0')}
        </span>
      </div>

      <div className="manager-calendar-weekdays" aria-hidden="true">
        {weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="manager-calendar-grid">
        {calendarDays.map((calendarDay) => {
          if (calendarDay.type === 'spacer') {
            return <span className="manager-calendar-spacer" key={calendarDay.key} aria-hidden="true" />
          }

          const isSelected = calendarDay.date === selectedDate

          return (
            <button
              className={['manager-calendar-day', isSelected ? 'is-selected' : ''].filter(Boolean).join(' ')}
              key={calendarDay.date}
              type="button"
              onClick={() => onSelectDate(calendarDay.date)}
            >
              <strong>{calendarDay.day}</strong>
              <small>{calendarDay.shifts.length}명</small>
              <span className="manager-calendar-dots" aria-hidden="true">
                {calendarDay.shifts.slice(0, 3).map((shift) => (
                  <i key={shift.shiftId} />
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </article>
  )
}

function ManagerSchedulePanel({
  activeMonth,
  calendarDays,
  monthNames,
  mobileTransition,
  onAnimationEnd,
  onMonthChange,
  onSelectDate,
  onSelectShift,
  onTouchEnd,
  onTouchStart,
  range,
  selectedDate,
  selectedShift,
  status,
  visibleWorkingShifts,
  year,
}) {
  return (
    <section className="manager-shift-layout" aria-label="시프트 조정 화면">
      <aside className="manager-shift-sidebar manager-calendar-sidebar">
        <div className="manager-shift-sidebar-header manager-calendar-header">
          <div>
            <strong>월별 캘린더</strong>
            <span>
              {range.from} - {range.to}
              {status === 'sample' ? ' · 샘플' : ''}
            </span>
          </div>
          <div className="manager-calendar-controls" aria-label="월 변경">
            <button className="manager-calendar-arrow" type="button" onClick={() => onMonthChange(activeMonth - 1)} aria-label="이전 월">
              ‹
            </button>
            <span>{monthNames[activeMonth]}</span>
            <button className="manager-calendar-arrow" type="button" onClick={() => onMonthChange(activeMonth + 1)} aria-label="다음 월">
              ›
            </button>
          </div>
        </div>

        <div className="manager-calendar-desktop">
          <MonthCalendar
            calendarDays={calendarDays}
            monthIndex={activeMonth}
            monthNames={monthNames}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            year={year}
          />
        </div>

        <div className="manager-calendar-mobile" aria-label="월별 캘린더" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div
            className={['manager-calendar-mobile-track', mobileTransition ? `is-${mobileTransition.direction}` : '']
              .filter(Boolean)
              .join(' ')}
            onAnimationEnd={onAnimationEnd}
          >
            <div className="manager-calendar-mobile-panel manager-calendar-mobile-current">
              <MonthCalendar
                calendarDays={calendarDays}
                monthIndex={activeMonth}
                monthNames={monthNames}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
                year={year}
              />
            </div>
          </div>
        </div>
      </aside>

      <section className="manager-shift-editor">
        <div className="manager-editor-header">
          <div>
            <p className="section-kicker">Selected Day</p>
            <h2>{getSelectedDateLabel(monthNames, activeMonth, selectedDate)}</h2>
          </div>
          <span>{visibleWorkingShifts.length}명 근무</span>
        </div>

        <div className="manager-editor-workspace">
          <section className="manager-worker-list-panel" aria-label="선택 날짜 근무자">
            <div className="manager-panel-heading">
              <strong>근무자 목록</strong>
              <span>선택해서 수정</span>
            </div>

            <div className="manager-worker-list">
              {visibleWorkingShifts.length === 0 && <p className="empty-shift">등록된 근무가 없습니다.</p>}
              {visibleWorkingShifts.map((shift) => (
                <button
                  className={['manager-worker-item', selectedShift?.shiftId === shift.shiftId ? 'is-selected' : '']
                    .filter(Boolean)
                    .join(' ')}
                  key={shift.shiftId}
                  type="button"
                  onClick={() => onSelectShift(shift.shiftId)}
                >
                  <span>
                    <strong>{shift.employeeName}</strong>
                    <em>
                      {shift.startTime}-{shift.endTime}
                    </em>
                  </span>
                  <b>{shift.role}</b>
                </button>
              ))}
            </div>
          </section>

          <section className="manager-shift-form" aria-label="근무 수정" key={selectedShift?.shiftId ?? selectedDate}>
            <div className="manager-panel-heading">
              <strong>{selectedShift ? `${selectedShift.employeeName} 근무 수정` : '근무 추가'}</strong>
              <span>선택 목록 또는 직접 입력</span>
            </div>

            <div className="manager-form-grid">
              <ComboField
                id="shift-worker-name"
                label="직원"
                list="manager-staff-options"
                defaultValue={selectedShift?.employeeName ?? ''}
                placeholder="직원 이름"
              />
              <ComboField
                id="shift-position"
                label="포지션"
                list="manager-position-options"
                defaultValue={selectedShift?.role ?? ''}
                placeholder="예: 미들"
              />
              <div className="manager-field manager-time-field">
                <span>시간</span>
                <div className="manager-time-pair">
                  <input
                    aria-label="시작 시간"
                    className="manager-time-input"
                    type="text"
                    inputMode="numeric"
                    maxLength="5"
                    list="manager-time-options"
                    defaultValue={selectedShift?.startTime ?? ''}
                  />
                  <span aria-hidden="true">-</span>
                  <input
                    aria-label="종료 시간"
                    className="manager-time-input"
                    type="text"
                    inputMode="numeric"
                    maxLength="5"
                    list="manager-time-options"
                    defaultValue={selectedShift?.endTime ?? ''}
                  />
                </div>
              </div>
              <ComboField id="shift-place" label="장소" list="manager-place-options" placeholder="예: 홀" />
              <label className="manager-field manager-note-field" htmlFor="shift-note">
                <span>메모</span>
                <input id="shift-note" type="text" defaultValue={selectedShift?.memo ?? ''} />
              </label>
            </div>

            <div className="manager-editor-actions">
              <button className="ghost-button" type="button">
                근무 제외
              </button>
              <button className="primary-button" type="button">
                변경 저장
              </button>
            </div>
          </section>
        </div>
      </section>
    </section>
  )
}

export default ManagerSchedulePanel
