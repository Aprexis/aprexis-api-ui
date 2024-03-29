import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BillingContractTermRouting } from "./"
import { NoMatch } from "../../"
import { BillingContractTermsPage } from "../../../pages/billing/terms"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class BillingContractTermsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractTermsPrefix = pathHelper.pluralPrefix(window.location, "billing-contract-terms")

    return (
      <Switch>
        <Route
          exact
          path={billingContractTermsPrefix}
          render={(props) => (<BillingContractTermsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${billingContractTermsPrefix}/:billing_contract_term_id`}
          render={(props) => (<BillingContractTermRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingContractTermsRouting }
