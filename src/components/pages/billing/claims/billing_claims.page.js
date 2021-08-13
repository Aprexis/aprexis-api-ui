import React, { Component } from "react"
import { BillingClaimsPageViewModel } from "../../../view_models/pages/billing/claims"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { billingClaimHelper } from "../../../../helpers/billing"
import { listHelper } from "../../../../helpers/list.helper"

const headings = [
  {
    name: "Submmitted At",
    field: "submitted_at",
    method: "displaySubmittedAt"
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Patient",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Intervention",
    field: "intervention.program.name,intervention.date_of_service",
    method: "interventionIdentification",
    unless: "interventions"
  },
  {
    name: "Pharmacy Store",
    field: "pharmacy_store.name,pharmacy_store.store_number",
    method: "pharmacyStoreIdentification",
    unless: "pharmacy-stores"
  },
  {
    name: "Charged",
    field: "total_charge",
    method: "totalCharge"
  },
  {
    name: "Paid",
    field: "amount_paid",
    method: "amountPaid"
  }
]

class BillingClaimsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingClaimsPageViewModel(
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
        listName: "billing-claims",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(billingClaim) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoBillingClaimProfile,
        headings,
        helper: billingClaimHelper,
        launchModal: this.props.launchModal,
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: billingClaim
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
        list={this.state.billingClaims}
        listLabel="Billing Claim"
        listPluralLabel="Billing Claims"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Billing Claims"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingClaimsPage }
