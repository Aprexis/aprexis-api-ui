import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { interventionMedicationApi, interventionMedicationHelper, pageHelper } from "@aprexis/aprexis-api-utility"

const interventionMedicationListMethods = [
  { pathKey: "interventions", method: interventionMedicationApi.listForIntervention }
]

class InterventionMedicationsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    //this.gotoInterventionMedicationProfile = this.gotoInterventionMedicationProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return interventionMedicationApi
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "type,updated_at-" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  /*
  gotoInterventionMedicationProfile(interventionMedication) {
    const pathArray = pathHelper.buildPathArray(window.location, interventionMedication, "profile")

    pathHelper.gotoPage(pathArray)
  }
  */

  helper() {
    return interventionMedicationHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("interventionMedicationHeaders")
    this.fetchList(
      interventionMedicationListMethods,
      (interventionMedications, interventionMedicationHeaders) => {
        this.addData(
          { interventionMedications, page: pageHelper.updatePageFromLastPage(interventionMedicationHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Intervention Medications"
  }
}

export { InterventionMedicationsPageViewModel }
