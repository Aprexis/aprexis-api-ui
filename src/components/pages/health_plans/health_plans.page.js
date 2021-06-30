import React, { Component } from "react"
import { HealthPlansPageViewModel } from "../../view_models/pages/health_plans"
import { ListView } from "../../../containers"
import { healthPlanHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list.helper"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Code",
    field: "code",
    method: "code"
  },
  {
    name: "Address",
    field: "state,city,zip_code,address",
    method: "fullAddress"
  },
  {
    name: "Phone",
    field: "phone",
    method: "phone"
  },
  {
    name: "Status",
    field: "active",
    method: "active"
  },
  {
    name: "Active Patients",
    method: "activePatients"
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

  generateTableRow(healthPlan) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoHealthPlanProfile,
        headings,
        helper: healthPlanHelper,
        pathEntries,
        tableItem: healthPlan
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

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlansPage }
