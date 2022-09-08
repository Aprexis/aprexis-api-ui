import { AbstractSelectAutocompleteViewModel } from "./"
import { caregiverApi, valueHelper, caregiverHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper, userCredentialsHelper } from "../../../helpers"

class SelectCaregiverViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadCaregivers = this.loadCaregivers.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
    this.selection = this.selection.bind(this)
  }

  api() {
    return caregiverApi
  }

  determineSelectStyle(caregivers, caregiverHeaders) {
    if (caregiverHeaders.lastPage.total > caregiverHeaders.lastPage.size) {
      this.startSearch()
      return
    }

    this.addData({ models: caregivers, useSearch: false })

    const { id } = this.props
    if (!valueHelper.isValue(id)) {
      this.redrawView()
      return
    }

    this.fetchModel(
      id,
      (item) => { this.addData({ item }, this.redrawView) },
      this.onError
    )
  }

  displayModel(model) {
    return `${this.helper().name(model)} (${this.helper().relationship(model)})`
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_caregiver: searchText,
      for_current: true
    }
    const { patientId } = this.props

    this.api().searchForPatient(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), patientId, { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()), id, onSuccess, onFailure)
  }

  helper() {
    return caregiverHelper
  }

  loadData() {
    this.clearData()
    this.loadCaregivers(this.determineSelectStyle)
  }

  loadCaregivers(nextOperation) {
    const params = { page: { number: 1, size: 25 }, sort: 'relationship,first_name,last_name' }
    const { patientId } = this.props
    caregiverApi.listForPatient(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      patientId,
      params,
      nextOperation,
      this.onError
    )
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }

  selection(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const { models } = this.data
    const item = models.find((caregiver) => this.helper().id(caregiver) == value)

    this.select(item)
  }
}

export { SelectCaregiverViewModel }
