import React, { Component } from "react"
import { TableColumnHeader } from "../../../shared"
import { DiseasesPageViewModel } from "../../../view_models/pages/admin/diseases"
import { ListView } from "../../../../containers"

const headings = [
  {
    name: "Question Key",
    field: "question_key"
  },
  {
    name: "Description",
    field: "description"
  }
]

class DiseasesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new DiseasesPageViewModel(
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
            key={`diseases-table-heading-${field}`}
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

  generateTableRow(disease) {
    return [
      {
        content: disease.question_key,
        onClick: (event) => { this.vm.gotoDiseaseProfile(disease) }
      },
      disease.description
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
        list={this.state.diseases}
        listLabel="Disease"
        listPluralLabel="Diseases"
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
        title="Diseases"
      />
    )
  }
}

export { DiseasesPage }
