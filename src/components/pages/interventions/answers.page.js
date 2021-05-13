import React, { Component } from "react"
import { TableColumnHeader } from "../../shared"
import { AnswersPageViewModel } from "../../view_models/pages/interventions"
import { ListView } from "../../../containers"
import { answerHelper, valueHelper } from "../../../helpers"

const headings = [
  {
    name: "Question Key",
    field: "question_key"
  },
  {
    name: "Question Type"
  },
  {
    name: "Value",
    field: "value"
  }
]

class AnswersPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new AnswersPageViewModel(
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
            key={`answers-table-heading-${field}`}
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

  generateTableRow(answer) {
    return [
      answerHelper.questionKey(answer),
      answerHelper.questionType(answer),
      answerHelper.displayValue(answer)
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
        list={this.state.answers}
        listLabel="Answer"
        listPluralLabel="Answers"
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
        title="Answers"
      />
    )
  }
}

export { AnswersPage }
