import { AbstractListPageViewModel } from ".."
import { appointmentApi, pharmacyStoreApi } from "../../../../api"
import {
  appointmentHelper,
  pageHelper,
  pathHelper,
  pharmacyStoreHelper,
  userCredentialsHelper,
  userHelper,
  valueHelper
} from "../../../../helpers"
import { periods } from "../../../../types/periods.type"

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
      userCredentialsHelper.get(),
      userId,
      { allDay: true, scheduled_at: date, scheduled_until: date },
      nextOperation,
      this.onError
    )
  }

  buildNewAppointment(date, hour, minute, minutes, nextOperation) {
    const userId = pathHelper.id(this.pathEntries(), "users")
    const scheduledAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)
    const scheduledUntil = new Date(
      scheduledAt.getFullYear(),
      scheduledAt.getMonth(),
      scheduledAt.getDate(),
      hour,
      minute + minutes
    )

    appointmentApi.buildNew(
      userCredentialsHelper.get(),
      userId,
      { scheduled_at: scheduledAt, scheduled_until: scheduledUntil },
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
    return appointmentHelper.canBeCreated(currentUser, user)
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
      userCredentialsHelper.get(),
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
      userCredentialsHelper.get(),
      appointmentHelper.id(appointment),
      nextOperation,
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

  refreshData() {
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
