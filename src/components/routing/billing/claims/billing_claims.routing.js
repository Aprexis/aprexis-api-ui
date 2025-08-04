import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingClaimRouting } from "./billing_claim.routing.js"
import { NoMatch } from "../../index.js"
import { BillingClaimsPage } from "../../../pages/billing/claims/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class BillingClaimsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingClaimsPrefix = pathHelper.pluralPrefix(window.location, "billing-claims")

    return (
      <Switch>
        <Route
          exact
          path={billingClaimsPrefix}
          render={(props) => (<BillingClaimsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingClaimsPrefix}/:billing_claim_id`}
          render={(props) => (<BillingClaimRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingClaimsRouting }
