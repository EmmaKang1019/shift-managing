function TextField({ id, label, defaultValue, placeholder, className = '' }) {
  return (
    <label className={`manager-field ${className}`} htmlFor={id}>
      <span>{label}</span>
      <input id={id} type="text" defaultValue={defaultValue} placeholder={placeholder} />
    </label>
  )
}

function SelectField({ id, label, options, defaultValue, className = '' }) {
  return (
    <label className={`manager-field ${className}`} htmlFor={id}>
      <span>{label}</span>
      <select id={id} defaultValue={defaultValue ?? ''}>
        <option value="" disabled>
          선택
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function ManagerStaffPanel({ employeeDirectory, employeeStatuses, placeOptions, positionOptions, teamByRole, timeOptions }) {
  return (
    <section className="manager-admin-layout" aria-label="직원 관리 화면">
      <section className="manager-admin-panel">
        <div className="manager-panel-heading">
          <strong>직원 목록</strong>
          <span>이번 달 스케줄 기준</span>
        </div>
        <div className="manager-staff-directory">
          {employeeDirectory.map((worker) => (
            <article className={['manager-staff-directory-item', `is-${worker.status}`].join(' ')} key={worker.employeeId}>
              <div>
                <strong>
                  {worker.employeeName}
                  <b>{employeeStatuses[worker.status]}</b>
                </strong>
                <span>{teamByRole[worker.role] ?? '운영팀'} · {worker.role}</span>
              </div>
              <div className="manager-staff-actions">
                {worker.status === 'active' ? (
                  <button className="ghost-button" type="button">
                    퇴사
                  </button>
                ) : (
                  <button className="primary-button" type="button">
                    재등록
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manager-admin-panel">
        <div className="manager-panel-heading">
          <strong>직원 추가</strong>
          <span>기본 역할과 시간</span>
        </div>
        <div className="manager-form-grid">
          <TextField id="new-staff-name" label="이름" placeholder="직원 이름" className="manager-field-wide" />
          <SelectField id="new-staff-position" label="기본 포지션" options={positionOptions} defaultValue="서빙" />
          <SelectField id="new-staff-place" label="기본 장소" options={placeOptions} defaultValue="홀" />
          <div className="manager-field manager-time-field manager-field-wide">
            <span>기본 시간</span>
            <div className="manager-time-pair">
              <select id="new-staff-start" defaultValue="10:00" aria-label="시작 시간">
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <span aria-hidden="true">-</span>
              <select id="new-staff-end" defaultValue="16:00" aria-label="종료 시간">
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="manager-editor-actions">
          <button className="primary-button" type="button">
            직원 추가
          </button>
        </div>
      </section>
    </section>
  )
}

export default ManagerStaffPanel
