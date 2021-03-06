import { AbstractPageViewModel } from "../../"
import { billingContractApi } from "../../../../../api/billing"
import { userCredentialsHelper } from "../../../../../helpers"
import { billingContractHelper } from "../../../../../helpers/billing"

class BillingContractProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingContractToEdit) {
    billingContractApi.edit(
      userCredentialsHelper.get(),
      billingContractHelper.id(billingContractToEdit),
      (billingContract) => {
        this.props.launchModal(
          "billing-contract",
          { operation: "update", onUpdateView: this.refreshData, billingContract })
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
