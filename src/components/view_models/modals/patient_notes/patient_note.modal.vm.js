import { AbstractModalViewModel } from "../abstract.modal.vm.js"
import { patientApi, patientNoteApi, pharmacyStoreApi, patientNoteHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

class PatientNoteModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
  }

  api() {
    return patientNoteApi
  }

  fetchPatient(pathEntries, nextOperation) {
    const patientId = pathHelper.id(pathEntries, "patients")
    if (!valueHelper.isValue(patientId)) {
      this.onError("A patient is required for patient notes")
      return
    }

    patientApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      (patient) => { this.addField("patient", patient, nextOperation) },
      this.onError
    )
  }

  fetchPharmacyStore(pathEntries, nextOperation) {
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
    if (!valueHelper.isValue(pharmacyStoreId)) {
      this.onError("A pharmacy store is required for patient notes")
      return
    }

    pharmacyStoreApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      pharmacyStoreId,
      (pharmacyStore) => { this.addField("pharmacyStore", pharmacyStore, nextOperation) },
      this.onError
    )
  }

  helper() {
    return patientNoteHelper
  }

  loadData() {
    const { operation, patientNote } = this.props
    this.addData({ operation, patientNote })

    const pathEntries = this.pathEntries()
    this.fetchPharmacyStore(pathEntries, () => { this.fetchPatient(pathEntries, this.redrawView) })
  }

  model() {
    const { changedPatientNote, patientNote } = this.data

    return { changedModel: changedPatientNote, model: patientNote, modelName: "patientNote" }
  }

  modelName() {
    return "patientNote"
  }
}

export { PatientNoteModalViewModel }
