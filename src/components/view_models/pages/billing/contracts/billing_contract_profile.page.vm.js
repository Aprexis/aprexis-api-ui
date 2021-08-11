import { AbstractPageViewModel } from "../../"
import { billingContractApi } from "../../../../../api/billing"
import { userCredentialsHelper } from "../../../../../helpers"

class BillingContractProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.loadData = this.loadData.bind(this)
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const billing_contract_id = pathEntries['billing-contracts'].value
    billingContractApi.profile(
      userCredentials,
      billing_contract_id,
      (billingContract) => { this.addField('billingContract', billingContract, this.redrawView) },
      this.onError
    )
  }
}

export { BillingContractProfilePageViewModel }
