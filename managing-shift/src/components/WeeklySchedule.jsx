import ShiftCard from './ShiftCard'

function WeeklySchedule() {
  return (
    <section className="weekly-schedule" aria-labelledby="weekly-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">Weekly</p>
          <h2 id="weekly-title">이번 주 상세 스케줄</h2>
        </div>
        <p className="section-meta">2026.05.04 - 2026.05.10</p>
      </div>

      <div className="week-grid">
        <article className="day-column">
          <div className="day-header">
            <span>월</span>
            <strong>5.4</strong>
          </div>
          <ShiftCard />
        </article>

        <article className="day-column">
          <div className="day-header">
            <span>화</span>
            <strong>5.5</strong>
          </div>
          <div className="shift-card">
            <div className="shift-card-header">
              <strong>이서연</strong>
              <span>오픈</span>
            </div>
            <dl>
              <div>
                <dt>시간</dt>
                <dd>08:30 - 14:30</dd>
              </div>
              <div>
                <dt>구역</dt>
                <dd>주방</dd>
              </div>
              <div>
                <dt>메모</dt>
                <dd>공휴일 피크 대비</dd>
              </div>
            </dl>
          </div>
        </article>

        <article className="day-column">
          <div className="day-header">
            <span>수</span>
            <strong>5.6</strong>
          </div>
          <div className="shift-card">
            <div className="shift-card-header">
              <strong>정하린</strong>
              <span>미들</span>
            </div>
            <dl>
              <div>
                <dt>시간</dt>
                <dd>11:00 - 17:00</dd>
              </div>
              <div>
                <dt>구역</dt>
                <dd>홀</dd>
              </div>
              <div>
                <dt>메모</dt>
                <dd>발주 확인</dd>
              </div>
            </dl>
          </div>
        </article>

        <article className="day-column">
          <div className="day-header">
            <span>목</span>
            <strong>5.7</strong>
          </div>
          <div className="empty-shift">배정 없음</div>
        </article>
      </div>
    </section>
  )
}

export default WeeklySchedule
