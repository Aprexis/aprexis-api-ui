import React, { Component } from "react"
import { PotentiallyInappropriateMedicationsPageViewModel } from "../../../view_models/pages/admin/potentially_inappropriate_medications"
import { ListView } from "../../../../containers"
import { valueHelper, potentiallyInappropriateMedicationHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../../helpers"

const headings = [
  {
    name: "Name",
    field: "specific_product.name",
    method: "specificProductName"
  },
  {
    name: "Synonym",
    field: "specific_product.synonym",
    method: "specificProductSynonym"
  }
]

class PotentiallyInappropriateMedicationsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new PotentiallyInappropriateMedicationsPageViewModel(
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
        listName: "potentially-inappropriate-medications",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(potentiallyInappropriateMedication) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoPotentiallyInappropriateMedicationProfile,
        headings,
        helper: potentiallyInappropriateMedicationHelper,
        launchModal: this.props.launchModal,
        modelName: 'potentiallyInappropriateMedication',
        onDeleteTableItem: this.vm.destroy,
        onEditTableItem: this.vm.editModal,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: potentiallyInappropriateMedication
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
        list={this.state.potentiallyInappropriateMedications}
        listLabel="Potentially Inappropriate Medication"
        listPluralLabel="Potentially Inappropriate Medications"
        modal={this.state.modal}
        onChangeFilter={this.vm.changeFilter}
        onChangePage={this.vm.changePage}
        onChangePerPage={this.vm.onChangePerPage}
        onClearAlert={this.vm.clearAlert}
        onRefreshData={this.vm.refreshData}
        onSelectFilters={this.vm.selectFilters}
        onUpdateFilters={this.vm.updateFilters}
        page={this.state.page}
        title="Potentially Inappropriate Medications"
      />
    )
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { PotentiallyInappropriateMedicationsPage }
