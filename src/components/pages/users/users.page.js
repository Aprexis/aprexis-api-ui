import React, { Component } from 'react'
import { TableColumnHeader } from '../../shared'
import { UsersPageViewModel } from '../../view_models/pages/users'
import { ListView } from '../../../containers'
import { pathHelper } from '../../../helpers'

const headings = [
  {
    name: "First Name",
    field: "first_name"
  },
  {
    name: "Last Name",
    field: "last_name"
  },
  {
    name: "Username",
    field: "Username"
  },
  {
    name: "Email",
    field: "email"
  },
  {
    name: "Phone",
    field: "phone"
  }
]

class UsersPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new UsersPageViewModel(
      {
        pathEntries: pathHelper.parsePathEntries(window.location),
        ...this.props,
        view: this
      }
    )

    this.generateTableHeadings = this.generateTableHeadings.bind(this)
    this.generateTableRow = this.generateTableRow.bind(this)
  }

  componentDidMount() {
    this.vm.loadData(window.location)
  }

  generateTableHeadings(users) {
    return headings.map(
      (heading) => {
        const { name, field } = heading
        return (
          <TableColumnHeader
            key={`users-table-heading-${field}`}
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

  generateTableRow(user) {
    return [
      user.first_name,
      user.last_name,
      user.username,
      user.email,
      user.phone
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
        list={this.state.users}
        listLabel="User"
        listPluralLabel="Users"
        modal={this.state.modal}
        multipleRowsSelection={this.vm.multipleRowsSelection}
        onChangeFilter={this.vm.changeFilter}
        onClearAlert={this.vm.clearAlert}
        onClearModal={this.vm.clearModal}
        onLoadData={this.vm.loadData}
        onSelectFilters={this.vm.selectFilters}
        onSubmitFilters={this.vm.submitFilters}
        onsubmitModal={this.vm.submitModal}
        onUpdateFilters={this.vm.updateFilters}
        title="Users"
      />
    )
  }
}

export { UsersPage }
