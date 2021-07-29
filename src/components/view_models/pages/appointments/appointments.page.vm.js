import { AbstractListPageViewModel } from ".."
import { appointmentApi, pharmacyStoreApi } from "../../../../api"
import {
  appointmentHelper,
  dateHelper,
  devExtremeHelper,
  pageHelper,
  pathHelper,
  pharmacyStoreHelper,
  userCredentialsHelper,
  userHelper,
  valueHelper
} from "../../../../helpers"
import { venues } from "../../../../types"

const appointmentsListMethods = [
  { pathKey: "users", method: appointmentApi.listForUser }
]

class AppointmentsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.checkAppointmentOperation = this.checkAppointmentOperation.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.deleteAppointment = this.deleteAppointment.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.openAppointmentForm = this.openAppointmentForm.bind(this)
    this.optionChanged = this.optionChanged.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  checkAppointmentOperation(operation, event) {
    console.log(`Operation: ${operation}`)
    console.log(`Event: ${JSON.stringify(event, valueHelper.getCircularReplacer(), 2)}`)
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

  deleteAppointment(event) {
    const appointment = event.appointmentData
    if (!valueHelper.isValue(appointmentHelper.id(appointment))) {
      return
    }

    appointmentApi.destroy(
      userCredentialsHelper.get(),
      appointmentHelper.id(appointment),
      this.refreshData,
      this.onError
    )
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

  openAppointmentForm(data) {
    const { form } = data
    const { pharmacyStores } = this.data

    form.itemOption("mainGroup", "items", buildMainGroupItems(data.appointmentData, pharmacyStores))

    function buildAllDayDateItems() {
      return devExtremeHelper.dateRangeGroup(
        {
          dataField: "scheduled_at",
          label: "Start Date"
        },
        {
          dataField: "scheduled_until",
          label: "End Date"
        }
      )
    }

    function buildDateItems(appointment) {
      if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
        return buildAllDayDateItems()
      }

      return buildDateRangeDateItems()
    }

    function buildDateRangeDateItems() {
      return devExtremeHelper.dateTimeRangeGroup(
        {
          dataField: "scheduled_at",
          label: "Scheduled At"
        },
        {
          dataField: "scheduled_until",
          label: "Scheduled Until"
        }
      )
    }

    function buildMainGroupItems(appointment, pharmacyStores) {
      return [
        devExtremeHelper.textItem({ dataField: "title", label: "Title" }),
        buildDateItems(appointment),
        devExtremeHelper.switchItem({ dataField: "all_day", label: "All Day" }),
        devExtremeHelper.emptyItem(),
        devExtremeHelper.selectIdItem(
          {
            dataField: "pharmacy_store_id",
            helper: pharmacyStoreHelper,
            identificationMethod: "identification",
            label: "Pharmacy Store",
            options: pharmacyStores
          }
        ),
        devExtremeHelper.emptyItem(),
        devExtremeHelper.selectSimpleItem(
          {
            dataField: "venue",
            label: "Venue",
            options: venues
          }
        )
      ]
    }
  }

  optionChanged(event) {
    const { name, value } = event
    const { filters, view } = this.data

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
    const pathEntries = this.pathEntries()
    const fetchAppointmentsList = () => {
      fetchAppointments(this.fetchList, this.addData, this.redrawView(), this.onError)
    }
    this.removeField("appointmentHeaders")

    if (pathHelper.isSingular(pathEntries, "pharmacy_stores")) {
      fetchPharmacyStore(
        pathEntries,
        this.addField,
        fetchAppointmentsList,
        this.onError
      )
      return
    }

    fetchPharmacyStores(
      this.props.currentUser,
      pathEntries,
      this.addField,
      fetchAppointmentsList,
      this.onError
    )

    function addIdentificationToPharmacyStores(pharmacyStores) {
      return pharmacyStores.map(
        (pharmacyStore) => {
          return {
            ...pharmacyStore,
            identification: pharmacyStoreHelper.identification(pharmacyStore)
          }
        }
      )
    }

    function fetchPharmacyStore(pathEntries, addField, nextOperation, onError) {
      pharmacyStoreApi.profile(
        userCredentialsHelper.get(),
        pathHelper.id(pathEntries, "pharmacy_stores"),
        (pharmacyStore) => {
          addField("pharmacyStores", addIdentificationToPharmacyStores([pharmacyStore]), nextOperation)
        },
        onError
      )
    }

    function fetchPharmacyStores(currentUser, pathEntries, addField, nextOperation, onError) {
      let userId
      if (valueHelper.isValue(currentUser)) {
        userId = userHelper.id(currentUser)
      } else {
        userId = pathHelper.id(pathEntries, "users")
      }

      if (!valueHelper.isValue(userId)) {
        addField("pharmacyStores", [], nextOperation)
        return
      }

      pharmacyStoreApi.listForUser(
        userCredentialsHelper.get(),
        userId,
        { sort: "name,store_number" },
        (pharmacyStores) => {
          addField("pharmacyStores", addIdentificationToPharmacyStores(pharmacyStores), nextOperation)
        },
        onError
      )
    }

    function fetchAppointments(fetchList, addData, nextOperation, onError) {
      fetchList(
        appointmentsListMethods,
        (appointments, appointmentHeaders) => {
          addData(
            { appointments, page: pageHelper.updatePageFromLastPage(appointmentHeaders) },
            nextOperation
          )
        },
        onError
      )
    }
  }

  title() {
    return "Appointments"
  }
}

export { AppointmentsPageViewModel }
