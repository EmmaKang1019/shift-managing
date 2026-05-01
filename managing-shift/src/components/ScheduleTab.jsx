function ScheduleTab() {
  return (
    <div className="schedule-tabs" role="tablist" aria-label="스케줄 보기 방식">
      <button className="schedule-tab active" type="button" role="tab">
        주간
      </button>
      <button className="schedule-tab" type="button" role="tab">
        월간
      </button>
    </div>
  )
}

export default ScheduleTab
