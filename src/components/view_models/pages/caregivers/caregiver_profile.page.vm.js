import { AbstractPageViewModel } from "../"
import { caregiverApi, caregiverHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class CaregiverProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(caregiverToEdit) {
    caregiverApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      caregiverHelper.id(caregiverToEdit),
      (caregiver) => {
        this.props.launchModal(
          "caregiver",
          {
            operation: "update",
            onUpdateView: this.loadData,
            caregiver
          }
        )
      },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const caregiver_id = pathHelper.pathEntryValue(pathEntries, 'caregivers')
    caregiverApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      caregiver_id,
      (caregiver) => { this.addField('caregiver', caregiver, this.redrawView) },
      this.onError
    )
  }
}

export { CaregiverProfilePageViewModel }
