import React, { Component } from "react"
import { BillingContractTermsPageViewModel } from "../../../view_models/pages/billing/terms"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { billingContractTermHelper } from "../../../../helpers/billing"
import { listHelper } from "../../../../helpers/list.helper"

const headings = [
  {
    name: "Type",
    field: "type",
    method: "type"
  },
  {
    name: "Health Plan",
    field: "contract.health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Diagnosis",
    field: "diagnosis",
    method: "diagnosis"
  },
  {
    name: "Pulls Enabled",
    field: "pulls_enabled",
    method: "displayPullsEnabled"
  },
  {
    name: "Pushes Enabled",
    field: "pushes_enabled",
    method: "displayPushesEnabled"
  }
]

class BillingContractTermsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractTermsPageViewModel(
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
        listName: "billing-contract-terms",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(billingContractTerm) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoBillingContractTermProfile,
        headings,
        helper: billingContractTermHelper,
        launchModal: this.props.launchModal,
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editProfileModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: billingContractTerm
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
        list={this.state.billingContractTerms}
        listLabel="Billing Contract Term"
        listPluralLabel="Billing Contract Terms"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Billing Contract Terms"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingContractTermsPage }

