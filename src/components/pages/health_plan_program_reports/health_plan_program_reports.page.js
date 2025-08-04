import { Component } from "react"
import { HealthPlanProgramReportsPageViewModel } from "../../view_models/pages/health_plan_program_reports/index.js"
import { ListView } from "../../../containers/index.js"
import { dateHelper, healthPlanProgramReportHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers/index.js"

const headings = [
  {
    name: "Program Type",
    field: "program_type",
    method: (healthPlanProgramReport) => {
      return valueHelper.titleize(healthPlanProgramReportHelper.programType(healthPlanProgramReport))
    }
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Report Generated",
    field: "created_at",
    method: (healthPlanProgramReport) => {
      return dateHelper.displayDateTime(healthPlanProgramReportHelper.createdAt(healthPlanProgramReport))
    }
  }
]

class HealthPlanProgramReportsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlanProgramReportsPageViewModel(
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
        listName: "health-plan-program-reports",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(healthPlanProgramReport) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoHealthPlanProgramReportProfile,
        headings,
        helper: this.vm.helper(),
        launchModal: this.props.launchModal,
        modelName: 'healthPlanProgramReport',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: healthPlanProgramReport
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
        list={this.state.healthPlanProgramReports}
        listLabel="Health Plan Program Report"
        listPluralLabel="Health Plan Program Reports"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Health Plan Program Reports"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlanProgramReportsPage }
