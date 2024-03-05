import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../../"
import { NadacPricesPage } from "../../../pages/admin/nadac_prices"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../../helpers"

class NadacPricesRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const nadacPricesPrefix = pathHelper.pluralPrefix(window.location, "nadac-prices")

    return (
      <Switch>
        <Route
          exact
          path={nadacPricesPrefix}
          render={(props) => (<NadacPricesPage {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { NadacPricesRouting }
