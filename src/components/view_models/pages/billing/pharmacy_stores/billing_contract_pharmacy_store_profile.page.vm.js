import { AbstractPageViewModel } from "../../"
import { billingContractPharmacyStoreApi } from "../../../../../api/billing"
import { userCredentialsHelper } from "../../../../../helpers"

class BillingContractPharmacyStoreProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingContractPharmacyStoreToEdit) {
    billingContractPharmacyStoreApi.edit(
      userCredentialsHelper.get(),
      billingContractPharmacyStoreToEdit.id,
      (billingContractPharmacyStore) => {
        this.props.launchModal(
          "billing-contract-pharmacy-store",
          { operation: "update", onUpdateView: this.refreshData, billingContractPharmacyStore })
      },
      this.onError
    )
  }

  loadData() {
    this.clearData(false)
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const billing_contract_pharmacy_store_id = pathEntries['billing-contract-pharmacy-stores'].value
    billingContractPharmacyStoreApi.profile(
      userCredentials,
      billing_contract_pharmacy_store_id,
      (billingContractPharmacyStore) => {
        this.addField('billingContractPharmacyStore', billingContractPharmacyStore, this.redrawView)
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyStoreProfilePageViewModel }
