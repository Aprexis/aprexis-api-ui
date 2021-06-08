import React, { Component } from "react"
import { TableColumnHeader } from "../../../shared"
import { DiseasesPageViewModel } from "../../../view_models/pages/admin/diseases"
import { ListView } from "../../../../containers"
import { valueHelper } from "../../../../helpers"
import { diseaseHelper } from "../../../../helpers/admin"

const headings = [
  {
    name: "Question Key",
    field: "question_key"
  },
  {
    name: "Name",
    field: "name"
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
        content: diseaseHelper.questionKey(disease),
        onClick: (event) => { this.vm.gotoDiseaseProfile(disease) }
      },
      diseaseHelper.name(disease),
      disease.description
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
        list={this.state.diseases}
        listLabel="Disease"
        listPluralLabel="Diseases"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Diseases"
      />
    )
  }
}

export { DiseasesPage }
