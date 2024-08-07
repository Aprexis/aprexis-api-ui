import { AbstractListPageViewModel } from "../"
import { interventionApi, pageHelper, valueHelper, interventionHelper, interventionStates } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, authorizationHelper, filtersHelper, pathHelper, userCredentialsHelper } from "../../../../helpers"

class InterventionsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createExternalModal = this.createExternalModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.editExternalModal = this.editExternalModal.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoInterventionProfile = this.gotoInterventionProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.interventionStateOptions = this.interventionStateOptions.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return interventionApi
  }

  canCreate() {
    return canBeCreated(this.props.currentUser, this.pathEntries(), this.props.context)

    function canBeCreated(user, pathEntries, context) {
      if (!valueHelper.isValue(user) || !valueHelper.isValue(pathEntries) || !valueHelper.isValue(context)) {
        return false
      }

      return authorizationHelper.canCreateIntervention(user, pathEntries)
    }
  }

  createExternalModal(_event) {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")

    this.api().buildNewExternal(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      pharmacyStoreId,
      (intervention) => {
        this.props.launchModal(
          "external-intervention-profile",
          { operation: "create", onUpdateView: this.refreshData, intervention }
        )
      },
      this.onError
    )
  }

  defaultParameters() {
    const pathEntries = this.pathEntries()
    var filters;
    const patientId = pathHelper.id(pathEntries, "patients")
    if (valueHelper.isNumberValue(patientId)) {
      filters = {}
    } else {
      filters = { for_state: 'active' }
    }
    const sorting = { sort: "patients.last_name,patients.first_name,patients.middle_name" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  editExternalModal(interventionToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      interventionToEdit.id,
      (intervention) => {
        this.props.launchModal(
          "external-intervention-profile",
          { operation: "update", onUpdateView: this.refreshData, intervention })
      },
      this.onError
    )
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

  helper() {
    return interventionHelper
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
    const { reconnectAndRetry } = this.props
    this.removeField("interventionHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      this.api(),
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

    function list(api, pathEntries, userCredentials, params, onSuccess, onError) {
      const patient = pathEntries["patients"]

      if (valueHelper.isValue(patient)) {
        api.listForPatient(apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry), patient.value, params, onSuccess, onError)
        return
      }

      const pharmacyStore = pathEntries["pharmacy-stores"]
      if (valueHelper.isValue(pharmacyStore)) {
        api.listForPharmacyStore(apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry), pharmacyStore.value, params, onSuccess, onError)
        return
      }

      api.list(apiEnvironmentHelper.apiEnvironment(userCredentials, reconnectAndRetry), params, onSuccess, onError)
    }
  }

  title() {
    return "Interventions"
  }
}

export { InterventionsPageViewModel }
