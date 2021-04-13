import { AbstractListPageViewModel } from "../"
import { interventionApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class InterventionsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoInterventionProfile = this.gotoInterventionProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "patients.last_name,patients.first_name,patients.middle_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoInterventionProfile(intervention) {
    const pathArray = pathHelper.buildPathArray(window.location, intervention, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("interventionHeaders")
    const { filters, sorting, page } = this.data

    list(
      userCredentials,
      { ...filters, ...sorting, page },
      (interventions, interventionHeaders) => {
        this.addData({ interventions })
        this.addField("page", pageHelper.updatePageFromLastPage(interventionHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(userCredentials, params, onSuccess, onError) {
      const pathEntries = pathHelper.parsePathEntries(window.location)
      const patient = pathEntries['patients']

      if (valueHelper.isValue(patient)) {
        interventionApi.listForPatient(userCredentials, patient.value, params, onSuccess, onError)
        return
      }

      const pharmacyStore = pathEntries['pharmacy-stores']
      if (valueHelper.isValue(pharmacyStore)) {
        interventionApi.listForPharmacyStore(userCredentials, pharmacyStore.value, params, onSuccess, onError)
        return
      }

      interventionApi.list(userCredentials, params, onSuccess, onError)
    }
  }
}

export { InterventionsPageViewModel }
