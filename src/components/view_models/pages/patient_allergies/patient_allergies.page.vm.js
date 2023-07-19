import { AbstractListPageViewModel } from "../"
import { patientAllergyApi, pageHelper, patientAllergyHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const patientAllergyListMethods = [
  { pathKey: "patients", method: patientAllergyApi.listForPatient }
]

class PatientAllergiesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientAllergyProfile = this.gotoPatientAllergyProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return patientAllergyApi
  }

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return canBeCreated(currentUser, pathEntries)

    function canBeCreated(user, pathEntries) {
      if (!authorizationHelper.canCreatePatientAllergy(user, pathEntries)) {
        return false
      }


      return pathHelper.isSingular(pathEntries, "patients")
    }
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    this.api().buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      (patientAllergy) => {
        this.props.launchModal(
          "patient-allergy",
          { operation: "create", onUpdateView: this.refreshData, patientAllergy }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "allergy_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(patientAllergyToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientAllergyToEdit.id,
      (patientAllergy) => {
        this.props.launchModal(
          "patient-allergy",
          { operation: "update", onUpdateView: this.refreshData, patientAllergy })
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

  gotoPatientAllergyProfile(patientAllergy) {
    const pathArray = pathHelper.buildPathArray(window.location, patientAllergy, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return patientAllergyHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientAllergyHeaders")
    this.fetchList(
      patientAllergyListMethods,
      (patientAllergies, patientAllergyHeaders) => {
        this.addData(
          { patientAllergies, page: pageHelper.updatePageFromLastPage(patientAllergyHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Allergies"
  }
}

export { PatientAllergiesPageViewModel }
