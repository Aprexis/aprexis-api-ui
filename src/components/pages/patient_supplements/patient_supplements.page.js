import React, { Component } from "react"
import { PatientSupplementsPageViewModel } from "../../view_models/pages/patient_supplements"
import { ListView } from "../../../containers"
import { patientSupplementHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list.helper"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Start Date",
    field: "start_date",
    method: "startDate"
  },
  {
    name: "Patient",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Physician",
    field: "physician.last_name,physician.first_name,physician.middle_name,physician.npi",
    method: "physicianNameAndNpi"
  }
]

class PatientSupplementsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientSupplementsPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.nav = this.nav.bind(this)
    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
  }

  componentDidMount() {
    this.vm.props = { ...this.vm.props, ...this.props }
    this.vm.loadData()
  }

  generateTableHeadings() {
    const { filters, sorting } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listHeader(
      {
        filters,
        headings,
        listName: "patient-supplements",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(patientSupplement) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoPatientSupplementProfile,
        headings,
        helper: patientSupplementHelper,
        pathEntries,
        tableItem: patientSupplement
      }
    )
  }

  nav(list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createModal}>
          <strong>+</strong> Add Supplement
        </button>
      </nav>
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
        list={this.state.patientSupplements}
        listLabel="Supplement"
        listPluralLabel="Supplements"
        modal={this.state.modal}
        nav={this.nav}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        onUpdateView={this.vm.loadData}
        page={this.state.page}
        title="Supplements"
      />
    )
  }

  shouldComponentUpdate() {
    this.vm.props = { ...this.vm.props, ...this.props }
    return true
  }
}

export { PatientSupplementsPage }
