import { AbstractPageViewModel } from "../../"
import { billingContractPharmacyChainApi } from "../../../../../api/billing"
import { userCredentialsHelper } from "../../../../../helpers"

class BillingContractPharmacyChainProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const billing_contract_pharmacy_id = pathEntries['billing-contract-pharmacies'].value
    billingContractPharmacyChainApi.profile(
      userCredentials,
      billing_contract_pharmacy_id,
      (billingContractPharmacy) => {
        this.addField('billingContractPharmacy', billingContractPharmacy, this.redrawView)
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyChainProfilePageViewModel }
