import React, { Component } from "react"
import { BillingClaimHistoryCollectionsPageViewModel } from "../../../view_models/pages/billing/claim_history_collections"
import { ListView } from "../../../../containers"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers"

const headings = [
  {
    name: "File",
    field: "file_name",
    method: "fileName"
  },
  {
    name: "Queued",
    field: "queued_at",
    method: "displayQueuedAt"
  },
  {
    name: "Started",
    field: "started_at",
    method: "displayStartedAt"
  },
  {
    name: "Finished",
    field: "finished_at",
    method: "displayFinishedAt"
  },
  {
    name: "State",
    field: "state",
    method: "displayState"
  }
]

class BillingClaimHistoryCollectionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingClaimHistoryCollectionsPageViewModel(
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
        listName: "billing-claim-history-collections",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(billingClaimHistoryCollection) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoBillingClaimHistoryCollectionProfile,
        headings,
        helper: this.vm.helper(),
        launchModal: this.props.launchModal,
        modelName: 'billingClaimHistoryCollection',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: billingClaimHistoryCollection
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
          <strong>+</strong> Add Patient Disease
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
        list={this.state.billingClaimHistoryCollections}
        listLabel="Billing Claim History Collection"
        listPluralLabel="Billing Claim History Collections"
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
        title="Billing Claim History Collections"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingClaimHistoryCollectionsPage }
