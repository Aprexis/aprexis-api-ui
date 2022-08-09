import { AbstractViewModel } from "../"
import { dateHelper } from "@aprexis/aprexis-api-utility"
import { jsEventHelper } from "../../../helpers"

class TimePickerViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.getTimeStringFromState = this.getTimeStringFromState.bind(this)
    this.loadData = this.loadData.bind(this)
    this.timeChange = this.timeChange.bind(this)
  }

  getTimeStringFromState() {
    const { format, locale } = this.props
    const { time } = this.data
    return dateHelper.convertDateToTimeString(time, format, locale)
  }

  loadData() {
    const { time } = this.props

    this.clearData()
    this.addData({ time }, this.redrawView)
  }

  timeChange(event) {
    const { format, locale, timeField } = this.props
    const { value } = jsEventHelper.fromInputEvent(event)
    const parsed = dateHelper.convertTimeStringToDate(value, format, locale)
    const validTime = dateHelper.isValidDate(parsed)

    this.props.timeChange(timeField, value, validTime)
  }
}

export { TimePickerViewModel }
