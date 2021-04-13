import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { InterventionRouting } from "./"
import { NoMatch } from "../"
import { InterventionsPage } from "../../pages/interventions"
import { pathHelper } from "../../../helpers"

class InterventionsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser
    }
    const interventionsPrefix = pathHelper.pluralPrefix(window.location, "interventions")

    return (
      <Switch>
        <Route
          exact
          path={interventionsPrefix}
          render={(props) => (<InterventionsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${interventionsPrefix}/:intervention_id`}
          render={(props) => (<InterventionRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { InterventionsRouting }
