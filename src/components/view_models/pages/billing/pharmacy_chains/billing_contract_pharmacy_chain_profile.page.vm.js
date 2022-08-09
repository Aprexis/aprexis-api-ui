import { AbstractPageViewModel } from "../../"
import { billingContractPharmacyChainApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class BillingContractPharmacyChainProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingContractPharmacyChainToEdit) {
    billingContractPharmacyChainApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get()),
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
    const billing_contract_pharmacy_id = pathEntries['billing-contract-pharmacies'].value
    billingContractPharmacyChainApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials),
      billing_contract_pharmacy_id,
      (billingContractPharmacy) => {
        this.addField('billingContractPharmacy', billingContractPharmacy, this.redrawView)
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyChainProfilePageViewModel }
