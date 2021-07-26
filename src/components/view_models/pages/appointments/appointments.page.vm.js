import { AbstractListPageViewModel } from ".."
import { appointmentApi } from "../../../../api"
import { appointmentHelper, dateHelper, pageHelper, valueHelper } from "../../../../helpers"

const appointmentsListMethods = [
  { pathKey: "users", method: appointmentApi.listForUser }
]

class AppointmentsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.appointmentsForScheduler = this.appointmentsForScheduler.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.optionChanged = this.optionChanged.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  appointmentsForScheduler(appointments) {
    if (!valueHelper.isValue(appointments)) {
      return []
    }

    return appointments.map(
      (appointment) => {
        return {
          allDay: valueHelper.isSet(appointmentHelper.allDay(appointment)),
          endDate: appointmentHelper.endDate(appointment),
          startDate: appointmentHelper.startDate(appointment),
          text: appointmentHelper.text(appointment)
        }
      }
    )
  }

  defaultParameters() {
    const currentDate = new Date()
    const currentView = 'week'
    const filters = {
      for_scheduled_at_between: { from: currentDate, to: dateHelper.computeToDate(currentDate, currentView) }
    }
    const sorting = { sort: "scheduled_at" }
    const view = {
      currentDate,
      currentView
    }
    this.addData({ filters, sorting, page: this.defaultPage(), view })
  }

  filterDescriptions(filters, filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  optionChanged(event) {
    const { name, value } = event
    const { filters, view } = this.data

    console.log(`View: ${JSON.stringify(view, null, 2)}`)
    console.log(`${name} = ${value}`)

    switch (name) {
      case 'currentDate':
        changeCurrentDate(
          value,
          view,
          filters,
          this.addField,
          this.updateFilters,
          this.refreshData
        )
        break

      default:
    }

    function changeCurrentDate(newDate, view, filters, addField, updateFilters, refreshData) {
      const { currentView } = view
      addField(
        "view", { ...view, currentDate: newDate },
        () => {
          updateFilters(
            {
              ...filters,
              for_scheduled_at_between: {
                from: newDate,
                to: dateHelper.computeToDate(newDate, currentView)
              }
            },
            refreshData
          )
        }
      )
    }
  }

  refreshData() {
    this.removeField("appointmentHeaders")
    this.fetchList(
      appointmentsListMethods,
      (appointments, appointmentHeaders) => {
        this.addData(
          { appointments, page: pageHelper.updatePageFromLastPage(appointmentHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Appointments"
  }
}

export { AppointmentsPageViewModel }
