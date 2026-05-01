function Header() {
  return (
    <header className="app-header">
      <div className="header-copy">
        <p className="eyebrow">Shift Managing</p>
        <h1>근무 스케줄</h1>
        <p className="header-description">
          주간 근무는 자세히 확인하고, 월간 근무는 이름 중심으로 빠르게
          훑어볼 수 있습니다.
        </p>
      </div>

      <div className="header-summary" aria-label="이번 주 근무 요약">
        <div>
          <strong>12</strong>
          <span>이번 주 배정</span>
        </div>
        <div>
          <strong>5</strong>
          <span>근무 직원</span>
        </div>
        <div>
          <strong>78h</strong>
          <span>총 근무 시간</span>
        </div>
      </div>
    </header>
  )
}

export default Header
