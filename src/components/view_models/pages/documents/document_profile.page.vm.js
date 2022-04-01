import { AbstractPageViewModel } from "../"
import { documentApi } from "../../../../api"
import { documentHelper, userCredentialsHelper } from "../../../../helpers"

class DocumentProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.download = this.download.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  api() {
    return documentApi
  }

  download() {
    const { document } = this.data

    this.api().download(userCredentialsHelper.get(), this.helper().id(document), this.redrawView, this.onError)
  }

  editProfileModal(documentToEdit) {
    this.api().edit(
      userCredentialsHelper.get(),
      this.helper().id(documentToEdit),
      (document) => {
        this.props.launchModal(
          "document",
          {
            operation: "update",
            onUpdateView: this.refreshData,
            document
          }
        )
      },
      this.onError
    )
  }

  helper() {
    return documentHelper
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const document_id = pathEntries['documents'].value
    this.api().profile(
      userCredentials,
      document_id,
      (document) => { this.addField('document', document, this.redrawView) },
      this.onError
    )
  }
}

export { DocumentProfilePageViewModel }