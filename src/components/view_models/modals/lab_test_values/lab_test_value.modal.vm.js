import { AbstractModalViewModel } from ".."
import { labTestValueApi, pharmacyStoreApi, userApi } from "../../../../api"
import {
  labTestValueHelper,
  jsEventHelper,
  pathHelper,
  userCredentialsHelper,
  valueHelper
} from "../../../../helpers"

const labTestValueDateAndTimeFields = {
  value_taken_at: { label: "Value Taken At", required: false, type: "date/time" }
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
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
  }

  api() {
    return labTestValueApi
  }

  dateAndTimeFields(_labTestValue) {
    return labTestValueDateAndTimeFields
  }

  determineIds() {
    const pathEntries = this.pathEntries()
    let userId

    if (pathHelper.isSingular(pathEntries, "users")) {
      userId = pathHelper.id(pathEntries, "users")
    } else {
      userId = this.props.currentUser.id
    }

    const pharmacyStoreId = pathHelper.id(pathEntries, "pharmacy-stores")
    return { pharmacyStoreId, userId }
  }

  fetchPharmacyStore(pharmacyStoreId, nextOperation) {
    pharmacyStoreApi.show(
      userCredentialsHelper.get(),
      pharmacyStoreId,
      nextOperation,
      this.onError
    )
  }

  fetchUser(userId, nextOperation) {
    userApi.show(
      userCredentialsHelper.get(),
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

    const { pharmacyStoreId, userId } = this.determineIds()
    const addPharmacyStoreToData = (pharmacyStore) => {
      this.addField("pharmacyStore", pharmacyStore, this.redrawView)
    }
    const loadPharmacyStoreOrRedraw = () => {
      if (valueHelper.isNumberValue(pharmacyStoreId)) {
        this.fetchPharmacyStore(pharmacyStoreId, addPharmacyStoreToData)
        return
      }

      this.redrawView()
    }
    const addUserToData = (user) => {
      this.addField("user", user, loadPharmacyStoreOrRedraw)
    }

    this.fetchUser(userId, addUserToData)
  }

  model() {
    const { labTestValue, changedLabTestValue } = this.data

    return { changedModel: changedLabTestValue, model: labTestValue, modelName: this.modelName() }
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
