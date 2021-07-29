import React, { Component } from "react"
import { Scheduler } from "devextreme-react/scheduler"
import "devextreme/dist/css/dx.light.css"
import { AppointmentsPageViewModel } from "../../view_models/pages/appointments"
import { RefreshView } from "../../../containers"
import { appointmentHelper, dateHelper, valueHelper } from "../../../helpers"

const Appointment = (appointment) => {
  return (
    <div className="appointment-preview">
      <div> {appointmentHelper.title(appointment)}</div>
      <div>
        {dateHelper.displayDateTime(appointmentHelper.scheduledAt(appointment))}
        {" - "}
        {dateHelper.displayDateTime(appointmentHelper.scheduledUntil(appointment))}
      </div>
    </div>
  )
}
class AppointmentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: {
        appointments: [],
        currentDate: new Date(),
        currentView: "week"
      }
    }
    this.vm = new AppointmentsPageViewModel(
      {
        ...props,
        view: this
      }
    )
  }

  componentDidMount() {
    this.vm.loadData()
  }

  render() {
    const { timeout } = this.props
    const { appointments, view } = this.state
    const myTimeout = valueHelper.isValue(timeout) ? timeout : 5 * 60 * 1000

    return (
      <RefreshView
        label="Appointments"
        lastPage={this.props.page}
        objects={appointments}
        onIdle={this.vm.refreshData}
        pluralLabel="Appointments"
        timeout={myTimeout}>
        <Scheduler
          allDayExpr="all_day"
          appointmentComponent={Appointment}
          currentDate={`${view.currentDate}`}
          dataSource={appointments}
          defaultCurrentView={view.currentView}
          endDateExpr="scheduled_until"
          onAppointmentDeleted={this.vm.deleteAppointment}
          onAppointmentFormOpening={this.vm.openAppointmentForm}
          onOptionChanged={this.vm.optionChanged}
          startDateExpr="scheduled_at"
          textExpr="title"
        />
      </RefreshView>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { AppointmentsPage }

