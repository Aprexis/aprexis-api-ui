import { Component } from "react"
import { PackageVersionsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/package_versions"
import { ListView } from "../../../../../containers"
import { valueHelper, goldStandardPackageVersionHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers"

const headings = [
  {
    name: "Description",
    field: "package_version_description",
    method: "packageVersionDescription"
  },
  {
    name: "NDC-10",
    field: "package.ndc10",
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
  {
    name: "Package",
    field: "package.packageDescription",
    method: "goldStandardPackageDescription"
  },
  {
    name: "Version",
    field: "version",
    method: "version"
  }
]

class PackageVersionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PackageVersionsPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.notImplementedYet = true

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

  generateTableRow(packageVersion) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    if (this.notImplementedYet) {
      return ([<td><label>Not implemented yet</label></td>])
    }

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoPackageVersionProfile,
        headings,
        helper: goldStandardPackageVersionHelper,
        launchModal: this.props.launchModal,
        modelName: 'packageVersion',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: packageVersion
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
        list={this.state.packageVersions}
        listLabel="Package Version"
        listPluralLabel="Package Versions"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Package Versions"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PackageVersionsPage }
