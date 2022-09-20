import { AbstractSelectAutocompleteViewModel } from "./"
import { patientMedicationApi, patientMedicationHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper } from "../../../helpers"

class SelectPatientMedicationViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.helper = this.helper.bind(this)
    this.modelSearchText = this.modelSearchText.bind(this)
    this.select = this.select.bind(this)
    this.selectEvent = this.selectEvent.bind(this)
  }

  api() {
    return patientMedicationApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_medication: searchText
    }

    this.api().searchForPatient(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials()), this.props.patient_id, { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(apiEnvironmentHelper.apiEnvironment(this.getUserCredentials()), id, onSuccess, onFailure)
  }

  helper() {
    return patientMedicationHelper
  }

  modelSearchText(model) {
    return this.displayModel(model)
  }

  select(item) {
    const { targetName } = this.props
    this.addData({ enableSearch: false, item })
    this.props.onChange(targetName, item)
  }

  selectEvent(event) {
    const { targetName } = this.props
    const { value } = jsEventHelper.fromInputEvent(event)
    const { models } = this.data
    const item = models.find((model) => model.id == value)

    this.addData({ enableSearch: false, item })
    this.props.onChange(targetName, item)
  }
}

export { SelectPatientMedicationViewModel }
