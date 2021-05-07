import { AbstractViewModel } from "../"
import { dateHelper } from "../../../helpers"

class DateTimePickerViewModel extends AbstractViewModel {
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

    this.props.changeDateTime(field, dateTimeString, { validDate })
  }

  loadData() {
    this.clearData()
    this.redrawView()
  }

  timeChange(field, timeString, validTime) {
    const { dateTime, locale, dateFormat } = this.props
    const dateString = dateHelper.convertDateToDateString(dateTime, dateFormat, locale)
    const dateTimeString = `${dateString} ${timeString}`

    this.props.changeDateTime(field, dateTimeString, { validTime })
  }
}

export { DateTimePickerViewModel }

