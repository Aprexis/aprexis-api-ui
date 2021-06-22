import { AbstractListPageViewModel } from "../"
import { interventionApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"
import { interventionStates } from "../../../../types"

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

  filterDescriptions(filters, filtersOptions) {
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
        this.addData({ interventions })
        this.addField("page", pageHelper.updatePageFromLastPage(interventionHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const patient = pathEntries["patients"]

      if (valueHelper.isValue(patient)) {
        interventionApi.listForPatient(userCredentials, patient.value, params, onSuccess, onError)
        return
      }

      const pharmacyStore = pathEntries["pharmacy-stores"]
      if (valueHelper.isValue(pharmacyStore)) {
        interventionApi.listForPharmacyStore(userCredentials, pharmacyStore.value, params, onSuccess, onError)
        return
      }

      interventionApi.list(userCredentials, params, onSuccess, onError)
    }
  }

  title() {
    return "Interventions"
  }
}

export { InterventionsPageViewModel }
