import { Component } from "react"
import { SpecificDrugProductsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/specific_drug_products/index.js"
import { ListView } from "../../../../../containers/index.js"
import { valueHelper, goldStandardSpecificDrugProductHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers/index.js"

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
    name: "Generic Product",
    field: "generic_product.name",
    method: "goldStandardGenericProductName"
  }
]

class SpecificDrugProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new SpecificDrugProductsPageViewModel(
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
        listName: "specific-drug-products",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(specificProduct) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoSpecificDrugProductProfile,
        headings,
        helper: goldStandardSpecificDrugProductHelper,
        launchModal: this.props.launchModal,
        modelName: 'specificDrugProduct',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: specificProduct
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
        list={this.state.specificDrugProducts}
        listLabel="Specific Drug Product"
        listPluralLabel="Specific Drug Products"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Specific Drug Products"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SpecificDrugProductsPage }
