import { Component } from "react"
import { GenericProductClinicalsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/generic_product_clinicals/index.js"
import { ListView } from "../../../../../containers/index.js"
import { valueHelper, goldStandardGenericProductClinicalHelper } from "@aprexis/aprexis-api-utility"
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
  }
]

class GenericProductClinicalsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new GenericProductClinicalsPageViewModel(
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
        listName: "generic-product-clinicals",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(genericProductClinical) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoGenericProductClinicalProfile,
        headings,
        helper: goldStandardGenericProductClinicalHelper,
        launchModal: this.props.launchModal,
        modelName: 'genericProductClinical',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: genericProductClinical
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
        list={this.state.genericProductClinicals}
        listLabel="Generic Product Clinical"
        listPluralLabel="Generic Product Clinicals"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Generic Product Clinicals"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { GenericProductClinicalsPage }
