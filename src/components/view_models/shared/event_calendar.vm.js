import { AbstractViewModel } from "../"
import { dateHelper, valueHelper } from "@aprexis/aprexis-api-utility"

class EventCalendarViewModel extends AbstractViewModel {
  constructor(props) {
    super(props)

    this.addEvent = this.addEvent.bind(this)
    this.addAllDayEvent = this.addAllDayEvent.bind(this)
    this.changeCurrentDate = this.changeCurrentDate.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
  }

  addEvent(date, hour, minute, minutes) {
    const { view } = this.props
    const { onAddEvent, onBuildEvent, onRefresh } = view.props

    onBuildEvent(
      date,
      hour,
      minute,
      minutes,
      (newScheduledEvent) => { onAddEvent(newScheduledEvent, onRefresh) }
    )
  }

  addAllDayEvent(date) {
    const { view } = this.props
    const { onAddEvent, onBuildAllDayEvent, onRefresh } = view.props

    onBuildAllDayEvent(date, (newScheduledEvent) => { onAddEvent(newScheduledEvent, onRefresh) })
  }

  changeCurrentDate(dateField, value, validDate) {
    if (dateField !== "currentDate") {
      // Should never get here.
      return
    }

    const { view } = this.props

    if (!valueHelper.isSet(validDate)) {
      view.setState(
        (oldState, oldProps) => {
          return { workingCurrentDate: value, workingCurrentDateValid: validDate }
        }
      )
      return
    }

    view.props.onChangeCurrentDate(dateHelper.makeDate(value))
  }

  deleteEvent(scheduledEvent) {
    const { view } = this.props
    const { onDeleteEvent, onRefresh } = view.props

    onDeleteEvent(scheduledEvent, onRefresh)
  }

  editEvent(scheduledEvent) {
    const { view } = this.props
    const { onEditEvent, onFetchEvent, onRefresh } = view.props

    onFetchEvent(
      scheduledEvent,
      (fetchedScheduledEvent) => { onEditEvent(fetchedScheduledEvent, onRefresh) }
    )
  }
}

export { EventCalendarViewModel }
