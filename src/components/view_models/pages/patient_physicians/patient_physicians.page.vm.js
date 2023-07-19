import { AbstractListPageViewModel } from "../"
import { patientPhysicianApi, pageHelper, patientPhysicianHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

const patientPhysicianListMethods = [
  { pathKey: "patients", method: patientPhysicianApi.listForPatient }
]

class PatientPhysiciansPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientPhysicianProfile = this.gotoPatientPhysicianProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return patientPhysicianApi
  }

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return canBeCreated(currentUser, pathEntries)

    function canBeCreated(user, pathEntries) {
      if (!authorizationHelper.canCreatePatientPhysician(user, pathEntries, true)) {
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
      {},
      (patientPhysician) => {
        this.props.launchModal(
          "patient-physician",
          { operation: "create", onUpdateView: this.refreshData, patientPhysician }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "primary,physician.last_name,physician.first_name,physician.middle_name" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(patientPhysicianToEdit) {
    patientPhysicianApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientPhysicianToEdit.id,
      (patientPhysician) => {
        this.props.launchModal(
          "patient-physician",
          { operation: "update", onUpdateView: this.refreshData, patientPhysician })
      },
      this.onError
    )
  }

  filterDescriptions(_filters, _filtersOptions) {
    const filterDescriptions = [
      filtersHelper.stringFilter("Name", "for_physician_name")
    ]

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  gotoPatientPhysicianProfile(patient_physician) {
    const pathArray = pathHelper.buildPathArray(window.location, patient_physician, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return patientPhysicianHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientPhysicianHeaders")
    this.fetchList(
      patientPhysicianListMethods,
      (patientPhysicians, patientPhysicianHeaders) => {
        this.addData(
          { patientPhysicians, page: pageHelper.updatePageFromLastPage(patientPhysicianHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Physicians"
  }
}

export { PatientPhysiciansPageViewModel }
