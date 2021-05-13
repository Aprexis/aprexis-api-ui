import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { PatientsPageViewModel } from "../../view_models/pages/patients"
import { ListView } from "../../../containers"
import { addressHelper, patientHelper } from "../../../helpers"

const headings = [
  {
    name: "Name",
    field: "last_name,first_name,middle_name"
  },
  {
    name: "Member Number",
    field: "member_number"
  },
  {
    name: "Person Number",
    field: "person_number"
  },
  {
    name: "Address"
  }
]

class PatientsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientsPageViewModel(
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
            key={`patients-table-heading-${field}`}
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

  generateTableRow(patient) {
    return [
      {
        content: patientHelper.name(patient),
        onClick: (event) => { this.vm.gotoPatientProfile(patient) }
      },

      patient.member_number,
      patient.person_number,
      addressHelper.fullAddress(patient)
    ]
  }

  render() {
    const { filters } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)

    return (
      <ListView
        context={this.props.context}
        currentAdminUser={this.props.currentAdminUser}
        currentUser={this.props.currentUser}
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.patients}
        listLabel="Patient"
        listPluralLabel="Patients"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onClearModal={this.vm.clearModal}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onsubmitModal={this.vm.submitModal}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Patients"
      />
    )
  }
}

export { PatientsPage }
