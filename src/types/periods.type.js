import { DayCalendar } from "../components/shared"

export const periods = {
  day: {
    beginOn: dayBegins,
    CalendarComponent: DayCalendar,
    days: 1,
    endOn: dayEnds,
    title: "Day",
  },
  week: {
    beginOn: weekBegins,
    days: 7,
    endOn: weekEnds,
    title: "Week"
  },
  month: {
    beginOn: monthBegins,
    endOn: monthEnds,
    months: 1,
    title: "Month"
  }
}

function dayBegins(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function dayEnds(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}

function weekBegins(date) {
  const dayOfWeek = date.getDay()

  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - dayOfWeek)
}

function weekEnds(date) {
  const beginDate = weekBegins(date)

  return new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDay() + 6)
}

function monthBegins(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function monthEnds(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
