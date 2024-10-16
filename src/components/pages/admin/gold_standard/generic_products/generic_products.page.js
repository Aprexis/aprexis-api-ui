import React, { Component } from "react"
import { GenericProductsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/generic_products"
import { ListView } from "../../../../../containers"
import { valueHelper, goldStandardGenericProductHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Synonym",
    field: "synonym",
    method: "synonym"
  },
  {
    name: "Generic Product Clinical",
    field: "generic_product_clinical.name",
    method: "goldStandardGenericProductClinicalName"
  }
]

class GenericProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new GenericProductsPageViewModel(
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
        listName: "generic-products",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(genericProduct) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoGenericProductProfile,
        headings,
        helper: goldStandardGenericProductHelper,
        launchModal: this.props.launchModal,
        modelName: 'genericProduct',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: genericProduct
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
        list={this.state.genericProducts}
        listLabel="Generic Product"
        listPluralLabel="Generic Products"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Generic Products"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { GenericProductsPage }
