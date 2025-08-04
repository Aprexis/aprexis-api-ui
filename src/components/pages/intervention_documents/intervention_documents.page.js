import { Component } from "react"
import { InterventionDocumentsPageViewModel } from "../../view_models/pages/intervention_documents/index.js"
import { ListView } from "../../../containers/index.js"
import { interventionDocumentHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers/index.js"

const headings = [
  {
    name: "Updated",
    field: "updated_at",
    method: "updatedAt"
  },
  {
    name: "Title",
    field: "title",
    method: "title"
  },
  {
    name: "Intervention",
    field: "intervention.date_of_service,intervention.program.name",
    method: "interventionIdentification",
    unless: "interventions"
  },
  {
    name: "Consult Start Date",
    field: "intervention.consult_start_date",
    method: "displayConsultStartDate"
  },
  {
    name: "Consult Start Date",
    field: "intervention.consult_end_date",
    method: "displayConsultStartDate"
  },
  {
    name: "Patient",
    field: "intervention.patient.first_name,intervention.patient.last_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Pharmacy Store",
    field: "intervention.pharmacy_store.name, intervention.pharmacy_store.pharmacy.name",
    method: "pharmacyStoreDisplay",
    unless: "pharmacy-stores"
  },
  {
    name: "Locale",
    field: "locale",
    method: "displayLocale"
  }
]

class InterventionDocumentsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new InterventionDocumentsPageViewModel(
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
        listName: "intervention-documents",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(interventionDocument) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoInterventionDocumentProfile,
        headings,
        helper: interventionDocumentHelper,
        launchModal: this.props.launchModal,
        modelName: 'interventionDocument',
        onDeleteTableItem: this.vm.destroy,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: interventionDocument
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
        list={this.state.interventionDocuments}
        listLabel="Document"
        listPluralLabel="Documents"
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
        title="Documents"
      />
    )
  }

  nav(list) {
    return
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { InterventionDocumentsPage }
