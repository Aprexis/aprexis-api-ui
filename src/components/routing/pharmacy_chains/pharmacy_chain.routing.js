import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { NoMatch } from "../"
import { PharmacyStoresRouting } from "../pharmacy_stores"
import { PharmacyChainProfilePage } from "../../pages/pharmacy_chains"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PharmacyChainRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyChainPrefix = pathHelper.singularPrefix(window.location, "pharmacy-chains", ":pharmacy_chain_id")

    return (
      <Switch>
        <Route
          exact
          path={`${pharmacyChainPrefix}/profile`}
          render={(props) => (<PharmacyChainProfilePage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyChainPrefix}/pharmacy-stores`}
          render={(props) => (<PharmacyStoresRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyChainRouting }
