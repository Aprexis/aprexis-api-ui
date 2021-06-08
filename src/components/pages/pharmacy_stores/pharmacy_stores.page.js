import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { PharmacyStoresPageViewModel } from "../../view_models/pages/pharmacy_stores"
import { ListView } from "../../../containers"
import { valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Name",
    field: "name"
  },
  {
    name: "Store Number",
    field: "store_number"
  },
  {
    name: "Address",
    field: "address"
  },
  {
    name: "City",
    field: "city"
  },
  {
    name: "State",
    field: "state"
  },
  {
    name: "ZIP Code",
    field: "zip_code"
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
    return headings.map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`pharmacy-stores-table-heading-${field}`}
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

  generateTableRow(pharmacyStore) {
    return [
      {
        content: pharmacyStore.name,
        onClick: (event) => { this.vm.gotoPharmacyStoreProfile(pharmacyStore) }
      },
      pharmacyStore.store_number,
      pharmacyStore.address,
      pharmacyStore.city,
      pharmacyStore.state,
      pharmacyStore.zip_code
    ]
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
