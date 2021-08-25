import { AbstractModalViewModel } from "../../"
import { pharmacyStoreApi } from "../../../../../api"
import { billingContractPharmacyStoreApi } from "../../../../../api/billing"
import { userCredentialsHelper, jsEventHelper, valueHelper } from "../../../../../helpers"
import { billingContractPharmacyStoreHelper } from "../../../../../helpers/billing"

const billingContractPharmacyStoreRequiredFields = {
  contract_id: { label: "Contract", testMethod: valueHelper.isNumberValue },
  pharmacy_store_id: { label: "Pharmacy Store", testMethod: valueHelper.isNumberValue }
}

class BillingContractPharmacyStoreModalViewModel extends AbstractModalViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.fetchPharmacyStore = this.fetchPharmacyStore.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.model = this.model.bind(this)
    this.modelName = this.modelName.bind(this)
    this.requiredFields = this.requiredFields.bind(this)
    this.selectPharmacyStore = this.selectPharmacyStore.bind(this)
  }

  api() {
    return billingContractPharmacyStoreApi
  }

  dateAndTimeFields(billingContractPharmacyStore) {
    return {}
  }

  fetchPharmacyStore(pharmacy_store_id, nextOperation) {
    pharmacyStoreApi.show(
      userCredentialsHelper.get(),
      pharmacy_store_id,
      nextOperation,
      this.onError
    )
  }

  helper() {
    return billingContractPharmacyStoreHelper
  }

  loadData() {
    const { operation, billingContractPharmacyStore } = this.props
    this.addData(
      {
        operation,
        billingContractPharmacyStore: this.initializeDateAndTimeValidities(billingContractPharmacyStore)
      },
      this.redrawView
    )
  }

  model() {
    const { billingContractPharmacyStore, changedBillingContractPharmacyStore } = this.data

    return {
      changedModel: changedBillingContractPharmacyStore,
      model: billingContractPharmacyStore,
      modelName: this.modelName()
    }
  }

  modelName() {
    return "billingContractPharmacyStore"
  }

  requiredFields() {
    return billingContractPharmacyStoreRequiredFields
  }

  selectPharmacyStore(event) {
    const { value } = jsEventHelper.fromInputEvent(event)
    const addPharmacyStoreToAppointmentAndRedraw = (pharmacyStore) => {
      const { billingContractPharmacyStore, changedBillingContractPharmacyStore } = this.data
      const updated = billingContractPharmacyStoreHelper.changePharmacyStore(
        billingContractPharmacyStore,
        changedBillingContractPharmacyStore,
        pharmacyStore
      )
      this.addData(updated, this.redrawView)
    }

    this.fetchPharmacyStore(value, addPharmacyStoreToAppointmentAndRedraw)
  }
}

export { BillingContractPharmacyStoreModalViewModel }
