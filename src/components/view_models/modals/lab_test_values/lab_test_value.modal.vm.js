import { AbstractModalViewModel } from "../abstract.modal.vm.js"
import { interventionApi, labTestValueApi, patientApi, pharmacyStoreApi, userApi, labTestApi, labTestValueHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, jsEventHelper, pathHelper, userCredentialsHelper } from "../../../../helpers/index.js"

const labTestValueDateAndTimeFields = {
  value_taken_at: { label: "Value Taken At", required: false, type: "date/time" }
}

const labTestValueIdFields = {
  interventionId: { dataName: "intervention", fetch: "fetchIntervention", pathEntryName: "interventions" },
  labTestId: { dataName: "labTest", fetch: "fetchLabTest", pathEntryName: "lab-tests" },
  patientId: { dataName: "patient", fetch: "fetchPatient", pathEntryName: "patients" },
  pharmacyStoreId: { dataName: "pharmacyStore", fetch: "fetchPharmacyStore", pathEntryName: "pharmacy-stores" },
  userId: { dataName: "user", fetch: "fetchUser", pathEntryName: "users" }
}

const labTestValueRequiredFields = {
  lab_test_id: { label: "Lab Test", testMethod: valueHelper.isNumberValue },
  pharmacy_store_id: { label: "Pharmacy Store", testMethod: valueHelper.isNumberValue },
  user_id: { label: "User", testMethod: valueHelper.isNumberValue },
  value: { label: "Value", testMethod: valueHelper.isValue }
}

class LabTestValueModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.determineIds = this.determineIds.bind(this)
    this.fetchIntervention = this.fetchIntervention.bind(this)
    this.fetchLabTest = this.fetchLabTest.bind(this)
    this.fetchPatient = this.fetchPatient.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
  }

  api() {
    return labTestValueApi
  }

  dateAndTimeFields(_labTestValue) {
    return labTestValueDateAndTimeFields
  }

  determineIds(labTestValue) {
    const pathEntries = this.pathEntries()
    const ids = {}
    Object.keys(labTestValueIdFields).forEach(
      (idFieldKey) => {
        const idField = labTestValueIdFields[idFieldKey]
        const { pathEntryName } = idField
        const id = pickId(labTestValue, pathEntries, this.props, pathEntryName)
        ids[idFieldKey] = id
      }
    )
    return ids

    function pickId(labTestValue, pathEntries, props, pathEntryName) {
      const idField = pathHelper.convertNameToFieldId(pathEntryName)
      if (valueHelper.isNumberValue(labTestValue[idField])) {
        return labTestValue[idField]
      }

      if (pathHelper.isSingular(pathEntries, pathEntryName)) {
        return pathHelper.id(pathEntries, pathEntryName)
      }

      const currentName = `current${valueHelper.capitalizeWords(pathEntryName.substring(0, pathEntryName.length - 1))}`
      if (valueHelper.isValue(props[currentName])) {
        return props[currentName].id
      }

      return
    }
  }

  fetchIntervention(interventionId, nextOperation) {
    interventionApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      interventionId,
      nextOperation,
      this.onError
    )
  }

  fetchLabTest(labTestId, nextOperation) {
    labTestApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      labTestId,
      nextOperation,
      this.onError
    )
  }

  fetchPatient(patientId, nextOperation) {
    patientApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      patientId,
      nextOperation,
      this.onError
    )
  }

  fetchPharmacyStore(pharmacyStoreId, nextOperation) {
    pharmacyStoreApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      pharmacyStoreId,
      nextOperation,
      this.onError
    )
  }

  fetchUser(userId, nextOperation) {
    userApi.show(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      userId,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return labTestValueHelper
  }

  loadData() {
    const { operation, labTestValue } = this.props
    this.addData({ operation, labTestValue: this.initializeDateAndTimeValidities(labTestValue) })

    loadStoreDataAndRefresh(this, 0, this.determineIds(labTestValue))

    function loadStoreDataAndRefresh(vm, idx, idFields) {
      if (idx >= Object.keys(idFields).length) {
        vm.redrawView()
        return
      }

      const idFieldKey = Object.keys(idFields)[idx]
      const idFieldId = idFields[idFieldKey]
      const idField = labTestValueIdFields[idFieldKey]
      if (!valueHelper.isNumberValue(idFieldId)) {
        delete vm[idField.dataName]
        loadStoreDataAndRefresh(vm, idx + 1, idFields)
        return
      }

      vm[idField.fetch](
        idFieldId,
        (model) => {
          vm.addField(
            idField.dataName,
            model,
            () => {
              loadStoreDataAndRefresh(vm, idx + 1, idFields)
            }
          )
        }
      )
    }
  }

  model() {
    const { labTestValue, changedLabTestValue } = this.data

    return { changedModel: changedLabTestValue, model: labTestValue, modelName: this.modelName() }
  }

  modelName() {
    return 'labTestValue'
  }

  requiredFields() {
    return labTestValueRequiredFields
  }

  selectPharmacyStore(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPharmacyStoreToLabTestValueAndRedraw = (pharmacyStore) => {
      const { labTestValue, changedLabTestValue } = this.data
      const updated = labTestValueHelper.changePharmacyStore(labTestValue, changedLabTestValue, pharmacyStore)

      this.addData(updated, this.redrawView)
    }

    this.fetchPharmacyStore(value, addPharmacyStoreToLabTestValueAndRedraw)
  }
}

export { LabTestValueModalViewModel }
