import { AbstractSelectAutocompleteViewModel } from "."
import { patientSupplementApi } from "../../../api"
import { jsEventHelper, patientSupplementHelper, userCredentialsHelper } from "../../../helpers"

class SelectPatientSupplementViewModel extends AbstractSelectAutocompleteViewModel {
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
    return patientSupplementApi
  }

  displayModel(model) {
    return this.helper().label(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_supplement: searchText
    }

    this.api().searchForPatient(userCredentialsHelper.get(), this.props.patient_id, { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    this.api().show(userCredentialsHelper.get(), id, onSuccess, onFailure)
  }

  helper() {
    return patientSupplementHelper
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

export { SelectPatientSupplementViewModel }
