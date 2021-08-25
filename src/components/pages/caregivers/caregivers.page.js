import React, { Component } from "react"
import { CaregiversPageViewModel } from "../../view_models/pages/caregivers"
import { ListView } from "../../../containers"
import { caregiverHelper, valueHelper } from "../../../helpers"
import { listHelper } from "../../../helpers/list.helper"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Patient",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Relationship",
    field: "relationship",
    method: "relationship"
  },
  {
    name: "Current?",
    field: "is_current_caregiver",
    method: "displayIsCurrentCaregiver"
  }
]

class CaregiversPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new CaregiversPageViewModel(
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
        listName: "caregivers",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(caregiver) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoCaregiverProfile,
        headings,
        helper: caregiverHelper,
        launchModal: this.props.launchModal,
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: caregiver
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
        list={this.state.caregivers}
        listLabel="Caregiver"
        listPluralLabel="Caregivers"
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
        title="Caregivers"
      />
    )
  }

  nav(list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createModal}>
          <strong>+</strong> Add Caregiver
        </button>
      </nav>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { CaregiversPage }
