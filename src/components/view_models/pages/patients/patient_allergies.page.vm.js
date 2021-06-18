import { AbstractListPageViewModel } from "../"
import { patientAllergyApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper } from "../../../../helpers"

const patientAllergyListMethods = [
  { pathKey: "patients", method: patientAllergyApi.listForPatient }
]

class PatientAllergiesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientAllergyProfile = this.gotoPatientAllergyProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "allergy_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Allergy Name", "for_allergy_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoPatientAllergyProfile(patientAllergy) {
    const pathArray = pathHelper.buildPathArray(window.location, patientAllergy, "profile")

    pathHelper.gotoPage(pathArray)
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
}

export { PatientAllergiesPageViewModel }
