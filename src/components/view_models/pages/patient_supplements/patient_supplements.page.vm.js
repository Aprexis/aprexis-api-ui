import { AbstractListPageViewModel } from "../"
import { patientSupplementApi, pageHelper } from "@aprexis/aprexis-api-utility"
import { filtersHelper } from "../../../../helpers"

const patientSupplementListMethods = [
  { pathKey: "patients", method: patientSupplementApi.listForPatient }
]

class PatientSupplementsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoPatientSupplementProfile = this.gotoPatientSupplementProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "start_date-,supplement.label" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    const filterDescriptions = [
      filtersHelper.stringFilter("Name", "for_name")
    ]

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  /* TODO: enable once the page is written.
  gotoPatientSupplementProfile(patient_supplement) {
    const pathArray = pathHelper.buildPathArray(window.location, patient_supplement, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("patientSupplementHeaders")
    this.fetchList(
      patientSupplementListMethods,
      (patientSupplements, patientSupplementHeaders) => {
        this.addData(
          { patientSupplements, page: pageHelper.updatePageFromLastPage(patientSupplementHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Patient Supplements"
  }
}

export { PatientSupplementsPageViewModel }
