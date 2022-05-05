import { AbstractListPageViewModel } from "../"
import { interventionDocumentApi } from "../../../../api"
import { pageHelper, pathHelper } from "../../../../helpers"

const interventionDocumentListMethods = [
  { pathKey: "interventions", method: interventionDocumentApi.listForIntervention }
]

class InterventionDocumentsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoInterventionDocumentProfile = this.gotoInterventionDocumentProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "updated_at-" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoInterventionDocumentProfile(interventionDocument) {
    const pathArray = pathHelper.buildPathArray(window.location, interventionDocument, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("interventionDocumentHeaders")
    this.fetchList(
      interventionDocumentListMethods,
      (interventionDocuments, interventionDocumentHeaders) => {
        this.addData(
          { interventionDocuments, page: pageHelper.updatePageFromLastPage(interventionDocumentHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Intervention Documents"
  }
}

export { InterventionDocumentsPageViewModel }
