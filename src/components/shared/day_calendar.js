import React, { Component } from "react"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { CalendarEvent } from "./"

const TimeLabel = ({ hour, minute }) => {
  const amPm = hour < 12 ? "AM" : "PM"
  let workingHour = hour % 12
  if (workingHour === 0) {
    workingHour = 12
  }

  const hourLabel = `${workingHour}`.padStart(2, "0")
  const minuteLabel = `${minute}`.padStart(2, "0")

  return `${hourLabel}:${minuteLabel} ${amPm}`
}

const DayTimes = (
  {
    currentDate,
    eventHelper,
    launchModal,
    modelName,
    onAddEvent,
    onDeleteEvent,
    onEditEvent,
    scheduledEvents
  }
) => {
  const timeRows = []
  let lastScheduledEvent = undefined

  for (let hour = 0; hour < 24; ++hour) {
    for (let minute = 0; minute < 60; minute += 15) {
      const scheduledEvent = eventHelper.findScheduledEvent(scheduledEvents, currentDate, hour, minute, 15)
      let addEvent
      if (!valueHelper.isValue(scheduledEvent)) {
        addEvent = (_event) => { onAddEvent(currentDate, hour, minute, 15) }
      }

      const eventStarts = scheduledEvent != lastScheduledEvent
      lastScheduledEvent = scheduledEvent

      timeRows.push(
        <tr className="aprexis-calendar-row" key={`aprexis-calendar-${hour}-${minute}`} onClick={addEvent}>
          <td><TimeLabel hour={hour} minute={minute} /></td>
          <td className="aprexis-calendar-cell" position="relative">
            <CalendarEvent
              allDay={false}
              currentDate={currentDate}
              eventHelper={eventHelper}
              eventStarts={eventStarts}
              eventEnds={eventHelper.eventEnds(scheduledEvent, hour, minute, 15)}
              launchModal={launchModal}
              modelName={modelName}
              onDeleteEvent={onDeleteEvent}
              onEditEvent={onEditEvent}
              scheduledEvent={scheduledEvent}
            />
          </td>
        </tr>
      )
    }
  }

  return timeRows
}

class DayCalendar extends Component {
  render() {
    const {
      aprexisTableClassName,
      currentDate,
      eventHelper,
      scheduledEvents,
      tableClassName,
    } = this.props

    const allDayEvent = eventHelper.findAllDayEvent(scheduledEvents, currentDate)
    let addAllDayEvent
    if (!valueHelper.isValue(allDayEvent)) {
      addAllDayEvent = (_event) => { this.props.onAddAllDayEvent(currentDate) }
    }

    return (
      <div className={`table-responsive-sm scrollable ${valueHelper.makeString(aprexisTableClassName)}`}>
        <table className={`table-sm table-striped table ${valueHelper.makeString(tableClassName)}`}>
          <thead className="aprexis-table-header">
            <tr className="aprexis-table-header-row">
              <th className="aprexis-table-header-cell" scope="col" />
              <th className="aprexis-table_header-cell" scope="col" />
            </tr>
          </thead>

          <tbody className="aprexis-table-body">
            <tr className="aprexis-table-row" onClick={addAllDayEvent}>
              <td>All Day</td>
              <td style={{ position: "relative" }}>
                <CalendarEvent
                  allDay={true}
                  currentDate={currentDate}
                  eventHelper={eventHelper}
                  launchModal={this.props.launchModal}
                  modelName={this.props.modelName}
                  onDeleteEvent={this.props.onDeleteEvent}
                  onEditEvent={this.props.onEditEvent}
                  rows={1}
                  scheduledEvent={allDayEvent}
                />
              </td>
            </tr>

            <DayTimes
              currentDate={currentDate}
              eventHelper={eventHelper}
              launchModal={this.props.launchModal}
              modelName={this.props.modelName}
              onAddEvent={this.props.onAddEvent}
              onDeleteEvent={this.props.onDeleteEvent}
              onEditEvent={this.props.onEditEvent}
              scheduledEvents={scheduledEvents}
            />
          </tbody>
        </table>
      </div>
    )
  }
}

export { DayCalendar }
