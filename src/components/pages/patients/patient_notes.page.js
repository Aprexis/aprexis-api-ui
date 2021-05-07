import React, { Component } from "react"
import { TableColumnHeader } from '../../shared'
import { PatientNotesPageViewModel } from "../../view_models/pages/patients"
import { ListView } from '../../../containers'
import { fieldHelper, patientNoteHelper } from '../../../helpers'

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
            key={`patient-notes-table-heading-${field}`}
            className='aprexis-table-header-cell'
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

  render() {
    const { filters } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)

    return (
      <ListView
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.patientNotes}
        listLabel="Patient"
        listPluralLabel="Patient Notes"
        modal={this.state.modal}
        multipleRowsSelection={this.vm.multipleRowsSelection}
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
        title="Patient Notes"
      />
    )
  }
}

export { PatientNotesPage }
