import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { MapTalkingPointRouting } from "./map_talking_point.routing.js"
import { NoMatch } from "../index.js"
import { MapTalkingPointsPage } from "../../pages/map_talking_points/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../helpers/index.js"

class MapTalkingPointsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const mapTalkingPointsPrefix = pathHelper.pluralPrefix(window.location, "map-talking-points")

    return (
      <Switch>
        <Route
          exact
          path={mapTalkingPointsPrefix}
          render={(props) => (<MapTalkingPointsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${mapTalkingPointsPrefix}/:map_talking_point_id`}
          render={(props) => (<MapTalkingPointRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MapTalkingPointsRouting }
