import React, { Component } from "react"
import { TableColumnHeader, TableIdentificationColumn } from "../../shared"
import { PharmacyClaimsPageViewModel } from "../../view_models/pages/pharmacy_claims"
import { ListView } from "../../../containers"
import { fieldHelper, pharmacyClaimHelper, valueHelper } from "../../../helpers"

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
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    return headings.filter(
      (heading) => fieldHelper.includeField(pathEntries, filters, heading)
    ).map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`patient-allergies-table-heading-${field}`}
            className="aprexis-table-header-cell"
            label={name}
            sortFieldName={field}
            sorting={this.state.sorting}
            onRefresh={this.vm.refreshData}
            onUpdateSorting={this.vm.updateSorting}
          />
        )
      }
    )
  }

  generateTableRow(pharmacyClaim) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const row = [
      {
        content: (
          <TableIdentificationColumn
            currentUser={this.props.currentUser}
            heading={headings[0]}
            helper={pharmacyClaimHelper}
            onClick={(event) => { this.vm.gotoPharmacyClaimProfile(pharmacyClaim) }}
            onEdit={(event) => { this.vm.editModal(pharmacyClaim) }}
            tableItem={pharmacyClaim}
          />
        )
      }
    ]

    headings.filter(
      (heading) => heading.name != "Claim Number" && fieldHelper.includeField(pathEntries, filters, heading)
    ).forEach(
      (heading) => {
        row.push(
          fieldHelper.listField(
            pharmacyClaimHelper[heading.method](pharmacyClaim)
          )
        )
      }
    )

    return row
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
