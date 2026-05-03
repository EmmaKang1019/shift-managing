function WeeklySchedule() {
  return (
    <section className="weekly-schedule" aria-labelledby="weekly-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">Weekly</p>
          <h2 id="weekly-title">이번 주 스케줄</h2>
        </div>
        <p className="section-meta">2026.05.04 - 2026.05.10</p>
      </div>

      <div className="week-grid">
        <article className="day-column is-selected" data-day="mon">
          <div className="day-header">
            <span className="day-badge">월</span>
            <strong>5월4일</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>오픈</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>미들</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>서버</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>주방</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>마감</span>
              </div>
            </div>
          </div>
        </article>

        <article className="day-column" data-day="tue">
          <div className="day-header">
            <span className="day-badge">화</span>
            <strong>5.5</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>미들</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>서버</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>주방</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>마감</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>오픈</span>
              </div>
            </div>
          </div>
        </article>

        <article className="day-column" data-day="wed">
          <div className="day-header">
            <span className="day-badge">수</span>
            <strong>5.6</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>서버</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>주방</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>마감</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>오픈</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>미들</span>
              </div>
            </div>
          </div>
        </article>

        <article className="day-column" data-day="thu">
          <div className="day-header">
            <span className="day-badge">목</span>
            <strong>5.7</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>주방</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>마감</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>오픈</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>미들</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>서버</span>
              </div>
            </div>
          </div>
        </article>

        <article className="day-column" data-day="fri">
          <div className="day-header">
            <span className="day-badge">금</span>
            <strong>5.8</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>마감</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>오픈</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>미들</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>서버</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>주방</span>
              </div>
            </div>
          </div>
        </article>

        <article className="day-column" data-day="sat">
          <div className="day-header">
            <span className="day-badge">토</span>
            <strong>5.9</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>오픈</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>서버</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>주방</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>마감</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>미들</span>
              </div>
            </div>
          </div>
        </article>

        <article className="day-column" data-day="sun">
          <div className="day-header">
            <span className="day-badge">일</span>
            <strong>5.10</strong>
            <em>5명</em>
          </div>
          <div className="shift-list">
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>김민지</strong>
                <span>미들</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>박준호</strong>
                <span>주방</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>이서연</strong>
                <span>마감</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>정하린</strong>
                <span>오픈</span>
              </div>
            </div>
            <div className="shift-card">
              <div className="shift-card-header">
                <strong>최도윤</strong>
                <span>서버</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="shift-detail" data-detail-area>
        <section className="shift-detail-panel is-visible" data-day-detail="mon">
          <div className="shift-detail-header">
            <strong>월요일 5.4 근무 상세</strong>
            <span>5명 근무</span>
          </div>

          <div className="shift-detail-list">
            <article className="shift-detail-card">
              <div className="shift-detail-person">
                <strong>김민지</strong>
                <span>오픈</span>
              </div>
              <dl>
                <div>
                  <dt>근무시간</dt>
                  <dd>08:00 - 14:00</dd>
                </div>
                <div>
                  <dt>팀</dt>
                  <dd>카운터</dd>
                </div>
                <div>
                  <dt>메모</dt>
                  <dd>오픈 준비 및 재고 확인</dd>
                </div>
              </dl>
            </article>

            <article className="shift-detail-card">
              <div className="shift-detail-person">
                <strong>박준호</strong>
                <span>미들</span>
              </div>
              <dl>
                <div>
                  <dt>근무시간</dt>
                  <dd>10:00 - 16:00</dd>
                </div>
                <div>
                  <dt>팀</dt>
                  <dd>홀</dd>
                </div>
                <div>
                  <dt>메모</dt>
                  <dd>점심 피크 운영 지원</dd>
                </div>
              </dl>
            </article>

            <article className="shift-detail-card">
              <div className="shift-detail-person">
                <strong>이서연</strong>
                <span>서버</span>
              </div>
              <dl>
                <div>
                  <dt>근무시간</dt>
                  <dd>12:00 - 18:00</dd>
                </div>
                <div>
                  <dt>팀</dt>
                  <dd>홀</dd>
                </div>
                <div>
                  <dt>메모</dt>
                  <dd>홀 응대 및 테이블 관리</dd>
                </div>
              </dl>
            </article>

            <article className="shift-detail-card">
              <div className="shift-detail-person">
                <strong>정하린</strong>
                <span>주방</span>
              </div>
              <dl>
                <div>
                  <dt>근무시간</dt>
                  <dd>14:00 - 20:00</dd>
                </div>
                <div>
                  <dt>팀</dt>
                  <dd>주방</dd>
                </div>
                <div>
                  <dt>메모</dt>
                  <dd>조리 보조 및 재료 준비</dd>
                </div>
              </dl>
            </article>

            <article className="shift-detail-card">
              <div className="shift-detail-person">
                <strong>최도윤</strong>
                <span>마감</span>
              </div>
              <dl>
                <div>
                  <dt>근무시간</dt>
                  <dd>16:00 - 22:00</dd>
                </div>
                <div>
                  <dt>팀</dt>
                  <dd>관리</dd>
                </div>
                <div>
                  <dt>메모</dt>
                  <dd>마감 정리 및 정산 확인</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>
      </div>
    </section>
  )
}

export default WeeklySchedule
