import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { HealthPlanPatientSearchAlgorithmsPageViewModel } from "../../view_models/pages/health_plans"
import { ListView } from "../../../containers"
import { dateHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Name"
  },
  {
    name: "Type"
  },
  {
    name: "Last Run"
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
    return headings.map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`patient-search-algorithms-table-heading-${field}`}
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

  generateTableRow(patientSearchAlgorithm) {
    return [
      valueHelper.titleize(patientSearchAlgorithm.name),
      valueHelper.titleize(patientSearchAlgorithm.type),
      dateHelper.displayDateTime(patientSearchAlgorithm.lastRun)
    ]
  }

  orderedPatientSearchAlgorithms() {
    const { healthPlanPatientSearchAlgorithms, patientSearchAlgorithms } = this.state
    if (!valueHelper.isValue(patientSearchAlgorithms) || !valueHelper.isValue(healthPlanPatientSearchAlgorithms)) {
      return []
    }

    return patientSearchAlgorithms.patient_search_algorithms.names.map(
      (psa) => healthPlanPatientSearchAlgorithms.find((hpPsa) => hpPsa.type == psa)
    ).filter((hpPsa) => valueHelper.isValue(hpPsa))
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

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { HealthPlanPatientSearchAlgorithmsPage }
