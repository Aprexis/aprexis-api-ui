import { AbstractListPageViewModel } from "../"
import { patientDiseaseApi } from "../../../../api"
import {
  pageHelper,
  pathHelper,
  patientDiseaseHelper,
  userCredentialsHelper
} from "../../../../helpers"

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
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return patientDiseaseHelper.canBeCreated(currentUser, pathEntries)
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")

    patientDiseaseApi.buildNew(
      userCredentialsHelper.get(),
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
      userCredentialsHelper.get(),
      patientDiseaseToEdit.id,
      (patientDisease) => {
        this.props.launchModal(
          "patient-disease",
          { operation: "update", onUpdateView: this.refreshData, patientDisease })
      },
      this.onError
    )
  }

  filterDescriptions(filters, filtersOptions) {
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
