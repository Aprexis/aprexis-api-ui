import { AbstractListPageViewModel } from "../abstract_list.page.vm.js"
import { mapTalkingPointApi, mapTalkingPointHelper, pageHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

const mapTalkingPointListMethods = [
  { pathKey: "interventions", method: mapTalkingPointApi.listForIntervention }
]

class MapTalkingPointsPageViewModel extends AbstractListPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.canCreate = this.canCreate.bind(this)
    this.defaultParameters = this.defaultParameters.bind(this)
    this.filterDescriptions = this.filterDescriptions.bind(this)
    this.filtersOptions = this.filtersOptions.bind(this)
    this.gotoMapTalkingPointProfile = this.gotoMapTalkingPointProfile.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.title = this.title.bind(this)
  }

  api() {
    return mapTalkingPointApi
  }

  canCreate() {
    return false
  }

  defaultParameters() {
    const filters = {}
    const sorting = { sort: "intervention.program.name,intervention.date_of_service,subject" }
    this.addData({ filters, sorting, page: this.defaultPage() })
  }

  filterDescriptions(_filters, _filtersOptions) {
    return []
  }

  filtersOptions() {
    return {}
  }

  gotoMapTalkingPointProfile(mapTalkingPoint) {
    const pathArray = pathHelper.buildPathArray(window.location, mapTalkingPoint, "profile")

    pathHelper.gotoPage(pathArray)
  }

  helper() {
    return mapTalkingPointHelper
  }

  loadData() {
    this.clearData()
    this.defaultParameters()
    this.refreshData()
  }

  refreshData() {
    this.removeField("mapTalkingPointHeaders")
    this.fetchList(
      mapTalkingPointListMethods,
      (mapTalkingPoints, mapTalkingPointHeaders) => {
        this.addData(
          { mapTalkingPoints, page: pageHelper.updatePageFromLastPage(mapTalkingPointHeaders) },
          this.redrawView
        )
      },
      this.onError
    )
  }

  title() {
    return "Map Talking Points"
  }
}

export { MapTalkingPointsPageViewModel }
