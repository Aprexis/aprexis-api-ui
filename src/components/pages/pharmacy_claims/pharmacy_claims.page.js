import React, { Component } from "react"
import { PharmacyClaimsPageViewModel } from "../../view_models/pages/pharmacy_claims"
import { ListView } from "../../../containers"
import { pharmacyClaimHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list_helper"

const headings = [
  {
    name: "Claim Number",
    field: "claim_number",
    method: "claimNumber"
  },
  {
    name: "NDC",
    field: "ndc",
    method: "ndc"
  },
  {
    name: "Medication",
    field: "medication.label",
    method: "medicationLabel"
  },
  {
    name: "Member Number",
    field: "member_number",
    method: "memberNumber",
    unless: "patients"
  },
  {
    name: "Person Number",
    field: "person_number",
    method: "personNumber",
    unless: "patients"
  },
  {
    name: "Patient",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Store",
    field: "pharmacy_store.name, pharmacy_store.store_number",
    method: "pharmacyStoreIdentification",
    unless: "pharmacy-stores"
  },
  {
    name: "Physician",
    field: "physician.name",
    method: "physicianName"
  },
  {
    name: "Fill Date",
    field: "fill_date",
    method: "fillDate"
  },
  {
    name: "Days Supply",
    field: "days_supply",
    method: "daysSupply"
  }
]

class PharmacyClaimsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyClaimsPageViewModel(
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
        listName: "pharmacy-claims",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(pharmacyClaim) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoPharmacyClaimProfile,
        headings,
        helper: pharmacyClaimHelper,
        pathEntries,
        tableItem: pharmacyClaim
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
          <strong>+</strong> Add Pharmacy Claim
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
        list={this.state.pharmacyClaims}
        listLabel="Pharmacy Claim"
        listPluralLabel="Pharmacy Claims"
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
        title="Pharmacy Claims"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PharmacyClaimsPage }
