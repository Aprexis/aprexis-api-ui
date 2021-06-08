import React, { Component } from "react"
import { TableColumnHeader } from "../../../shared"
import { LabTestsPageViewModel } from "../../../view_models/pages/admin/lab_tests"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { labTestHelper } from "../../../../helpers/admin"

const headings = [
  {
    name: "Key Code",
    field: "key_code"
  },
  {
    name: "Name",
    field: "name"
  },
  {
    name: "Full Name",
    field: "full_name"
  },
  {
    name: "Category",
    field: "category"
  },
  {
    name: "Units",
    field: "units"
  }
]

class LabTestsPage extends Component {
  constructor(props) {
    super(props)


    this.state = {}
    this.vm = new LabTestsPageViewModel(
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
            key={`lab-tests-table-heading-${field}`}
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

  generateTableRow(labTest) {
    return [
      {
        content: labTestHelper.keyCode(labTest),
        onClick: (event) => { this.vm.gotoLabTestProfile(labTest) }
      },
      labTestHelper.name(labTest),
      labTestHelper.fullName(labTest),
      labTestHelper.category(labTest),
      labTestHelper.units(labTest)
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
        list={this.state.labTests}
        listLabel="Lab Test"
        listPluralLabel="Lab Tests"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Lab Tests"
      />
    )
  }
}

export { LabTestsPage }
