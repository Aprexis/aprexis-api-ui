import { AbstractPageViewModel } from ".."
import { interventionDocumentApi, interventionDocumentHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class InterventionDocumentProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.download = this.download.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  api() {
    return interventionDocumentApi
  }

  download() {
    const { interventionDocument } = this.data

    this.api().download(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry), this.helper().id(interventionDocument), this.redrawView, this.onError)
  }

  editProfileModal(interventionDocumentToEdit) {
    interventionDocumentApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      interventionDocumentHelper.id(interventionDocumentToEdit),
      (interventionDocument) => {
        this.props.launchModal(
          "intervention-document",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            interventionDocument
          }
        )
      },
      this.onError
    )
  }

  helper() {
    return interventionDocumentHelper
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_disease_id = pathHelper.pathEntryValue(pathEntries, 'intervention-documents')
    this.api().profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      patient_disease_id,
      (interventionDocument) => { this.addField('interventionDocument', interventionDocument, this.redrawView) },
      this.onError
    )
  }
}

export { InterventionDocumentProfilePageViewModel }
