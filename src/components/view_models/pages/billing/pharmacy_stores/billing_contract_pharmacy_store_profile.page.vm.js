import { AbstractPageViewModel } from "../../"
import { billingContractPharmacyStoreApi } from "../../../../../api/billing"
import { userCredentialsHelper } from "../../../../../helpers"

class BillingContractPharmacyStoreProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const billing_contract_pharmacy_store_id = pathEntries['billing-contract-pharmacy-stores'].value
    billingContractPharmacyStoreApi.profile(
      userCredentials,
      billing_contract_pharmacy_store_id,
      (billingContractPharmacyStore) => {
        this.addField('billingContractPharmacyStore', billingContractPharmacyStore, this.redraw)
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyStoreProfilePageViewModel }
