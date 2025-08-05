import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { patientDiseaseApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

const patientDiseaseListMethods = [
  { pathKey: "patients", method: patientDiseaseApi.listForPatient }
]

class PatientDiseasesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editModal = this.editModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientDiseaseProfile = this.gotoPatientDiseaseProfile.bind(this)
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

    patientDiseaseApi.buildNew(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      (patientDisease) => {
        this.props.launchModal(
          "patient-disease",
          { operation: "create", onUpdateView: this.refreshData, patientDisease }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "disease_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editModal(patientDiseaseToEdit) {
    patientDiseaseApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientDiseaseToEdit.id,
      (patientDisease) => {
        this.props.launchModal(
          "patient-disease",
          { operation: "update", onUpdateView: this.refreshData, patientDisease })
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

  gotoPatientDiseaseProfile(patientDisease) {
    const pathArray = pathHelper.buildPathArray(window.location, patientDisease, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientDiseaseHeaders")
    this.fetchList(
      patientDiseaseListMethods,
      (patientDiseases, patientDiseaseHeaders) => {
        this.addData(
          { patientDiseases, page: pageHelper.updatePageFromLastPage(patientDiseaseHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Diseases"
  }
}

export { PatientDiseasesPageViewModel }
