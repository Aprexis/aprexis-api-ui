import { Component } from "react"
import { valueHelper, dateHelper } from "@aprexis/aprexis-api-utility"
import { periods } from "../../types/index.js"
import { DayPicker } from "./day_picker.js"
import { Spinner } from "./spinner.js"
import { EventCalendarViewModel } from "../view_models/shared/event_calendar.vm.js"

const CalendarNav = ({ date, dayChange, period }) => {
  const disableDay = period == periods.day
  const disableWeek = period == periods.week || true    // TODO: implement week calendar
  const disableMonth = period == periods.month || true  // TODO: implement month calendar

  return (
    <nav className="btn-toolbar mb-2 mb-md-0">
      <DayPicker
        allowBlank={false}
        allowEdit={true}
        className=""
        date={date}
        dateField="currentDate"
        dayChange={dayChange}
        dayPickerStyle={{}}
      />

      <button disabled={disableDay}>Day</button>
      <button disabled={disableWeek}>Week</button>
      <button disabled={disableMonth}>Month</button>
    </nav>
  )
}

class EventCalendar extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.vm = new EventCalendarViewModel({ ...props, view: this })
  }

  render() {
    const { currentDate, period, scheduledEvents, title } = this.props
    const { workingCurrentDate, workingCurrentDateValid } = this.state
    if (!valueHelper.isValue(period) || !valueHelper.isValue(period.CalendarComponent)) {
      return (<Spinner />)
    }

    const { CalendarComponent } = period
    let date = currentDate
    if (valueHelper.isValue(workingCurrentDateValid) && !valueHelper.isSet(workingCurrentDateValid)) {
      date = workingCurrentDate
    }

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 ml-3">
          <h1 className="h2">
            {title} on {dateHelper.displayDate(currentDate)}
          </h1>

          <CalendarNav
            date={date}
            dayChange={this.vm.changeCurrentDate}
            period={period}
          />
        </div>

        <CalendarComponent
          currentDate={currentDate}
          eventHelper={this.props.eventHelper}
          launchModal={this.props.launchModal}
          modelName={this.props.modelName}
          onAddEvent={this.vm.addEvent}
          onAddAllDayEvent={this.vm.addAllDayEvent}
          onDeleteEvent={this.vm.deleteEvent}
          onEditEvent={this.vm.editEvent}
          scheduledEvents={scheduledEvents}
        />
      </div>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }

  componentDidUpdate() {
    const { dateSet } = this.props
    if (!valueHelper.isValue(dateSet)) {
      return
    }

    const stateDateSet = this.state.dateSet
    if (!valueHelper.isValue(stateDateSet) || dateSet > stateDateSet) {
      const { currentDate } = this.props
      this.setState(
        (oldProps, oldState) => {
          return {
            dateSet,
            workingCurrentDate: currentDate,
            workingCurrentDateValid: true
          }
        }
      )
    }
  }
}

export { EventCalendar }
