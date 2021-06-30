import React, { Component } from "react"
import { ProgramsPageViewModel } from "../../view_models/pages/programs"
import { ListView } from "../../../containers"
import { programHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list.helper"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Active",
    field: "active",
    method: "active"
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName"
  },
  {
    name: "Kind",
    field: "is_clinical,is_transactional",
    method: "kind"
  },
  {
    name: "Type",
    field: "type",
    method: "type"
  },
  {
    name: "Start Date",
    field: "start date",
    method: "startDate"
  },
  {
    name: "End Date",
    field: "end_date",
    method: "endDate"
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
    const { filters, sorting } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listHeader(
      {
        filters,
        headings,
        listName: "programs",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(program) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoProgramProfile,
        headings,
        helper: programHelper,
        pathEntries,
        tableItem: program
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
        list={this.state.programs}
        listLabel="Program"
        listPluralLabel="Programs"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Programs"
      />
    )
  }
}

export { ProgramsPage }
