import { AbstractListPageViewModel } from "../../"
import { billingInvoiceApi, billingInvoiceHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { filtersHelper, pathHelper } from "../../../../../helpers"

const billingInvoiceListMethods = [
  { method: billingInvoiceApi.list },
  { pathKey: "health-plans", method: billingInvoiceApi.listForHealthPlan }
]

class BillingInvoicesPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoBillingInvoiceProfile = this.gotoBillingInvoiceProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "submitted_at-" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return [
      filtersHelper.stringFilter("Patient Name", "for_patient_name")
    ]
  }

  filtersOptions() {
    return {}
  }

  gotoBillingInvoiceProfile(billingInvoice) {
    const pathArray = pathHelper.buildPathArray(window.location, billingInvoice, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return billingInvoiceHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("billingInvoiceHeaders")
    this.fetchList(
      billingInvoiceListMethods,
      (billingInvoices, billingInvoiceHeaders) => {
        this.addData(
          { billingInvoices, page: pageHelper.updatePageFromLastPage(billingInvoiceHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Billing Invoices"
  }
}

export { BillingInvoicesPageViewModel }
