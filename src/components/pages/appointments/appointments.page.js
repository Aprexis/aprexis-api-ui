import React, { Component } from "react"
import { Scheduler } from 'devextreme-react/scheduler'
import 'devextreme/dist/css/dx.light.css'
import { AppointmentsPageViewModel } from "../../view_models/pages/appointments"
import { RefreshView } from "../../../containers"
import { valueHelper } from "../../../helpers"

class AppointmentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: {
        appointments: [],
        currentDate: new Date(),
        currentView: 'week'
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
    const appointmentsForScheduler = this.vm.appointmentsForScheduler(appointments)
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
          dataSource={appointmentsForScheduler}
          currentDate={`${view.currentDate}`}
          onOptionChanged={this.vm.optionChanged}
          defaultCurrentView={view.currentView}
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

