import { AbstractSelectAutocompleteViewModel } from "./"
import { diagnosisCodeApi, valueHelper, diagnosisCodeHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper } from "../../../helpers"

class SelectDiagnosisCodeViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.determineSelectStyle = this.determineSelectStyle.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadDiagnosisCodes = this.loadDiagnosisCodes.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
  }

  api() {
    return diagnosisCodeApi
  }

  determineSelectStyle(diagnosisCodes, diagnosisCodeHeaders) {
    if (diagnosisCodeHeaders.lastPage.total > diagnosisCodeHeaders.lastPage.size) {
      this.startSearch()
      return
    }

    this.addData({ models: diagnosisCodes, useSearch: false })

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
    return `${this.helper().shortDescription(model)} ${this.helper().code(model)}`
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_diagnosis_code: searchText
    }

    this.api().search(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry), id, onSuccess, onFailure)
  }

  helper() {
    return diagnosisCodeHelper
  }

  loadData() {
    this.clearData()
    this.loadDiagnosisCodes(this.determineSelectStyle)
  }

  loadDiagnosisCodes(nextOperation) {
    const params = { page: { number: 1, size: 25 }, sort: 'short_description' }
    diagnosisCodeApi.list(
      apiEnvironmentHelper.apiEnvironment(this.getUserCredentials(), this.props.reconnectAndRetry),
      params,
      nextOperation,
      this.onError
    )
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }
}

export { SelectDiagnosisCodeViewModel }
