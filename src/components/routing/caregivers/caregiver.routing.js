import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { CaregiverProfilePage } from "../../pages/caregivers"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class CaregiverRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const medicalClaimPrefix = pathHelper.singularPrefix(window.location, "caregivers", ":caregiver_id")

    return (
      <Switch>
        <Route
          exact
          path={`${medicalClaimPrefix}/profile`}
          render={(props) => (<CaregiverProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { CaregiverRouting }
