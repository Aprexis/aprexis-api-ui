import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { format, parse } from 'date-fns'
import { dateHelper, valueHelper } from '../../helpers'

class DateValue extends Component {
  render() {
    const { date } = this.props
    const dateValue = dateHelper.isDateValue(date) ? dateHelper.makeDate(date) : "Not Specified"

    return (
      <span className={this.props.className} style={this.props.style}>{dateValue}</span>
    )
  }
}

class EditableDateValue extends Component {
  render() {
    const { className, date, disabledDays, fromMonth, initialMonth, toMonth } = this.props
    const dateValue = dateHelper.isDateValue(date) ? dateHelper.makeDate(date) : ""

    return (
      <DayPickerInput
        formatDate={format}
        dayPickerProps={
          {
            disabledDays,
            fromMonth,
            initialMonth,
            todayButton: "Today",
            toMonth
          }
        }
        inputProps={{ className }}
        name={this.props.field}
        onDayChange={this.props.changeDay}
        parseDate={this.props.parseDate}
        style={this.props.style}
        value={dateValue}
      />
    )
  }
}

class DateEditor extends Component {
  constructor(props) {
    super(props)

    this.changeDay = this.changeDay.bind(this)
    this.determineDateRange = this.determineDateRange.bind(this)
    this.determineAdditionalClassName = this.determineAdditionalClassName.bind(this)
    this.determineDayPickerClassName = this.determineDayPickerClassName.bind(this)
    this.determineDayPickerStyle = this.determineDayPickerStyle.bind(this)
    this.determineFromMonth = this.determineFromMonth.bind(this)
    this.determineInitialMonth = this.determineInitialMonth.bind(this)
    this.determineToMonth = this.determineToMonth.bind(this)
    this.parseDate = this.parseDate.bind(this)
    this.setValidDate = this.setValidDate.bind(this)
  }

  changeDay(day) {
    const { earliestDate, latestDate } = this.props
    if (!checkValidDate(
      valueHelper.isSet(this._validDate) && dateHelper.isValidDate(day, this.props.allowBlank),
      day,
      earliestDate,
      latestDate)) {
      return
    }

    if (valueHelper.isFunction(this.props.changeDate)) {
      this.props.changeDate(this.props.field, day)
    }
    return

    function checkValidDate(wasValidDate, day, earliestDate, latestDate) {
      if (!valueHelper.isValue(wasValidDate) || !valueHelper.isDateValue(day)) {
        return false
      }

      const workingDate = dateHelper.makeDate(day)
      const checkDate = new Date(workingDate.getFullYear(), workingDate.getMonth(), workingDate.getDate())

      if (dateHelper.isDateValue(earliestDate)) {
        const from = dateHelper.makeDate(earliestDate)
        const early = new Date(from.getFullYear(), from.getMonth(), from.getDate())
        if (+checkDate < +early) {
          return false
        }
      }

      if (dateHelper.isDateValue(latestDate)) {
        const to = dateHelper.makeDate(latestDate)
        const late = new Date(to.getFullYear(), to.getMonth(), to.getDate())
        if (+checkDate > +late) {
          return false
        }
      }

      return true
    }
  }

  componentDidMount() {
    const validDate = dateHelper.isValidDate(this.props.date, this.props.allowBlank)
    this.setValidDate(validDate)
  }

  determineDateRange(earliestDate, date, latestDate) {
    const { fromMonth, disabledEarlyDays } = this.determineFromMonth(earliestDate)
    const { toMonth, disabledLateDays } = this.determineToMonth(latestDate)
    const initialMonth = this.determineInitialMonth(date, fromMonth, toMonth)

    return { disabledDaysForRange: [...disabledEarlyDays, ...disabledLateDays], fromMonth, initialMonth, toMonth }
  }

  determineAdditionalClassName() {
    const { additionalClassName } = this.props
    if (!valueHelper.isStringValue(additionalClassName)) {
      return "pl-1 text-nowrap"
    }

    return additionalClassName
  }

  determineDayPickerClassName() {
    const { className } = this.props
    const additionalClassName = this.determineAdditionalClassName()
    if (!valueHelper.isStringValue(className)) {
      return additionalClassName
    }

    return `${className} ${additionalClassName}`
  }

  determineDayPickerStyle() {
    const { style } = this.props
    if (!valueHelper.isValue(style)) {
      return { width: "120px" }
    }

    return style
  }

  determineFromMonth(earliestDate) {
    if (!dateHelper.isDateValue(earliestDate)) {
      return {}
    }

    const myEarliestDate = dateHelper.makeDate(earliestDate)
    const fromMonth = new Date(myEarliestDate.getFullYear(), myEarliestDate.getMonth(), 1)
    const disabledEarlyDays = dateHelper.disableDaysForRange(fromMonth, myEarliestDate, true, false)

    return { disabledEarlyDays, fromMonth }
  }

  determineInitialMonth(date, fromMonth, toMonth) {
    if (!dateHelper.isDateValue(date)) {
      if (!dateHelper.isDateValue(fromMonth)) {
        return toMonth
      }

      return fromMonth
    }

    const workingDate = dateHelper.makeDate(date)
    return new Date(workingDate.getFullYear(), workingDate.getMonth(), 1)
  }

  determineToMonth(latestDate) {
    if (!dateHelper.isDateValue(latestDate)) {
      return {}
    }

    const myLatestDate = dateHelper.makeDate(latestDate)
    const daysInMonth = dateHelper.daysInMonth(myLatestDate)
    const toMonth = new Date(myLatestDate.getFullYear(), myLatestDate.getMonth(), daysInMonth)
    const disabledLateDays = dateHelper.disableDaysForRange(myLatestDate, toMonth, false, true)

    return { disabledLateDays, toMonth }
  }

  parseDate(strValue, format, locale) {
    const parsed = parse(strValue, format, new Date(), { locale })
    if (!dateHelper.isDateValue(parsed)) {
      this.setValidDate(false)
      return
    }

    return parsed
  }

  render() {
    const { date } = this.props.date
    const className = this.determineDayPickerStyle()
    const style = this.determineDayPickerStyle()
    if (!valueHelper.isSet(this.props.allowEdit)) {
      return (<DateValue className={className} style={style} date={date} />)
    }

    const { disabledDaysForRange, fromMonth, initialMonth, toMonth } = this.determineDateRange(
      this.props.earliestDate,
      date,
      this.props.latestDate)
    let { disabledDays } = this.props
    if (!valueHelper.isValue(disabledDays)) {
      disabledDays = disabledDaysForRange
    } else {
      disabledDays = [...disabledDays, ...disabledDaysForRange]
    }

    return (
      <EditableDateValue
        className={className}
        date={date}
        disabledDays={disabledDays}
        fromMonth={fromMonth}
        initialMonth={initialMonth}
        onDayChange={this.changeDay}
        parseDate={this.parseDate}
        style={style}
        toMonth={toMonth}
      />
    )
  }

  setValidDate(validDate) {
    this._validDate = validDate

    if (valueHelper.isFunction(this.props.setValidDate)) {
      this.props.setValidDate(validDate)
    }
  }
}

export { DateEditor }
