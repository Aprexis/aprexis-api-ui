import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { BillingContractProfilePage } from "../../../pages/billing/contracts"
import { pathHelper, valueHelper } from "../../../../helpers"

class BillingContractRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingContractPrefix = pathHelper.singularPrefix(window.location, "billing-contracts", ":billing_contract_id")

    return (
      <Switch>
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
