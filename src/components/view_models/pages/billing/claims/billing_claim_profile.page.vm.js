import { AbstractPageViewModel } from "../.."
import { billingClaimApi, billingClaimHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class BillingClaimProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingClaimToEdit) {
    billingClaimApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      billingClaimHelper.id(billingClaimToEdit),
      (billingClaim) => {
        this.props.launchModal(
          "billing-Claim",
          { operation: "update", onUpdateView: this.refreshData, billingClaim })
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
    const billing_Claim_id = pathEntries['billing-claims'].value
    billingClaimApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      billing_Claim_id,
      (billingClaim) => { this.addField('billingClaim', billingClaim, this.redrawView) },
      this.onError
    )
  }
}

export { BillingClaimProfilePageViewModel }
