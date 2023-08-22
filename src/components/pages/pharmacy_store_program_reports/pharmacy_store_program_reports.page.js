import React, { Component } from "react"
import { PharmacyStoreProgramReportsPageViewModel } from "../../view_models/pages/pharmacy_store_program_reports"
import { ListView } from "../../../containers"
import { dateHelper, pharmacyStoreProgramReportHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Report Generated",
    field: "created_at",
    method: (pharmacyStoreProgramReport) => {
      return dateHelper.displayDateTime(pharmacyStoreProgramReportHelper.createdAt(pharmacyStoreProgramReport))
    }
  },
  {
    name: "Pharmacy Store",
    field: "pharmacy_store.name,pharmacy_store.store_number",
    method: "pharmacyStoreIdentification",
    unless: "pharmacy-stores"
  },
  {
    name: "Health Plan",
    field: "program.health_plan.name",
    method: "healthPlanName",
    unless: "programs"
  },
  {
    name: "Program",
    field: "program.name",
    method: "programName",
    unless: "programs"
  }
]

class PharmacyStoreProgramReportsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PharmacyStoreProgramReportsPageViewModel(
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
        listName: "pharmacy-store-program-reports",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(pharmacyStoreProgramReport) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoPharmacyStoreProgramReportProfile,
        headings,
        helper: this.vm.helper(),
        launchModal: this.props.launchModal,
        modelName: 'pharmacyStoreProgramReport',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: pharmacyStoreProgramReport
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
        list={this.state.pharmacyStoreProgramReports}
        listLabel="Pharmacy Store Program Report"
        listPluralLabel="Pharmacy Store Program Reports"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Pharmacy Store Program Reports"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PharmacyStoreProgramReportsPage }
