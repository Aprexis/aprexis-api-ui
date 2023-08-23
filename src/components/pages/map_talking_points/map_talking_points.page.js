import React, { Component } from "react"
import { MapTalkingPointsPageViewModel } from "../../view_models/pages/map_talking_points"
import { ListView } from "../../../containers"
import { mapTalkingPointHelper, valueHelper } from "@aprexis/aprexis-api-utility"
import { listHelper } from "../../../helpers"

const headings = [
  {
    name: "Subject",
    field: "subject",
    method: "subject"
  },
  {
    name: "Intervention",
    field: "intervention.program.name,intervention.date_of_service",
    method: "interventionIdentification",
    unless: 'interventions'
  }
]

class MapTalkingPointsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.vm = new MapTalkingPointsPageViewModel(
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
        listName: "map-talking-points",
        pathEntries,
        sorting,
        onRefresh: this.vm.refreshData,
        onUpdateSorting: this.vm.updateSorting
      }
    )
  }

  generateTableRow(mapTalkingPoint) {
    const { filters } = this.state
    const pathEntries = this.vm.pathEntries()

    return listHelper.listRow(
      {
        currentUser: this.props.currentUser,
        filters,
        gotoTableItemProfile: this.vm.gotoMapTalkingPointProfile,
        headings,
        helper: mapTalkingPointHelper,
        launchModal: this.props.launchModal,
        modelName: 'mapTalkingPoint',
        onDeleteTableItem: this.vm.destroy,
        onRefresh: this.vm.refreshData,
        pathEntries,
        tableItem: mapTalkingPoint
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
        list={this.state.mapTalkingPoints}
        listLabel="Map Talking Point"
        listPluralLabel="Map Talking Points"
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
        title="Map Talking Points"
      />
    )
  }

  nav(_list) {
    return
  }

  shouldComponentUpdate(nextProps, _nextState) {
    this.vm.props = { ...this.vm.props, ...nextProps }
    return true
  }
}

export { MapTalkingPointsPage }
