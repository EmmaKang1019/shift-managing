import { useEffect, useMemo, useState } from 'react'
import { fetchShifts } from '../services/shiftApi'

const sampleWorkers = [
  { employeeId: 1, employeeName: '김민서', role: '오픈', startTime: '08:00', endTime: '14:00', memo: '오픈 준비' },
  { employeeId: 2, employeeName: '박지훈', role: '미들', startTime: '10:00', endTime: '16:00', memo: '런치 운영' },
  { employeeId: 3, employeeName: '이서연', role: '서빙', startTime: '12:00', endTime: '18:00', memo: '홀 관리' },
  { employeeId: 4, employeeName: '정하린', role: '주방', startTime: '14:00', endTime: '22:00', memo: '주방 보조' },
  { employeeId: 5, employeeName: '최도윤', role: '마감', startTime: '16:00', endTime: '22:00', memo: '마감 정리' },
]

function toDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function normalizeTime(value) {
  if (!value) {
    return ''
  }

  return String(value).slice(0, 5)
}

function normalizeShift(shift) {
  return {
    shiftId: shift.shiftId,
    employeeId: shift.employeeId,
    employeeName: shift.employeeName,
    workDate: shift.workDate,
    startTime: normalizeTime(shift.startTime),
    endTime: normalizeTime(shift.endTime),
    role: shift.role ?? shift.memo ?? '근무',
    memo: shift.memo ?? '',
  }
}

function createSampleMonthlyShifts(year, monthIndex) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const workerCount = 2 + ((monthIndex + day) % 4)
    const workDate = toDateKey(new Date(year, monthIndex, day))

    return sampleWorkers.slice(0, workerCount).map((worker, workerIndex) => ({
      shiftId: Number(`${year}${String(monthIndex + 1).padStart(2, '0')}${String(day).padStart(2, '0')}${workerIndex}`),
      ...worker,
      workDate,
    }))
  }).flat()
}

function groupShiftsByDate(shifts) {
  return shifts.reduce((groups, rawShift) => {
    const shift = normalizeShift(rawShift)
    const dateShifts = groups.get(shift.workDate) ?? []
    dateShifts.push(shift)
    groups.set(shift.workDate, dateShifts)
    return groups
  }, new Map())
}

export function getMonthRange(year, monthIndex) {
  return {
    from: toDateKey(new Date(year, monthIndex, 1)),
    to: toDateKey(new Date(year, monthIndex + 1, 0)),
  }
}

export function getCalendarDays(year, monthIndex, shiftsByDate) {
  const firstDay = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const leadingDays = firstDay.getDay()

  const leadingSpacers = Array.from({ length: leadingDays }, (_, index) => ({
    type: 'spacer',
    key: `spacer-${year}-${monthIndex}-${index}`,
  }))

  const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const date = toDateKey(new Date(year, monthIndex, day))
    const shifts = shiftsByDate.get(date) ?? []

    return {
      type: 'day',
      day,
      date,
      shifts,
    }
  })

  return [...leadingSpacers, ...monthDays]
}

export function useMonthlySchedule(year, monthIndex) {
  const [shifts, setShifts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  const range = useMemo(() => getMonthRange(year, monthIndex), [year, monthIndex])

  useEffect(() => {
    let ignore = false

    async function loadMonthlyShifts() {
      setStatus('loading')
      setError(null)

      try {
        const data = await fetchShifts(range)

        if (ignore) {
          return
        }

        setShifts(Array.isArray(data) ? data : [])
        setStatus('ready')
      } catch (nextError) {
        if (ignore) {
          return
        }

        setShifts(createSampleMonthlyShifts(year, monthIndex))
        setError(nextError)
        setStatus('sample')
      }
    }

    loadMonthlyShifts()

    return () => {
      ignore = true
    }
  }, [monthIndex, range, year])

  const shiftsByDate = useMemo(() => groupShiftsByDate(shifts), [shifts])
  const calendarDays = useMemo(() => getCalendarDays(year, monthIndex, shiftsByDate), [monthIndex, shiftsByDate, year])

  return {
    calendarDays,
    error,
    range,
    shifts,
    shiftsByDate,
    status,
  }
}
