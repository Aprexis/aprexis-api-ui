import React, { Component } from 'react'
import { TableColumnHeader } from '../../shared'
import { PharmacyChainsPageViewModel } from '../../view_models/pages/pharmacy_chains'
import { ListView } from '../../../containers'
import { valueHelper } from '../../../helpers'

const headings = [
  {
    name: "Name",
    field: "name"
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
  },
  {
    name: "Pharmacy Stores"
  }
]

class PharmacyChainsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyChainsPageViewModel(
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
            key={`pharmacy-chains-table-heading-${field}`}
            className='aprexis-table-header-cell'
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

  generateTableRow(pharmacyChain) {
    return [
      {
        content: pharmacyChain.name,
        onClick: (event) => { this.vm.gotoPharmacyChainProfile(pharmacyChain) }
      },
      pharmacyChain.address,
      pharmacyChain.city,
      pharmacyChain.state,
      pharmacyChain.zip_code,
      `${pharmacyChain.pharmacy_store_count}`
    ]
  }

  render() {
    const { filters } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)


    return (
      <ListView
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.pharmacyChains}
        listLabel="Pharmacy Chain"
        listPluralLabel="Pharmacy Chains"
        modal={this.state.modal}
        multipleRowsSelection={this.vm.multipleRowsSelection}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onClearModal={this.vm.clearModal}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onsubmitModal={this.vm.submitModal}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Pharmacy Chains"
      />
    )
  }
}

export { PharmacyChainsPage }
