function ManagerShiftSettings() {
  return (
    <main className="manager-shift-screen">
      <header className="manager-shift-hero">
        <div>
          <p className="section-kicker">CEO Only</p>
          <h1>쉬프트 조정</h1>
          <p>직원별 근무일, 포지션, 시간, 팀, 메모를 변경하는 화면입니다.</p>
        </div>
        <a className="ghost-button link-button" href="/">
          스케줄로 돌아가기
        </a>
      </header>

      <section className="manager-shift-layout" aria-label="쉬프트 조정 화면">
        <aside className="manager-shift-sidebar">
          <div className="manager-shift-sidebar-header">
            <strong>이번 주</strong>
            <span>2026.05.04 - 05.10</span>
          </div>

          <button className="manager-day-item is-selected" type="button">
            <span>월 5.4</span>
            <strong>5명</strong>
          </button>
          <button className="manager-day-item" type="button">
            <span>화 5.5</span>
            <strong>5명</strong>
          </button>
          <button className="manager-day-item" type="button">
            <span>수 5.6</span>
            <strong>5명</strong>
          </button>
          <button className="manager-day-item" type="button">
            <span>목 5.7</span>
            <strong>5명</strong>
          </button>
          <button className="manager-day-item" type="button">
            <span>금 5.8</span>
            <strong>5명</strong>
          </button>
          <button className="manager-day-item" type="button">
            <span>토 5.9</span>
            <strong>5명</strong>
          </button>
          <button className="manager-day-item" type="button">
            <span>일 5.10</span>
            <strong>5명</strong>
          </button>
        </aside>

        <section className="manager-shift-editor">
          <div className="manager-editor-header">
            <div>
              <p className="section-kicker">Selected Day</p>
              <h2>월요일 5.4</h2>
            </div>
            <span>5명 근무</span>
          </div>

          <div className="manager-shift-table">
            <div className="manager-shift-row manager-shift-row-head">
              <span>직원</span>
              <span>포지션</span>
              <span>시간</span>
              <span>팀</span>
              <span>메모</span>
            </div>

            <div className="manager-shift-row">
              <strong>김민지</strong>
              <select defaultValue="open">
                <option value="open">오픈</option>
                <option value="middle">미들</option>
                <option value="server">서버</option>
                <option value="kitchen">주방</option>
                <option value="close">마감</option>
              </select>
              <div className="manager-time-pair">
                <input type="time" defaultValue="08:00" />
                <input type="time" defaultValue="14:00" />
              </div>
              <select defaultValue="counter">
                <option value="counter">카운터</option>
                <option value="hall">홀</option>
                <option value="kitchen">주방</option>
                <option value="manage">관리</option>
              </select>
              <input type="text" defaultValue="오픈 준비 및 재고 확인" />
            </div>

            <div className="manager-shift-row">
              <strong>박준호</strong>
              <select defaultValue="middle">
                <option value="open">오픈</option>
                <option value="middle">미들</option>
                <option value="server">서버</option>
                <option value="kitchen">주방</option>
                <option value="close">마감</option>
              </select>
              <div className="manager-time-pair">
                <input type="time" defaultValue="10:00" />
                <input type="time" defaultValue="16:00" />
              </div>
              <select defaultValue="hall">
                <option value="counter">카운터</option>
                <option value="hall">홀</option>
                <option value="kitchen">주방</option>
                <option value="manage">관리</option>
              </select>
              <input type="text" defaultValue="점심 피크 운영 지원" />
            </div>

            <div className="manager-shift-row">
              <strong>이서연</strong>
              <select defaultValue="server">
                <option value="open">오픈</option>
                <option value="middle">미들</option>
                <option value="server">서버</option>
                <option value="kitchen">주방</option>
                <option value="close">마감</option>
              </select>
              <div className="manager-time-pair">
                <input type="time" defaultValue="12:00" />
                <input type="time" defaultValue="18:00" />
              </div>
              <select defaultValue="hall">
                <option value="counter">카운터</option>
                <option value="hall">홀</option>
                <option value="kitchen">주방</option>
                <option value="manage">관리</option>
              </select>
              <input type="text" defaultValue="홀 응대 및 테이블 관리" />
            </div>
          </div>

          <div className="manager-editor-actions">
            <button className="ghost-button" type="button">
              변경 취소
            </button>
            <button className="primary-button" type="button">
              변경 저장
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

export default ManagerShiftSettings
