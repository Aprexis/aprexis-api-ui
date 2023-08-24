import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingClaimHistoryCollectionsRouting } from "./claim_history_collections"
import { BillingInvoicesRouting } from "./invoices"
import { NoMatch } from "../"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class BillingRouting extends Component {
  render() {
    const { context, currentBillingUser, currentUser } = this.props
    const contextProps = {
      context,
      currentBillingUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingPrefix = pathHelper.pluralPrefix(window.location, "billing")

    return (
      <Switch>
        <Route
          path={`${billingPrefix}/billing-claim-history-collections`}
          render={(props) => (<BillingClaimHistoryCollectionsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingPrefix}/billing-invoices`}
          render={(props) => (<BillingInvoicesRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingRouting }
