import { AbstractModalViewModel } from "../"
import { patientApi } from "../../../../api"
import { patientHelper } from "../../../../helpers"

class AbstractPatientModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    if (new.target === AbstractModalViewModel) {
      throw new TypeError("Cannot directly instantiate AbstractPatientModalViewModel instance; create a subclass instead")
    }

    super(props)

    this.api = this.api.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
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
}

export { AbstractPatientModalViewModel }
