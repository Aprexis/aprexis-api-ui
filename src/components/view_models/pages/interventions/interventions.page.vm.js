import { AbstractListPageViewModel } from "../"
import { interventionApi, pageHelper, valueHelper, interventionStates } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class InterventionsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoInterventionProfile = this.gotoInterventionProfile.bind(this)
    this.interventionStateOptions = this.interventionStateOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = { for_state: "active" }
    const sorting = { sort: "patients.last_name,patients.first_name,patients.middle_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Name", "for_name"),
      filtersHelper.selectIdFilter(
        "State",
        "for_state",
        {
          options: this.interventionStateOptions(),
          unselectedLabel: "All"
        }
      )
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoInterventionProfile(intervention) {
    const pathArray = pathHelper.buildPathArray(window.location, intervention, "profile")

    pathHelper.gotoPage(pathArray)
  }

  interventionStateOptions() {
    const specialOptions = [
      { id: "active", value: "Active" },
      { id: "inactive", value: "Inactive" },
      { id: "terminated", value: "Terminated" },
      { id: "unstarted", value: "Not Started" }
    ]
    const standardOptions = Object.keys(interventionStates).map(
      (key) => { return { id: key, value: interventionStates[key] } }
    )

    return specialOptions.concat(standardOptions)
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
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      userCredentials,
      { ...filters, ...sorting, page },
      (interventions, interventionHeaders) => {
        this.addData(
          {
            interventions,
            page: pageHelper.updatePageFromLastPage(interventionHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const patient = pathEntries["patients"]

      if (valueHelper.isValue(patient)) {
        interventionApi.listForPatient(apiEnvironmentHelper.apiEnvironment(userCredentials), patient.value, params, onSuccess, onError)
        return
      }

      const pharmacyStore = pathEntries["pharmacy-stores"]
      if (valueHelper.isValue(pharmacyStore)) {
        interventionApi.listForPharmacyStore(apiEnvironmentHelper.apiEnvironment(userCredentials), pharmacyStore.value, params, onSuccess, onError)
        return
      }

      interventionApi.list(apiEnvironmentHelper.apiEnvironment(userCredentials), params, onSuccess, onError)
    }
  }

  title() {
    return "Interventions"
  }
}

export { InterventionsPageViewModel }
