import React, { Component } from 'react'
import { TableColumnHeader } from '../../shared'
import { ProgramsPageViewModel } from '../../view_models/pages/programs'
import { ListView } from '../../../containers'
import { contextHelper, dateHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Name",
    field: "name"
  },
  {
    name: "Active",
    field: "active"
  },
  {
    name: "Health Plan",
    field: "health_plan.name"
  },
  {
    name: "Kind",
    field: "is_clinical,is_transactional"
  },
  {
    name: "Type",
    field: "type"
  },
  {
    name: "Start Date",
    field: "start date"
  },
  {
    name: "End Date",
    field: "end_date"
  }
]

class ProgramsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ProgramsPageViewModel(
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
    let workingHeadings = headings
    if (contextHelper.inContext('health-plans')) {
      workingHeadings = headings.filter((heading) => heading.name != 'Health Plan')
    }

    return workingHeadings.map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`programs-table-heading-${field}`}
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

  generateTableRow(program) {
    const row = [
      {
        content: program.name,
        onClick: (event) => { this.vm.gotoProgramProfile(program) }
      },
      valueHelper.yesNo(program.active),
      program.kind,
      valueHelper.titleize(program.type),
      dateHelper.displayDate(program.start_date),
      dateHelper.displayDate(program.end_date)
    ]

    if (!contextHelper.inContext('health-plans')) {
      row.splice(headings.findIndex((heading) => heading.name == 'Health Plan', 0, program.health_plan.name))
    }

    return row
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
        list={this.state.programs}
        listLabel="Program"
        listPluralLabel="Programs"
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
        title="Programs"
      />
    )
  }
}

export { ProgramsPage }
