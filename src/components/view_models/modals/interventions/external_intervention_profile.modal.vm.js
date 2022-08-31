import { AbstractModalViewModel } from "../"
import { diagnosisCodeApi, interventionApi, userApi, dateHelper, fieldHelper, interventionHelper, placeOfServiceApi, placeOfServiceHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, displayHelper, jsEventHelper, userCredentialsHelper } from "../../../../helpers"

const interventionDateAndTimeFields = {
  date_of_service: { label: "Date of Service", required: true, type: "date" }
}

const interventionRequiredFields = {
  consult_session_duration: { label: 'Consult Session Duration', testMethod: valueHelper.isNumberValue },
  date_of_service: { label: "Date of Service", testMethod: dateHelper.isValidDate }
}

class ExternalInterventionProfileModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.changeServiceLocation = this.changeServiceLocation.bind(this)
    this.clearConsentObtainedFrom = this.clearConsentObtainedFrom.bind(this)
    this.consentObtainedFrom = this.consentObtainedFrom.bind(this)
    this.create = this.create.bind(this)
    this.dateAndTimeFields = this.dateAndTimeFields.bind(this)
    this.fetchDiagnosisCode = this.fetchDiagnosisCode.bind(this)
    this.fetchPharmacist = this.fetchPharmacist.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.loadPlacesOfService = this.loadPlacesOfService.bind(this)
    this.minSearchLength = this.minSearchLength.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.placeOfServiceOptions = this.placeOfServiceOptions.bind(this)
    this.selectConsentObtainedFromType = this.selectConsentObtainedFromType.bind(this)
    this.selectDiagnosisCode = this.selectDiagnosisCode.bind(this)
    this.selectPharmacist = this.selectPharmacist.bind(this)
    this.setConsentObtainedFromPatient = this.setConsentObtainedFromPatient.bind(this)
  }

  api() {
    return interventionApi
  }

  changeServiceLocation(event) {
    const { placesOfService } = this.data
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    let updated = displayHelper.changeField(modelName, model, changedModel, event)
    const serviceLocation = determineServiceLocation(modelName, updated, placesOfService)
    updated = fieldHelper.changeValue(modelName, updated[modelName], updated[valueHelper.changedModelName(modelName)], 'service_location', serviceLocation)

    this.addData(updated, this.redrawView)
    return

    function determineServiceLocation(modelName, models, placesOfService) {
      const model = models[modelName]
      const { place_of_service } = model

      return placesOfService.find((placeOfService) => placeOfServiceHelper.id(placeOfService) == place_of_service)
    }
  }

  clearConsentObtainedFrom(onSuccess) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = fieldHelper.changeValue(modelName, model, changedModel, 'consent_obtained_from')

    this.addData(updated, onSuccess)
  }

  consentObtainedFrom(intervention) {
    const consentObtainedFrom = interventionHelper.consentObtainedFrom(intervention)
    if (!valueHelper.isValue(consentObtainedFrom)) {
      return
    }

    return consentObtainedFrom.type
  }

  create(changedModel) {
    this.api().createExternal(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.getAdmin()),
      changedModel,
      () => { this.toggleModal(this.props.onUpdateView) },
      this.onError
    )
  }

  dateAndTimeFields() {
    return interventionDateAndTimeFields
  }

  fetchDiagnosisCode(diagnosisCodeId, nextOperation) {
    diagnosisCodeApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      diagnosisCodeId,
      nextOperation,
      this.onError
    )
  }

  fetchPharmacist(pharmacistId, nextOperation) {
    userApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
      pharmacistId,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return interventionHelper
  }

  loadData() {
    const { operation, intervention } = this.props
    this.addData(
      { operation, consentObtainedFromType: this.consentObtainedFrom(intervention), intervention: this.initializeDateAndTimeValidities(intervention) },
      () => {
        this.loadPlacesOfService(this.redrawView)
      }
    )
  }

  loadPlacesOfService(onSuccess) {
    placeOfServiceApi.index(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.getAdmin()),
      { sort: 'name' },
      (placesOfService) => { this.addData({ placesOfService }, onSuccess) },
      this.onError
    )
  }

  minSearchLength() {
    return 3
  }

  model() {
    const { changedIntervention, intervention } = this.data

    return { changedModel: changedIntervention, model: intervention, modelName: this.modelName() }
  }

  modelName() {
    return 'intervention'
  }

  placeOfServiceOptions(placesOfService) {
    if (!valueHelper.isValue(placesOfService)) {
      return []
    }

    const options = placesOfService.map(
      (placeOfService) => {
        return { label: placeOfServiceHelper.name(placeOfService), value: placeOfServiceHelper.id(placeOfService) }
      }
    )

    return [{ label: '', value: undefined }, ...options]
  }

  requiredFields() {
    return interventionRequiredFields
  }

  selectConsentObtainedFromType(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    this.addField('consentObtainedFromType', value)
    console.log(`Consent obtained from ${value}`)
    if (value == 'Patient') {
      this.setConsentObtainedFromPatient(this.redrawView)
      return
    }

    this.clearConsentObtainedFrom(this.redrawView)
  }

  selectDiagnosisCode(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addDiagnosisCodeAndRedraw = (diagnosisCode) => {
      const modelData = this.model()
      const { model, modelName } = modelData
      const changedModel = this.helper().buildChanged(model, modelData.changedModel)
      const updated = interventionHelper.changeDiagnosisCode(
        modelName,
        model,
        changedModel,
        diagnosisCode
      )
      this.addData(updated, this.redrawView)
    }

    this.fetchDiagnosisCode(value, addDiagnosisCodeAndRedraw)
  }

  selectPharmacist(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPharmacistAndRedraw = (pharmacist) => {
      const modelData = this.model()
      const { model, modelName } = modelData
      const changedModel = this.helper().buildChanged(model, modelData.changedModel)
      const updated = interventionHelper.changePharmacist(
        modelName,
        model,
        changedModel,
        pharmacist
      )
      this.addData(updated, this.redrawView)
    }

    this.fetchPharmacist(value, addPharmacistAndRedraw)
  }

  setConsentObtainedFromPatient(onSuccess) {
    const modelData = this.model()
    const { model, modelName } = modelData
    const changedModel = this.helper().buildChanged(model, modelData.changedModel)
    const updated = interventionHelper.changeConsentObtainedFrom(modelName, model, changedModel, 'Patient', interventionHelper.patient(model))

    this.addData(updated, onSuccess)
  }
}

export { ExternalInterventionProfileModalViewModel }
