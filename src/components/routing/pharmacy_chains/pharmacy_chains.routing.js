import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { PharmacyChainRouting } from "./"
import { NoMatch } from "../"
import { PharmacyChainsPage } from "../../pages/pharmacy_chains"

class PharmacyChainsRouting extends Component {
  render() {
    const { context, currentUser } = this.props

    return (
      <Switch>
        <Route
          exact
          path="/pharmacy-chains"
          render={(props) => (<PharmacyChainsPage {...props} context={context} currentUser={currentUser} />)}
        />
        <Route
          path="/pharmacy-chains/:pharmacy_chain_id"
          render={(props) => (<PharmacyChainRouting {...props} context={context} currentUser={currentUser} />)}
        />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export { PharmacyChainsRouting }
