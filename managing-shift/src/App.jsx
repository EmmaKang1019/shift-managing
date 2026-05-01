import './App.css'
import Header from './components/Header'
import ScheduleTab from './components/ScheduleTab'
import WeeklySchedule from './components/WeeklySchedule'
import MonthlySchedule from './components/MonthlySchedule'

function App() {
  return (
    <main className="app">
      <Header />
      <ScheduleTab />
      <section className="schedule-view">
        <WeeklySchedule />
        <MonthlySchedule />
      </section>
    </main>
  )
}

export default App
