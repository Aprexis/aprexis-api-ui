import { Component } from "react"
import { FaxesPageViewModel } from "../../view_models/pages/faxes/index.js"
import { ListView } from "../../../containers/index.js"
import { faxHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper, pathHelper } from "../../../helpers/index.js"

const interventionsHeadings = [
  {
    name: "At",
    field: "created_at",
    method: "displayCreatedAt"
  },
  {
    name: "Patient Name",
    field: "intervention.patient.last_name,intervention.patient.first_name,intervention.patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Program",
    field: "intervention.program.name",
    method: "programName",
    unless: "interventions"
  },
  {
    name: "Date of Service",
    field: "intervention.date_of_service",
    method: "displayDateOfService",
    unless: "interventions"
  },
  {
    name: "To",
    field: "physician.last_name,physician.first_name",
    method: "physicianName"
  },
  {
    name: "Fax #",
    field: "fax_number_to",
    method: "faxNumberTo"
  },
  {
    name: "Delivery Status",
    field: "delivery_status",
    method: "displayDeliveryStatus"
  },
  {
    name: "User",
    field: "user.last_name,user.first_name",
    method: "userFullName"
  }
]

class FaxesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new FaxesPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
    this.headings = this.headings.bind(this)
    this.nav = this.nav.bind(this)
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
        headings: this.headings(pathEntries),
        listName: "faxes",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(fax) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoFaxProfile,
        headings: this.headings(pathEntries),
        helper: faxHelper,
        launchModal: this.props.launchModal,
        modelName: 'fax',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: fax
      }
    )
  }

  headings(pathEntries) {
    if (pathHelper.isSingular(pathEntries, "interventions")) {
      return interventionsHeadings
    }

    return
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
        list={this.state.faxes}
        listLabel="Fax"
        listPluralLabel="Faxes"
        modal={this.state.modal}
        nav={this.nav}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Faxes"
      />
    )
  }

  nav(_list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createModal}>
          <strong>+</strong> Add Fax
        </button>
      </nav>
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { FaxesPage }
