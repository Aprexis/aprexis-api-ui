import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
//import { MapTalkingPointProfilePage } from "../../pages/map_talking_points"
//import { valueHelper } from "@aprexis/aprexis-api-utility"
//import { pathHelper } from "../../../helpers"

class MapTalkingPointRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const mapTalkingPointPrefix = pathHelper.singularPrefix(window.location, "map-talking-points", ":map_talking_point_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${mapTalkingPointPrefix}/profile`}
          render={(props) => (<MapTalkingPointProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { MapTalkingPointRouting }
