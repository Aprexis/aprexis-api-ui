import { AbstractPageViewModel } from "../"
import { caregiverApi } from "../../../../api"
import { caregiverHelper, userCredentialsHelper } from "../../../../helpers"

class CaregiverProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(caregiverToEdit) {
    caregiverApi.edit(
      userCredentialsHelper.get(),
      caregiverHelper.id(caregiverToEdit),
      (caregiver) => {
        this.props.launchModal(
          "caregiver",
          {
            operation: "update",
            onUpdateView: this.refreshData,
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
    const caregiver_id = pathEntries['caregivers'].value
    caregiverApi.profile(
      userCredentials,
      caregiver_id,
      (caregiver) => { this.addField('caregiver', caregiver, this.redrawView) },
      this.onError
    )
  }
}

export { CaregiverProfilePageViewModel }
