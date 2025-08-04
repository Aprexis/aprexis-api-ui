import { Component } from "react"
import { TherapeuticConceptsPageViewModel } from "../../../../view_models/pages/admin/gold_standard/therapeutic_concepts/index.js"
import { ListView } from "../../../../../containers/index.js"
import { valueHelper, goldStandardTherapeuticConceptHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../../helpers/index.js"

const headings = [
  {
    name: "Concept Name",
    field: "concept_name",
    method: "conceptName"
  }
]

class TherapeuticConceptsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new TherapeuticConceptsPageViewModel(
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
        listName: "therapeutic-concepts",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(therapeuticConcept) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoTherapeuticConceptProfile,
        headings,
        helper: goldStandardTherapeuticConceptHelper,
        launchModal: this.props.launchModal,
        modelName: 'therapeuticConcept',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: therapeuticConcept
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
        list={this.state.therapeuticConcepts}
        listLabel="Therapeutic Concept"
        listPluralLabel="Therapeutic Concepts"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Therapeutic Concepts"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { TherapeuticConceptsPage }
