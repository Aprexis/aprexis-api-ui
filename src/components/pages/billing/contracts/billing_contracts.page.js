import React, { Component } from "react"
import { BillingContractsPageViewModel } from "../../../view_models/pages/billing/contracts"
import { ListView } from "../../../../containers"
import { valueHelper, billingContractHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Active",
    field: "active",
    method: "active"
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Start Date",
    field: "start_date",
    method: "displayStartDate"
  },
  {
    name: "Stop Date",
    field: "stop_date",
    method: "displayStopDate"
  }
]

class BillingContractsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractsPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
    this.nav = this.nav.bind(this)
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
        listName: "billing-contracts",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(billingContract) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoBillingContractProfile,
        headings,
        helper: billingContractHelper,
        launchModal: this.props.launchModal,
        modelName: 'billingContract',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: billingContract
      }
    )
  }

  nav(list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createModal}>
          <strong>+</strong> Add Contract
        </button>
      </nav>
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
        list={this.state.billingContracts}
        listLabel="Billing Contract"
        listPluralLabel="Billing Contracts"
        modal={this.state.modal}
        nav={this.nav}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Billing Contracts"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingContractsPage }
