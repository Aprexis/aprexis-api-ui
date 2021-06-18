import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { PatientAllergiesPageViewModel } from "../../view_models/pages/patients"
import { ListView } from "../../../containers"
import { fieldHelper, patientAllergyHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Allergy Name",
    field: "allergy_name",
    method: "allergyName"
  },
  {
    name: "Allergy Type",
    field: "allergy_type",
    method: "allergyType"
  },
  {
    name: "Year",
    field: "year",
    method: "year"
  }
]

class PatientAllergiesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PatientAllergiesPageViewModel(
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
            key={`patient-allergies-table-heading-${field}`}
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

  generateTableRow(patientAllergy) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const row = [
      {
        content: patientAllergyHelper[headings[0].method](patientAllergy),
        onClick: (event) => { this.vm.gotoPatientAllergyProfile(patientAllergy) }
      }
    ]

    console.log(`PA: ${JSON.stringify(patientAllergy, null, 2)}`)

    headings.filter(
      (heading) => heading.name != "Allergy Name" && fieldHelper.includeField(pathEntries, filters, heading)
    ).forEach(
      (heading) => {
        row.push(
          fieldHelper.listField(
            patientAllergyHelper[heading.method](patientAllergy)
          )
        )
      }
    )

    console.log(`Row: ${JSON.stringify(row, valueHelper.getCircularReplacer(), 2)}`)

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
        list={this.state.patientAllergies}
        listLabel="Patient Allergy"
        listPluralLabel="Patient Allergies"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Patient Allergies"
      />
    )
  }
}

export { PatientAllergiesPage }
