import { AbstractModalViewModel } from "../"
import { appointmentApi, pharmacyStoreApi, userApi, appointmentHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const appointmentDateFields = {
  scheduled_at: { label: "Begin Date", required: true, type: "date" },
}

const appointmentDateAndTimeFields = {
  scheduled_at: { label: "Scheduled At", required: true, type: "date/time" }
}

const appointmentRequiredFields = {
  pharmacy_store_id: { label: "Pharmacy Store", testMethod: valueHelper.isNumberValue },
  title: { label: "Title", testMethod: valueHelper.isStringValue }
}

class AppointmentModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
  }

  api() {
    return appointmentApi
  }

  dateAndTimeFields(appointment) {
    if (valueHelper.isSet(appointmentHelper.allDay(appointment))) {
      return appointmentDateFields
    }

    return appointmentDateAndTimeFields
  }

  fetchPharmacyStore(pharmacyStoreId, nextOperation) {
    pharmacyStoreApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      pharmacyStoreId,
      nextOperation,
      this.onError
    )
  }

  fetchUser(userId, nextOperation) {
    userApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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

  modelName() {
    return 'appointment'
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
}

export { AppointmentModalViewModel }
