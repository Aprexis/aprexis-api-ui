import React, { Component } from "react"
import { LabTestsPageViewModel } from "../../../view_models/pages/admin/lab_tests"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { labTestHelper } from "../../../../helpers/admin"
import { listHelper } from "../../../../helpers/list.helper"

const headings = [
  {
    name: "Key Code",
    field: "key_code",
    method: "keyCode"
  },
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Full Name",
    field: "full_name",
    method: "fullName"
  },
  {
    name: "Category",
    field: "category",
    method: "category"
  },
  {
    name: "Units",
    field: "units",
    method: "units"
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
    const { filters, sorting } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listHeader(
      {
        filters,
        headings,
        listName: "lab-tests",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(labTest) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoLabTestProfile,
        headings,
        helper: labTestHelper,
        launchModal: this.props.launchModal,
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: labTest
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

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { LabTestsPage }
