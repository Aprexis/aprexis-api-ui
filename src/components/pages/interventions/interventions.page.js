import React, { Component } from "react"
import { InterventionsPageViewModel } from "../../view_models/pages/interventions"
import { ListView } from "../../../containers"
import { interventionHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Patient Name",
    field: "patients.last_name,patients.first_name,patients.middle_name",
    method: "patientName"
  },
  {
    name: "Member Number",
    field: "member_number",
    method: "memberNumber"
  },
  {
    name: "Person Number",
    field: "person_number",
    method: "personNumber"
  },
  {
    name: "Program",
    field: "programs.name",
    method: "programName"
  },
  {
    name: "State",
    field: "state",
    method: "state"
  },
  {
    name: "Date of Service",
    field: "date_of_service",
    method: "dateOfService"
  },
  {
    name: "Consult Start",
    field: "consult_start_date",
    method: "consultStarted"
  },
  {
    name: "Consult End",
    field: "consult_end_date",
    method: "consultEnded"
  }
]

class InterventionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionsPageViewModel(
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
        listName: "interventions",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(intervention) {
    const { currentUser } = this.props
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const editModal = determineEditModal(currentUser, intervention, this.vm)

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoInterventionProfile,
        headings,
        helper: interventionHelper,
        launchModal: this.props.launchModal,
        modelName: 'intervention',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: intervention
      }
    )

    function determineEditModal(currentUser, intervention, vm) {
      if (!interventionHelper.canEdit(currentUser, intervention)) {
        return
      }

      if (interventionHelper.programType(intervention) == 'External Clinical Program') {
        return vm.editExternalModal
      }

      return
    }
  }

  nav(_list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createExternalModal}>
          <strong>+</strong> Add External Intervention
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
        list={this.state.interventions}
        listLabel="Intervention"
        listPluralLabel="Interventions"
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
        title="Interventions"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { InterventionsPage }
