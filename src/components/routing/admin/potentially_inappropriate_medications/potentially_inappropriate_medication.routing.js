import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../index.js"
import { PotentiallyInappropriateMedicationProfilePage } from "../../../pages/admin/potentially_inappropriate_medications/index.js"
import { valueHelper } from "@aprexis/aprexis-api-utility"
import { pathHelper } from "../../../../helpers/index.js"

class PotentiallyInappropriateMedicationRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const potentiallyInappropriateMedicationPrefix = pathHelper.singularPrefix(window.location, "potentially-inappropriate-medications", ":potentially_inappropriate_medication_id")

    return (
      <Switch>
        <Route
          exact
          path={`${potentiallyInappropriateMedicationPrefix}/profile`}
          render={(props) => (<PotentiallyInappropriateMedicationProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PotentiallyInappropriateMedicationRouting }
