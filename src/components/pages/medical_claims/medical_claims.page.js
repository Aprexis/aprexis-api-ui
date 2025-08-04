import { Component } from "react"
import { MedicalClaimsPageViewModel } from "../../view_models/pages/medical_claims/index.js"
import { ListView } from "../../../containers/index.js"
import { medicalClaimHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers/index.js"

const headings = [
  {
    name: "Claim Number",
    field: "claim_number",
    method: "claimNumber"
  },
  {
    name: "Member Number",
    field: "member_number",
    method: "memberNumber",
    unless: "patients"
  },
  {
    name: "Person Number",
    field: "person_number",
    method: "personNumber",
    unless: "patients"
  },
  {
    name: "Patient",
    field: "patient.last_name,patient.first_name,patient.middle_name",
    method: "patientName",
    unless: "patients"
  },
  {
    name: "Provider NPI",
    field: "provider_npi",
    method: "providerNpi"
  },
  {
    name: "Service Date",
    field: "service_date",
    method: "serviceDate"
  }
]

class MedicalClaimsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MedicalClaimsPageViewModel(
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
        listName: "medical-claims",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(medicalClaim) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoMedicalClaimProfile,
        headings,
        helper: medicalClaimHelper,
        launchModal: this.props.launchModal,
        modelName: 'medicalClaim',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: medicalClaim
      }
    )
  }

  nav(_list) {
    if (!this.vm.canCreate()) {
      return
    }

    return (
      <nav className="btn-toolbar mb-2 mb-md-0">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={this.vm.createModal}>
          <strong>+</strong> Add Medical Claim
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
        {...valueHelper.importantProps(this.props)}
        context={this.props.context}
        currentAdminUser={this.props.currentAdminUser}
        currentUser={this.props.currentUser}
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        list={this.state.medicalClaims}
        listLabel="Medical Claim"
        listPluralLabel="Medical Claims"
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
        title="Medical Claims"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { MedicalClaimsPage }
