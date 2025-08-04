import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../index.js"
import { BillingContractPharmacyChainsRouting } from "../pharmacy_chains/index.js"
import { BillingContractPharmacyStoresRouting } from "../pharmacy_stores/index.js"
import { BillingContractTermsRouting } from "../terms/index.js"
import { BillingContractProfilePage } from "../../../pages/billing/contracts/index.js"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers/index.js"

class BillingContractRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractPrefix = pathHelper.singularPrefix(
      window.location,
      "billing-contracts",
      ":billing_contract_id"
    )

    return (
      <Switch>
        <Route
          path={`${billingContractPrefix}/billing-contract-pharmacies`}
          render={(props) => (<BillingContractPharmacyChainsRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingContractPrefix}/billing-contract-pharmacy-stores`}
          render={(props) => (<BillingContractPharmacyStoresRouting {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingContractPrefix}/billing-contract-terms`}
          render={(props) => (<BillingContractTermsRouting {...props} {...contextProps} />)}
        />
        <Route
          exact
          path={`${billingContractPrefix}/profile`}
          render={(props) => (<BillingContractProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractRouting }
