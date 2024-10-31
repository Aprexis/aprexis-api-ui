import React, { Component } from "react"
import { DrugItemsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/drug_items"
import { ListView } from "../../../../../containers"
import { valueHelper, goldStandardDrugItemHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers"

const headings = [
  {
    name: "Name",
    field: "item_name_long",
    method: "itemNameLong"
  },
  {
    name: "Form",
    field: "gs_form.form_name",
    method: "goldStandardGsFormName"
  },
  {
    name: "Product",
    field: "product.product_name_long",
    method: "goldStandardProductNameLong"
  },
]

class DrugItemsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DrugItemsPageViewModel(
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
        listName: "drug-items",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(drugItem) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoDrugItemProfile,
        headings,
        helper: goldStandardDrugItemHelper,
        launchModal: this.props.launchModal,
        modelName: 'drugItem',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: drugItem
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
        list={this.state.drugItems}
        listLabel="Drug Item"
        listPluralLabel="Drug Items"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Drug Items"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DrugItemsPage }
