import { AbstractModalViewModel } from "../"
import { patientApi } from "../../../../api"
import { patientHelper } from "../../../../helpers"

class PatientProfileModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
  }

  api() {
    return patientApi
  }

  helper() {
    return patientHelper
  }

  loadData() {
    const { operation, patient } = this.props
    this.addData(
      {
        operation,
        patient: this.initializeDateAndTimeValidities(patient)
      },
      this.redrawView
    )
  }

  model() {
    const { changedPatient, patient } = this.data

    return { changedModel: changedPatient, model: patient, modelName: "patient" }
  }

  modelName() {
    return "patient"
  }
}

export { PatientProfileModalViewModel }
