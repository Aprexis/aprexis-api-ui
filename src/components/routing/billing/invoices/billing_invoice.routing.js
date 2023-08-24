import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { BillingInvoiceProfilePage } from "../../../pages/billing/invoices"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class BillingInvoiceRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const billingInvoicePrefix = pathHelper.singularPrefix(
      window.location,
      "billing-invoices",
      ":billing_invoice_id"
    )

    return (
      <Switch>
        <Route
          exact
          path={`${billingInvoicePrefix}/profile`}
          render={(props) => (<BillingInvoiceProfilePage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { BillingInvoiceRouting }
