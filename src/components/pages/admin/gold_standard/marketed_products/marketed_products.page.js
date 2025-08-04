import { Component } from "react"
import { MarketedProductsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/marketed_products/index.js"
import { ListView } from "../../../../../containers/index.js"
import { valueHelper, goldStandardMarketedProductHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers/index.js"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Specific Product",
    field: "specific_product.name",
    method: "goldStandardSpecificProductName"
  }
]

class MarketedProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MarketedProductsPageViewModel(
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
        listName: "marketed-products",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(marketedProduct) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoMarketedProductProfile,
        headings,
        helper: goldStandardMarketedProductHelper,
        launchModal: this.props.launchModal,
        modelName: 'marketedProduct',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: marketedProduct
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
        list={this.state.marketedProducts}
        listLabel="Marketed Product"
        listPluralLabel="Marketed Products"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Marketed Products"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { MarketedProductsPage }
