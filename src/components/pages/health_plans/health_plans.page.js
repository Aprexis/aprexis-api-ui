import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { HealthPlansPageViewModel } from "../../view_models/pages/health_plans"
import { ListView } from "../../../containers"
import { healthPlanHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Name",
    field: "name"
  },
  {
    name: "Code",
    field: "code"
  },
  {
    name: "Address",
    field: "state,city,zip_code,address"
  },
  {
    name: "Phone",
    field: "phone"
  },
  {
    name: "Status",
    field: "active"
  },
  {
    name: "Active Patients"
  }
]

class HealthPlansPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlansPageViewModel(
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
            key={`health-plans-table-heading-${field}`}
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

  generateTableRow(healthPlan) {
    return [
      {
        content: healthPlanHelper.name(healthPlan),
        onClick: (event) => { this.vm.gotoHealthPlanProfile(healthPlan) }
      },
      healthPlanHelper.code(healthPlan),
      healthPlanHelper.fullAddress(healthPlan),
      healthPlanHelper.phone(healthPlan),
      valueHelper.isSet(healthPlan.active) ? "Active" : "Inactive",
      valueHelper.makeString(healthPlanHelper.activePatients(healthPlan))
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
        list={this.state.healthPlans}
        listLabel="Health Plan"
        listPluralLabel="Health Plans"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Health Plans"
      />
    )
  }
}

export { HealthPlansPage }
