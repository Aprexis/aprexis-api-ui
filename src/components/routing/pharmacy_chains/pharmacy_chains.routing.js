import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PharmacyChainRouting } from "./"
import { NoMatch } from "../"
import { PharmacyChainsPage } from "../../pages/pharmacy_chains"
import { valueHelper } from '@aprexis/aprexis-api-utility'
import { pathHelper } from "../../../helpers"

class PharmacyChainsRouting extends Component {
  render() {
    const { context, currentAdminUser, currentUser } = this.props
    const contextProps = {
      context,
      currentAdminUser,
      currentUser,
      ...valueHelper.importantProps(this.props)
    }
    const pharmacyChainsPrefix = pathHelper.pluralPrefix(window.location, "pharmacy-chains")

    return (
      <Switch>
        <Route
          exact
          path={pharmacyChainsPrefix}
          render={(props) => (<PharmacyChainsPage {...props} {...contextProps} />)}
        />
        <Route
          path={`${pharmacyChainsPrefix}/:pharmacy_chain_id`}
          render={(props) => (<PharmacyChainRouting {...props} {...contextProps} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyChainsRouting }
