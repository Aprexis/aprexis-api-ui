import { AbstractPageViewModel } from "../"
import { patientApi } from "../../../../api"
import { userCredentialsHelper } from "../../../../helpers"

class PatientProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_id = pathEntries['patients'].value
    patientApi.show(
      userCredentials,
      patient_id,
      (patient) => { this.addField('patient', patient, this.redraw) },
      this.onError
    )
  }
}

export { PatientProfilePageViewModel }
