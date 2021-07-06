import { AbstractViewModel } from ".."
import { DateUtils } from "react-day-picker"
import { dateHelper, valueHelper } from "../../../helpers"

class DatePickerViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.dayChange = this.dayChange.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.getDateStringFromProps = this.getDateStringFromProps.bind(this)
    this.getDayPickerClassNameFromProps = this.getDayPickerClassNameFromProps.bind(this)
    this.getDayPickerPropsFromProps = this.getDayPickerPropsFromProps.bind(this)
    this.getDayPickerStyleFromProps = this.getDayPickerStyleFromProps.bind(this)
    this.loadData = this.loadData.bind(this)
    this.parseDate = this.parseDate.bind(this)
  }

  dayChange(selectedDay, modifiers, dayPickerInput) {
    const { dateField, format, locale } = this.props
    const { value, validDate } = determineValue(
      selectedDay,
      dayPickerInput,
      this.formatDate,
      this.parseDate,
      format,
      locale
    )
    this.props.dayChange(dateField, value, validDate)
    return

    function determineValue(selectedDay, dayPickerInput, formatDate, parseDate, format, locale) {
      if (typeof selectedDay == "undefined") {
        return determineValueFromDayPickerInput(dayPickerInput, parseDate, format, locale)
      }

      const value = formatDate(selectedDay, format, locale)
      return { value, validDate: true }
    }

    function determineValueFromDayPickerInput(dayPickerInput, parseDate, format, locale) {
      const input = dayPickerInput.getInput()
      const { value } = input
      const validDate = valueHelper.isValue(parseDate(value, format, locale))

      return { value, validDate }
    }
  }

  formatDate(date, format, locale) {
    return dateHelper.convertDateToDateString(date, format, locale);
  }

  getDateStringFromProps() {
    const { date, format, locale } = this.props

    return this.formatDate(date, format, locale)
  }

  getDayPickerClassNameFromProps() {
    const { dayPickerClassName } = this.props

    if (!valueHelper.isStringValue(dayPickerClassName)) {
      return ""
    }

    return dayPickerClassName
  }

  getDayPickerPropsFromProps(dateString) {
    const { earliestDate, latestDate } = this.props

    return computeDayPickerProps(
      dateString,
      this.props.disabledDays,
      earliestDate,
      latestDate
    )

    function addDays(baseDate, days) {
      const date = new Date(baseDate.valueOf())
      date.setDate(baseDate.getDate() + days)
      return date
    }

    function addMonths(baseDate, months) {
      const date = new Date(baseDate.valueOf())
      date.setMonth(baseDate.getMonth() + months)
      return date
    }

    function computeDayPickerProps(dateString, baseDisabledDays, earliestDate, latestDate) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const myEarliestDate = determineEarliestDate(earliestDate)
      const myLatestDate = determineLatestDate(latestDate)
      const todayButton = determineTodayButton(today, myEarliestDate, myLatestDate)
      const initialMonth = computeInitialMonthFromDateString(dateString, today, myEarliestDate, myLatestDate)

      const from = computeFrom(baseDisabledDays, myEarliestDate)
      const { fromMonth } = from
      let { disabledDays } = from

      const to = computeTo(disabledDays, myLatestDate)
      const { toMonth } = to
      disabledDays = to.disabledDays

      return {
        disabledDays,
        fromMonth,
        initialMonth,
        todayButton,
        toMonth
      }

      function computeFrom(baseDisabledDays, earliestDate) {
        const fromMonth = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1)
        const disabledDays = [...(baseDisabledDays ?? []), ...daysBetween(fromMonth, addDays(earliestDate, -1))]

        return { disabledDays, fromMonth }
      }

      function computeInitialMonthFromDateString(dateString, today, earliestDate, latestDate) {
        let initialDate
        if (dateHelper.isValidDate(dateString)) {
          initialDate = dateHelper.makeDate(dateString)
        } else if (+today < +earliestDate) {
          initialDate = earliestDate
        } else if (+today > +latestDate) {
          initialDate = latestDate
        } else {
          initialDate = today
        }

        return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
      }

      function computeTo(baseDisabledDays, latestDate, baseInitialMonth) {
        const toMonthStart = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1)
        const toMonth = addDays(addMonths(toMonthStart, 1), -1)
        const disabledDays = [...(baseDisabledDays ?? []), ...daysBetween(addDays(latestDate, 1), toMonth)]
        const initialMonth = baseInitialMonth ?? toMonthStart

        return { disabledDays, initialMonth, toMonth }
      }

      function daysBetween(firstDate, lastDate) {
        if (+firstDate === +lastDate) {
          return []
        }

        const daysBetween = []
        let day = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate())
        const endDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate(), 23, 59, 59)
        while (+day <= +endDate) {
          daysBetween.push(day)
          day = addDays(day, 1)
        }

        return daysBetween
      }

      function determineEarliestDate(earliestDate) {
        if (!valueHelper.isValue(earliestDate) || earliestDate == "") {
          return new Date(1900, 0, 1)
        }

        return dateHelper.makeDate(earliestDate)
      }

      function determineLatestDate(latestDate) {
        if (!valueHelper.isValue(latestDate) || latestDate == "") {
          return new Date(3000, 11, 31)
        }

        return dateHelper.makeDate(latestDate)
      }

      function determineTodayButton(today, earliestDate, latestDate) {
        if (+earliestDate > +today || +latestDate < +today) {
          return ""
        }

        return "Today"
      }
    }
  }

  getDayPickerStyleFromProps() {
    const { dayPickerStyle } = this.props

    if (!valueHelper.isValue(dayPickerStyle)) {
      return { width: '120px' }
    }

    return dayPickerStyle
  }

  loadData(nextOperation) {
    this.clearData()
    this.addField("dateString", this.getDateStringFromProps())
    this.redrawView(nextOperation)
  }

  parseDate(str, format, locale) {
    const parsed = dateHelper.convertDateStringToDate(str, format, locale);
    if (DateUtils.isDate(parsed)) {
      return parsed
    }

    return undefined
  }
}

export { DatePickerViewModel }
