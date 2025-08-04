import { Component } from "react"
import { valueHelper, userHelper, appointmentHelper } from "@aprexis/aprexis-api-utility"
import { Spinner } from "../../shared/index.js"
import { EventCalendar } from "../../shared/event_calendar/index.js"
import { AppointmentsPageViewModel } from "../../view_models/pages/appointments/index.js"
import { RefreshView } from "../../../containers/index.js"

class AppointmentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.vm = new AppointmentsPageViewModel(
      {
        ...props,
        view: this
      }
    )
  }

  componentDidMount() {
    return this.vm.loadData()
  }

  render() {
    const { context, timeout } = this.props
    if (!valueHelper.isValue(context)) {
      return (<Spinner />)
    }
    const { appointments, currentDate, period } = this.state
    const myTimeout = valueHelper.isValue(timeout) ? timeout : 5 * 60 * 1000
    const user = context.users

    return (
      <RefreshView
        label="Appointments"
        lastPage={this.props.page}
        objects={appointments}
        onIdle={this.vm.refreshData}
        pluralLabel="Appointments"
        timeout={myTimeout}>
        <EventCalendar
          currentDate={currentDate}
          dateSet={this.state.dateSet}
          eventHelper={appointmentHelper}
          launchModal={this.props.launchModal}
          modelName={'appointment'}
          onAddEvent={this.vm.createModal}
          onBuildAllDayEvent={this.vm.buildNewAllDayAppointment}
          onBuildEvent={this.vm.buildNewAppointment}
          onChangeCurrentDate={this.vm.changeCurrentDate}
          onDeleteEvent={this.vm.deleteAppointment}
          onEditEvent={this.vm.editModal}
          onFetchEvent={this.vm.fetchAppointment}
          onRefresh={this.vm.refreshData}
          period={period}
          scheduledEvents={appointments}
          title={`Appointments for ${userHelper.fullName(user)}`}
        />
      </RefreshView>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { AppointmentsPage }

