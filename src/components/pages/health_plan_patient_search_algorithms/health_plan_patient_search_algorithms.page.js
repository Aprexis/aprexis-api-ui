import React, { Component } from "react"
import { HealthPlanPatientSearchAlgorithmsPageViewModel } from "../../view_models/pages/health_plan_patient_search_algorithms"
import { ListView } from "../../../containers"
import { healthPlanPatientSearchAlgorithmHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Name",
    method: "name"
  },
  {
    name: "Health Plan",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Type",
    method: "type"
  },
  {
    name: "Last Run",
    method: "lastRun"
  }
]

class HealthPlanPatientSearchAlgorithmsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlanPatientSearchAlgorithmsPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
    this.orderedPatientSearchAlgorithms = this.orderedPatientSearchAlgorithms.bind(this)
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
        listName: "patient-search-algorithms",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(patientSearchAlgorithm) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoPatientSearchAlgorithmProfile,
        headings,
        helper: healthPlanPatientSearchAlgorithmHelper,
        launchModal: this.props.launchModal,
        modelName: 'healthPlanPatientSearchAlgorithm',
        pathEntries,
        tableItem: patientSearchAlgorithm
      }
    )
  }

  orderedPatientSearchAlgorithms() {
    const { healthPlanPatientSearchAlgorithms, patientSearchAlgorithms } = this.state
    if (!valueHelper.isValue(patientSearchAlgorithms) || !valueHelper.isValue(healthPlanPatientSearchAlgorithms)) {
      return []
    }

    const ordered = patientSearchAlgorithms.patient_search_algorithms.names.map(
      (psa) => healthPlanPatientSearchAlgorithms.find((hpPsa) => hpPsa.type == psa)
    ).filter((hpPsa) => valueHelper.isValue(hpPsa))
    return ordered
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
        list={this.orderedPatientSearchAlgorithms()}
        listLabel="Patient Search Algorithm"
        listPluralLabel="Patient Search Algorithms"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        title="Patient Search Algorithms"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlanPatientSearchAlgorithmsPage }
