import { AbstractModalViewModel } from "../"
import { patientApi, patientNoteApi, pharmacyStoreApi } from "../../../../api"
import { pathHelper, patientNoteHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class PatientNoteModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.create = this.create.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.submitModel = this.submitModal.bind(this)
  }

  create(modalChangedModel) {
    patientNoteApi.create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  fetchPatient(pathEntries, nextOperation) {
    const patientId = pathHelper.id(pathEntries, "patients")
    if (!valueHelper.isValue(patientId)) {
      this.onError("A patient is required for patient notes")
      return
    }

    patientApi.show(
      userCredentialsHelper.get(),
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
      userCredentialsHelper.get(),
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

  submitModal(modalModelName, modalModel, modalChangedModel) {
    if (modalModelName != "patientNote") {
      this.onError(`Unrecognized patient note model ${modalModelName}`)
      return
    }

    const { operation } = this.props
    switch (operation) {
      case 'create':
        this.create(modalChangedModel)
        return

      default:
        this.onError(`Unrecognized patient note operation ${operation}`)
    }
  }
}

export { PatientNoteModalViewModel }
