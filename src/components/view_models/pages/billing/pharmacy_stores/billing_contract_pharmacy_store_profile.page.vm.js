import { AbstractPageViewModel } from "../../abstract.page.vm.js"
import { billingContractPharmacyStoreApi } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, pathHelper, userCredentialsHelper } from "../../../../../helpers/index.js"

class BillingContractPharmacyStoreProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingContractPharmacyStoreToEdit) {
    billingContractPharmacyStoreApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
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
    const billing_contract_pharmacy_store_id = pathHelper.pathEntryValue(pathEntries, 'billing-contract-pharmacy-stores')
    billingContractPharmacyStoreApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      billing_contract_pharmacy_store_id,
      (billingContractPharmacyStore) => {
        this.addField('billingContractPharmacyStore', billingContractPharmacyStore, this.redrawView)
      },
      this.onError
    )
  }
}

export { BillingContractPharmacyStoreProfilePageViewModel }
