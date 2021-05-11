import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { PatientNotesPageViewModel } from "../../view_models/pages/patients"
import { ListView } from "../../../containers"
import { fieldHelper, patientNoteHelper } from "../../../helpers"

const headings = [
  {
    name: "Date/Time",
    field: "updated_at",
    method: "displayDateTime"
  },
  {
    name: "Pharmacy Store",
    field: "pharmacy_store.name,pharmacy_store.number,pharmacy_store.id",
    unless: "pharmacy-stores",
    method: "pharmacyStoreIdentification"
  },
  {
    name: "Note",
    field: "note",
    method: "note",
    maximum: 24
  }
]

class PatientNotesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientNotesPageViewModel(
      {
        ...props,
        view: this
      }
    )

    this.nav = this.nav.bind(this)
    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
  }

  componentDidMount() {
    this.vm.props = { ...this.vm.props, ...this.props }
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
            key={`patient-notes-table-heading-${field}`}
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

  generateTableRow(patientNote) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const row = [
      {
        content: patientNoteHelper[headings[0].method](patientNote),
        onClick: (event) => { this.vm.gotoPatientNoteProfile(patientNote) }
      },
    ]

    headings.filter(
      (heading) => heading.name != "Date/Time" && fieldHelper.includeField(pathEntries, filters, heading)
    ).forEach((heading) => { row.push(fieldHelper.displayListField(patientNote, patientNoteHelper, heading)) })

    return row
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
          <strong>+</strong> Add Note
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
        context={this.props.context}
        currentAdminUser={this.props.currentAdminUser}
        currentUser={this.props.currentUser}
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.patientNotes}
        listLabel="Patient"
        listPluralLabel="Patient Notes"
        modal={this.state.modal}
        multipleRowsSelection={this.vm.multipleRowsSelection}
        nav={this.nav}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onClearModal={this.vm.clearModal}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onSubmitModal={this.vm.submitModal}
        onUpdateFilters={this.vm.updateFilters}
        onUpdateView={this.vm.loadData}
        page={this.state.page}
        title="Patient Notes"
      />
    )
  }

  shouldComponentUpdate() {
    this.vm.props = { ...this.vm.props, ...this.props }
    return true
  }
}

export { PatientNotesPage }
