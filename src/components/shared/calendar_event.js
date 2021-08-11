import React, { Component } from "react"
import { valueHelper } from "../../helpers"
import { DeleteButton, EditButton } from "./"

class CalendarEvent extends Component {
  constructor(props) {
    super(props)

    this.showEvent = this.showEvent.bind(this)
  }

  render() {
    const { allDay, eventEnds, eventHelper, eventStarts, onDeleteEvent, onEditEvent, scheduledEvent } = this.props
    if (!this.showEvent(scheduledEvent, eventHelper, allDay)) {
      return (<React.Fragment />)
    }

    // TODO handle multiple day columns
    let borderClassName = ""
    if (valueHelper.isSet(eventStarts)) {
      borderClassName = "aprexis-calendar-event-starts"
    } else if (valueHelper.isSet(eventEnds)) {
      borderClassName = "aprexis-calendar-event-stops"
    }

    return (
      <div
        className={`aprexis-calendar-event ${borderClassName}`}
        style={{ position: "absiolute" }}>
        {
          !valueHelper.isSet(eventStarts) &&
          <span>&nbsp;</span>
        }
        {
          valueHelper.isSet(eventStarts) &&
          <React.Fragment>
            <DeleteButton
              forCalendar={true}
              launchModal={this.props.launchModal}
              modelName={this.props.modelName}
              onDelete={() => { onDeleteEvent(scheduledEvent) }}
            />
            {eventHelper.eventLabel(scheduledEvent)}
            <EditButton
              forCalendar={true}
              onEdit={(event) => { onEditEvent(scheduledEvent) }}
            />
          </React.Fragment>
        }
      </div>
    )
  }

  showEvent(scheduledEvent, eventHelper, allDay) {
    if (!valueHelper.isValue(scheduledEvent)) {
      return false
    }

    if (valueHelper.isSet(allDay)) {
      return showAllDayEvent(scheduledEvent, eventHelper)
    }

    return showTimeRangeEvent(scheduledEvent, eventHelper)

    function showAllDayEvent(scheduledEvent, eventHelper) {
      return valueHelper.isSet(eventHelper.allDay(scheduledEvent))
    }

    function showTimeRangeEvent(scheduledEvent, eventHelper) {
      if (valueHelper.isSet(eventHelper.allDay(scheduledEvent))) {
        return false
      }

      return true
    }
  }
}

export { CalendarEvent }
