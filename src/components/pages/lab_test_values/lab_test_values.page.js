import React, { Component } from "react"
import { TableColumnHeader } from "..//../shared"
import { LabTestValuesPageViewModel } from "../../view_models/pages/lab_test_values"
import { ListView } from "../../../containers"
import { fieldHelper, labTestValueHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Key Code",
    field: "lab_test.key_code",
    method: "labTestKeyCode"
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
    name: "Value",
    field: "value",
    method: "value"
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
  }

  componentDidMount() {
    this.vm.loadData()
  }

  generateTableHeadings() {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    return headings.filter(
      (heading) => fieldHelper.includeField(pathEntries, filters, heading)
    ).map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`lab-test-values-table-heading-${field}`}
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

  generateTableRow(labTestValue) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const row = [
      {
        content: labTestValueHelper[headings[0].method](labTestValue),
        onClick: (event) => { this.vm.gotoLabTestValueProfile(labTestValue) }
      }
    ]

    headings.filter(
      (heading) => heading.name != "Key Code" && fieldHelper.includeField(pathEntries, filters, heading)
    ).forEach((heading) => { row.push(labTestValueHelper[heading.method](labTestValue)) })

    return row
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
}

export { LabTestValuesPage }
