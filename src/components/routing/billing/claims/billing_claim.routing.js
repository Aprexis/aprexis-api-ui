import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { BillingClaimProfilePage } from "../../../pages/billing/claims"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class BillingClaimRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingClaimPrefix = pathHelper.singularPrefix(
      window.location,
      "billing-claims",
      ":billing_claim_id"
    )

    return (
      <Switch>
        <Route
          exact
          path={`${billingClaimPrefix}/profile`}
          render={(props) => (<BillingClaimProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingClaimRouting }
