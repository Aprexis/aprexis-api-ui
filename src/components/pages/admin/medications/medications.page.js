import React, { Component } from "react"
import { MedicationsPageViewModel } from "../../../view_models/pages/admin/medications"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { medicationHelper } from "../../../../helpers/admin"
import { listHelper } from "../../../../helpers/list.helper"

const headings = [
  {
    name: "Label",
    field: "label",
    method: "label"
  },
  {
    name: "Is Superset?",
    field: "medication_superset",
    method: "displayMedicationSuperset"
  },
  {
    name: "Superset Label",
    field: "superset.label",
    method: "supersetLabel"
  }
]

class MedicationsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MedicationsPageViewModel(
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
        listName: "medications",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(medication) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        editTableItem: this.vm.editModal,
        filters,
        gotoTableItemProfile: this.vm.gotoMedicationProfile,
        headings,
        helper: medicationHelper,
        pathEntries,
        tableItem: medication
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
        list={this.state.medications}
        listLabel="Medication"
        listPluralLabel="Medications"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Medications"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { MedicationsPage }
