import { AbstractViewModel } from "../abstract.vm.js"
import { dateHelper, valueHelper } from "@aprexis/aprexis-api-utility"

class DayTimePickerViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.dayChange = this.dayChange.bind(this)
    this.loadData = this.loadData.bind(this)
    this.timeChange = this.timeChange.bind(this)
  }

  dayChange(field, dateString, validDate) {
    const { dateTime, locale, timeFormat } = this.props
    const timeString = dateHelper.convertDateToTimeString(dateTime, timeFormat, locale)
    const dateTimeString = `${dateString} ${timeString}`

    this.props.changeDateTime(field, dateTimeString, { value: dateTimeString, validDate })
  }

  loadData() {
    this.clearData()
    this.redrawView()
  }

  timeChange(field, timeString, validTime) {
    const { dateFormat, dateTime, earliestDate, latestDate, locale, timeFormat } = this.props
    const dateString = dateHelper.convertDateToDateString(dateTime, dateFormat, locale)
    const dateTimeString = `${dateString} ${timeString}`
    let myValidTime = validTime

    if (valueHelper.isSet(validTime)) {
      const asDate = dateHelper.convertTimeStringToDate(dateTimeString, `${dateFormat} ${timeFormat}`)
      if (dateHelper.isValidDate(earliestDate) && +asDate < +earliestDate) {
        myValidTime = false
      } else if (dateHelper.isValidDate(latestDate) && +asDate > +latestDate) {
        myValidTime = false
      }
    }

    this.props.changeDateTime(field, dateTimeString, { value: dateTimeString, validTime: myValidTime })
  }
}

export { DayTimePickerViewModel }

