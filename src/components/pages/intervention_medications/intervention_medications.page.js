import React, { Component } from "react"
import { InterventionMedicationsPageViewModel } from "../../view_models/pages/intervention_medications"
import { ListView } from "../../../containers"
import { interventionMedicationHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Type",
    field: "type",
    method: "displayType"
  },
  {
    name: "Patient",
    field: "intervention.patient.last_name,intervention.patient.first_name,intervention.patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Pharmacy Store",
    field: "intervention.pharamcy_store.pharmacy.name,intervention.pharmacy_store.name,intervention.pharmacy_store.store_number",
    method: "pharmacyStoreIdentification",
    unless: "pharmacy-stores"
  },
  {
    name: "Intervention",
    field: "intervention.date_of_service,intervention.program.name",
    method: "interventionIdentification",
    unless: "interventions"
  },
  {
    name: "Medication",
    field: "medication.label",
    method: "medicationLabel"
  },
  {
    name: "Text",
    field: "medication_text",
    method: "medicationText"
  }
]

class InterventionMedicationsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionMedicationsPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
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
        headings,
        listName: "intervention-medications",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(interventionMedication) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoInterventionMedicationProfile,
        headings,
        helper: interventionMedicationHelper,
        launchModal: this.props.launchModal,
        modelName: 'interventionMedication',
        onDeleteTableItem: this.vm.destroy,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: interventionMedication
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
        list={this.state.interventionMedications}
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
        page={this.state.page}
        title="Medications"
      />
    )
  }

  nav(_list) {
    return
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { InterventionMedicationsPage }
