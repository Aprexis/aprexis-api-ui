import { AbstractListPageViewModel } from "../"
import { labTestValueApi } from "../../../../api"
import { alertHelper, filtersHelper, labTestValueHelper, pageHelper, pathHelper, userCredentialsHelper, valueHelper } from "../../../../helpers"

class LabTestValuesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.createModal = this.createModal.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoLabTestProfile = this.gotoLabTestProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return labTestValueApi
  }

  canCreate() {
    const { currentUser } = this.props
    const pathEntries = this.pathEntries()

    return this.helper().canBeCreated(currentUser, pathEntries)
  }

  createModal() {
    const pathEntries = this.pathEntries()
    const patientId = pathHelper.id(pathEntries, "patients")
    const interventionId = pathHelper.id(pathEntries, "interventions")
    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy_store_id")

    if (valueHelper.isNumberValue(interventionId)) {
      alertHelper.warn("Creation of intervention lab test values is not yet supported")
      return
    }

    if (!valueHelper.isNumberValue(patientId)) {
      alertHelper.warn("Need a patient to create a lab test value")
      return
    }

    this.api().buildNewForPatient(
      userCredentialsHelper.get(),
      patientId,
      pharmacyStoreId,
      (labTestValue) => {
        this.props.launchModal(
          "lab-test-value",
          { operation: "create", onUpdateView: this.refreshData, labTestValue }
        )
      },
      this.onError
    )
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

  filterDescriptions(_filters, _filtersOptions) {
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

  helper() {
    return labTestValueHelper
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
      this.api(),
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

    function list(api, pathEntries, userCredentials, params, onSuccess, onError) {
      const intervention = pathEntries['interventions']
      if (valueHelper.isValue(intervention)) {
        api.listForIntervention(userCredentials, intervention.value, params, onSuccess, onError)
        return
      }

      const patient = pathEntries['patients']
      if (valueHelper.isValue(patient)) {
        api.listForPatient(userCredentials, patient.value, params, onSuccess, onError)
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
