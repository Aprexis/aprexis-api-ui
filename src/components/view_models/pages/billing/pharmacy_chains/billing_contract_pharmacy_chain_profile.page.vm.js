import { AbstractPageViewModel } from "../../"
import { billingContractPharmacyChainApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers"

class BillingContractPharmacyChainProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingContractPharmacyChainToEdit) {
    billingContractPharmacyChainApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingContractPharmacyChainToEdit.id,
      (billingContractPharmacyChain) => {
        this.props.launchModal(
          "billing-contract-pharmacy-chain",
          { operation: "update", onUpdateView: this.refreshData, billingContractPharmacyChain })
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
    const billing_contract_pharmacy_id = pathHelper.pathEntryValue(pathEntries, 'billing-contract-pharmacies')
    billingContractPharmacyChainApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      billing_contract_pharmacy_id,
      (billingContractPharmacy) => {
        this.addField('billingContractPharmacy', billingContractPharmacy, this.redrawView)
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyChainProfilePageViewModel }
