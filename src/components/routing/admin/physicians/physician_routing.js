import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../index.js"
import { PhysicianProfilePage } from "../../../pages/admin/physicians/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class PhysicianRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicalClaimPrefix = pathHelper.singularPrefix(window.location, "physicians", ":physician_id")

    return (
      <Switch>
        <Route
          exact
          path={`${medicalClaimPrefix}/profile`}
          render={(props) => (<PhysicianProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PhysicianRouting }
