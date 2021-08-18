import { AbstractViewModel } from ".."
import { dateHelper, jsEventHelper, valueHelper } from "../../../helpers"

class DayPickerViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.dayChange = this.dayChange.bind(this)
    this.dayEntry = this.dayEntry.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.getDateStringFromProps = this.getDateStringFromProps.bind(this)
    this.getDayPickerClassNameFromProps = this.getDayPickerClassNameFromProps.bind(this)
    this.getDayPickerPropsFromProps = this.getDayPickerPropsFromProps.bind(this)
    this.getDayPickerStyleFromProps = this.getDayPickerStyleFromProps.bind(this)
    this.loadData = this.loadData.bind(this)
    this.parseDate = this.parseDate.bind(this)
  }

  dayChange(date) {
    const { dateField } = this.props

    this.props.dayChange(dateField, dateHelper.formatDate(date, "yyyy-MM-dd"), true)
    return
  }

  dayEntry(event) {
    const { dateField } = this.props
    const { value } = jsEventHelper.fromInputEvent(event)
    if (!valueHelper.isStringValue(value)) {
      return
    }

    const validDate = dateHelper.isValidDate(value)
    this.props.dayChange(dateField, value, validDate)
  }

  formatDate(date, format, locale) {
    if (!dateHelper.isValidDate(date)) {
      return
    }

    return dateHelper.convertDateToDateString(date, format, locale);
  }

  getDateStringFromProps() {
    const { date, dateFormat, locale } = this.props

    return this.formatDate(date, dateFormat, locale)
  }

  getDayPickerClassNameFromProps() {
    const { dayPickerClassName } = this.props

    if (!valueHelper.isStringValue(dayPickerClassName)) {
      return ""
    }

    return dayPickerClassName
  }

  getDayPickerPropsFromProps(dateString) {
    const { dateFormat, earliestDate, latestDate } = this.props

    return computeDayPickerProps(
      dateFormat,
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

    function computeDayPickerProps(dateFormat, dateString, disabledDays, earliestDate, latestDate) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const myEarliestDate = determineEarliestDate(earliestDate)
      const myLatestDate = determineLatestDate(latestDate)
      const todayButton = determineTodayButton(today, myEarliestDate, myLatestDate)
      const openToDate = computeOpenToDateFromDateString(dateString, today, myEarliestDate, myLatestDate)

      const from = computeFrom(disabledDays, myEarliestDate)
      const { minDate } = from
      let { excludeDates } = from

      const to = computeTo(excludeDates, myLatestDate)
      const { maxDate } = to
      excludeDates = to.excludeDates

      return {
        dateFormat,
        excludeDates,
        minDate,
        openToDate,
        todayButton,
        maxDate
      }

      function computeFrom(disabledDays, earliestDate) {
        const minDate = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1)
        const excludeDates = [...(disabledDays ?? []), ...daysBetween(minDate, addDays(earliestDate, -1))]

        return { excludeDates, minDate }
      }

      function computeOpenToDateFromDateString(dateString, today, earliestDate, latestDate) {
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

      function computeTo(disabledDays, latestDate, baseOpenToDate) {
        const maxDateStart = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1)
        const maxDate = addDays(addMonths(maxDateStart, 1), -1)
        const excludeDates = [...(disabledDays ?? []), ...daysBetween(addDays(latestDate, 1), maxDate)]
        const openToDate = baseOpenToDate ?? maxDateStart

        return { excludeDates, openToDate, maxDate }
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
    if (!valueHelper.isStringValue(str)) {
      return
    }

    const parsed = dateHelper.convertDateStringToDate(str, format, locale);
    if (dateHelper.isValidDate(parsed)) {
      return parsed
    }

    return undefined
  }
}

export { DayPickerViewModel }
