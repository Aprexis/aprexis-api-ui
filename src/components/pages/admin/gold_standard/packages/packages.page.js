import React, { Component } from "react"
import { PackagesPageViewModel } from "../../../../view_models/pages/admin/gold_standard/packages"
import { ListView } from "../../../../../containers"
import { valueHelper, goldStandardPackageHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers"

const headings = [
  {
    name: "Description",
    field: "package_description",
    method: "packageDescription"
  },
  {
    name: "Descriptor",
    field: "package_descriptor_text",
    method: "packageDescriptorText"
  },
  {
    name: "NDC-10",
    field: "ndc10",
    method: "ndc10"
  },
  {
    name: "NDC-11",
    field: "ndc11",
    method: "ndc11"
  },
  {
    name: "Product",
    field: "product.product_name_long",
    method: "goldStandardProductNameLong"
  },
]

class PackagesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PackagesPageViewModel(
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
        listName: "packages",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(gsPackage) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoPackageProfile,
        headings,
        helper: goldStandardPackageHelper,
        launchModal: this.props.launchModal,
        modelName: 'package',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: gsPackage
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
        list={this.state.packages}
        listLabel="Package"
        listPluralLabel="Packages"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Packages"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PackagesPage }
