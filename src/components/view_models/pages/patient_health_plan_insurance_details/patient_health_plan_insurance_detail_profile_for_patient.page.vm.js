import { AbstractPageViewModel } from ".."
import { patientHealthPlanInsuranceDetailApi, patientHealthPlanInsuranceDetailHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class PatientHealthPlanInsuranceDetailProfileForPatientPageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    //this.editProfileModal = this.editProfileModal.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  api() {
    return patientHealthPlanInsuranceDetailApi
  }

  /*
  editProfileModal(patientHealthPlanInsuranceDetailToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      this.helper().id(patientHealthPlanInsuranceDetailToEdit),
      (patientHealthPlanInsuranceDetail) => {
        this.props.launchModal(
          "patient-health-plan-insurance-detail",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            patientHealthPlanInsuranceDetail
          }
        )
      },
      this.onError
    )
  }
  */

  helper() {
    return patientHealthPlanInsuranceDetailHelper
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_id = pathHelper.pathEntryValue(pathEntries, 'patients')

    this.api().profileForPatient(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_id,
      (patientHealthPlanInsuranceDetail) => {
        this.addField('patientHealthPlanInsuranceDetail', patientHealthPlanInsuranceDetail, this.redrawView)
      },
      this.onError
    )
  }
}

export { PatientHealthPlanInsuranceDetailProfileForPatientPageViewModel }
