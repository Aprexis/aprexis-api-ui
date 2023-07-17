import React, { Component } from "react"
import { DryRunProgramPatientAssignmentsPageViewModel } from "../../view_models/pages/dry_run_program_patient_assignments"
import { ListView } from "../../../containers"
import { dryRunProgramPatientAssignmentHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Patient",
    field: "patient.first_name,patient.middle_name,patient.last_name",
    method: "patientName",
    unless: 'patient'
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Algorithm",
    field: "patient_search_algorithm.name",
    method: "patientSearchAlgorithmName",
    unless: "patient-search-algorithms"
  },
  {
    name: "Stage",
    method: "patientSearchStageName",
    unless: "patient-search-stages"
  },
  {
    name: "Program",
    field: "program.name",
    method: "programName",
    unless: "programs"
  },
  {
    name: "Pharmacy Store",
    field: "pharmacy_store.name",
    method: "pharmacyStoreName",
    unless: "pharmacy-stores"
  }
]

class DryRunProgramPatientAssignmentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DryRunProgramPatientAssignmentsPageViewModel(
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
        listName: "health-plans",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(dryRunProgramPatientAssignment) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        //gotoTableItemProfile: this.vm.gotoDryRunProgramPatientAssignmentProfile, /* Apply when available. */
        headings,
        helper: dryRunProgramPatientAssignmentHelper,
        launchModal: this.props.launchModal,
        modelName: 'dryRunProgramPatientAssignment',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: dryRunProgramPatientAssignment
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
        list={this.state.dryRunProgramPatientAssignments}
        listLabel="Dry Run Program Patient Assignment"
        listPluralLabel="Dry Run Program Patient Assignments"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Dry Run Program Patient Assignments"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { DryRunProgramPatientAssignmentsPage }
