import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { appointmentApi, pharmacyStoreApi, appointmentHelper, pageHelper, pharmacyStoreHelper, userHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"
import { periods } from "../../../../types"

const appointmentsListMethods = [
  { pathKey: "users", method: appointmentApi.listForUser }
]

class AppointmentsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.buildNewAllDayAppointment = this.buildNewAllDayAppointment.bind(this)
    this.buildNewAppointment = this.buildNewAppointment.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.changeCurrentDate = this.changeCurrentDate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.deleteAppointment = this.deleteAppointment.bind(this)
    this.editModal = this.editModal.bind(this)
    this.fetchAppointment = this.fetchAppointment.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  buildNewAllDayAppointment(date, nextOperation) {
    const userId = pathHelper.id(this.pathEntries(), "users")
    appointmentApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      userId,
      { allDay: true, scheduled_at: date, duration: 24 * 60 },
      nextOperation,
      this.onError
    )
  }

  buildNewAppointment(date, hour, minute, duration, nextOperation) {
    const userId = pathHelper.id(this.pathEntries(), "users")
    const scheduledAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)

    appointmentApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      userId,
      { scheduled_at: scheduledAt, duration },
      nextOperation,
      this.onError
    )
  }

  canCreate() {
    const { context, currentUser } = this.props
    if (!valueHelper.isValue(context)) {
      return false
    }

    const user = context.users
    return canBeCreated(currentUser, user)

    function canBeCreated(currentUser, user) {
      if (!userHelper.hasRole(
        user,
        ["pharmacy_store_admin", "pharmacy_store_tech", "pharmacy_store_user"].includes(userHelper.role(user))
      )) {
        return false
      }

      if (!authorizationHelper.canCreateAppointment(currentUser)) {
        return false
      }

      return userHelper.hasRole(user, "aprexis_admin") || userHelper.id(currentUser) === userHelper.id(user)
    }
  }

  createModal(appointment, nextOperation) {
    this.props.launchModal(
      "appointment",
      { operation: "create", onUpdateView: nextOperation, appointment }
    )
  }

  changeCurrentDate(currentDate) {
    this.addData(
      {
        currentDate,
        dateSet: this.data.dateSet + 1,
      },
      this.refreshData)
  }

  defaultParameters() {
    const currentDate = new Date()
    const period = periods.day
    const filters = {
      for_scheduled_at_between: {
        from: period.beginOn(currentDate),
        to: period.endOn(currentDate)
      }
    }

    const sorting = { sort: "scheduled_at" }
    this.addData({ currentDate, dateSet: 0, filters, sorting, page: this.defaultPage(), period })
  }

  deleteAppointment(appointment) {
    appointmentApi.destroy(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      appointmentHelper.id(appointment),
      this.refreshData,
      this.onError
    )
  }

  editModal(appointment, nextOperation) {
    this.props.launchModal(
      "appointment",
      { operation: "update", onUpdateView: nextOperation, appointment }
    )
  }

  fetchAppointment(appointment, nextOperation) {
    appointmentApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      appointmentHelper.id(appointment),
      nextOperation,
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
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

  refreshData() {
    const { reconnectAndRetry } = this.props
    const pathEntries = this.pathEntries()
    const fetchAppointmentsList = () => {
      fetchAppointments(this.fetchList, this.addData, this.redrawView, this.onError)
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
        apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), reconnectAndRetry),
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
        apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), reconnectAndRetry),
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
