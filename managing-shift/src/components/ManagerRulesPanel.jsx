function ComboField({ id, label, list, defaultValue, placeholder, className = '' }) {
  return (
    <label className={`manager-field ${className}`} htmlFor={id}>
      <span>{label}</span>
      <input id={id} type="text" list={list} defaultValue={defaultValue} placeholder={placeholder} />
    </label>
  )
}

function ManagerRulesPanel({ activeEmployees, onSelectRuleEmployee, selectedRuleEmployee }) {
  return (
    <section className="manager-admin-layout" aria-label="고정 근무 관리 화면">
      <section className="manager-admin-panel manager-rules-overview">
        <div className="manager-panel-heading">
          <strong>고정 근무 현황</strong>
          <span>직원별 반복 패턴</span>
        </div>
        <div className="manager-rule-list">
          {activeEmployees.map((worker) => (
            <button
              className={['manager-rule-item', selectedRuleEmployee?.employeeId === worker.employeeId ? 'is-selected' : '']
                .filter(Boolean)
                .join(' ')}
              key={worker.employeeId}
              type="button"
              onClick={() => onSelectRuleEmployee(worker.employeeId)}
            >
              <strong>{worker.employeeName}</strong>
              <span>{worker.role}</span>
              <em>
                {worker.startTime}-{worker.endTime}
              </em>
            </button>
          ))}
        </div>
      </section>

      <section className="manager-admin-panel" key={selectedRuleEmployee?.employeeId ?? 'rule-empty'}>
        <div className="manager-panel-heading">
          <strong>{selectedRuleEmployee ? `${selectedRuleEmployee.employeeName} 고정 근무 수정` : '고정 근무 수정'}</strong>
          <span>재직 직원만 적용 가능</span>
        </div>
        <div className="manager-form-grid">
          <ComboField
            id="bulk-worker"
            label="직원"
            list="manager-staff-options"
            defaultValue={selectedRuleEmployee?.employeeName ?? ''}
            placeholder="직원 이름"
          />
          <ComboField
            id="bulk-weekdays"
            label="근무 요일"
            list="manager-weekday-options"
            defaultValue="월, 화, 수, 목"
            placeholder="예: 월, 수, 금"
          />
          <ComboField
            id="bulk-position"
            label="포지션"
            list="manager-position-options"
            defaultValue={selectedRuleEmployee?.role ?? ''}
          />
          <ComboField id="bulk-place" label="장소" list="manager-place-options" defaultValue="홀" />
          <div className="manager-field manager-time-field">
            <span>고정 시간</span>
            <div className="manager-time-pair">
              <input
                className="manager-time-input"
                type="text"
                list="manager-time-options"
                defaultValue={selectedRuleEmployee?.startTime ?? ''}
              />
              <span aria-hidden="true">-</span>
              <input
                className="manager-time-input"
                type="text"
                list="manager-time-options"
                defaultValue={selectedRuleEmployee?.endTime ?? ''}
              />
            </div>
          </div>
        </div>
        <div className="manager-editor-actions">
          <button className="ghost-button" type="button">
            미리보기
          </button>
          <button className="primary-button" type="button">
            이번 달에 적용
          </button>
        </div>
      </section>
    </section>
  )
}

export default ManagerRulesPanel
