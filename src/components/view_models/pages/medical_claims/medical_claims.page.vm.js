import { AbstractListPageViewModel } from ".."
import { medicalClaimApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const medicalClaimListMethods = [
  { pathKey: "patients", method: medicalClaimApi.listForPatient }
]

class MedicalClaimsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoMedicalClaimProfile = this.gotoMedicalClaimProfile.bind(this)
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

    medicalClaimApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      patientId,
      (medicalClaim) => {
        this.props.launchModal(
          "medical-claim",
          { operation: "create", onUpdateView: this.refreshData, medicalClaim }
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

  editModal(medicalClaimToEdit) {
    medicalClaimApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      medicalClaimToEdit.id,
      (medicalClaim) => {
        this.props.launchModal(
          "medical-claim",
          { operation: "update", onUpdateView: this.refreshData, medicalClaim })
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

  gotoMedicalClaimProfile(medicalClaim) {
    const pathArray = pathHelper.buildPathArray(window.location, medicalClaim, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("medicalClaimHeaders")
    this.fetchList(
      medicalClaimListMethods,
      (medicalClaims, medicalClaimHeaders) => {
        this.addData(
          { medicalClaims, page: pageHelper.updatePageFromLastPage(medicalClaimHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Medical Claims"
  }
}

export { MedicalClaimsPageViewModel }
