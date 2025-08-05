import { AbstractPageViewModel } from "../../abstract.page.vm.js"
import { billingContractApi, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

class BillingContractProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingContractToEdit) {
    billingContractApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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
    const billing_contract_id = pathHelper.pathEntryValue(pathEntries, 'billing-contracts')
    billingContractApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      billing_contract_id,
      (billingContract) => { this.addField('billingContract', billingContract, this.redrawView) },
      this.onError
    )
  }
}

export { BillingContractProfilePageViewModel }
