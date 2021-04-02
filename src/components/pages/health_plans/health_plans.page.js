import React, { Component } from 'react'
import { TableColumnHeader } from '../../shared'
import { HealthPlansPageViewModel } from '../../view_models/pages/health_plans'
import { ListView } from '../../../containers'
import { valueHelper } from '../../../helpers'

const headings = [
  {
    name: "Name",
    field: "name"
  },
  {
    name: "Code",
    field: "code"
  },
  {
    name: "Address",
    field: "address"
  },
  {
    name: "City",
    field: "city"
  },
  {
    name: "State",
    field: "state"
  },
  {
    name: 'ZIP Code',
    field: "zip_code"
  },
  {
    name: "Phone",
    field: "phone"
  },
  {
    name: "Status",
    field: "active"
  }
]

class HealthPlansPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new HealthPlansPageViewModel(
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
            key={`health-plans-table-heading-${field}`}
            className='aprexis-table-header-cell'
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

  generateTableRow(healthPlan) {
    return [
      {
        content: healthPlan.name,
        onClick: (event) => { this.vm.gotoHealthPlanProfile(healthPlan) }
      },
      healthPlan.code,
      healthPlan.address,
      healthPlan.city,
      healthPlan.state,
      healthPlan.zip_code,
      healthPlan.phone,
      valueHelper.isSet(healthPlan.active) ? 'Active' : 'Inactive'
    ]
  }

  render() {
    const { filters, healthPlansHeaders } = this.state
    const filtersOptions = this.vm.filtersOptions()
    const filterDescriptions = this.vm.filterDescriptions(filters, filtersOptions)
    let lastPage
    if (valueHelper.isValue(healthPlansHeaders)) {
      lastPage = healthPlansHeaders.lastPage
    }

    return (
      <ListView
        filterDescriptions={filterDescriptions}
        filters={filters}
        generateTableHeadings={this.generateTableHeadings}
        generateTableRow={this.generateTableRow}
        lastPage={lastPage}
        list={this.state.healthPlans}
        listLabel="Health Plan"
        listPluralLabel="Health Plans"
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
        page={lastPage}
        title="Health Plans"
      />
    )
  }
}

export { HealthPlansPage }
