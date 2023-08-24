import { AbstractPageViewModel } from "../.."
import { billingInvoiceApi, billingInvoiceHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../../helpers"

class BillingInvoiceProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.editModal = this.editModal.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  editModal(billingInvoiceToEdit) {
    billingInvoiceApi.edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      this.helper().id(billingInvoiceToEdit),
      (billingInvoice) => {
        this.props.launchModal(
          "billing-Invoice",
          { operation: "update", onUpdateView: this.refreshData, billingInvoice })
      },
      this.onError
    )
  }

  helper() {
    return billingInvoiceHelper
  }

  loadData() {
    this.clearData(false)
    this.refreshData()
  }

  refreshData() {
    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const billing_Invoice_id = pathEntries['billing-invoices'].value
    billingInvoiceApi.profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      billing_Invoice_id,
      (billingInvoice) => { this.addField('billingInvoice', billingInvoice, this.redrawView) },
      this.onError
    )
  }
}

export { BillingInvoiceProfilePageViewModel }
