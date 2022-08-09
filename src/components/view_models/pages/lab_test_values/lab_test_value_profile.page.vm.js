import { AbstractPageViewModel } from "../"
import { labTestValueApi, labTestValueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../helpers"

class LabTestValueProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  api() {
    return labTestValueApi
  }

  editProfileModal(labTestValueToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      this.helper().id(labTestValueToEdit),
      (labTestValue) => {
        this.props.launchModal(
          "lab-test-value",
          {
            operation: "update",
            onUpdateView: this.loadData,
            labTestValue
          }
        )
      },
      this.onError
    )
  }

  helper() {
    return labTestValueHelper
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const lab_test_value_id = pathEntries['lab-test-values'].value
    this.api().profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      lab_test_value_id,
      (labTestValue) => { this.addField('labTestValue', labTestValue, this.redrawView) },
      this.onError
    )
  }
}

export { LabTestValueProfilePageViewModel }
