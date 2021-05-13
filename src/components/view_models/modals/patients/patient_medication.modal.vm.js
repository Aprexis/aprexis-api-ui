import { AbstractModalViewModel } from "../"
import { patientApi, patientMedicationApi } from "../../../../api"
import { pathHelper, patientMedicationHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class PatientMedicationModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.create = this.create.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.submitModel = this.submitModal.bind(this)
    this.update = this.update.bind(this)
  }

  create(modalChangedModel) {
    patientMedicationApi.create(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  fetchPatient(pathEntries, nextOperation) {
    const patientId = pathHelper.id(pathEntries, "patients")
    if (!valueHelper.isValue(patientId)) {
      this.onError("A patient is required for patient medications")
      return
    }

    patientApi.show(
      userCredentialsHelper.get(),
      patientId,
      (patient) => { this.addField("patient", patient, nextOperation) },
      this.onError
    )
  }

  helper() {
    return patientMedicationHelper
  }

  loadData() {
    const { operation, patientMedication } = this.props
    this.addData({ operation, patientMedication })

    const pathEntries = this.pathEntries()
    this.fetchPatient(pathEntries, this.redrawView)
  }

  model() {
    const { changedPatientMedication, patientMedication } = this.data

    return { changedModel: changedPatientMedication, model: patientMedication, modelName: "patientMedication" }
  }

  submitModal(modalModelName, modalModel, modalChangedModel) {
    if (modalModelName != "patientMedication") {
      this.onError(`Unrecognized patient medication model ${modalModelName}`)
      return
    }

    const { operation } = this.props
    switch (operation) {
      case 'create':
        this.create(modalChangedModel)
        return

      case 'update':
        this.update(modalChangedModel)
        return

      default:
        this.onError(`Unrecognized patient medication operation ${operation}`)
    }
  }

  update(modalChangedModel) {
    patientMedicationApi.update(
      userCredentialsHelper.getAdmin(),
      modalChangedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }
}

export { PatientMedicationModalViewModel }
