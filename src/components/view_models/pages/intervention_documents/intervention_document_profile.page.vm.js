import { AbstractPageViewModel } from ".."
import { interventionDocumentApi } from "../../../../api"
import { interventionDocumentHelper, userCredentialsHelper } from "../../../../helpers"

class InterventionDocumentProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editProfileModal = this.editProfileModal.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  editProfileModal(interventionDocumentToEdit) {
    interventionDocumentApi.edit(
      userCredentialsHelper.get(),
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

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const patient_disease_id = pathEntries['intervention-documents'].value
    interventionDocumentApi.profile(
      userCredentials,
      patient_disease_id,
      (interventionDocument) => { this.addField('interventionDocument', interventionDocument, this.redrawView) },
      this.onError
    )
  }
}

export { InterventionDocumentProfilePageViewModel }
