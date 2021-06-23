import React, { Component } from "react"
import { TableColumnHeader } from "../../../shared"
import { BillingContractPharmacyChainsPageViewModel } from "../../../view_models/pages/billing/pharmacy_chains"
import { ListView } from "../../../../containers"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { billingContractPharmacyChainHelper } from "../../../../helpers/billing"

const headings = [
  {
    name: "Pharmacy Name",
    field: "pharmacy.name",
    method: "pharmacyChainName"
  },
  {
    name: "Clincal Programs",
    field: "clinical",
    method: "clinical"
  },
  {
    name: "Transactional Programs",
    field: "transactional",
    method: "transactional"
  },
  {
    name: "Pulls Enabled",
    field: "pulls_enabled",
    method: "pullsEnabled"
  },
  {
    name: "Claims Enabeld",
    field: "claims_enabled",
    method: "claimsEnabled"
  }
]

class BillingContractPharmacyChainsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractPharmacyChainsPageViewModel(
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
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    return headings.filter(
      (heading) => fieldHelper.includeField(pathEntries, filters, heading)
    ).map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`billing-contract-pharmacies-values-table-heading-${field}`}
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

  generateTableRow(billingContractPharmacyChain) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const row = [
      {
        content: billingContractPharmacyChainHelper[headings[0].method](billingContractPharmacyChain),
        onClick: (event) => { this.vm.gotoBillingContractPharmacyChainProfile(billingContractPharmacyChain) }
      }
    ]

    headings.filter(
      (heading) => heading.name != "Pharmacy Name" && fieldHelper.includeField(pathEntries, filters, heading)
    ).forEach(
      (heading) => {
        row.push(
          fieldHelper.listField(
            billingContractPharmacyChainHelper[heading.method](billingContractPharmacyChain)
          )
        )
      }
    )

    return row
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
        list={this.state.billingContractPharmacyChains}
        listLabel="Billing Contract Pharmacy Chain"
        listPluralLabel="Billing Contract Pharmacy Chains"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Billing Contract Pharmacy Chains"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingContractPharmacyChainsPage }
