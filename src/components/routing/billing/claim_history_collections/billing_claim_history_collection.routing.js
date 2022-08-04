import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
//import { BillingClaimHistoryCollectionProfilePage } from "../../../pages/billing/claim_history_collections"
//import { valueHelper } from '@aprexis/aprexis-api-utility'
//import { pathHelper } from "../../../../helpers"

class BillingClaimHistoryCollectionRouting extends Component {
  render() {
    /*
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingClaimHistoryCollectionPrefix = pathHelper.singularPrefix(window.location, "billing-claim-history-collections", ":billing_claim_history_collection_id")
    */

    return (
      <Switch>
        {/*
        <Route
          exact
          path={`${billingClaimHistoryCollectionPrefix}/profile`}
          render={(props) => (<BillingClaimHistoryCollectionProfilePage {...props} {...contextProps} />)}
        />
        */}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingClaimHistoryCollectionRouting }
