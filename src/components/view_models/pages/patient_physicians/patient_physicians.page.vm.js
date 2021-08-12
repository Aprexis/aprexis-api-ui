import { AbstractListPageViewModel } from "../"
import { patientPhysicianApi } from "../../../../api"
import { filtersHelper, pageHelper } from "../../../../helpers"

const patientPhysicianListMethods = [
  { pathKey: "patients", method: patientPhysicianApi.listForPatient }
]

class PatientPhysiciansPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoPatientPhysicianProfile = this.gotoPatientPhysicianProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "primary,physician.last_name,physician.first_name,physician.middle_name" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    const filterDescriptions = [
      filtersHelper.stringFilter("Name", "for_physician_name")
    ]

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  /* TODO: enable once the page is written.
  gotoPatientPhysicianProfile(patient_physician) {
    const pathArray = pathHelper.buildPathArray(window.location, patient_physician, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

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
