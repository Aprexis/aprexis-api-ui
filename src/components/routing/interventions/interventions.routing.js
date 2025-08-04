import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { InterventionRouting } from "./intervention.routing.js"
import { NoMatch } from "../index.js"
import { InterventionsPage } from "../../pages/interventions/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers/index.js"

class InterventionsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
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
