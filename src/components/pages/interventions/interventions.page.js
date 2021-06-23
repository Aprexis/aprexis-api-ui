import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { InterventionsPageViewModel } from "../../view_models/pages/interventions"
import { ListView } from "../../../containers"
import { dateHelper, interventionHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Patient Name",
    field: "patients.last_name,patients.first_name,patients.middle_name"
  },
  {
    name: "Member Number",
    field: "member_number"
  },
  {
    name: "Person Number",
    field: "person_number"
  },
  {
    name: "Program",
    field: "programs.name"
  },
  {
    name: "State",
    field: "state"
  },
  {
    name: "Date of Service",
    field: "date_of_service"
  },
  {
    name: "Consult Start",
    field: "consult_start_date"
  },
  {
    name: "Consult End",
    field: "consult_end_date"
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
  }

  componentDidMount() {
    this.vm.loadData()
  }

  generateTableHeadings() {
    return headings.map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`interventions-table-heading-${field}`}
            className="aprexis-table-header-cell"
            label={name}
            sortFieldName={field}
            sorting={this.state.sorting}
            onRefresh={this.vm.refreshData}
            onUpdateSorting={this.vm.updateSorting}
          />
        )
      }
    )
  }

  generateTableRow(intervention) {
    return [
      {
        content: interventionHelper.patientName(intervention),
        onClick: (event) => { this.vm.gotoInterventionProfile(intervention) }
      },
      intervention.member_number,
      intervention.person_number,
      interventionHelper.programType(intervention),
      interventionHelper.state(intervention),
      dateHelper.displayDate(intervention.date_of_service),
      interventionHelper.consultStarted(intervention),
      interventionHelper.consultEnded(intervention)
    ]
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

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { InterventionsPage }
