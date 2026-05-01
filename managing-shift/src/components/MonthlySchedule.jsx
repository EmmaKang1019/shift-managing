function MonthlySchedule() {
  return (
    <section className="monthly-schedule" aria-labelledby="monthly-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">Monthly</p>
          <h2 id="monthly-title">월간 스케줄</h2>
        </div>
        <p className="section-meta">2026년 5월</p>
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
        <article className="month-cell muted">
          <strong>27</strong>
        </article>
        <article className="month-cell muted">
          <strong>28</strong>
        </article>
        <article className="month-cell muted">
          <strong>29</strong>
        </article>
        <article className="month-cell muted">
          <strong>30</strong>
        </article>
        <article className="month-cell">
          <strong>1</strong>
          <span>김민지</span>
          <span>박준호</span>
        </article>
        <article className="month-cell">
          <strong>2</strong>
          <span>정하린</span>
        </article>
        <article className="month-cell">
          <strong>3</strong>
          <span>이서연</span>
        </article>
        <article className="month-cell selected">
          <strong>4</strong>
          <span>김민지</span>
          <span>박준호</span>
        </article>
        <article className="month-cell">
          <strong>5</strong>
          <span>이서연</span>
          <span>최도윤</span>
        </article>
        <article className="month-cell">
          <strong>6</strong>
          <span>정하린</span>
        </article>
        <article className="month-cell">
          <strong>7</strong>
        </article>
        <article className="month-cell">
          <strong>8</strong>
          <span>최도윤</span>
        </article>
        <article className="month-cell">
          <strong>9</strong>
          <span>박준호</span>
        </article>
        <article className="month-cell">
          <strong>10</strong>
          <span>김민지</span>
        </article>
      </div>
    </section>
  )
}

export default MonthlySchedule
