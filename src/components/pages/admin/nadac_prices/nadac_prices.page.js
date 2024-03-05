import React, { Component } from "react"
import { NadacPricesPageViewModel } from "../../../view_models/pages/admin/nadac_prices"
import { ListView } from "../../../../containers"
import { valueHelper, nadacHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers"

const headings = [
  {
    name: 'NDC11',
    field: 'ndc11',
    method: 'ndc11'
  },
  {
    name: "Label",
    method: 'medicationLabel'
  },
  {
    name: 'Unit Price',
    field: 'unit_price',
    method: 'unitPrice'
  },
  {
    name: 'Package Size',
    field: 'package.package_size',
    method: 'packagePackageSize',
  },
  {
    name: 'Inner Package Count',
    field: 'package.inner_package_count',
    method: 'packageInnerPackageCount'
  }
]

class NadacPricesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new NadacPricesPageViewModel(
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
        listName: "nadac-prices",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(nadacPrice) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        headings,
        helper: nadacHelper,
        launchModal: this.props.launchModal,
        modelName: 'nadacPrice',
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: nadacPrice
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
        list={this.state.nadacPrices}
        listLabel="NADAC Price"
        listPluralLabel="NADAC Prices"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="NADAC Prices"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { NadacPricesPage }
