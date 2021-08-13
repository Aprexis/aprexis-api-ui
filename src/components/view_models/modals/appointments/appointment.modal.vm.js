import { AbstractModalViewModel } from "../"
import { appointmentApi, pharmacyStoreApi, userApi } from "../../../../api"
import {
  appointmentHelper,
  jsEventHelper,
  pathHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

const appointmentDateFields = {
  scheduled_at: { label: "Begin Date", required: true, type: "date" },
  scheduled_until: { label: "End Date", required: true, type: "date" },
}

const appointmentDateAndTimeFields = {
  scheduled_at: { label: "Scheduled At", required: true, type: "date/time" },
  scheduled_until: { label: "Scheduled Until", required: true, type: "date/time" },
}

const appointmentRequiredFields = {
  pharmacy_store_id: { label: "Pharmacy Store", testMethod: valueHelper.isNumberValue },
  title: { label: "Title", testMethod: valueHelper.isStringValue }
}

class AppointmentModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.create = this.create.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
    this.update = this.update.bind(this)
  }

  api() {
    return appointmentApi
  }

  create(modalChangedModel) {
    appointmentApi.create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  dateAndTimeFields(appointment) {
    if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
      return appointmentDateFields
    }

    return appointmentDateAndTimeFields
  }

  fetchPharmacyStore(pharmacyStoreId, nextOperation) {
    pharmacyStoreApi.show(
      userCredentialsHelper.get(),
      pharmacyStoreId,
      nextOperation,
      this.onError
    )
  }

  fetchUser(userId, nextOperation) {
    userApi.show(
      userCredentialsHelper.get(),
      userId,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return appointmentHelper
  }

  loadData() {
    const { operation, appointment } = this.props
    this.addData({ operation, appointment: this.initializeDateAndTimeValidities(appointment) })

    const pathEntries = this.pathEntries()
    const addUserAndRedraw = (user) => {
      this.addField("user", user, this.redrawView)
    }
    this.fetchUser(pathHelper.id(pathEntries, "users"), addUserAndRedraw)
  }

  model() {
    const { appointment, changedAppointment } = this.data

    return { changedModel: changedAppointment, model: appointment, modelName: this.modelName() }
  }

  requiredFields() {
    return appointmentRequiredFields
  }

  selectPharmacyStore(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPharmacyStoreToAppointmentAndRedraw = (pharmacyStore) => {
      const { appointment, changedAppointment } = this.data
      const updated = appointmentHelper.changePharmacyStore(appointment, changedAppointment, pharmacyStore)
      this.addData(updated, this.redrawView)
    }

    this.fetchPharmacyStore(value, addPharmacyStoreToAppointmentAndRedraw)
  }

  update(modalChangedModel) {
    appointmentApi.update(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }
}

export { AppointmentModalViewModel }
