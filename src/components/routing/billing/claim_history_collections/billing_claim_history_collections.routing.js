import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingClaimHistoryCollectionRouting } from "./billing_claim_history_collection.routing.js"
import { NoMatch } from "../../index.js"
import { BillingClaimHistoryCollectionsPage } from "../../../pages/billing/claim_history_collections/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

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
