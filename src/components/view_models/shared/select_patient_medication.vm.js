import { AbstractSelectAutocompleteViewModel } from "./"
import { patientMedicationApi } from "../../../api"
import { jsEventHelper, patientMedicationHelper, userCredentialsHelper } from "../../../helpers"

class SelectPatientMedicationViewModel extends AbstractSelectAutocompleteViewModel {
  constructor(props) {
    super(props)

    this.displayModel = this.displayModel.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.fetchModel = this.fetchModel.bind(this)
    this.select = this.select.bind(this)
    this.selectEvent = this.selectEvent.bind(this)
  }

  displayModel(model) {
    return patientMedicationHelper.medicationLabel(model)
  }

  doSearch(searchText, baseFilters, sorting, onSuccess, onFailure) {
    const filters = {
      ...baseFilters,
      for_medication: searchText
    }

    patientMedicationApi.searchForPatient(userCredentialsHelper.get(), this.props.patient_id, { ...filters, ...sorting }, onSuccess, onFailure)
  }

  fetchModel(id, onSuccess, onFailure) {
    patientMedicationApi.show(userCredentialsHelper.get(), id, onSuccess, onFailure)
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
