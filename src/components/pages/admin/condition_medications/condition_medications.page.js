import React, { Component } from "react"
import { ConditionMedicationsPageViewModel } from "../../../view_models/pages/admin/condition_medications"
import { ListView } from "../../../../containers"
import { valueHelper, conditionMedicationHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers/list.helper"

const headings = [
  {
    name: "Condition",
    field: "condition",
    method: "condition"
  },
  {
    name: "Tag",
    field: "tag",
    method: "tag"
  },
  {
    name: "Medication",
    field: "medication.label",
    method: "medicationLabel"
  }
]

class ConditionMedicationsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new ConditionMedicationsPageViewModel(
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
        listName: "condition-medications",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(conditionMedication) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoConditionMedicationProfile,
        headings,
        helper: conditionMedicationHelper,
        launchModal: this.props.launchModal,
        modelName: 'conditionMedication',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: conditionMedication
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
        list={this.state.conditionMedications}
        listLabel="Condition Medication"
        listPluralLabel="Condition Medications"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Condition Medications"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { ConditionMedicationsPage }
