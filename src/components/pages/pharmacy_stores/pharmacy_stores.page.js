import React, { Component } from "react"
import { PharmacyStoresPageViewModel } from "../../view_models/pages/pharmacy_stores"
import { ListView } from "../../../containers"
import { pharmacyStoreHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list.helper"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Store Number",
    field: "store_number",
    method: "storeNumber"
  },
  {
    name: "Address",
    field: "address",
    method: "address"
  },
  {
    name: "City",
    field: "city",
    method: "city"
  },
  {
    name: "State",
    field: "state",
    method: "state"
  },
  {
    name: "ZIP Code",
    field: "zip_code",
    method: "zipCode"
  }
]

class PharmacyStoresPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyStoresPageViewModel(
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
        listName: "pharmacy-stores",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(pharmacyStore) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoPharmacyStoreProfile,
        headings,
        helper: pharmacyStoreHelper,
        pathEntries,
        tableItem: pharmacyStore
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
        list={this.state.pharmacyStores}
        listLabel="Pharmacy Store"
        listPluralLabel="Pharmacy Stores"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Pharmacy Stores"
      />
    )
  }
}

export { PharmacyStoresPage }
