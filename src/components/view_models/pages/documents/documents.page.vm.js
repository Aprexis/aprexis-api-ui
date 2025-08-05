import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { documentApi, documentHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

const documentListMethods = [
  { pathKey: "health-plans", method: documentApi.listForHealthPlan }
]

class DocumentsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoDocumentProfile = this.gotoDocumentProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  api() {
    return documentApi
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const healthPlanId = pathHelper.id(pathEntries, "health-plans")

    this.api().buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      healthPlanId,
      (document) => {
        this.props.launchModal(
          "document",
          { operation: "create", onUpdateView: this.refreshData, document }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "id" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(documentToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      documentToEdit.id,
      (document) => {
        this.props.launchModal(
          "document",
          { operation: "update", onUpdateView: this.refreshData, document })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoDocumentProfile(document) {
    const pathArray = pathHelper.buildPathArray(window.location, document, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return documentHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("documentHeaders")

    this.fetchList(
      documentListMethods,
      (documents, documentHeaders) => {
        this.addData(
          { documents, "page": pageHelper.updatePageFromLastPage(documentHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Documents"
  }
}

export { DocumentsPageViewModel }
