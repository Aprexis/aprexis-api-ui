import React, { Component } from 'react'
import { TableColumnHeader } from '../../shared'
import { UsersPageViewModel } from '../../view_models/pages/users'
import { ListView } from '../../../containers'
import { userHelper, valueHelper } from '../../../helpers'

const headings = [
  {
    name: "Username",
    field: "username"
  },
  {
    name: "Role",
    field: "role"
  },
  {
    name: "First Name",
    field: "first_name"
  },
  {
    name: "Last Name",
    field: "last_name"
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
        ...this.props,
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
            key={`users-table-heading-${field}`}
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

  generateTableRow(user) {
    return [
      {
        content: <React.Fragment>{user.username}{userHelper.renderAccess(user)}</React.Fragment>,
        onClick: (event) => { this.vm.gotoUserProfile(user) }
      },
      userHelper.displayRole(user),
      user.first_name,
      user.last_name,
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
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onClearModal={this.vm.clearModal}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onsubmitModal={this.vm.submitModal}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Users"
      />
    )
  }
}

export { UsersPage }
