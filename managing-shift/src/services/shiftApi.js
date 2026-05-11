const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function fetchShifts({ from, to, employeeId } = {}) {
  const params = new URLSearchParams()

  if (from) {
    params.set('from', from)
  }

  if (to) {
    params.set('to', to)
  }

  if (employeeId) {
    params.set('employeeId', employeeId)
  }

  const response = await fetch(`${API_BASE_URL}/api/shifts?${params.toString()}`)

  if (!response.ok) {
    throw new Error('근무 일정을 불러오지 못했습니다.')
  }

  return response.json()
}
