import { Component } from "react"
import { SpecificProductsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/specific_products/index.js"
import { ListView } from "../../../../../containers/index.js"
import { valueHelper, goldStandardSpecificProductHelper } from "@aprexis/aprexis-api-utility"
import { listHelper, pathHelper } from "../../../../../helpers/index.js"

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
    name: "Specific Drug Product",
    field: "specific_drug_product.name",
    method: "goldStandardSpecificDrugProductName"
  }
]

class SpecificProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new SpecificProductsPageViewModel(
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
        listName: "specific-products",
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
        gotoTableItemProfile: this.vm.gotoSpecificProductProfile,
        headings,
        helper: goldStandardSpecificProductHelper,
        launchModal: this.props.launchModal,
        modelName: 'specificProduct',
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
    const pathEntries = this.vm.pathEntries()
    const therapeutic_concept_id = pathHelper.pathEntryValue(pathEntries, "therapeutic-concepts")
    const title = valueHelper.isNumberValue(therapeutic_concept_id) ? `All Specific Products for Concept` : 'Specific Products'

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
        list={this.state.specificProducts}
        listLabel="Specific Product"
        listPluralLabel="Specific Products"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title={title}
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { SpecificProductsPage }
