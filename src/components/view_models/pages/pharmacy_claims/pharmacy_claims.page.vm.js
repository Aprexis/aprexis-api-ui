import { AbstractListPageViewModel } from ".."
import { pharmacyClaimApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const pharmacyClaimListMethods = [
  { pathKey: "patients", method: pharmacyClaimApi.listForPatient }
]

class PharmacyClaimsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPharmacyClaimProfile = this.gotoPharmacyClaimProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    pharmacyClaimApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      patientId,
      (pharmacyClaim) => {
        this.props.launchModal(
          "pharmacy-claim",
          { operation: "create", onUpdateView: this.refreshData, pharmacyClaim }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "fill_date-" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(pharmacyClaimToEdit) {
    pharmacyClaimApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      pharmacyClaimToEdit.id,
      (pharmacyClaim) => {
        this.props.launchModal(
          "pharmacy-claim",
          { operation: "update", onUpdateView: this.refreshData, pharmacyClaim })
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

  gotoPharmacyClaimProfile(pharmacyClaim) {
    const pathArray = pathHelper.buildPathArray(window.location, pharmacyClaim, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("pharmacyClaimHeaders")
    this.fetchList(
      pharmacyClaimListMethods,
      (pharmacyClaims, pharmacyClaimHeaders) => {
        this.addData(
          { pharmacyClaims, page: pageHelper.updatePageFromLastPage(pharmacyClaimHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Pharmacy Claims"
  }
}

export { PharmacyClaimsPageViewModel }
