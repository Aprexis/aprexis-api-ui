import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PharmacyClaimProfilePage } from "../../pages/pharmacy_claims"
import { pathHelper, valueHelper } from "../../../helpers"

class PharmacyClaimRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyClaimPrefix = pathHelper.singularPrefix(window.location, "pharmacy-claims", ":pharmacy_claim_id")

    return (
      <Switch>
        <Route
          exact
          path={`${pharmacyClaimPrefix}/profile`}
          render={(props) => (<PharmacyClaimProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyClaimRouting }
