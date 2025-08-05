import { Component } from "react"
import { PhysiciansPageViewModel } from "../../../view_models/pages/admin/physicians/index.js"
import { ListView } from "../../../../containers/index.js"
import { valueHelper, physicianHelper } from "@aprexis/aprexis-api-utility"
import { displayHelper, listHelper } from "../../../../helpers/index.js"

function displayBusinessPhone(physician) {
  const businessPhone = physicianHelper.businessPhone(physician)
  return displayHelper.phoneNumberForDisplay(businessPhone)
}

const headings = [
  {
    name: "Name",
    field: "last_name,first_name,middle_name",
    method: "name"
  },
  {
    name: "NPI",
    field: "npi",
    method: "npi"
  },
  {
    name: "Clinic",
    field: "clinic",
    method: "clinic"
  },
  {
    name: "Address",
    field: "address,city,state,zip_code,country",
    method: "fullAddress"
  },
  {
    name: "Phone",
    field: "business_phone",
    method: displayBusinessPhone
  },
  {
    name: "Deactivated",
    field: "npi_deactivation_date",
    method: "displayNpiDeactivationDate"
  },
  {
    name: "Reactivated",
    field: "npi_reactivation_date",
    method: "displayNpiReactivationDate"
  }
]

class PhysiciansPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PhysiciansPageViewModel(
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
        listName: "physicians",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(physician) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoPhysicianProfile,
        headings,
        helper: physicianHelper,
        launchModal: this.props.launchModal,
        mopdelName: 'physician',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: physician
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
        list={this.state.physicians}
        listLabel="HCP"
        listPluralLabel="HCPs"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="HCPs"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PhysiciansPage }
