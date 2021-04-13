import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
//import { InterventionProfilePage } from "../../pages/interventions"
import { pathHelper } from "../../../helpers"

class InterventionRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const interventionPrefix = pathHelper.singularPrefix(window.location, "interventions", ":intervention_id")

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${interventionPrefix}/profile`}
          render={(props) => (<InterventionProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionRouting }
