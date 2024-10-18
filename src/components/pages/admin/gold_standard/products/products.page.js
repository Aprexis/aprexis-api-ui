import React, { Component } from "react"
import { ProductsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/products"
import { ListView } from "../../../../../containers"
import { valueHelper, goldStandardProductHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers"

const headings = [
  {
    name: "Name (Long)",
    field: "product_name_long",
    method: "productNameLong"
  },
  {
    name: "Name (Short)",
    field: "product_name_short",
    method: "productNameShort"
  },
  {
    name: "NDC-9",
    field: "ndc9",
    method: "ndc9"
  },
  {
    name: "Marketed Product",
    field: "marketed_product.name",
    method: "goldStandardMarketedProductName"
  }
]

class ProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ProductsPageViewModel(
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
        listName: "products",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(product) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoProductProfile,
        headings,
        helper: goldStandardProductHelper,
        launchModal: this.props.launchModal,
        modelName: 'Product',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: product
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
        list={this.state.Products}
        listLabel="Product"
        listPluralLabel="Products"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Products"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { ProductsPage }
