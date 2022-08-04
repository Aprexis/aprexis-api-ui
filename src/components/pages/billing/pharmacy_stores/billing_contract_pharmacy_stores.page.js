import React, { Component } from "react"
import { BillingContractPharmacyStoresPageViewModel } from "../../../view_models/pages/billing/pharmacy_stores"
import { ListView } from "../../../../containers"
import { valueHelper, billingContractPharmacyStoreHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers"

const headings = [
  {
    name: "Pharmacy Store Name",
    field: "pharmacy_store.name",
    method: "pharmacyStoreName"
  },
  {
    name: "Pharmacy Store Number",
    field: "pharmacy_store.store_number",
    method: "pharmacyStoreNumber"
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

class BillingContractPharmacyStoresPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractPharmacyStoresPageViewModel(
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
        listName: "billing-contract-pharmacy-stores",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(billingContractPharmacyStore) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoBillingContractPharmacyStoreProfile,
        headings,
        helper: billingContractPharmacyStoreHelper,
        launchModal: this.props.launchModal,
        modelName: 'billingContractPharmacyStore',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: billingContractPharmacyStore
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
          <strong>+</strong> Add Pharmacy Store
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
        list={this.state.billingContractPharmacyStores}
        listLabel="Billing Contract Pharmacy Store"
        listPluralLabel="Billing Contract Pharmacy Stores"
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
        title="Billing Contract Pharmacy Stores"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingContractPharmacyStoresPage }
