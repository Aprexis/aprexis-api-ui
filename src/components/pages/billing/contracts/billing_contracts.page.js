import React, { Component } from "react"
import { TableColumnHeader } from "../../../shared"
import { BillingContractsPageViewModel } from "../../../view_models/pages/billing/contracts"
import { ListView } from "../../../../containers"
import { fieldHelper, valueHelper } from "../../../../helpers"
import { billingContractHelper } from "../../../../helpers/billing"

const headings = [
  {
    name: "Name",
    field: "name",
    method: "name"
  },
  {
    name: "Active",
    field: "active",
    method: "active"
  },
  {
    name: "Health Plan",
    field: "health_plan.name",
    method: "healthPlanName",
    unless: "health-plans"
  },
  {
    name: "Start Date",
    field: "start_date",
    method: "startDate"
  },
  {
    name: "Stop Date",
    field: "stop_date",
    method: "stopDate"
  }
]

class BillingContractsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new BillingContractsPageViewModel(
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
            key={`billing-contract-values-table-heading-${field}`}
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

  generateTableRow(billingContract) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()
    const row = [
      {
        content: billingContractHelper[headings[0].method](billingContract),
        onClick: (event) => { this.vm.gotoBillingContractProfile(billingContract) }
      }
    ]

    headings.filter(
      (heading) => heading.name != "Name" && fieldHelper.includeField(pathEntries, filters, heading)
    ).forEach((heading) => { row.push(billingContractHelper[heading.method](billingContract)) })

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
        list={this.state.billingContracts}
        listLabel="Billing Contract"
        listPluralLabel="Billing Contracts"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Billing Contracts"
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { BillingContractsPage }
