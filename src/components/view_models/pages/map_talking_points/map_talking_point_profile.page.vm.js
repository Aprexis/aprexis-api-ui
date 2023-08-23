import { AbstractPageViewModel } from "../"
import { mapTalkingPointApi, mapTalkingPointHelper } from "@aprexis/aprexis-api-utility"
import { apiEnvironmentHelper, userCredentialsHelper } from "../../../../helpers"

class MapTalkingPointProfilePageViewModel extends AbstractPageViewModel {
  constructor(props) {
    super(props)

    this.api = this.api.bind(this)
    this.editProfileModal = this.editProfileModal.bind(this)
    this.helper = this.helper.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  api() {
    return mapTalkingPointApi
  }

  editProfileModal(mapTalkingPointToEdit) {
    this.api().edit(
      apiEnvironmentHelper.apiEnvironment(userCredentialsHelper.get(), this.props.reconnectAndRetry),
      this.helper().id(mapTalkingPointToEdit),
      (mapTalkingPoint) => {
        this.props.launchModal(
          "map-talking-point",
          {
            operation: "update",
            onUpdateView: this.loadData,
            mapTalkingPoint
          }
        )
      },
      this.onError
    )
  }

  helper() {
    return mapTalkingPointHelper
  }

  loadData() {
    this.clearData(false)

    const userCredentials = userCredentialsHelper.get()
    const pathEntries = this.pathEntries()
    const map_talking_point_id = pathEntries['map-talking-points'].value
    this.api().profile(
      apiEnvironmentHelper.apiEnvironment(userCredentials, this.props.reconnectAndRetry),
      map_talking_point_id,
      (mapTalkingPoint) => { this.addField('mapTalkingPoint', mapTalkingPoint, this.redrawView) },
      this.onError
    )
  }
}

export { MapTalkingPointProfilePageViewModel }
