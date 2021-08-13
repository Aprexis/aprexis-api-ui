import { AbstractListPageViewModel } from "../"
import { labTestValueApi } from "../../../../api"
import { filtersHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class LabTestValuesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoLabTestProfile = this.gotoLabTestProfile.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const pathEntries = this.pathEntries()
    const filters = {}
    if (valueHelper.isValue(pathEntries['patients']) && !valueHelper.isValue(pathEntries['interventions'])) {
      filters['for_interventions'] = false
    }

    const sorting = { sort: "patient.last_name,patient.first_name,patient.middle_name,value_taken_at-,key_code" }

    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(filters, filtersOptions) {
    const pathEntries = this.pathEntries()
    const filterDescriptions = [filtersHelper.stringFilter("Key Code", "for_key_code")]

    if (valueHelper.isValue(pathEntries['patients']) && !valueHelper.isValue(pathEntries['interventions'])) {
      filterDescriptions.push(
        filtersHelper.selectIdFilter(
          "Include Interventions",
          "for_interventions",
          {
            options: [{ id: false, value: 'No' }],
            requireUnselected: true,
            unselectedLabel: 'Yes'
          }
        )
      )
    }

    return filterDescriptions
  }

  filtersOptions() {
    return {}
  }

  gotoLabTestProfile(labTestValue) {
    const pathArray = pathHelper.buildPathArray(window.location, labTestValue, "profile")

    pathHelper.gotoPage(pathArray)
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    this.removeField("labTestValueHeaders")
    const { filters, sorting, page } = this.data
    const pathEntries = this.pathEntries()

    list(
      pathEntries,
      userCredentials,
      { ...filters, ...sorting, page },
      (labTestValues, labTestValueHeaders) => {
        this.addData(
          {
            labTestValues,
            page: pageHelper.updatePageFromLastPage(labTestValueHeaders)
          },
          this.redrawView
        )
      },
      this.onError
    )

    function list(pathEntries, userCredentials, params, onSuccess, onError) {
      const intervention = pathEntries['interventions']
      if (valueHelper.isValue(intervention)) {
        labTestValueApi.listForIntervention(userCredentials, intervention.value, params, onSuccess, onError)
        return
      }

      const patient = pathEntries['patients']
      if (valueHelper.isValue(patient)) {
        labTestValueApi.listForPatient(userCredentials, patient.value, params, onSuccess, onError)
        return
      }

      throw new Error('A patient or an intervention is required to retrieve lab test values')
    }
  }

  title() {
    return "Lab Test Values"
  }
}

export { LabTestValuesPageViewModel }
