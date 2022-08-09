import React, { Component } from "react"
import { LabTestValuesPageViewModel } from "../../view_models/pages/lab_test_values"
import { ListView } from "../../../containers"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Key Code",
    field: "lab_test.key_code",
    method: "labTestKeyCode"
  },
  {
    name: "Type",
    field: "type",
    method: "displayType"
  },
  {
    name: "Lab Test",
    field: "lab_test.full_name",
    method: "labTestFullName"
  },
  {
    name: "Patient Name",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    unless: "patients",
    method: "patientName"
  },
  {
    name: "Program",
    field: "intervention.program.name",
    unless: "interventions",
    unlessFilters: [
      {
        queryParam: "for_interventions",
        value: false
      }
    ],
    method: "programName"
  },
  {
    name: "Taken At",
    field: "value_taken_at",
    method: "displayValueTakenAt",
  },
  {
    name: "Value",
    field: "value",
    method: "value"
  },
  {
    name: "Calculated",
    field: "calculated",
    method: "displayCalculated"
  },
  {
    name: "Confirmed",
    field: "confirmed",
    method: "displayConfirmed"
  }
]

class LabTestValuesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new LabTestValuesPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
    this.nav = this.nav.bind(this)
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
        listName: "lab-test-values",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(labTestValue) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoLabTestValueProfile,
        headings,
        helper: this.vm.helper(),
        launchModal: this.props.launchModal,
        modelName: 'labTestValue',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: labTestValue
      }
    )
  }

  nav(_list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createModal}>
          <strong>+</strong> Add Lab Test Value
        </button>
      </nav>
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
        list={this.state.labTestValues}
        listLabel="Lab Test Value"
        listPluralLabel="Lab Test Values"
        modal={this.state.modal}
        nav={this.nav}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Lab Test Values"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { LabTestValuesPage }
