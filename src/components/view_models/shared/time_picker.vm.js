import { DateUtils } from "react-day-picker"
import { AbstractViewModel } from "../"
import { dateHelper, jsEventHelper } from "../../../helpers"

class TimePickerViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.getTimeStringFromProps = this.getTimeStringFromProps.bind(this)
    this.loadData = this.loadData.bind(this)
    this.timeChange = this.timeChange.bind(this)
  }

  getTimeStringFromProps() {
    const { date, format, locale } = this.props
    return dateHelper.convertDateToTimeString(date, format, locale)
  }

  loadData() {
    const { time } = this.props

    this.clearData()
    this.addData({ time })
    this.redrawView()
  }

  timeChange(event) {
    const { field, format, locale } = this.props
    const { value } = jsEventHelper.fromInputEvent(event)
    const parsed = dateHelper.convertTimeStringToDate(value, format, locale);
    const validTime = DateUtils.isDate(parsed)

    this.props.timeChange(field, value, validTime)
  }
}

export { TimePickerViewModel }
