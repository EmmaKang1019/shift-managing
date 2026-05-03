function ScheduleTab() {
  return (
    <nav className="schedule-tabs" aria-label="스케줄 보기 방식">
      <label className="schedule-tab weekly-tab" htmlFor="schedule-weekly">
        주간
      </label>
      <label className="schedule-tab monthly-tab" htmlFor="schedule-monthly">
        월간
      </label>
    </nav>
  )
}

export default ScheduleTab
