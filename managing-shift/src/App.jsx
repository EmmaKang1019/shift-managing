import './App.css'
import Header from './components/Header'
import ManagerShiftEntryButton from './components/ManagerShiftEntryButton'
import ManagerShiftSettings from './components/ManagerShiftSettings'
import MonthlySchedule from './components/MonthlySchedule'
import ScheduleTab from './components/ScheduleTab'
import WeeklySchedule from './components/WeeklySchedule'

function App() {
  if (window.location.pathname === '/manager-shift') {
    return <ManagerShiftSettings />
  }

  return (
    <>
      <input
        className="schedule-view-toggle"
        id="schedule-weekly"
        name="schedule-view"
        type="radio"
        defaultChecked
        aria-hidden="true"
      />
      <input
        className="schedule-view-toggle"
        id="schedule-monthly"
        name="schedule-view"
        type="radio"
        aria-hidden="true"
      />

      <main className="app">
        <div className="top-actions">
          <ManagerShiftEntryButton />
        </div>
        <Header />
        <ScheduleTab />
        <section className="schedule-view">
          <div className="schedule-panel weekly-view">
            <WeeklySchedule />
          </div>
          <div className="schedule-panel monthly-view">
            <MonthlySchedule />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
