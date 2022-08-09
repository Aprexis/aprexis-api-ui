import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingContractPharmacyStoreRouting } from "./"
import { NoMatch } from "../../"
import { BillingContractPharmacyStoresPage } from "../../../pages/billing/pharmacy_stores"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class BillingContractPharmacyStoresRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyStoresPrefix = pathHelper.pluralPrefix(window.location, "billing-contract-pharmacy-stores")

    return (
      <Switch>
        <Route
          exact
          path={pharmacyStoresPrefix}
          render={(props) => (<BillingContractPharmacyStoresPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyStoresPrefix}/:pharmacy_store_id`}
          render={(props) => (<BillingContractPharmacyStoreRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractPharmacyStoresRouting }
