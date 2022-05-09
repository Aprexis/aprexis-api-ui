import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingClaimHistoryCollectionRouting } from "./"
import { NoMatch } from "../../"
import { BillingClaimHistoryCollectionsPage } from "../../../pages/billing/claim_history_collections"
import { pathHelper, valueHelper } from "../../../../helpers"

class BillingClaimHistoryCollectionsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingClaimHistoryCollectionsPrefix = pathHelper.pluralPrefix(window.location, "billing-claim-history-collections")

    return (
      <Switch>
        <Route
          exact
          path={billingClaimHistoryCollectionsPrefix}
          render={(props) => (<BillingClaimHistoryCollectionsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingClaimHistoryCollectionsPrefix}/:billing_claim_history_collection_id`}
          render={(props) => (<BillingClaimHistoryCollectionRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingClaimHistoryCollectionsRouting }
