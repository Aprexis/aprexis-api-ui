import { AbstractListPageViewModel } from "../"
import { patientApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class PatientsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoPatientProfile = this.gotoPatientProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "last_name,first_name,middle_name" }
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

  gotoPatientProfile(patient) {
    const pathArray = pathHelper.buildPathArray(window.location, patient, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("patientHeaders")
    const { filters, sorting, page } = this.data

    list(
      userCredentials,
      { ...filters, ...sorting, page },
      (patients, patientHeaders) => {
        this.addData({ patients })
        this.addField("page", pageHelper.updatePageFromLastPage(patientHeaders))
        this.redrawView()
      },
      this.onError
    )

    function list(userCredentials, params, onSuccess, onError) {
      const pathEntries = pathHelper.parsePathEntries(window.location)
      const healthPlan = pathEntries['health-plans']

      if (valueHelper.isValue(healthPlan) && valueHelper.isValue(healthPlan.value)) {
        patientApi.listForHealthPlan(userCredentials, healthPlan.value, params, onSuccess, onError)
        return
      }

      patientApi.list(userCredentials, params, onSuccess, onError)
    }
  }
}

export { PatientsPageViewModel }
