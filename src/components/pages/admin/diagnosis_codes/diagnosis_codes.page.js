import React, { Component } from "react"
import { TableColumnHeader } from "../../../shared"
import { DiagnosisCodesPageViewModel } from "../../../view_models/pages/admin/diagnosis_codes"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { diagnosisCodeHelper } from "../../../../helpers/admin"

const headings = [
  {
    name: "Type",
    field: "type"
  },
  {
    name: "Code",
    field: "Code"
  },
  {
    name: "Short Description",
    field: "short_description"
  },
  {
    name: "Billable",
    field: "billable"
  }
]

class DiagnosisCodesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DiagnosisCodesPageViewModel(
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
            key={`diagnosis-codes-table-heading-${field}`}
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

  generateTableRow(diagnosisCode) {
    return [
      diagnosisCodeHelper.typeLabel(diagnosisCode),
      {
        content: diagnosisCodeHelper.code(diagnosisCode),
        onClick: (event) => { this.vm.gotoDiagnosisCodeProfile(diagnosisCode) }
      },
      diagnosisCode.short_description,
      valueHelper.yesNo(diagnosisCode.billable)
    ]
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
        list={this.state.diagnosisCodes}
        listLabel="Diagnosis Code"
        listPluralLabel="Diagnosis Codes"
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
        title="Diagnosis Codes"
      />
    )
  }
}

export { DiagnosisCodesPage }
