import React, { Component } from "react"
import { BillingInvoicesPageViewModel } from "../../../view_models/pages/billing/invoices"
import { ListView } from "../../../../containers"
import { dateHelper, valueHelper, billingInvoiceHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers"

const headings = [
  {
    name: "name",
    field: "name",
    method: "name"
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Due",
    field: "due_at",
    method: (billingInvoice) => { return dateHelper.displayDateTime(billingInvoiceHelper.dueAt(billingInvoice)) }
  },
  {
    name: "Amount",
    field: "amount",
    method: "amount"
  }
]

class BillingInvoicesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingInvoicesPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
  }

  componentDidMount() {
    this.vm.loadData()
  }

  generateTableHeadings() {
    const { filters, sorting } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listHeader(
      {
        filters,
        headings,
        listName: "billing-invoices",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(billingInvoice) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoBillingInvoiceProfile,
        headings,
        helper: billingInvoiceHelper,
        launchModal: this.props.launchModal,
        modelName: 'billingInvoice',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: billingInvoice
      }
    )
  }

  render() {
    const { filters } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)

    return (
      <ListView
        {...valueHelper.importantProps(this.props)}
        context={this.props.context}
        currentAdminUser={this.props.currentAdminUser}
        currentUser={this.props.currentUser}
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.billingInvoices}
        listLabel="Invoice"
        listPluralLabel="Invoices"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Invoices"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingInvoicesPage }
