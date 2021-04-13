import React, { Component } from "react"
import { TableColumnHeader } from '../../shared'
import { InterventionsPageViewModel } from "../../view_models/pages/interventions"
import { ListView } from '../../../containers'
import { dateHelper, interventionHelper } from '../../../helpers'

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
    field: "programs.type"
  },
  {
    name: "State",
    field: "state"
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
            className='aprexis-table-header-cell'
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
        content: interventionHelper.name(intervention),
        onClick: (event) => { this.vm.gotoInterventionProfile(intervention) }
      },
      intervention.member_number,
      intervention.person_number,
      intervention.program.type,
      intervention.state,
      dateHelper.displayDateTime(intervention.consult_start_date),
      dateHelper.displayDateTime(intervention.consult_end_date)
    ]
  }

  render() {
    const { filters } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)

    return (
      <ListView
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.interventions}
        listLabel="Intervention"
        listPluralLabel="Interventions"
        modal={this.state.modal}
        multipleRowsSelection={this.vm.multipleRowsSelection}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onClearModal={this.vm.clearModal}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onsubmitModal={this.vm.submitModal}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Interventions"
      />
    )
  }
}

export { InterventionsPage }
