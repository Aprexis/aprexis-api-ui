import React, { Component } from "react"
import { PatientMedicationsPageViewModel } from "../../view_models/pages/patients"
import { ListView } from "../../../containers"
import { patientMedicationHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list.helper"

const headings = [
  {
    name: "Label",
    field: "medication.label",
    method: "medicationLabel"
  },
  {
    name: "Type",
    field: "type",
    method: "displayType"
  },
  {
    name: "Strength",
    field: "strength_units,strength",
    method: "displayStrength"
  },
  {
    name: "Days Supply",
    field: "days_supply",
    method: "daysSupply"
  },
  {
    name: "Filled At",
    field: "filled_at",
    method: "filledAt"
  },
  {
    name: "Patient",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Physician",
    field: "physician.last_name,physician.first_name",
    method: "physicianName"
  },
  {
    name: "Pharmacy Store",
    field: "pharmacy_store.name",
    method: "pharmacyStoreName",
    unless: "pharmacy-stores"
  }
]

class PatientMedicationsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientMedicationsPageViewModel(
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
        listName: "patient-medications",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(patientMedication) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoPatientMedicationProfile,
        headings,
        helper: patientMedicationHelper,
        pathEntries,
        tableItem: patientMedication
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
          <strong>+</strong> Add Medication
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
        list={this.state.patientMedications}
        listLabel="Medication"
        listPluralLabel="Medications"
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
        title="Medications"
      />
    )
  }

  shouldComponentUpdate() {
    this.vm.props = { ...this.vm.props, ...this.props }
    return true
  }
}

export { PatientMedicationsPage }
