import { AbstractListPageViewModel } from "../"
import { faxApi, faxHelper, pageHelper } from "@aprexis/aprexis-api-utility"

const faxListMethods = [
  { pathKey: "interventions", method: faxApi.listForIntervention }
]

class FaxesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    //this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    //this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoFaxProfile = this.gotoFaxProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  api() {
    return faxApi
  }

  /*
  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    this.api().buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      (fax) => {
        this.props.launchModal(
          "fax",
          { operation: "create", onUpdateView: this.refreshData, fax }
        )
      },
      this.onError
    )
  }
  */

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "created_at-" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  /*
  editModal(faxToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      faxToEdit.id,
      (fax) => {
        this.props.launchModal(
          "fax",
          { operation: "update", onUpdateView: this.refreshData, fax })
      },
      this.onError
    )
  }
  */

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  /*
  gotoFaxProfile(fax) {
    const pathArray = pathHelper.buildPathArray(window.location, fax, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  helper() {
    return faxHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("faxHeaders")

    this.fetchList(
      faxListMethods,
      (faxes, faxHeaders) => {
        this.addData(
          { faxes, "page": pageHelper.updatePageFromLastPage(faxHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Faxes"
  }
}

export { FaxesPageViewModel }
